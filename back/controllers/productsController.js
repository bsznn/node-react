import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Impossible de récupérer les produits",
    });
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Une erreur est survenue lors de la récupération du produit",
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, color } = req.body;

    if (
      name.trim() === "" ||
      category.trim() === "" ||
      quantity <= 0 ||
      price <= 0 ||
      color.trim() === ""
    ) {
      return res
        .status(401)
        .json({ message: "Veuillez remplir tous les champs" });
    }

    let product;

    if (!req.file) {
      product = new Product({
        name: name,
        category: category,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        color: color,
      });
    } else {
      product = new Product({
        name: name,
        category: category,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        color: color,
        image: {
          src: req.file.filename,
          alt: req.file.originalname,
        },
      });
    }

    await product.save();

    res.status(200).json({ message: "Produit bien ajouté" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Impossible d'ajouter un produit" });
  }
};
