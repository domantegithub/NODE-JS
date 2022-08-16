const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const URI = process.env.CONNECTION;
const client = new MongoClient(URI);

app.get("/Users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("10paskaita")
      .collection("Users")
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/Users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("10paskaita")
      .collection("Users")
      .insertOne(req.body);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("10paskaita")
      .collection("comments")
      .aggregate([
        { $match : {} },
        { $group : {_id: "$name", comment: "$comment" }},
    ])
    .toArray();
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/Users/:email", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("10paskaita")
      .collection("Users")
      .deleteOne({ email: req.params.email });
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/Users/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("10paskaita")
      .collection("Users")
      .deleteOne({ _id: ObjectId(req.params.id) });
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete("/comments/:comment", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("10paskaita")
      .collection("comments")
      .deleteOne({ comment: req.params.comment });
    await con.close();
    return res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
