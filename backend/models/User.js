const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    shippingAdress: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      default: "user",
    },
    verificationCode: {
      type: String,
      required: true,
    },
    dateExpirationCode: {
      type: Date,
      required: true,
    },
    enable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
//createAt -> Date.now
//updateAt -> Date.now -> uodate -> Date.now

module.exports = model("users", UserSchema);
