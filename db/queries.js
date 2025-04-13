import { pool } from "./pool.js";

const getAllCategories = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");
    return rows;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default { getAllCategories };
