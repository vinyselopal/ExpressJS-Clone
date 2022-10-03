const http = require('http')
const fs = require('fs')
const path = require('path')
const {PORT} = require('./config.js')

const server = http.createServer((req, res) => {
    fs.readFile(path.resolve(__dirname, 'index.html'), (err, data) => {
        res.setHeader('Content-Type', 'text/html')
        if (err) {
            res.writeHead(500)
            console.log(err)
            return res.end('Some error occured')
        }
        res.writeHead(200)
        return res.end(data)
    })
})
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))