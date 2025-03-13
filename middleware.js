const Listing = require("./models/listing");
const {listingSchema, reviewSchema} = require('./schema.js');
const ExpressError = require('./utils/ExpressError');
const Review = require('./models/review.js');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        //Redirect URL
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Login First!");
        return res.redirect("/login");
    }
    else {
        next();
    }
};

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
        let {error} = listingSchema.validate(req.body);
        if(error) {
            let errMsg = error.details.map(el => el.message).join(",");
            throw new ExpressError(400, errMsg);
        }
        next();
    };

module.exports.validateReview = (req, res, next) => {
        let {error} = reviewSchema.validate(req.body);
        if(error) {
            let errMsg = error.details.map(el => el.message).join(",");
            throw new ExpressError(400, errMsg);
        }
        next();
    };


module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to hamper other's reviews, You understand that!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
