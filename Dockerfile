FROM node:12-alpine
LABEL name "Peanut - Discord Bot"
WORKDIR /usr/peanut
COPY package.json /usr/peanut/
RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && npm install
COPY . .
EXPOSE 5500
RUN npm run build
