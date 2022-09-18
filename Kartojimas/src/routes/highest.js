const express = require('express');
const mysql = require("mysql2/promise");

const {dbconfig}=require("../config");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const con = await mysql.createConnection(dbconfig);
        const [response] = await con.execute(`SELECT * FROM products WHERE price=(SELECT MAX(price) FROM products)`);
        await con.end();
        res.send(response);
    } catch (error) {
        res.status(400).send({error: "error"});
    }
})

module.exports=router;