const session = require("express-session");
const {users,products,categories,carts,orders,orders_lists} = require("../database/models");
const {Op} = require("sequelize")

/*let getCartCount = async()=>{
    let cartCount = res.locals.user.idUser
}*/

let usersController = {
    client_login:(req,res)=>{
        let {status} = req.query;
        res.render("./client_login",{status});
    },
    cerrar_sesion:(req,res)=>{
        req.session.destroy((err)=>{
            console.log("destroy");
        });
        res.redirect("/client/home");
    },
    client_logear:async (req,res)=>{
        try{
            const {password,email} = req.body;
            let result = await users.findOne({where:{password:password,email:email,rol:"cliente"}});
            if(result){
                let sess = req.session;
                sess.email = result.email;
                sess.usuario = result.usuario;
                sess.idUser = result.id;
                sess.rol = result.rol;
                req.session.save(function(err) {
                    console.log("saved");
                })
                res.redirect("/client/home");
            }
            else{
                res.redirect("/client/login?status=error");
            }
        }
        catch(e){
            console.log(e);
        }
    },
    client_home:async(req,res)=>{
        let sess = req.session;
        let {status} = req.query;
        let productos_lista = await products.findAll();
        let categorias_lista = await categories.findAll();
        let contador_carrito = [];
        if(sess.idUser){
            contador_carrito = await carts.findAll({where:{idUser:sess.idUser}});
        }
        
        res.render("./client_home",{productos_lista,categorias_lista,cartCount:contador_carrito.length,status});
    },
    client_coleccion:async(req,res)=>{
        let sess = req.session;
        let categorias_lista = await categories.findAll();
        let idCategoria = req.params.id;
        let {status} = req.query;
        let categoria_actual = await categories.findOne({where:{id:idCategoria}});
        let productos = await products.findAll({where:{idCategoria}});
        let productos_oferta_lista = await products.findAll({where:{idCategoria,discount:{[Op.gte]:0}}});
        let dia_oferta_lista = await products.findAll({where:{discount:{[Op.gte]:0}}});
        let productos_buscados_lista  = [];
        let contador_carrito = [];
        if(sess.idUser){
            contador_carrito = await carts.findAll({where:{id:sess.idUser}});
        }
        res.render("./client_coleccion",{productos,categoria_actual,categorias_lista,cartCount:contador_carrito.length,dia_oferta_lista,productos_oferta_lista,productos_buscados_lista,status});
    },
    client_cart:async(req,res)=>{
        
        let sess = req.session;
        let carrito_lista = await carts.findAll({where:{idUser:sess.idUser},include:[{model:products,as:"producto"},{model:users,as:"usuario",where:{id:sess.idUser}}]});
        if(carrito_lista.length == 0){
            res.redirect("/client/home?status=vacio")
            return false;
        }
        let categorias_lista = await categories.findAll();
        let contador_carrito = [];
        if(sess.idUser){
            contador_carrito = await carts.findAll({where:{id:sess.idUser}});
        }
        res.render("./client_cart",{categorias_lista,carrito_lista,cartCount:contador_carrito.length});
    },
    client_shopping:async(req,res)=>{
        let sess = req.session;
        let {firstName,lastName,email,address,estate,codPostal,phone,comment,discount,payment_method} = req.body;
        let carrito_lista = await carts.findAll({where:{idUser:sess.idUser},include:[{model:products,as:"producto"}]});
        let total = 0;
        let productos = []
        carrito_lista.forEach(c => {
            total += c.producto.dataValues.price * c.quantity
            productos.push(c.producto.id)
        });
        if(sess.idUser){
            if(payment_method == "transferencia"){
                let result = await orders.create({firstName,lastName,email,address,estate,codPostal,phone,comment,discount,payment_method,receipt:req.file.filename,idUser:sess.idUser,total,status:"comprobante_enviado"});
                if(result){
                    await carts.destroy({where:{idUser:sess.idUser}});
                    for (let index = 0; index < productos.length; index++) {
                        await orders_lists.create({idProduct:productos[index],idOrder:result.id});
                    }
                    res.redirect("/client/home?status=completado");
                }else{
                    res.redirect("/client/cart?status=error");
                }
                
            }
        }
    },
    client_wishlist:async(req,res)=>{
        let sess = req.session;
        let categorias_lista = await categories.findAll();
        let contador_carrito = [];
        if(sess.idUser){
            contador_carrito = await carts.findAll({where:{id:sess.idUser}});
        }
        res.render("./client_wishlist",{categorias_lista,cartCount:contador_carrito.length});
    },
    client_scan:async(req,res)=>{
        let sess = req.session;
        let {status} = req.query;
        let categorias_lista = await categories.findAll();

        let contador_carrito = [];
        if(sess.idUser){
            contador_carrito = await orders.create({where:{id:sess.idUser}});
        }
        res.render("./client_scan",{status,cartCount:contador_carrito.length,categorias_lista});

    },
    client_scanning:async(req,res)=>{
        try {
            let sess = req.session;
            let {barCode} = req.body;
            let find_product = await products.findOne({where:{barCode}});
            if(find_product){
                let find_cart = await carts.findOne({where:{idUser:sess.idUser,idProduct:find_product.id}});
                if(find_cart){
                    let add_cart = await carts.update({quantity:(find_cart.quantity + 1)},{where:{id:find_cart.id}})
                    res.redirect("/client/scan?status=acumulado");
                }else{
                    let add_cart = await carts.create({idUser:sess.idUser,idProduct:find_product.id,quantity:1});
                    res.redirect("/client/scan?status=agregado");
                }
            }else{
                res.redirect("/client/scan?error=not-found");
    
            }
        } catch (error) {
            console.log(error)
        }

    },
    client_add_to_cart:async(req,res)=>{
        try {
            let sess = req.session;
            let {idProduct,back} = req.body;
            let find_product = await products.findOne({where:{id:idProduct}});
            if(find_product){
                let find_cart = await carts.findOne({where:{idUser:sess.idUser,idProduct:find_product.id}});
                if(find_cart){
                    let add_cart = await carts.update({quantity:(find_cart.quantity + 1)},{where:{id:find_cart.id}})
                    res.redirect(back+"?status=acumulado");
                }else{
                    let add_cart = await carts.create({idUser:sess.idUser,idProduct:find_product.id,quantity:1});
                    res.redirect(back+"?status=agregado");
                }
            }else{
                res.redirect(back+"?status=not-found");
    
            }
        } catch (error) {
            console.log(error)
        }

    },
    
}
module.exports = usersController;