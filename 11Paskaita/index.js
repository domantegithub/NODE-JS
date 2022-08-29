const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const PORT = 8080;

const app = express();
app.use(express.json());
app.use(cors());

const mysqlConfig = {
  host: "mysqlproject-do-user-12295540-0.b.db.ondigitalocean.com",
  user: "doadmin",
  password: "AVNS_pTlVVbd9O2Gkg2SvApo",
  database: "defaultdb",
  port: "25060",
};

//Lesson 14. 2.1
// app.get("/", async (req, res) => {
//     try {
//       const con = await mysql.createConnection(mysqlConfig);//Cia prisijungiama pire DB
//       console.log("Success: " + con);

//       con.execute('') //siunciamas query i DB

//       res.send("Success");
//       await con.end(); //uzdaromas connectionas - atsijungiama nuo DB
//     } catch (e) {
//       console.log(e);
//     }
//   });

  //Lesson 14. 2.2 - Darome nauja API, kuris ismes 10pigiausiu marskiniu
  app.get("/shirts", async (req, res) => {
    try {
      const con = await mysql.createConnection(mysqlConfig);//Cia prisijungiama pire DB
      const response = await con.execute( 'SELECT * FROM defaultdb.shirts ORDER BY price ASC LIMIT 3;');
      res.send(response[0]);
      await con.end(); //uzdaromas connectionas - atsijungiama nuo DB
    } catch (e) {
      console.log(e);
    }
  });

//Lesson 14. 2.3
  app.post("/shirts", async (req, res) => {
    try {
      const con = await mysql.createConnection(mysqlConfig);//Cia prisijungiama pire DB
      shirt = req.body;
      const response = await con.execute(`INSERT INTO shirts (brand, model, size, price) values (${shirt.brand}, ${shirt.model}, ${shirt.size}, ${shirt.price}`);
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