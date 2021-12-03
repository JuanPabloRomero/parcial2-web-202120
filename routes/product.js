var express = require('express');
var router = express.Router();
var data = require("../assets/data")

/* GET products listing. Please establish connection with getProduct function from controllers/product.js  */
router.get('/', function (req, res, next) {
  
    let dataEnviada = data.filter((p) => {
      return p.name.toLowerCase().includes(req.query.q)
    });
    
    res.send(dataEnviada);
});

module.exports = router;
