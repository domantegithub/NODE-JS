// prisideti importus rikalingus express serveriui
//susikuri express serveri 
// susikurti API su /users path, kuris grazins users masyva
//susikurti API su /links path, kuris grazins links masyva

const express = require('express');
const cors = require("cors");
const app = express();
const PORT = 5050;

//priskiriam express moduliui js formata
app.use(express.json());
app.use(cors());

const users = [];

app.get("/users" , (req,res) => {
    res.send(users);
});

//kuriam API
app.post("/users", (req,res) => {
    users.push(req.body);
    res.send(users);
});


const links = ["https://translate.google.lt/?hl=lt"];

//Kuriam kita API
app.get("/links", (req, res) => {
    res.send(links);
});

//paleidziam serveri
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
