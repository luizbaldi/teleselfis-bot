import express from 'express';
import packageInfo from'../../package.json';

const app = express();

app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

const server = app.listen(process.env.PORT, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});