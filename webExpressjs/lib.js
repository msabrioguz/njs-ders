const os = require("os");
var ifaces = os.networkInterfaces();

var ip = '0.0.0.0';
var ips = os.networkInterfaces();

function getLocalIp(){
    Object
  .keys(ips)
  .forEach(function(_interface) {
     ips[_interface]
      .forEach(function(_dev) {
        if (_dev.family === 'IPv4' && !_dev.internal) ip = _dev.address 
      }) 
  });

  return ip;
}



exports.module = { getLocalIp };