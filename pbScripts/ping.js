module.exports = (message) => {
    const time = new Date().getTime() - message.date * 1000;
    const timeResponse = time < 1000 ? '<1s' : `${(time / 1000).toFixed(0)}s`;
    const pongResponse = 'pong';

    // Absolutelly no reason to have a random here, just for fun
    return { type: 'sendMessage', message: Math.random() > 0.5 ? timeResponse : pongResponse };
}