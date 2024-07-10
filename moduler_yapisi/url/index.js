const url = require("url");

const myURL = new URL("https://www.google.com.tr/?searchQ=merhaba");

console.log("href: ", myURL.href);
console.log("host: ", myURL.host);
console.log("protocol: ", myURL.protocol);
console.log("hostname: ", myURL.hostname);
console.log("port: ", myURL.port);
console.log("pathname: ", myURL.pathname);
console.log("search: ", myURL.search);
console.log("searchParams: ", myURL.searchParams);
console.log("hash: ", myURL.hash);
console.log("origin: ", myURL.origin);
console.log("toString: ", myURL.toString());
console.log(myURL.searchParams.get("searchQ"));
console.log(myURL.searchParams.has("searchQ"));