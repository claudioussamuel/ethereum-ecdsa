const secp = require("ethereum-cryptography/secp256k1-compat");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.createPrivateKeySync();
const publicKey = secp.publicKeyCreate(privateKey);
 
console.log("private key : ", toHex(privateKey));
console.log("public key  : ", toHex(publicKey));
