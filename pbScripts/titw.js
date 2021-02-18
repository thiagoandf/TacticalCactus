module.exports = (message) => {
  if (message.text.toLowerCase() === 'this is the way')
    return {
      type: 'sendMessage',
      message: '```\nThis is the way\n```',
      options: {
        parse_mode: 'MarkdownV2'
      }
    }
}