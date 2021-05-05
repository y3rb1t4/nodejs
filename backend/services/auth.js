const jwt = require("jsonwebtoken");
const fs = require("fs"); // file system
const privateKey = fs.readFileSync("./keys/private.pem");
const publicKey = fs.readFileSync("./keys/public.pem");
const signOptions = { expiresIn: "8h", algorithm: "RS256" };

// firma -> base64(header) + base64(payload) + claveprivada + algoritmo
// createToken -> payload, privateKey, signOptions (algoritmo, tiempo de expiracion)
const createToken = (payload) => jwt.sign(payload, privateKey, signOptions);
const decodeToken = (token) => {
  const [, JWT] = token.split(" ");
  const validToken = jwt.verify(JWT, publicKey);
  console.log(JWT);
  return validToken;
};
module.exports = { createToken, decodeToken };
