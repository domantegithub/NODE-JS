const express = require("express");
const mysql = require("mysql2/promise");

const { dbconfig } = require("../config");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute("SELECT * FROM products");
    await con.end();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: "error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `SELECT * FROM products WHERE id=${req.params.id}`
    );
    await con.end();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: "error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(
      `INSERT INTO products (title, description, price, discountPercentage, rating, stock, brand, category, thumbnail) values (${con.escape(
        product.title
      )}, ${con.escape(product.description)}, ${con.escape(product.price)}, ${con.escape(product.discountPercentage)}, ${con.escape(product.rating)}, ${con.escape(product.stock)}, ${con.escape(product.brand)}, ${con.escape(product.category)}, ${con.escape(product.thumbnail)} )`
    );
    await con.end();
    res.send(response);
  } catch (error) {
    res.status(400).send({ error: "error" });
  }
});

module.exports = router;
