const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {listingSchema} = require('../schema.js');
const ExpressError = require('../utils/ExpressError');
const Listing =  require("../models/listing.js")
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require('../cloudConfig.js');
const upload = multer({ storage })

router
    .route("/") //This is a shortcut for writing the routes for the same path
    .get(wrapAsync(listingController.index)) //Index Route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing)); //Create Route

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing)) //Show Route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) //Update Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); //Delete Route

//Update Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;