const qs = require('qs')
const url = require('url')

function requestObj (req) {
    req.params = qs.parse(url.parse(req.url).query)
}

module.exports = requestObj