const express = require('express');
require('dotenv').config();

//kad pasiektume env faila rasome  taip:
const PORT = process.env.PORT || 8080;

const app = express();

const myname = 'Domante';

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
