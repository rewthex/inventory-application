import { Router } from "express";
import db from "../db/queries.js";

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const categories = await db.getAllCategories();
  const products = await db.getAllProducts();
  
  return res.render("index", { categories, products, itemDetailView: false });
});

indexRouter.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  const categories = await db.getAllCategories();
  const product = await db.getProductByProductId(productId);

  return res.render("index", { categories, product, itemDetailView: true });
})

indexRouter.get("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const categories = await db.getAllCategories();
  const products = await db.getProdcutsByCategoryId(categoryId);

  return res.render("index", { categories, products, itemDetailView: false });
})

export default indexRouter;