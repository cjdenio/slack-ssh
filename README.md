# slack-ssh

Minimal SSH in Slack!

## Hosting

Requirements:

- Some sort of web host
- A server to SSH into, with SSH set up and configured
- An SSH key pair, with the public key installed on the server

First, create a Slack app. Enable Socket Mode, and subscribe to the `message.channels` bot event. Create a bot token with the `chat.write` scope.

### Environment variables

```
SLACK_APP_TOKEN = your slack app's app-level token
SLACK_BOT_TOKEN = the bot token
SLACK_CHANNEL = the ID of the channel you're running SSH in (the bot must be a member of this channel)

SSH_HOST = the IP of the server to SSH into, e.g. 123.456.78.90. Only port 22 is supported right now.
SSH_USER = login name of the user you're SSHing into

SSH_PRIVATE_KEY_PATH = absolute path to your SSH private key file. (NOT REQUIRED WHEN RUNNING IN DOCKER, SEE BELOW)
```

### Running in Docker

When running in Docker, pass your base64-encoded private key as a build arg named `SSH_PRIVATE_KEY`. The `SSH_PRIVATE_KEY_PATH` env variable is NOT required in this case.
