const timers = require("timers");

const tarih = new Date();

timers.setTimeout(() => {
  console.log("1 saniye sonra");
}, 1000);

timers.setInterval(() => {
  console.log("5 saniye ara");
  console.log(Date.now());
  console.log(tarih.toLocaleDateString(), tarih.toLocaleTimeString());
}, 5000);

timers.setImmediate(() => {
  console.log("Anlık olarak çalış...");
});