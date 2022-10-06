const express = require('./lib/express.js')
const {PORT} = require('./config.js')

const app = express()
app.get('/a', (req, res) => {
    // const { id } = req.params
    const body = {
        "response": "successful"
    }
    res.json(body)
})

app.get('/a/b', (req, res) => {
    // const { id } = req.params
    const body = 'successful response'
    res.send(body)
})

app.get('/', (req, res) => {
    // const { id } = req.params
    const body = 'successful response'
    res.send(body)
})

app.get('///', (req, res) => {
    // const { id } = req.params
    const body = 'successful response'
    res.send(body)
})

app.listen(PORT)