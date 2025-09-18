const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express.Router();
const passport = require("passport");
const { saveUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");
const multer = require('multer');
const path = require('path');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });


router.route("/")
    .get(userController.home);

router.route("/signup")
    .get(userController.renderSignupForm)
    .post(upload.single("image[url]"),wrapAsync(userController.signup));

router.route("/login")
    .get(userController.renderLoginForm)
    .post(saveUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);


router.get("/logout", userController.logout);
module.exports = router;