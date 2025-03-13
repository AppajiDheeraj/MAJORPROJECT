const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user");
const wrapAsync = require('../utils/wrapAsync');
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware"); //We are importing the saveRedirectUrl middleware from middleware.js
const userController = require("../controllers/user");


router
    .route("/signup")
    .get(userController.renderSignUpPage)
    .post(wrapAsync(userController.signUpUser));


router
    .route("/login")
    .get(userController.renderLoginPage)
    .post(saveRedirectUrl, //By default passport deletes the req.session.redirectUrl or session variables after redirecting to the login page. So we need to save it before it gets deleted.
        passport.authenticate('local', { //This is a middleware that authenticates the user using the local strategy
        failureRedirect: "/login", //If the authentication fails, redirect to login page
        failureFlash: true //Flash an error message
    }),
    wrapAsync(userController.loginUser));


router.get("/logout", userController.logoutUser);

module.exports = router;