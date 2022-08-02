const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 8080;
const cars = ["BMW", "Audi", "Porshe"];

app.use(cors()); //apsauga
app.use(express.json()); //paverciame i js formata, {"name" :"Rokas"} -> {name:"Rokas"}
//nurodome kelia "/" - base path
//req - request nurodo, tai, ka kviesime is vatotojo puses
//res - response nurodo, ka grazins is serverio
app.get("/", (req, res) => {
    res.send(cars);
});

//post tikrinti galima su postman-> paleidziam serveri, postman pasirasom localhost:port
app.post("/", (req, res) => {
    console.log(req.body);
    cars.push(req.body.car);
    res.send(newCar);
});

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))