const all = (req, res) => {
  console.log("Hi products");
  res.json([
    { id: 1, name: "toalla" },
    { id: 2, name: "Sabana" },
  ]);
};

const create = (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "Producto dado de alta" });
};

module.exports = { all, create };
