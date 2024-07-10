const process = require("process");
const cp = require("child_process");

process.on("beforeExit", () => {
  console.log("beforeExit");
});

process.on("exit", () => {
  console.log("exit");
});

process.on("SIGINT", () => {
  console.log("SIGINT", "kullanıcı pencereyi kapattı.");
  process.exit();
});

// setInterval(() => {
//     console.log("merhaba");
// }, 1000);

console.log("Selam");

console.log(process.arch);
console.log(process.argv);
console.log(process.platform);
console.log(process.pid);
console.log(process.cpuUsage());
console.log(process.title);
console.log(process.version);
console.log(process.env);

cp.exec("tasklist", (err, stdout, stderr) => {
  console.log("görev listesi");
  console.log("---------------");
  console.log(stdout);
});

process.kill(programid);
