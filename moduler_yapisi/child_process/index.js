const { spawn, exec } = require("child_process");

const myEcho = spawn("cmd.exe", ["/c", "echo Merhaba Dünya"]);

myEcho.stdout.on("data", (data) => {
  console.log("data: ", data.toString());
});

const otherJS = exec("node other.js");

otherJS.stdout.on("data", (data) => {
  console.log("otherJS: ", data.toString());
});

const desktop = exec('cd c:\\Users\\mustafa.oguz\\Desktop && dir');
desktop.stdout.on("data", (data) => {
    console.log("desktop: ", data.toString());
})

