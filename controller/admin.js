const session = require("express-session");
const { Op } = require("sequelize");
const {users,products,categories} = require("../database/models");
const { tryEach } = require("async");
let adminController = {
    admin_login: (req, res) => {
        let {status} = req.query;
        res.render("./admin_login",{status});
    },
    admin_logear: async(req, res) => {
        try {
            let {email,password} = req.body;
        
            let checkLogin = await users.findOne({where:{email:email,password:password,rol:"administrador"}});
            if(checkLogin){
                let sess = req.session;
                sess.email = checkLogin.email;
                sess.usuario = checkLogin.usuario;
                sess.idUser = checkLogin.id;
                sess.rol = checkLogin.rol;
                req.session.save(function(err) {
                    console.log("saved");
                })
                res.redirect("/admin/menu");
            }
            else{
                res.redirect("/admin/login?status=error");
            }
        } catch (error) {
            console.log(error)
        }
        
        //res.render("./admin_login");
    },
    admin_logout: (req, res) => {
        req.session.destroy((err)=>{
            console.log("destroy");
        });
        res.redirect("/admin/login");
    },
    admin_menu: (req, res) => {
        res.render("./admin_menu");
    },
    admin_pedidos: (req, res) => {
        res.render("./admin_pedidos");
    },
    admin_productos: async (req, res) => {
        try {
            let status = req.query.status ?? null;
            let array_productos = await products.findAll({include:{model:categories,as:"categoria"}});
            let array_categorias = await categories.findAll();
            res.render("./admin_productos",{array_productos,array_categorias,status});
        } catch (error) {
            console.log(error)
        }
    },
    admin_crearProductos: async(req, res) => {
        try {
            let {productName,description,barCode,price,category,stock} = req.body;
            let result = await products.create({productName,description,barCode,price,idCategoria:category,stock});
            
            if(result){
                let editar_ruta_imagen = await products.update({image:req.file.filename},{where:{id:result.id}});
                res.redirect("/admin/productos?status=success");
            }else{
                res.redirect("/admin/productos?status=error");
            }
        } catch (error) {
            console.log(error)
        }
        
    },
    admin_usuarios: (req, res) => {
        let status = req.query.status ?? null;
        res.render("./admin_usuarios",{status});
    },
    admin_crearUsuarios:async (req, res) => {
        try {
            
            let {fullName,email,username,password,password2,rol} = req.body;
            if(password != password2){
                throw new Error('Contraseña distinta');
            }
            console.log(req.body)
            let check_email = await users.findAll({where:{email}}); 
            if(check_email.length > 0 ){
                res.redirect("/admin/usuarios?status=email_repetido");
            }else{

                let result = await users.create({fullName,email,password,usuario:username,rol,image:req.file.filename ?? null });
                if(result){
                    //let editar_ruta_imagen = await users.update({image:req.file.filename},{where:{id:result.id}});
                    res.redirect("/admin/usuarios?status=success");
                }else{
                    res.redirect("/admin/usuarios?status=error");
                }
            }
            
        } catch (error) {
            if(error == 'Email repetido')
                res.redirect("/admin/usuarios?status=email_repetido");
            console.log(error)
        }
    },
    admin_editar: (req, res) => {
        res.render("./editar");
    }
}

module.exports = adminController;