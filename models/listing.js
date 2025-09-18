const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  organizationName: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  country: String,
  date: {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
  },
  time: {
    from: {
      type: String, // You can store time as a string (e.g., "14:00")
      required: true,
    },
    to: {
      type: String, // You can store time as a string (e.g., "16:00")
      required: true,
    },
  },
  skills:String,
  image: {
    filename: String,
    url: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

listingSchema.index({ coordinates: "2dsphere" });



const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
