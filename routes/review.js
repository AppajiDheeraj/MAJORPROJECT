const express = require("express");
const router = express.Router({mergeParams: true}); //Important as id needs to be passed into review.js
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {listingSchema,reviewSchema} = require('../schema.js');
const Review = require('../models/review.js');
const Listing =  require("../models/listing.js")
const {validateReview,isLoggedIn, isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");


//Post Review
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

// Delete review route
router.delete("/:reviewId", isLoggedIn,isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;