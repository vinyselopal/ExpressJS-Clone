const response = require('../inbuiltMiddlewares/response.js')
const request = require('../inbuiltMiddlewares/request.js')

function init (use) {
	use(request)
	use(response)
}

module.exports = init