/* Config */
const botConfig = require('./src/config/botConfig')();
const express = require('express');
const bodyParser = require('body-parser');

/* Controllers */
const BotController = require('./src/controller/botController')();

/* Bot Instance */
const bot = botConfig.factoryBot();

/* Start bot event listeners */
const app = express();
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json({ version: '1.0' });
});

const server = app.listen(process.env.PORT, "0.0.0.0", () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Web server started at http://%s:%s', host, port);
});

app.post('/' + bot.token, function (req, res) {
    BotController.startBotListeners(bot);
    res.sendStatus(200);
});