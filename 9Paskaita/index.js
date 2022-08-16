const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const URI = process.env.CONNECTION;
const client = new MongoClient(URI);

const orders = [
  { product: "toothbrush", total: 4.75, customer: "Mike" },
  { product: "guitar", total: 199.99, customer: "Tom" },
  { product: "milk", total: 11.33, customer: "Mike" },
  { product: "pizza", total: 8.5, customer: "Karen" },
  { product: "toothbrush", total: 4.75, customer: "Karen" },
  { product: "pizza", total: 4.75, customer: "Dave" },
  { product: "toothbrush", total: 4.75, customer: "Mike" },
];

//jungiame kelias kolekcijas i viena
app.get("/fullOrders", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .aggregate([
        {
          $lookup: {
            from: "customers", // kolekcija iš kurios nori imti
            localField: "customer", //  .collection("orders") property
            foreignField: "name", // from: "customers" property
            as: "orderdetails", // kaip norim pavadinti savo sujungima
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

//skaiciuojame kiek kiekvienas isleido pinigu
app.get("/spent", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .aggregate([
        { $match: {} },
        { $group: { _id: "$product", total: { $sum: "$total" } } },
        { $sort: { total: -1 } },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// sitas API isfiltruoja visus masyve esancius duomenis
app.get("/orders", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get("/many", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .insertMany(orders);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

//reikia atvzaiduoti kiek turime sito konkretaus produkto duomenu bazeje
app.get("/count/:product", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .countDocuments({ product: req.params.product });
    await con.close();
    res.send({ count: data });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
