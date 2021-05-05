const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();

// string, semilla (rot13)

const hash = (payload) => bcrypt.hashSync(payload, salt); // string - se guarda en la bd
const unhash = (payload, hashedPayload) => {
  console.log(payload, hashedPayload);
  return bcrypt.compareSync(payload, hashedPayload); // true o false
};

module.exports = { hash, unhash };
