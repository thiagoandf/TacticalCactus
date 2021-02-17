module.exports = () => {
    return { type: 'sendMessage', message: Math.random() > 0.5 ? 'Heads' : 'Tails' };
}