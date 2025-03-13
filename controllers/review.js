const Review = require('../models/review');
const Listing = require('../models/listing');

module.exports.postReview = async (req,res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let { rating, comment } = req.body.review;
    let newReview = new Review({rating, comment});
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Successfully added a new review!");

    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req,res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted a review!");
    res.redirect(`/listings/${id}`);
};