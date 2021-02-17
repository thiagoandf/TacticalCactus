const TelegramBot = require('node-telegram-bot-api')

const token = '1665146475:AAGN79AVq1AvNEIvwUUMYH4_Q-z_3weS1lQ'

const bot = new TelegramBot(token, { polling: true })

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, `${JSON.stringify(msg)}`);
});