FROM node:12-alpine

RUN apk add curl
RUN curl -fsSLo /etc/apk/keys/secrethub.rsa.pub https://alpine.secrethub.io/pub \
  && echo "https://alpine.secrethub.io/alpine/edge/main" >> /etc/apk/repositories

RUN apk add --update secrethub-cli

COPY secrethub.env .

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY app.js .

EXPOSE 8080

ENTRYPOINT ["secrethub", "run", "--"]
CMD ["npm", "start"]
