const fs = require('fs')

function static (pathToServe) {
    // content-range?
    const handler = (req, res, next) => {
        const parentDir = __dirname.split('/').slice(0, -2).join('/')
        const absPath = parentDir + pathToServe
        fs.stat(absPath, (err, stats) => {
            if (err) {
                console.log(err)
            }
            else {
                const streamData = fs.createReadStream(absPath)
                streamData.on('open', function () {
                    res.writeHead(200, {'Content-Length': stats.size})
                    streamData.pipe(res)
                    
                })
                streamData.on('error', function (err) {
                    console.log(err)
                    next()
                })
                streamData.on('close', function () {
                    res.end()
                    return
                }) // any succinct way to write?
    
            }
        })

        
    }
    const ref = {path: pathToServe, handler, next: null}
    return ref
}

module.exports = static