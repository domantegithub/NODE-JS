const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 8080;
const cars = ["BMW", "Audi", "Porshe"];

app.use(cors());
app.use(express.json());
//nurodome kelia "/" - base path
//req - request nurodo, tai, ka kviesime is vatotojo puses
//res - response nurodo, ka grazins is serverio
app.get("/", (req, res) => {
    res.send(cars);
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("OK")
})

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))