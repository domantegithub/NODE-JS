const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const mysqlConfig = {
  host: "mysqlproject-do-user-12295540-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_pTlVVbd9O2Gkg2SvApo",
  database: "products",
  port: "25060",
};

app.get("/items", async (req, res) => {
        try {
          const con = await mysql.createConnection(mysqlConfig);//Cia prisijungiama pire DB    
          //cia rasome query - ismes visus itemus
          
          const response = await con.execute('SELECT * FROM items;');
          res.send(response[0]);
          await con.end(); //uzdaromas connectionas - atsijungiama nuo DB
        } catch (e) {
          console.log(e);
        }
      });

      app.post("/items", async (req, res) => {
        try {
          const con = await mysql.createConnection(mysqlConfig);//Cia prisijungiama pire DB    
          //cia rasome query - ismes visus itemus
          
          const response = await con.execute('SELECT * FROM items;');
          res.send(response[0]);
          await con.end(); //uzdaromas connectionas - atsijungiama nuo DB
        } catch (e) {
          console.log(e);
        }
      });



app.get("/*", async (req, res) => {
    res.status(400).send("Page not found");
});


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});