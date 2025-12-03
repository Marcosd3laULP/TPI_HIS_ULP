const express = require("express");
const router = express.Router();
const userControl = require("../Control/userControl");
const userMiddleware = require("../Control/userMiddleware");

router.get("/login", userMiddleware.checkNotLoggedIn, userControl.vistaLogin);
router.post("/login", userMiddleware.checkNotLoggedIn,userMiddleware.validateLoginData, userControl.ValidarLogin);
router.get("/logout",userMiddleware.checkLoggedIn, userControl.SalirDeSesion);

module.exports = router;