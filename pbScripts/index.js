module.exports = {
    ascii: require('./ascii'),
    coin: require('./coin'),
    drugstore: require('./drugstore'),
    inventory: require('./inventory'),
    ping: require('./ping'),
    this: require('./titw'),
    unit: require('./unit'),
    'r': require('./reddit'),
    env: () => ({ type: 'sendMessage', message: process.env.NODE_ENV }),
}
