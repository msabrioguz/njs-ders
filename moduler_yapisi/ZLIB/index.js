const zblib = require("zlib");
const fs = require("fs");

const input = fs.createReadStream("10mb.txt");
console.log("input: ", input);

const output = fs.createWriteStream("10mb.txt.gz");

const gzip = zblib.createGzip();

input.pipe(gzip).pipe(output);