FROM node:12-alpine
LABEL name "Peanut - Discord Bot"
WORKDIR /usr/peanut
COPY package.json /usr/peanut/
RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && npm install
ENV TERM xterm-256color
COPY . .
EXPOSE 5500
RUN echo PS1=\"\\h:\\W \\u$ \" >> ~/.bashrc
RUN npm run build
