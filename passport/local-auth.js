const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  User = require("../models/user");

passport.serializeUser((username, done) => {
  done(null, username.id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await User.findById(id);
  done(null, usuario);
});

passport.use('local-register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({username: username})
    console.log(user)
    if(user) {
      return done(null, false, req.flash('UserExist', 'El usuario ya esta registrado.'));
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.password = newUser.encriptar(password);
    console.log(newUser)
      await newUser.save();
      done(null, newUser);
    }
  }));

passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({username: username});
    if(!user) {
      return done(null, false, req.flash('mensajeLogin', 'Usuario no existente'));
    }
    if(!user.Comparar(password)) {
      return done(null, false, req.flash('loginPass', 'Contraseña incorrecta'));
    }
    return done(null, user);
  }));
