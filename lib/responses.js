function responses (res) {
    res.send = function (body) {
        // send the response using http response object methods
        try {
            res.writeHead(200)
            res.end(body)
        }
        catch (error) {
            console.log(error)
            res.writeHead(500)
            res.end("server side error")
        }
    }

    res.json = function (body) {
        try {
            console.log('body', body)
            const str = JSON.stringify(body)
            res.writeHead(200)
            res.end(str)
        }
        catch (error) {
            console.log(error)
            res.writeHead(500)
            res.end("server side error")
        }
    }
}

module.exports = responses