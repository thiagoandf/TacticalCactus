const axios = require("axios");

module.exports = async (message) => {
  let msg;
  const command = message.text.split(" ")[1];
  const fonts = await getFonts();

  if (command === 'fonts') msg = fonts;
  else if (fonts.includes(command))
    msg = await handleGenerate(message.text.split(' ').slice(2).join(' '), command)
  else msg = await handleGenerate(message.text.split(' ').slice(1).join(' '))

  return {
    type: 'sendMessage',
    message: msg,
    options: {
      parse_mode: 'HTML'
    }
  };
}

function handleGenerate(text, font) {
  return new Promise((resolve) => {
    let url = `https://artii.herokuapp.com/make?text=${text.replace(' ', '+')}`;
    if (font) url += `&font=${font}`;

    axios.get(url).then(r => resolve(r.data));

  })
}

function getFonts() {
  return new Promise((resolve) => {
    axios.get('https://artii.herokuapp.com/fonts_list').then(r => resolve(r.data));
  })
}