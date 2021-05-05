const { Schema, model } = require("mongoose");
// ts_create, ts_update , idCreate
const ProductSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    default: "new",
  },
  description: {
    type: String,
    required: true,
  },
  enable: {
    type: Boolean,
    default: true,
  },
  available_quantity: {
    type: Number,
    required: true,
  },
  modificateBy: {
    type: String,
    required: true,
  },
});

module.exports = model("products", ProductSchema);
