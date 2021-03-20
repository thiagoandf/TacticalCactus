const { vAlias, mAlias, ratio, labels, u } = require("../utils/measures");

module.exports = async (message) => {
  const msg = message.text;
  const split = msg.replace(',', '.').split(" ");
  split.shift();
  let amount;
  let unit;

  if (split.length > 2) {
    amount = split.shift();
    unit = split.join(' ');
  }
  else {
    amount = split[0].match(/.*[0-9]/g)[0];
    unit = split[0].replace(/.*[0-9]/g, '');
  }

  if (amount.includes('/')) amount = parseFloat(eval(amount));
  else amount = parseFloat(amount);

  let alias;
  if (mAlias[unit] || vAlias[unit]) alias = mAlias[unit] || vAlias[unit];

  let m = [
    `<b>${labels[unit]}</b>: ${amount}${u[unit]}\n`,
    ...Object.keys(ratio[alias]).map(key =>
      `<b>${labels[key]}</b>: ${(ratio[alias][key] * amount).toFixed(3)}${u[key]}`
    )
  ]

  return {
    type: 'sendMessage',
    message: m.join('\n'),
    options: {
      parse_mode: 'HTML'
    }
  };
}