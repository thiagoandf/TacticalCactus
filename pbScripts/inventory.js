const {capitalize} = require("../utils/auxiliar");
const axios = require("axios");

module.exports = async (message) => {
  let msg = 'gg';
  const command = message.text.split(" ")[1];
  const item = message.text.split(" ")[2];
  const amount = message.text.split(" ")[3];
  const minimum = message.text.split(" ")[4];
  switch (command) {
    case 'help': {
      try {
        msg = await getHelp();
      } catch (e) {
        msg = e
      }
      break;
    }
    case 'add': {
      try {
        msg = await handleAdd(message.from.id, item.toLowerCase(), amount);
      } catch (e) {
        msg = e
      }
      break;
    }
    case 'register': {
      try {
        msg = await handleRegister(message.from.id, item.toLowerCase(), amount, minimum);
      } catch (e) {
        msg = e
      }
      break;
    }
    case 'check': {
      try {
        msg = await handleGet(message.from.id, item.toLowerCase());
      } catch (e) {
        msg = e
      }
      break;
    }
    case 'shopping': {
      try {
        msg = await getShopping(message.from.id);
      } catch (e) {
        msg = e
      }
      break;
    }
    case 'stock': {
      try {
        msg = await getStock(message.from.id);
      } catch (e) {
        msg = e
      }
      break;
    }
    case 'use': {
      try {
        msg = await handleUse(message.from.id, item.toLowerCase(), amount);
      } catch (e) {
        msg = e
      }
      break;
    }
    case 'delete': {
      try {
        msg = await handleDelete(message.from.id, item.toLowerCase());
      } catch (e) {
        msg = e
      }
      break;
    }
  }
  return {
    type: 'sendMessage',
    message: msg,
    options: {
      parse_mode: 'HTML'
    }
  };
}

function handleGet(id, item) {
  return new Promise((resolve, reject) => {
    getInfo(id).then(data => {
      if (data.items[item]) {
        resolve(
          `${capitalize(item)} current amount is ${data.items[item].amount} with a minimum of ${data.items[item].minimum}`
        )
      } else reject('Item not registerd');
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
      if (!data.items[item]) {
        axios.put(`${process.env.DATABASE_URL}/users/${id}/items/${item.toLowerCase()}.json`, {
          amount: parseInt(amount),
          minimum: parseInt(min),
        })
          .then((r) => {
            resolve(`${capitalize(item)} registered successfully`);
          })
          .catch(() => reject('Error updating item'));
      } else reject('Item already registered');
    }).catch(() => {
      axios.put(`${process.env.DATABASE_URL}/users/${id}/items/${item.toLowerCase()}.json`, {
        amount: parseInt(amount),
        minimum: min,
      })
        .then((r) => {
          resolve(`User registered with ${capitalize(item)}`)
        })
        .catch(() => reject('Error updating item'));
    })
  });
}

function handleAdd(id, item, amount) {
  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(amount)) || parseInt(amount) <= 0) reject('Invalid amount');
    getInfo(id).then(data => {
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
    });
  })
}

function handleUse(id, item, amount = '1') {
  return new Promise((resolve, reject) => {
    if (isNaN(parseInt(amount)) || parseInt(amount) <= 0) reject('Invalid amount');
    getInfo(id).then(data => {
      if (data.items[item]) {
        if (parseInt(data.items[item].amount) - parseInt(amount) < 0) reject('Invalid amount');
        axios.put(`${process.env.DATABASE_URL}/users/${id}/items/${item.toLowerCase()}.json`, {
          amount: parseInt(data.items[item].amount) - parseInt(amount),
          minimum: data.items[item].minimum,
        })
          .then((r) => {
            resolve(`${capitalize(item)} amount updated to ${r.data.amount}`)
          })
          .catch(() => reject('Error updating item'));
      } else reject('Item not yet registered');
    });
  })
}

function handleDelete(id, item) {
  return new Promise((resolve, reject) => {
    getInfo(id).then(data => {
      if (data.items[item]) {
        axios.delete(`${process.env.DATABASE_URL}/users/${id}/items/${item.toLowerCase()}.json`)
          .then((r) => {
            resolve(`${capitalize(item)} deleted from stock`)
          })
          .catch(() => reject('Error updating item'));
      } else reject('Item not yet registered');
    });
  })
}

function getInfo(id) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.DATABASE_URL}/users/${id}.json`, {})
      .then(data => {
        if (data.data) resolve(data.data)
        else reject('User not registered');
      })
      .catch(err => reject(err));
  })
}

function getShopping(id) {
  return new Promise((resolve, reject) => {
    getInfo(id).then(async data => {
      const shop = [];
      await Object.keys(data.items).forEach(itemKey => {
        if (data.items[itemKey].amount <= data.items[itemKey].minimum) shop.push(itemKey);
      });
      if (shop.length)
        resolve(
          shop.map(item =>
            `${capitalize(item)} - Curr: ${data.items[item].amount} - Min: ${data.items[item].minimum}\n`
          )
            .sort()
            .join('\n')
        );
      else
        reject('No items to buy');
    })
  });
}

function getStock(id) {
  return new Promise((resolve) => {
    getInfo(id).then(async data => {
      resolve(Object.keys(data.items).map(item =>
        `${capitalize(item)} - Curr: ${data.items[item].amount} - Min: ${data.items[item].minimum}\n`
      ).sort().join('\n'));
    })
  });
}

function getHelp() {
  return `<b>Inventory - A home inventory management system</b>
<i>The command works acording to the following layout</i> 

<code>inventory [command] [item name (no spaces)] [amount] [minimum]</code>

<u>The available commands are:</u>
<code>help</code> - Prints this guide 
<code>register</code> - Registers a new item   <code>name | amount | minimum</code> 
<code>check</code> - Checks the specified item   <code>name</code> 
<code>add</code> - Adds stock for the specified item   <code>name | amount</code> 
<code>use</code> - Uses the specified item   <code>name | [amount = 1]</code> 
<code>delete</code> - Deletes the specified item from your inventory   <code>name</code> 
<code>stock</code> - Prints all the items in your current stock 
<code>shopping</code> - Prints all the items in your current stock with amounts equal or smaller than the minimum 
`
}