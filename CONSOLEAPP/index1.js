const readline = require("readline");
const fs = require("fs");
const ac = require("ansi-colors");

const fileName = process.argv[2];

const colors = ["red", "blue", "yellow", "green", "magenta", "cyan", "white"];

const readFilelineByLine = async () => {
  const fileStream = fs.createReadStream(fileName);

  const rl = readline.createInterface({
    input: fileStream,
  });

  for await (const line of rl) {
    const rNumber = Math.floor(Math.random() * colors.length);
    const rColor = colors[rNumber];
    console.log(ac[rColor](line), ac.red(ac.symbols.heart), ac.green(ac.symbols.check));
  }
};

readFilelineByLine();
