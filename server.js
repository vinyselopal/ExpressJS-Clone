const express = require('./express/main.js')
const { PORT } = require('./config.js')
const app = express()

// app.use(app.static('/public/index.html'))

app.use(app.json())

app.get('/', (req, res, next) => {
    console.log("in first")
    // const { id } = req.params
    const body = 'successful first response'
    next()
})

app.use('/', (req, res, next) => {
    const a = req.body.a
    res.json(a)
    // next()
})

app.use('/', (req, res) => {
    console.log("in third")
    const body = 'third'
    res.json(body)
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
    res.json(body)
})



app.get('///', (req, res) => {
    // const { id } = req.params
    const body = 'successful response'
    res.json(body)
})

app.listen(PORT)