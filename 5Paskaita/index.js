const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

//gaunam duomenis, get visada eina pirmas
const names = [];

app.get("/names", (req,res) => {
res.send(names);
});

//reikia issiusti duomenis, siunciam i body ir body grazinam atgal (res.send(body))
app.post("/names", (req, res) =>{
    names.push(req.body.name); //ipusinu nauja name i names masyva
    res.send(body);
});


app.listen(PORT, () =>
console.log(`Server is running on http://localhost:${PORT}`)
);