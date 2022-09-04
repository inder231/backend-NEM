const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const host = "localhost";
const port = 8080;
const routes = require("./routes");
const server = http.createServer((req, res) => {
  routes.getView(req.url, function (html) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();
  });
});
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
