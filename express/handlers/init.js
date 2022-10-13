const response = require('../pipeline/response.js')
const request = require('../pipeline/request.js')

function init (use) {
    use(response)
    use(request)
}

module.exports = init