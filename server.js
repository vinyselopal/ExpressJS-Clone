const express = require('./express/main.js')
const { PORT } = require('./config.js')
const app = express()

app.use(app.static('/public/index.html'))

app.get('/', (req, res, next) => {
    // const { id } = req.params
    const body = 'successful first response'
    next()
})

app.use('/', (req, res, next) => {
    const body = 'another successful response'
    res.send(body)

    next()
})

app.use('/', (req, res) => {
    const body = 'third'
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