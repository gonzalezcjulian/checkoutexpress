let express = require('express');
let router = express.Router();
let indexController = require("../controller/index");

/* GET users listing. */
router.get("/",indexController.index);


module.exports = router;
