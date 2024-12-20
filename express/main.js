const http = require("../../HTTP-Server/http/http.js");
const routes = require("./routes");
const middlewares = require("./handlers/middlewares.js");
const static = require("./inbuiltMiddlewares/static.js");
const bodyParser = require("./inbuiltMiddlewares/bodyParser.js");
const json = require("./inbuiltMiddlewares/json.js");
const init = require("./handlers/init.js");

function express() {
  const routeSeq = { GET: [], POST: [], PUT: [], DELETE: [] };

  init(routes(routeSeq).use);

  const server = http.createServer((req, res) => {
    middlewares(req, res, routeSeq);
  });

  const listen = function (port) {
    server.listen(port, () => console.log(`Server running on port ${port}`));
  };

  return {
    listen,
    get: routes(routeSeq).getRoute,
    put: routes(routeSeq).putRoute,
    post: routes(routeSeq).postRoute,
    delete: routes(routeSeq).deleteRoute,
    use: routes(routeSeq).use,
    static,
    routeSeq,
    bodyParser,
    json,
  };
}

module.exports = express;
