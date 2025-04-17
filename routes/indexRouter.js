import { Router } from "express";
import productController from "../controllers/productController.js";

const indexRouter = Router();

indexRouter.get("/", productController.showAllProducts);
indexRouter.get("/search", productController.showProductsByQuery);
indexRouter.get("/products/:id", productController.showProductById);
indexRouter.post("/products/:id", productController.updateProductQuantity);
indexRouter.get("/categories/:id", productController.showProductsByCategoryId);

export default indexRouter;
