const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner } = require('../middleware.js');
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

// ------------------ Nearby Search ------------------
router.route("/find")
  .get(wrapAsync(listingController.getFindListings))
  .post(wrapAsync(listingController.findListings));

// ------------------ Create & Index ------------------
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single("listing[image][url]"), wrapAsync(listingController.createNewListing));

// ------------------ New Listing Form ------------------
router.get("/new", isLoggedIn, listingController.renderNewForm);

// ------------------ Search / Skill ------------------
router.route("/search")
.get(wrapAsync(listingController.searchListing));

router.get("/skill", wrapAsync(listingController.searchBySkill));

// ------------------ Show / Update / Delete Listing ------------------
router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner, upload.single("listing[image][url]"), wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// ------------------ Share Listing ------------------
router.route("/:id/share")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEmailForm))
  .post(isLoggedIn, isOwner, wrapAsync(listingController.sendEmail));
  
  // ------------------ Participate ------------------
  // Usually not restricted to owner
  router.post("/:id/participate", isLoggedIn, wrapAsync(listingController.participate));

// ------------------ Volunteer Info ------------------
// Make sure this comes before /:id routes to avoid conflicts
router.get("/:id/:v_id", isLoggedIn, wrapAsync(listingController.getVolunteer));


module.exports = router;
