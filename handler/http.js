const net = require('net')

function createServer(callback) {
    return net.createServer(callback)
}

module.exports = {
    createServer,

}