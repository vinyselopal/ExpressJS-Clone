const express = require('./lib/express.js')
const { PORT } = require('./config.js')

const app = express()

app.use(app.static('public'))
app.post('/', (req, res, next) => {
    // const { id } = req.params
    res.body = 'successful post response'
    next()
})

app.use('/', (req, res, next) => {
    res.body = JSON.stringify(res.body)
    console.log('here')
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