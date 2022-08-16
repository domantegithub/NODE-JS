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

app.get("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("8paskaita").collection("pets").find().toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("8paskaita")
      .collection("pets")
      .insertOne(req.body);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// //filtravimas pagal pets tipa, pvz dogs
app.get("/pets/:type", async (req, res) => {
    try {
        const con = await client.connect();
        const data = await con.db("8paskaita").collection("pets").find({type:req.params.type}).toArray();
        await con.close();
        return res.send(data);
      } catch (error) {
        res.status(500).send({ error });
      }
});

app.get("/petsoldest", async (req,res) => {
    try {
        const con = await client.connect();
        const data = await con.db("8paskaita").collection("pets").find().sort({age: -1}).toArray();
        await con.close();
        return res.send(data);
      } catch (error) {
        res.status(500).send({ error });
      }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
