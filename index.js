const express = require("express"),
  app = express(),
  path = require("path"),
  engine = require("ejs-mate"),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3000,
  morgan = require("morgan"),
  session = require("express-session"),
  passport = require("passport"),
  flash = require("connect-flash");

//iniciacion
require("./database");
require("./passport/local-auth");
//plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", engine);
//middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  app.locals.mensajeLogin = req.flash("mensajeLogin");
  app.locals.loginPass = req.flash('loginPass');
  app.locals.UserExist = req.flash('UserExist');
  app.locals.registrado = req.flash('registrado');
  app.locals.login = req.flash('login')
  app.locals.user = req.user;
  next();
});
//static
app.use(express.static(__dirname + "/public"));
//rutas
app.use("/", require("./routes/index"));
//servidor
app.listen(port, () => {
  console.log(`Servidor Online en: http://localhost:${port}`);
});
