const axios = require("axios");

const firebaseConfig = {
    apiKey: "AIzaSyAMduFaU8zjgR-tXu7bMwUgU4lnhYPiFwQ",
    authDomain: "tacticalcactus-52dc1.firebaseapp.com",
    databaseURL: "https://tacticalcactus-52dc1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tacticalcactus-52dc1",
    storageBucket: "tacticalcactus-52dc1.appspot.com",
    messagingSenderId: "157607185684",
    appId: "1:157607185684:web:25eab0d97f006821db0601"
};

module.exports = async (message) => {
    const command = message.text.split(" ")[1];
    const item = message.text.split(" ")[2];
    const amount = message.text.split(" ")[3];
    if (command === 'add') {
        const resp = await handleAdd(message.from.id, item, amount);
        return {
            type: 'sendMessage',
            message: resp,
        };
    }
}

function handleAdd(id, item, amount) {
    return new Promise((resolve, reject) => {
        getInfo(id).then(info => {
            if (info.data) {
                if (info.data.items[item]) {
                    axios.put(`${process.env.DATABASE_URL}/users/${id}/items/${item}.json`, {
                        amount: info.data.items[item].amount + amount,
                        minimum: info.data.items[item].minimum,
                    })
                        .then(() => resolve('Amount updated!'))
                        .catch(() => reject('Error updating item'));
                } else return 'Item not yet registered';
            } else return 'User not registered';
        });
    })
}

async function getInfo(id) {
    return await axios.get(`${process.env.DATABASE_URL}/users/${id}.json`, {});
}