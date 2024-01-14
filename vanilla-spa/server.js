const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer(function (req, res) {
    const extention = path.extname(req.url);
    const filePath = extention === "" ? "/index.html" : req.url;

    fs.readFile("vanilla-spa" + filePath, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.write("not found");
      } else {
        res.write(data);
      }

      res.end();
    });
  })
  .listen(8080);
