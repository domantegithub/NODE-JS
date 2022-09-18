const express = require('express');
const cors = require('cors');
const mysql = require("mysql2/promise");

const {port} = require('./config');

const products = require("./routes/products");
const highest = require("./routes/highest");
const price = require("./routes/price")

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", products);
app.use("/highest", highest);
app.use("/price", price);


app.all('*', (req, res) => {
    res.status(404).send({ error: 'Page not found' });
  });
  
  
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));