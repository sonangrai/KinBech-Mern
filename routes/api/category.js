const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Category = require("../../models/Category");
const auth = require("../../middleware/auth");

//post the category
router.post(
  "/",
  [check("category", "Category is Required").exists()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { category } = req.body;
    try {
      let checkCat = await Category.findOne({ category });
      if (checkCat) {
        return res.status(400).send({ msg: "Category Already Exist" });
      }
      newcategory = new Category({
        category,
      });

      await newcategory.save();
      res.json(category);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }
);

//post sub category
router.post(
  "/sub-cat/:id",
  [check("subcatname", "Sub Category is Required").exists()],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { subcatname } = req.body;
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Category Not Found" }] });
      }

      let checkCat = await Category.find({
        _id: req.params.id,
        subcategory: {
          $elemMatch: {
            subcatname: subcatname,
          },
        },
      });
      if (checkCat.length !== 0) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Sub Category Already Exist" }] });
      }

      const newSubcategory = {
        subcatname,
      };
      category.subcategory.unshift(newSubcategory);
      await category.save();
      res.json(category);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);

//get category
router.get("/", auth, async (req, res) => {
  try {
    const category = await Category.find();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
