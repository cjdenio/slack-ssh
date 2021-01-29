const { App } = require("@slack/bolt");
const { NodeSSH } = require("node-ssh");

const CHANNEL = process.env.SLACK_CHANNEL;

const ssh = new NodeSSH();

ssh
  .connect({
    host: process.env.SSH_HOST,
    username: process.env.SSH_USER,
    privateKey: process.env.SSH_PRIVATE_KEY_PATH,
  })
  .then(() => {
    console.log("connected to ssh");
  });

const app = new App({
  appToken: process.env.SLACK_APP_TOKEN,
  token: process.env.SLACK_BOT_TOKEN,
  socketMode: true,
});

app.message(async ({ message, say }) => {
  if (
    message.channel == CHANNEL &&
    message.text != "" &&
    message.thread_ts == null
  ) {
    console.log(`executing: ${message.text}`);

    const result = await ssh.execCommand(message.text);
    let text = "_no text_";
    if (result.stdout != "") {
      text = result.stdout;
    } else if (result.stderr != "") {
      text = result.stderr;
    }

    await say(text);
  }
});

(async () => {
  await app.start();
  console.log("⚡️ Bolt app started");
})();
