module.exports = (message) => {
  if (message.text.toLowerCase() === 'this is the way')
    return {
      type: 'sendMessage',
      message: Math.random() < 0.2 ? '```\nThis is not the way, go back!\n```' : '```\nThis is the way\n```',
      options: {
        parse_mode: 'MarkdownV2'
      }
    }
}