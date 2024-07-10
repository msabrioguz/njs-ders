const readline = require("readline");
const process = require("process");

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// rl.question("Enter your name: ", (name) => {
//     console.log(`Hello ${name}`);
//     rl.close();
// })

const rl2 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "-->",
});

rl2.prompt();
rl2.on("line", (data) => {
  switch (data.trim()) {
    case "selam":
      console.log("Nasılsın?");
      break;
    case "merhaba":
      console.log("Pardon?");
      break;
    default:
      console.log("Ne");
      break;
  }
  rl2.prompt();
}).on('close', () => {
  console.log('Cıkıldı');
  process.exit(0);
});
