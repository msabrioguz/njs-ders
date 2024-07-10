const qrcode = require("qrcode-terminal");
const readline = require("readline");
const process = require("process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter your name: ", (name) => {
    qrcode.generate(name, {small: true});
    rl.close();
})