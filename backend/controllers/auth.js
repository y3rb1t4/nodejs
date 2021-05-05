const uid = require("node-uuid");
const moment = require("moment");
const User = require("../models/User");
const { hash, unhash } = require("../utils/bcrypt");
const { registerTemplate } = require("../utils/registerTemplate");
const { createToken } = require("../services/auth");
const { sendMail } = require("../services/mailing");

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, { password: 1 });
    console.log(user);
    // Genero el JWT con user._id , user.name , user.lastname
    console.log(user.password);
    const isPasswordValid = unhash(password, user.password);
    console.log(isPasswordValid);

    const JWTObject = {
      _id: user._id, // id ->servidor
      email, // cliente
      role: user.role,
    };

    const JWT = createToken(JWTObject);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Usuario o password incorrectos" });
    }
    res.json({ message: "Bienvenid@", JWT });
    console.log(user);
    res.end();
  } catch (e) {
    console.error(e);
    // verificar si el user no existe -> retornar un 401
    res.sendStatus(500);
  }
};

const validateAuth = async (req, res) => {
  try {
    const { verificationCode } = req.params;
    await User.findOneAndUpdate({ verificationCode }, { enable: true });
    res.redirect(`${process.env.DEV_FRONTEND_URL}/login`);
  } catch (e) {
    res.redirect(
      `${process.env.DEV_FRONTEND_URL} /login?error=INVALID_VALIDATION_EMAIL`
    );
  }
};

const create = async (req, res) => {
  try {
    //{ email , password , name , lastname}
    const { email, password, name, lastname } = req.body;
    //comprobar que el mail no este en uso
    //user.findOne({email: 'frobriel@gmail.com'})
    // SELECT * FROM user
    let user = await User.findOne({ email }); // user = { name , lastname , password}
    if (user) return res.status(400).json({ message: "El mail esta en uso" });
    // BCRYPT (password)
    user = new User(req.body);
    user.password = hash(password);
    const verificationCode = uid();
    user.verificationCode = verificationCode; // '6c418cd4-93e0-49c4-8b1f-f6d1b6dc33ec'
    user.dateExpirationCode = moment(new Date()).add(2, "hours");
    await user.save();
    // sendMail -> hola gabo ro, gracias por registrarte. Para activar hace click
    // magic link
    sendMail({
      to: email,
      subject: "Gracias por registrarte en mi aplicacion hermosa ",
      html: registerTemplate({ name, lastname, verificationCode }),
    });
    res.sendStatus(201);
    console.log(user);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

//auth

module.exports = { create, auth, validateAuth };
