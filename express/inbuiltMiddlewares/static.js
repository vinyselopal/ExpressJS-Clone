const fs = require("fs");

function static(pathToServe) {
  // content-range?
  console.log("inside static");
  const handler = (req, res, next) => {
        const parentDir = __dirname.split('/').slice(0, -2).join('/')
        const absPath = parentDir + pathToServe
    fs.stat(absPath, (err, stats) => {
      if (err) {
        console.log("fs.stat err: file doesnt exist", err);
      } else {
        const streamData = fs.createReadStream(absPath);
        streamData.on("open", function () {
          res.writeHead(200, "OK", { "Content-Length": stats.size });
          console.log("before pipe");
          streamData.pipe(res);
        });
        streamData.on("error", function (err) {
          console.log("error while streaming", err);
          next();
        });
      }
    });
  };
  const ref = { path: pathToServe, handler, next: null };
  return ref;
}

module.exports = static;
