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
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message(async ({ message, say }) => {
  if (
    message.channel == CHANNEL &&
    message.text != "" &&
    message.thread_ts == null
  ) {
    if (message.text.startsWith("# ")) {
      return;
    }

    console.log(`executing: ${message.text}`);

    const result = await ssh.execCommand(message.text);

    let text = "_no text_";

    if (result.stdout != "") {
      text = "```\n"+result.stdout+"\n```";
    } else if (result.stderr != "") {
      text = "```\n"+result.stderr+"\n```";
    }

    await say(text);
  }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app started");
})();
