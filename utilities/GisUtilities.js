module.exports = {
    pointStrToCoords: (str) => {
        if (!str)
            return []
        str = str.substring(5)
        str = str.replace('(', '')
        str = str.replace(')', '')
        return str.split(' ')
    }
}