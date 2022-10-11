const express = require('./lib/express.js')
const { PORT } = require('./config.js')

const app = express()

// app.use(app.static('public'))

app.get('/', (req, res, next) => {
    // const { id } = req.params
    body = 'successful first response'
    res.send(body)
    next()
})

app.use('/', (req, res, next) => {
    body = JSON.stringify(2)
    res.json()
    next()
})

app.use('/', (req, res) => {
    const body = res.body
    console.log('body', body)
    res.send(body)
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