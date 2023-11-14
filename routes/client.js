var express = require('express');
var router = express.Router();
let clientController = require("../controller/client");
let userRolValidation = require("../middlewares/userRolValidation");

/* GET users listing. */
router.get("/login",clientController.client_login);
router.post("/login",clientController.client_logear);
router.get("/logout",clientController.cerrar_sesion);
router.get("/wishlist",userRolValidation("cliente"),clientController.client_wishlist);
router.get("/scan",userRolValidation("cliente"),clientController.client_scan);
router.post("/scan",userRolValidation("cliente"),clientController.client_scanning);
router.get("/home",clientController.client_home);
router.get("/coleccion/:id",clientController.client_coleccion);
router.get("/cart",userRolValidation("cliente"),clientController.client_cart);
router.post("/cart",userRolValidation("cliente"),clientController.client_shopping);
router.post("/add_to_cart",userRolValidation("cliente"),clientController.client_add_to_cart);


module.exports = router;
