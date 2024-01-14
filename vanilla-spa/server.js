const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    const filePath =
      req.url === "/" ? "vanilla-spa/index.html" : "vanilla-spa" + req.url;

    fs.readFile(filePath, function (err, data) {
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
