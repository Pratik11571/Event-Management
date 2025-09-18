const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware.js');
const reviewController = require("../controllers/review.js");

//add review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.addReview));

//delete reviews
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;