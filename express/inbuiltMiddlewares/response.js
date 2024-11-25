const onError = require("./onError.js");

function response(req, res, next) {
  // rewrite send
  res.send = function (body) {
    console.log("send", body);
    try {
      const stringifiedRes = JSON.parse(body);
      res.writeHead(200, "OK", {
        "Content-Length": body.length,
        "Content-Type": "application/json",
      });
      res.end(body);
    } catch (error) {
      console.log("error", error);
      onError(req, res);
    }
  };

  res.json = function (body) {
    console.log("in json response func");
    try {
      const str = JSON.stringify(body);
      res.writeHead(200, "OK", {
        "Content-Length": new Blob([str]).size,
        "Content-Type": "application/json",
      }); // use Accept-Encoding to encode response body
      res.write(str)
      const onError = require("./onError.js");
    } catch (error) {
      onError(req, res, error);
    }
  };
  next();
}

module.exports = response;
