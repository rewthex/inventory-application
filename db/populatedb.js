import pkg from "pg";
const { Client } = pkg;

import { configDotenv } from "dotenv";

configDotenv();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    stock_quantity INTEGER NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id)
);
`

const SQL2 =  `
INSERT INTO categories (name) VALUES
('Hives'),
('Frames'),
('Protective Gear'),
('Tools'),
('Feeders'),
('Medication'),
('Books & Guides');
`

const SQL3 = `
INSERT INTO products (name, description, price, stock_quantity, category_id) VALUES

('Langstroth Hive Kit', 'Complete hive kit including brood boxes, frames, and foundation.', 129.99, 15, 1),
('Top Bar Hive', 'Horizontal hive for natural beekeeping practices.', 149.99, 10, 1),
('Flow Hive Classic', 'Innovative hive with built-in honey harvesting system.', 279.00, 5, 1),
('Deep Frame with Wax Foundation', 'Standard deep wooden frame with beeswax foundation.', 3.99, 150, 2),
('Medium Plastic Frame', 'Durable plastic bee frame for medium supers.', 2.49, 200, 2),
('Beekeeper Suit with Veil', 'Full-body cotton suit with detachable veil.', 89.99, 25, 3),
('Ventilated Beekeeping Jacket', 'Mesh jacket for hot climates with veil.', 59.99, 30, 3),
('Goatskin Beekeeping Gloves', 'Protective gloves with long canvas cuffs.', 19.99, 40, 3),
('Hive Tool', 'Flat pry tool for opening hive boxes and scraping propolis.', 9.99, 50, 4),
('Bee Brush', 'Soft bristled brush for gently removing bees from frames.', 6.49, 60, 4),
('Smoker', 'Stainless steel smoker with heat shield and leather bellows.', 34.95, 20, 4),
('Boardman Entrance Feeder', 'Easy-to-use feeder fits in hive entrance.', 5.99, 40, 5),
('Top Feeder', 'Fits over inner cover and holds large amounts of syrup.', 12.99, 25, 5),
('Oxalic Acid Vaporizer', 'Used to treat varroa mites in hives.', 49.99, 12, 6),
('Api-Bioxal Treatment', 'Organic treatment for varroa mites.', 29.95, 18, 6),
('Beekeeping for Beginners', 'Introductory guide to backyard beekeeping.', 14.99, 100, 7),
('Advanced Beekeeping Techniques', 'Deep dive into hive management and queen rearing.', 22.99, 75, 7),
('Observation Hive', 'Glass-sided hive for educational or indoor observation.', 199.00, 4, 1),
('Nuc Box', '5-frame nucleus hive box for splitting colonies.', 39.95, 20, 1),
('Bee Cozy Winter Wrap', 'Insulating wrap for 2-story hives during winter.', 29.95, 30, 1),
('Shallow Frame with Plastic Foundation', 'Shallow frame ideal for honey supers.', 2.99, 120, 2),
('Foundationless Frame Kit', 'Allows bees to draw their own comb naturally.', 3.49, 75, 2),
('Round Veil Hat Combo', 'Lightweight veil with built-in helmet.', 24.99, 40, 3),
('Children’s Bee Suit', 'Protective suit made for junior beekeepers.', 69.99, 15, 3),
('Frame Grip', 'Helps lift frames from the hive with ease.', 11.95, 35, 4),
('Queen Catcher Clip', 'Plastic clip for safely capturing the queen bee.', 4.49, 50, 4),
('Uncapping Knife (Heated)', 'Electric knife for uncapping honey frames.', 59.99, 8, 4),
('Frame Spacer', 'Metal rack to evenly space frames in a super.', 14.95, 18, 4),
('Pollen Patties (5-pack)', 'Protein supplement for bees during spring.', 9.99, 45, 5),
('Sugar Syrup Mix (1 Gal)', 'Ready-to-use syrup for feeding colonies.', 6.99, 35, 5),
('Internal Hive Feeder', 'Sits in place of a frame inside the brood box.', 8.99, 22, 5),
('Formic Pro Strips', 'Formic acid-based varroa treatment.', 22.95, 15, 6),
('Thymol Gel Pack', 'Natural treatment for varroa mites and tracheal mites.', 18.50, 10, 6),
('Fumagilin-B', 'Antibiotic used to prevent Nosema disease.', 32.00, 7, 6),
('The Backyard Beekeeper', 'Comprehensive guide with photos and step-by-step instructions.', 17.95, 60, 7),
('Natural Beekeeping', 'Focuses on treatment-free and organic beekeeping methods.', 19.99, 45, 7),
('Queen Rearing Essentials', 'How to raise your own queen bees.', 21.50, 30, 7);

`

async function main() {
  try {
    console.log("Creating tables...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    })
    await client.connect();
    await client.query(SQL);
    console.log("Tables created successfully.");
    console.log("Populating categories...");
    await client.query(SQL2);
    console.log("Categories populated successfully.");
    console.log("Populating products...");
    await client.query(SQL3);
    console.log("Products populated successfully.");
    console.log("Database populated successfully.");
    await client.end();
  } catch (error) {
    console.error("Error populating database:", error);
    process.exit(1);
  }
}

main();