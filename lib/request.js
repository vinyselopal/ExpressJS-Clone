const qs = require('qs')
const url = require('url')

function request (req) {
    req.params = qs.parse(url.parse(req.url).query)
    console.log(req.params)
}

module.exports = request