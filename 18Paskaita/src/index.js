const express = require("express");
const mysql = require("mysql2/promise");

const { port, dbconfig } = require("./config");
const { pets, medications, prescriptions, logs } = require("./routes/v1");

const app = express();
app.use(express.json());

app.use("/v1/pets/", pets);
app.use("/v1/medications/", medications);
app.use("/v1/prescriptions/", prescriptions);
app.use("/v1/logs/", logs);

app.get("/", async (req, res) => {
  try {
    const con = await mysql.createConnection(dbconfig);
    res.send("Success");
    await con.end();
  } catch (e) {
    console.log(e);
  }
});


app.get("*", (req, res) => {
  res.status(404).send("Page not found:(");
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });