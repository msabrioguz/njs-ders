const CustomModule = require("./mymodule");

console.log(CustomModule.myname);
console.log(CustomModule.getData());
CustomModule.myModule.logToConsole("merhaba");
console.log(CustomModule.myModule.add(5, 7));