module.exports = () => {
    return {
        type: 'sendMessage',
        message: '```\nThis is the way\n```',
        options: {
            parse_mode: 'MarkdownV2'
        }
    }
}