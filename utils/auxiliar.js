module.exports = {
    capitalize(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
}