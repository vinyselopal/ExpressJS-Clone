const express = require('./lib/express.js')
const {PORT} = require('./config.js')

const app = express()

app.post('/', (req, res) => {
    // const { id } = req.params
    const body = 'successful post response'
    res.send(body)
})

app.use('/', (req, res, next) => {
    res.body = 4
    next()
})

app.use('/', (req, res, next) => {
    res.body = JSON.stringify(res.body) // error: invalid string length, also res.body is a huge string of /
    const body = res.body
    res.send(body)
    next()
})

app.get('/a', (req, res, next) => {
    // const { id } = req.params
    const body = {
        "response": "successful"
    }
    next()
})

app.get('/a', (req, res) => {
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