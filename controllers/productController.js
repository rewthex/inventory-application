import productModel from "../models/productModel.js";

const showAllProducts = async (req, res) => {
  const categories = await productModel.getAllCategories();
  const products = await productModel.getAllProducts();

  return res.render("index", { categories, products, itemDetailView: false });
};

const showProductsByCategoryId = async (req, res) => {
  const categoryId = req.params.id;
  const categories = await productModel.getAllCategories();
  const products = await productModel.getProdcutsByCategoryId(categoryId);

  return res.render("index", { categories, products, itemDetailView: false });
};

const showProductById = async (req, res) => {
  const productId = req.params.id;
  const categories = await productModel.getAllCategories();
  const product = await productModel.getProductByProductId(productId);

  return res.render("index", { categories, product, itemDetailView: true });
};

const showProductsByQuery = async (req, res) => {
  const query = req.query.query;
  const categories = await productModel.getAllCategories();
  const products = await productModel.getProductsByQuery(query);

  return res.render("index", { categories, products, itemDetailView: false });
};

const updateProductQuantity = async (req, res) => {
  const { quantity, password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res
      .status(403)
      .send("Nice try, hacker, but you don't have permission to do that.");
  }

  const productId = req.params.id;
  await productModel.updateProductQuantityById(productId, quantity);

  return res.redirect("/");
};

export default {
  showAllProducts,
  showProductsByCategoryId,
  showProductById,
  showProductsByQuery,
  updateProductQuantity,
};
