import { Router } from "express";
import db from "../db/queries.js";

const indexRouter = Router();

indexRouter.get("/", async (req, res) => {
  const categories = await db.getAllCategories();
  return res.render("index", { categories });
});


export default indexRouter;