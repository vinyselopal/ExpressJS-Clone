const express = require('./lib/express.js')
const {PORT} = require('./config.js')

const app = express()
app.get('/', (req, res) => {
    res.send()
})
app.listen(PORT)