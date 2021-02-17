const pb = require('./pbScripts');
const pv = require('./pvScripts');

module.exports = (bot) => {
    bot.on('text', (msg) => {
        let user = msg.from;
        let message = msg.text;
        if (message.charAt(0) === '/') {
            if (user.id === Number(process.env.ADMIN_ID)) {
                let args = message.substring(1).split(' ');
                let cmd = args.shift().toLowerCase();
                if (pv.hasOwnProperty(cmd)) {
                    let response = pv[cmd](args);
                    bot[response.type](msg.chat.id, response.message)
                        .then(() => {});
                }
            } else bot.sendMessage(msg.chat.id, `${user.first_name} ${user.last_name} you are not an admin`);
        } else {
            message = message.toLowerCase();
            const args = message.substring(1).split(' ');
            if (pb.hasOwnProperty(message)) {
                const response = pb[message](args);
                bot[response.type](msg.chat.id, response.message)
                    .then(() => {});
            }
        }
    });

    bot.on("polling_error", console.log);
};