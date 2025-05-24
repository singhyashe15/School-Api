import pool from "../config/db.js";

const schoolTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS schoolTable(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        address VARCHAR(255) NOT NULL UNIQUE,
        latitude FLOAT NOT NULL UNIQUE,
        longitude FLOAT NOT NULL UNIQUE
      );`
    );
    console.log("Table Created Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default schoolTable;