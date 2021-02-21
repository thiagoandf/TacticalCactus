module.exports = {
    ascii: require('./ascii'),
    ping: require('./ping'),
    coin: require('./coin'),
    this: require('./titw'),
    inventory: require('./inventory'),
    'r': require('./reddit'),
    env: () => ({ type: 'sendMessage', message: process.env.NODE_ENV }),
}
