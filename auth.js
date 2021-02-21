const pb = require('./pbScripts');

module.exports = (bot) => {
  bot.onText(/r\//, async (msg) => {
    const reddit = require('./pbScripts/reddit');
    await reddit(bot, msg);
  })
  bot.on('message', async (msg) => {
    let message = msg.text;
    let args = message.charAt(0) === '/' ? message.substring(1).split(' ') : message.split(' ');
    let cmd = args.shift().toLowerCase();
    if (pb.hasOwnProperty(cmd)) {
      console.log('msg', msg);
      const response = await pb[cmd](msg, args);
      console.log('response', response);
      bot[response.type](
        msg.chat.id,
        response.message,
        {...response.options},
      )
        .then(() => {
        });
    }
  });

  bot.on("polling_error", console.log);
};