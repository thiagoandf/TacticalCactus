const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser');

const token = process.env.TELEGRAM_TOKEN;
let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new TelegramBot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new TelegramBot(token, { polling: true });
}

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT);

app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, `${JSON.stringify(msg)}`);
});