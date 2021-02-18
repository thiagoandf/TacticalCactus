const pb = require('./pbScripts');
const pv = require('./pvScripts');

module.exports = (bot) => {
  bot.on('message', async (msg) => {
    let user = msg.from;
    let message = msg.text;
    if (message.charAt(0) === '\\') {
      console.log('msg', msg);
      let args = message.substring(1).split(' ');
      let cmd = args.shift().toLowerCase();
      if (pv.hasOwnProperty(cmd) && user.id === Number(process.env.ADMIN_ID)) {
        const response = await pv[cmd](msg, args);
        console.log('response', response);
        bot[response.type](
          msg.chat.id,
          response.message,
          { ...response.options },
        );
      } else bot.sendMessage(msg.chat.id, `${user.first_name} ${user.last_name} you are not an admin`);
    } else {
      let args = message.charAt(0) === '/' ? message.substring(1).split(' ') : message.split(' ');
      let cmd = args.shift().toLowerCase();
      if (pb.hasOwnProperty(cmd)) {
        console.log('msg', msg);
        const response = await pb[cmd](msg, args);
        console.log('response', response);
        bot[response.type](
          msg.chat.id,
          response.message,
          { ...response.options },
        )
          .then(() => {
          });
      }
    }
  });

  bot.on("polling_error", console.log);
};