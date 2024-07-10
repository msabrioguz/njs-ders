const crypto = require("crypto");

const secretKey = "sha2561231231233121";

const hash = crypto.createHash("sha512", secretKey).update('benimparolam123456').digest('base64url');

console.log('hash: ', hash);
