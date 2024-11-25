function json() {
  return (req, res, next) => {
    let body = Buffer.from("");
    req.on("data", (buf) => {
      console.log("in JSON", buf);
      body = Buffer.concat([body, buf]);
    });
    req.on("end", () => {
      console.log("in end", body.toString());
      const charEncoding =
        typeof req.headers["Content-Type"] === "string" ||
        !req.headers["Content-Type"]
          ? "utf-8"
          : req.headers["Content-Type"][1]; // hack, handle in headersParser
      req.body = JSON.parse(body.toString(charEncoding));
      next();
    });
  };
}

module.exports = json;
