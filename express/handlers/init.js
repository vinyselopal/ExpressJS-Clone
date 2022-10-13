const response = require('../pipeline/response.js')
const request = require('../pipeline/request.js')

function init (use) {
    use(request)
    use(response)
}

module.exports = init