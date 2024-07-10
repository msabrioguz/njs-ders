const readline = require("readline");
const process = require("process");
const ac = require("ansi-colors");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question(ac.red("Sayı 1 giriniz: "), (num1) => {
    rl.question(ac.green("Sayı 2 giriniz: "), (num2) => {
        const result = parseInt(num1) + parseInt(num2);
        console.log(ac.yellow.bold("Sayıların toplamı:"), ac.blue.bold(result));
        rl.close();
    });
})