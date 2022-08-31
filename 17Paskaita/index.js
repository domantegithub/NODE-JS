const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const mysqlConfig = {
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  password: process.env.MY_SQL_PASSWORD,
  database: process.env.MY_SQL_DATABASE,
  port: process.env.MY_SQL_PORT,
};

// Sukuriame NodeJS projektą, kuris GET/POST į "/products" paduos visus produktus/įrašys naują produktą.

app.get("/products", async (req, res) => {
    try {
      const con = await mysql.createConnection(mysqlConfig);
      const response = await con.execute("SELECT * FROM products;")
      res.send(response[0]);
      await con.end();
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/products", async (req, res) => {
    try {
      const product = req.body;
      if (product.title && product.image && product.price) {
        const con = await mysql.createConnection(mysqlConfig);
        const response = await con.execute(
          `INSERT INTO products (title, image, price) values (${con.escape(
            product.title
          )}, ${con.escape(product.image)}, ${con.escape(product.price)})`
        );
        console.log(response);
        res.send(response);
        await con.end();
      } else {
        res.status(400).send("Bad syntax");
      }
    } catch (e) {
      console.log(e);
    }
  });

  //Sukuriame GET route '/products/:id' - šis dinaminis - pagal paduodamą ID grąžins specifinį produktą iš duomenų bazės.
  app.get("/products/:id", async (req, res) => {
    try {
      const con = await mysql.createConnection(mysqlConfig);
    //   const selectAll ="SELECT * FROM products;`";
    //   const selectOne = `SELECT * FROM products WHERE id=${req.params.id}`
      const response = await con.execute(`SELECT * FROM products WHERE id=${req.params.id} ;`)
      res.send(response[0]);
      await con.end();
    } catch (e) {
      console.log(e);
    }
  });

  //5. Sukuriame GET route '/orders/:id' - irgi dinaminis - pagal paduodamą ID grąžins specifinį užsakymą, tik šioje vietoje - paduos užsakymo id, kliento vardą, el paštą bei produkto pavadinimą, nuotrauką ir kainą (čia reikės naudoti SQL JOIN, kad apjungti lenteles grąžinant rezultatą).
  app.get("/orders/:id", async (req, res) => {
    try {
      const con = await mysql.createConnection(mysqlConfig);
      const response = await con.execute(`SELECT orders.id, orders.customer_name, orders.customer_email, products.title, products.image, products.price FROM orders INNER JOIN products ON orders.product_id=${req.params.id};`)
      res.send(response[0]);
      await con.end();
    } catch (e) {
      console.log(e);
    }
  });



app.get("/*", async (req, res) => {
    res.status(400).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });

