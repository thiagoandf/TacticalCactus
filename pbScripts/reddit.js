const Feed = require('rss-to-json');

module.exports = async (bot, message) => {
  const sub = message.text.split("/")[1];
  if (!sub) {
    await bot.sendMessage(message.chat.id, 'Do you think I\'m that stupid?');
    return;
  }

  console.log('sub', sub)

  Feed.load(`https://reddit.com/r/${sub}.rss`).then(res => {
    const post = Math.floor(Math.random() * res.items.length) + 1
    console.log('res', res.items[post])
    const links =
      res.items[post].content.match(/(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?\.(jpg|png|gif)/gi);
    console.log('links', links)
    let image = links.find(val =>
      val.includes('i.redd.it') ||
      val.includes('giphy.com') ||
      val.includes('gfycat.com') ||
      val.includes('redgifs.com') ||
      val.includes('imgur.com'));

    console.log('image', image)
    if (!image) {
      bot.sendMessage(message.chat.id, 'No image found');
      return;
    }
    if (image.includes('.gif')) bot.sendDocument(message.chat.id, image, {
      caption: `Random gif from r/${sub}`
    })
    else {
      bot.sendPhoto(message.chat.id, image, {
        caption: `Random image from r/${sub}`
      });
    }
  }).catch(err => console.log('err', err));

}