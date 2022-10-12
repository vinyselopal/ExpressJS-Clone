const qs = require('qs')
const url = require('url')

function request (req, res, next) {
    req.params = qs.parse(url.parse(req.url).query)
}

module.exports = request