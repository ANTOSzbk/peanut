import PeanutClient from './client/PeanutClient';

const client = new PeanutClient({
  owner: process.env.OWNERS,
  token: process.env.TOKEN,
});

client.start();
