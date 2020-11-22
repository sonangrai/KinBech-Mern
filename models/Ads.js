const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdsSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  pricenegotiable: {
    type: String,
    default: "yes",
  },
  condition: {
    type: String,
    required: true,
  },
  useduration: {
    type: String,
  },
  specifications: {
    type: String,
  },
  adstatus: {
    type: String,
    default: "0",
  },
  fimg: {
    type: String,
    default: "noimg",
  },
  location: {
    type: String,
    required: true,
  },
  homedelivery: {
    type: String,
    default: "yes",
  },
  delivercharge: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      commentext: {
        type: String,
        required: true,
      },
      reply: {
        type: String,
        default: "",
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Ads = mongoose.model("Ads", AdsSchema);
