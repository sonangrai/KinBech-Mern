const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subcategory: [
    {
      subcatname: {
        type: String,
      },
    },
  ],
});

module.exports = Category = mongoose.model("Category", CategorySchema);
