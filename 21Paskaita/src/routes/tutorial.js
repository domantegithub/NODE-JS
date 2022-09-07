const express = require('express');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const { dbconfig, jwtSecret } = require('../config');
const { isLoggedIn, isAuth } = require('../middleware');

const router = express.Router();

router.get('/user-tutorials/:id', isLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const con = await mysql.createConnection(dbconfig);
    const [response] = await con.execute(`SELECT * FROM tutorial WHERE user_id=${id}`);
    await con.end();
    res.send(response);
  } catch (e) {
    res.status(400).send({ error: 'Error' });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const isAuthenticated = await isAuth(req);
    const con = await mysql.createConnection(dbconfig);
    const [data] = await con.execute(
      `SELECT * FROM tutorials ${isAuthenticated ? '' : 'WHERE private = 0'}`,
    );
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: 'Error' });
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const userID= req.body.user.id;
    const con = await mysql.createConnection(dbconfig);
    const [data] = await con.execute(
      `INSERT INTO tutorial (user_id, title, content) VALUES (${mysql.escape(userID)}, ${mysql.escape(req.body.title)}, ${mysql.escape(req.body.content)})`,
    );
    res.send(data);
    await con.end();
  } catch (err) {
    res.status(400).send({ err: 'Error' });
  }
});

module.exports = router;