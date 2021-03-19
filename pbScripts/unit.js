const { vAlias } = require("../utils/measures");

module.exports = async (message) => {
  const msg = message.text;
  const split = msg.replace(',', '.').split(" ").shift();
  let amount;
  let unit;

  if (split.length > 2) {
    amount = split.shift();
    unit = split.join(' ');
  }
  else {
    amount = split[1].match(/.*[0-9]/g)[0];
    unit = split[1].replace(/.*[0-9]/g, '');
  }

  if (amount.includes('/')) amount = parseFloat(eval(amount));

  console.log('drink', amount, unit);
}