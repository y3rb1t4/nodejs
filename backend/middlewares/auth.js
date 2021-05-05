const { decodeToken } = require("../services/auth");

const decodeHeaders = (req, res, next) => {
  const { authorization } = req.headers;
  const { _id, role } = decodeToken(authorization);
  return { _id, role };
};

const securedUser = (req, res, next) => {
  try {
    const { role, _id } = decodeHeaders(req);
    req.id = _id;
    next();
  } catch (e) {
    console.error(e);
    res
      .status(401)
      .json({ message: "Unauthorized", img: "https://http.cat/401" });
  }
};

const securedAdmin = (req, res, next) => {
  try {
    const { role, _id } = decodeHeaders(req);
    if (role !== "admin") throw new Error("No tenes acceso a esa ruta");
    req.id = _id;
    req.role = role;
    next();
  } catch (e) {
    console.error(e);
    res
      .status(401)
      .json({ message: "Unauthorized", img: "https://http.cat/401" });
  }
};

module.exports = { securedUser, securedAdmin };
