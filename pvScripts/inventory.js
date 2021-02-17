const {capitalize} = require("../utils/auxiliar");
const axios = require("axios");

module.exports = async (message) => {
    let msg = 'gg';
    const command = message.text.split(" ")[1];
    const item = message.text.split(" ")[2];
    const amount = message.text.split(" ")[3];
    const minimum = message.text.split(" ")[4];
    switch (command) {
        case 'add': {
            try {
                msg = await handleAdd(message.from.id, item, amount);
            } catch (e) {
                msg = e
            }
            break;
        }
        case 'register': {
            try {
                msg = await handleRegister(message.from.id, item, amount, minimum);
            } catch (e) {
                msg = e
            }
            break;

        }
        case 'get': {
            try {
                msg = await handleGet(message.from.id, item);
            } catch (e) {
                msg = e
            }
            break;

        }
    }
    return {
        type: 'sendMessage',
        message: msg,
    };
}

function handleGet(id, item) {
    return new Promise((resolve, reject) => {
        getInfo(id).then(data => {
            if (data) {
                if (data.items[item]) {
                    resolve(
                        `${capitalize(item)} current amount is ${data.items[item].amount} with a minimum of ${data.items[item].minimum}`
                    )
                } else reject('Item not registerd');
            } else reject('User not registered');
        });
    });

}

function handleRegister(id, item, amount, min) {
    return new Promise((resolve, reject) => {
        if (isNaN(parseInt(amount)) ||
            parseInt(amount) <= 0 ||
            isNaN(parseInt(min)) ||
            parseInt(min) <= 0
        ) reject('Invalid amount');
        getInfo(id).then(data => {
            if (data) {
                if (!data.items[item]) {
                    axios.put(`${process.env.DATABASE_URL}/users/${id}/items/${item}.json`, {
                        amount: parseInt(amount),
                        minimum: parseInt(min),
                    })
                        .then((r) => {
                            resolve(`${capitalize(item)} registered successfully`);
                        })
                        .catch(() => reject('Error updating item'));
                } else reject('Item already registered');
            } else reject('User not registered');
        })
    });
}

function handleAdd(id, item, amount) {
    return new Promise((resolve, reject) => {
        if (isNaN(parseInt(amount)) || parseInt(amount) <= 0) reject('Invalid amount');
        getInfo(id).then(data => {
            if (data) {
                if (data.items[item]) {
                    axios.put(`${process.env.DATABASE_URL}/users/${id}/items/${item}.json`, {
                        amount: parseInt(data.items[item].amount) + parseInt(amount),
                        minimum: data.items[item].minimum,
                    })
                        .then((r) => {
                            resolve(`${capitalize(item)} amount updated to ${r.data.amount}`)
                        })
                        .catch(() => reject('Error updating item'));
                } else reject('Item not yet registered');
            } else reject('User not registered');
        })
            .catch(err => reject(err));
    })
}

function getInfo(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.DATABASE_URL}/users/${id}.json`, {})
            .then(data => {
                resolve(data.data)
            })
            .catch(err => reject(err));
    })
}