import { pool } from "./db.js";

const getAllProducts = async () => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        products.id,
        products.name,
        products.price,
        products.stock_quantity,
        categories.name AS category_name
      FROM
        products
      INNER JOIN
        categories ON products.category_id = categories.id
      ORDER BY
        products.id`
    );
    return rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

const getAllCategories = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");
    return rows;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

const getProdcutsByCategoryId = async (categoryId) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        products.id,
        products.name,
        products.price,
        products.stock_quantity,
        categories.name AS category_name
      FROM
        products
      INNER JOIN
        categories ON products.category_id = categories.id
      WHERE
        categories.id = $1`,
      [categoryId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching products by category ID:", error);
    throw error;
  }
};

const getProductByProductId = async (productId) => {
  try {
    const { rows } = await pool.query(
      `
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.stock_quantity,
        categories.name AS category_name
      FROM
        products
      INNER JOIN
        categories ON products.category_id = categories.id
      WHERE
        products.id = $1`,
      [productId]
    );
    return rows[0];
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

const updateProductQuantityById = async (productId, quantity) => {
  try {
    const { rows } = await pool.query(
      `
      UPDATE
        products
      SET
        stock_quantity = $1
      WHERE
        id = $2
      RETURNING *`,
      [quantity, productId]
    );
    return rows[0];
  } catch (error) {
    console.error("Error updating product quantity:", error);
    throw error;
  }
};

export default {
  getAllProducts,
  getAllCategories,
  getProdcutsByCategoryId,
  getProductByProductId,
  updateProductQuantityById,
};