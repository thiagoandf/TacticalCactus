module.exports = {
    env: () => ({ type: 'sendMessage', message: process.env.NODE_ENV }),
    inventory: require('./inventory'),
}