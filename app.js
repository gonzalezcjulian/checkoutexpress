let createError = require('http-errors');
let express = require('express');
const session = require('express-session');
let path = require('path');
let cookieParser = require('cookie-parser');
let flash = require('connect-flash');
let bodyParser = require('body-parser');
require('dotenv').config()
var methodOverride = require('method-override');
const multer = require("multer");

let port = process.env.PORT;
let app = express();

const almacenamiento = (nombre_carpeta)=>{
  const storage = multer.diskStorage({
    destination: "./public/assets/"+nombre_carpeta,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}__${file.originalname}`);
    },
  });
  return storage;
}

const verificarImagen = function (file, cb,ext) {
  const fileTypes = ext;

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (extName && mimeType) return cb(null, true);
  else cb("Error de carga de imagen");
};

//initializing multer
const guardar_archivo = (archivo)=>{
  if(archivo == "producto"){
    const upload = multer({
      storage: almacenamiento("imagen_productos"),
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        verificarImagen(file, cb,/jpeg|jpg|png/);
      },
    });
    return upload.single("imagen")
  }
  else if(archivo == "usuario"){
    const upload = multer({
      storage: almacenamiento("imagen_usuarios"),
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        verificarImagen(file, cb,/jpeg|jpg|png/);
      },
    });
    return upload.single("imagen")
  }
  else if(archivo == "carrito"){
    const upload = multer({
      storage: almacenamiento("imagen_comprobante"),
      limits: { fileSize: 1000000 },
      fileFilter: (req, file, cb) => {
        verificarImagen(file, cb,/jpeg|jpg|png|pdf/);
      },
    });
    return upload.single("archivo")
  }
}


app.set('trust proxy', 1) // trust first proxy

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'julian_app',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

/* ENRUTADO */
let indexRouter = require('./routes/index');
let clientRouter = require('./routes/client');
let adminRouter = require('./routes/admin');


let listen = app.listen(port,()=>{
  console.log("Port listening in :"+port);
});
let moment = require('moment');
moment.locale('es');
app.use(function(req, res, next){
  res.locals.session = req.session;
  res.locals.moment = moment;
  next();
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next) {
  res.locals.user = req.session;
  next();
});

app.post("/admin/productos", guardar_archivo("producto"), (req, res,next) => {
  if (req.file) next();
  else next();
});

app.post("/admin/usuarios", guardar_archivo("usuario"), (req, res,next) => {
  if (req.file) next();
  else next();
});
app.post("/client/cart", guardar_archivo("carrito"), (req, res,next) => {
  if (req.file) next();
  else next();
});
app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/admin', adminRouter);

app.use((req, res, next) => {
  res.redirect("/client/home");
})
module.exports = app;





