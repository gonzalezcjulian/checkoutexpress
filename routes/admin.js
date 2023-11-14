let express = require('express');
let router = express.Router();
let adminController = require("../controller/admin");
let userRolValidation = require("../middlewares/userRolValidation");

router.get("/login",adminController.admin_login);
router.post("/login",adminController.admin_logear);
router.get("/logout",adminController.admin_logout);
router.get("/menu",userRolValidation("administrador"),adminController.admin_menu);
router.get("/usuarios",userRolValidation("administrador"),adminController.admin_usuarios);
router.post("/usuarios",userRolValidation("administrador"),adminController.admin_crearUsuarios);
router.get("/editar",userRolValidation("administrador"),adminController.admin_editar);
router.get("/pedidos",userRolValidation("administrador"),adminController.admin_pedidos);
router.get("/productos",userRolValidation("administrador"),adminController.admin_productos);
router.post("/productos",userRolValidation("administrador"),adminController.admin_crearProductos);


module.exports = router;