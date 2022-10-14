function onError (req, res, error) {
    console.log(error)
    res.writeHead(500)
    res.end("server side error")
}

module.exports = onError