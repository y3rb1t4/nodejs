const Product = require("../models/Product");

const single = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await find(id);
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

// gte, lte ,eq (operadores relacionales )
const approvePurchaseProducts = async (products) => {
  const productsArray = products.map(({ id, price, quantity }) =>
    Product.find({
      _id: id,
      price: price,
      stock: { $gte: quantity },
      enable: true,
    })
  );
  // [Promise <Pending>, Promise <Pending>]
  const approvePurchaseResult = await Promise.all(productsArray);
  // Si aprovePurchaseResult tiene algo -> que la promise se resolvio
  if (approvePurchaseResult.length) return true;
  return false;
};

const updateStock = async (products) => {
  try {
    const result = products.map(({ id, quantity }) => {
      Product.findByIdAndUpdate(
        { id },
        {
          $inc: { stock: -quantity },
        }
      );
    });
    const [updateStock] = await Promise.all(result);
    throw new Error("Ocurrio un error al bajar el stock");
  } catch (e) {
    console.error(e);
  }
};

const all = async (_, res) => {
  try {
    // find() -> all
    // findById()
    const data = await find();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

const find = async (_id = null) => {
  try {
    if (_id) return await Product.findById(_id);
    return await Product.find();
  } catch (e) {
    throw e;
  }
};

module.exports = { all, single, updateStock, approvePurchaseProducts };
