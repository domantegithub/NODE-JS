var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home', name:"Domante", age:18, email:"doma@doma.lt"});
});

module.exports = router;
