const ansiColors = require("ansi-colors");
const moment = require("moment");

moment.locale("tr");

console.log(ansiColors.red("merhaba"));
console.log(ansiColors.green("deneme"));
console.log(ansiColors.blue("Test yazısı."));
console.log(ansiColors.yellow("Test yazısı."));
console.log(ansiColors.cyan("Test yazısı."));

console.log(ansiColors.red.underline("merhaba"));
console.log(ansiColors.green.bold.underline("merhaba"));

console.log(ansiColors.red.bold("Bilgi İşlem"), ansiColors.green.italic("Yazılım"), ansiColors.bgWhite.black.bold("Donanım"));
console.log(ansiColors.red.bold("Bugünün Tarihi:"), ansiColors.blue.bold(moment().format("DD.MM.YYYY")));
console.log(ansiColors.red.bold("Bugünün Tarihi:"), ansiColors.yellow.bold(moment().format('llll')));
