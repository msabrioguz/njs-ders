const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(req.url.split("/")[1], (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write("File not found!");
        } else {
            res.write(data);
        }
        res.end();
    })
});

server.listen(3000);