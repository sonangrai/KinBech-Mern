const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  list: {
    type: Array,
    default: [],
  },
});

module.exports = Watchlist = mongoose.model("Ads", watchlistSchema);
