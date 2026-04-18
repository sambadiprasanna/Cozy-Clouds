const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    //listing.reviews.push(newReview);
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    // console.log("New review saved !");
    // res.send("New review saved !");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId} = req.params;
    //console.log(id);
    //console.log(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    // console.log("DELETE ROUTE HIT")
    // //res.redirect(`/listings/${id}`);
    res.redirect(`/listings/${id}`);
};