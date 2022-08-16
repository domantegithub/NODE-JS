const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const URI = `mongodb+srv://Domante:${process.env.PASSWORD}@cluster0.3huwoea.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(URI);

//GET ROUTE pasirašom
app.get("/", async (req, res) => {
  try {
    const con = await client.connect(); //atidarome prisijungima prie DB
    const data = await con.db("demo1").collection("cars").find().toArray(); //nurodome kokia DB imsime ir kokius duomenis
    await con.close(); //uzdarome prisijungima prie DB
    return res.send(data);
  } catch (error) {
   res.status(500).send({ error });
}
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.post("/", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con
      .db("demo1")
      .collection("cars")
      .insertOne({ brand: "Porshe", model: "Panamera" });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});
