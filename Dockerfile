FROM node:latest

WORKDIR /usr/src/app

COPY . .

ARG SSH_PRIVATE_KEY

RUN echo ${SSH_PRIVATE_KEY}

RUN echo ${SSH_PRIVATE_KEY} | base64 -d > slack_rsa
RUN cat slack_rsa

ENV SSH_PRIVATE_KEY_PATH /usr/src/app/slack_rsa

RUN yarn install

CMD ["yarn", "start"]