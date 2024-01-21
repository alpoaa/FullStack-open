const info = (...params) => {
    if (process.env.NODE_DEV !== 'test') {
        console.log(...params)
    }
}

const error = (...params) => {
    if (process.env.NODE_DEV !== 'test') {
        console.error(...params)
    }
}

module.exports = {
    info, error
}