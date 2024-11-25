function bodyParser() {
  return (req, res, next) => {
    let body = Buffer.from("");
    req.on("data", (buf) => {
      console.log("buf", buf);
      Buffer.concat([body, buf]);
    });
    req.on("end", () => {
      const charEncoding =
        typeof req.headers["Content-Type"] === "string" ||
        !req.headers["Content-Type"]
          ? "utf-8"
          : req.headers["Content-Type"][1]; // hack, handle in headersParser
      if (!req.body) req.body = "";
      req.body += body.toString(charEncoding);
    });
    next();
  };
}

module.exports = bodyParser;
