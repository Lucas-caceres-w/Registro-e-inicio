const express = require("express"),
  router = express.Router(),
  passport = require("passport");

router.get("/", (req, res) => {
  res.render("./layout/main");
});
router.get("/Home", Auth, (req, res) => {
  res.render("home");
});
router.get("/Contacto", Auth, (req, res) => {
  res.render("contacto");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/logeado", Auth, (req, res) => {
  res.render("logeado");
});
router.get("/registrar", (req, res) => {
  res.render("registrar");
});
router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/logeado",
    failureRedirect: "/login",
    passReqToCallback: true,
  })
);
router.post(
  "/registrar",
  passport.authenticate("local-register", {
    successRedirect: "/login",
    failureRedirect: "/registrar",
    passReqToCallback: true,
  })
);
router.get("/logout", (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});
router.get("/perfil", Auth, (req, res) => {
  res.render("perfil");
});

function Auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
