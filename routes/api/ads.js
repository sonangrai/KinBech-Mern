const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Ads = require("../../models/Ads");
const Comment = require("../../models/Comment");
const auth = require("../../middleware/auth");

//multer
const fs = require("fs");
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./frontend/public/uploads/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

router.post(
  "/",
  auth,
  upload.single("fimg"),
  [
    check("title", "Enter the Title").not().isEmpty(),
    check("description", "Description Needed").not().isEmpty(),
    check("price", "Price not given").not().isEmpty(),
    check("condition", "Condition Needed").not().isEmpty(),
    check("location", "Location Needed").not().isEmpty(),
    check("deliverycharge", "Delivery Charge Needed").not().isEmpty(),
    check("expiry", "Expiry Date Needed").not().isEmpty(),
    check("category", "Category is Needed").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newimage = req.file.originalname;
    const {
      title,
      description,
      price,
      pricenegotiable,
      condition,
      useduration,
      specification,
      adstatus,
      location,
      deliverycharge,
      expiry,
      category,
      subcategory,
    } = req.body;
    try {
      ads = new Ads({
        user: req.user.id,
        title,
        description,
        price,
        pricenegotiable,
        condition,
        useduration,
        specification,
        adstatus,
        location,
        deliverycharge,
        expiry,
        category,
        subcategory,
        fimg: newimage,
      });
      await ads.save();
      res.json(ads);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const {
    title,
    description,
    price,
    pricenegotiable,
    condition,
    useduration,
    specification,
    adstatus,
    location,
    deliverycharge,
    expiry,
    category,
    subcategory,
  } = req.body;

  const adsFields = {};
  if (title) adsFields.title = title;
  if (description) adsFields.description = description;
  if (price) adsFields.price = price;
  if (pricenegotiable) adsFields.pricenegotiable = pricenegotiable;
  if (condition) adsFields.condition = condition;
  if (useduration) adsFields.useduration = useduration;
  if (specification) adsFields.specification = specification;
  if (adstatus) adsFields.adstatus = adstatus;
  if (location) adsFields.location = location;
  if (deliverycharge) adsFields.deliverycharge = deliverycharge;
  if (expiry) adsFields.expiry = expiry;
  if (category) adsFields.category = category;
  if (subcategory) adsFields.subcategory = subcategory;

  try {
    let ads = await Ads.findById(req.params.id);

    if (ads) {
      ads = await Ads.findOneAndUpdate(
        { _id: req.params.id },
        { $set: adsFields },
        { new: true }
      );
      return res.json(ads);
    }

    ads = new Ads(adsFields);
    await ads.save();
    res.json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.put("/img/:id", auth, upload.single("fimg"), async (req, res) => {
  const remo = await Ads.findById(req.params.id);
  fs.unlink("./frontend/public/uploads/img/" + remo.fimg, (err) => {
    if (err) throw err;
    console.log("successfully deleted");
  });
  const newimage = req.file.originalname;
  try {
    let ads = await Ads.findById(req.params.id);

    if (ads) {
      ads = await Ads.findOneAndUpdate(
        { _id: req.params.id },
        { fimg: newimage },
        { new: true }
      );
      return res.json(ads);
    }

    ads = new Ads(adsFields);
    await ads.save();
    res.json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ads = await Ads.findById(req.params.id);
    if (!ads) return res.status(400).json({ msg: "Ads not found" });
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "ads not found" });
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const ads = await Ads.find();
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.setHeader("Content-Range", `ads 0-5/${ads.length}`);
    res.send(ads);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "ads not found" });
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const remo = await Ads.findById(req.params.id);
    await remo.remove();
    res.send(remo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

//comment by ads
router.get("/comment/:id", async (req, res) => {
  try {
    const comment = await Comment.find({ ads: req.params.id });
    if (!comment) return res.status(400).json({ msg: "comment not found" });
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "comment not found" });
    res.status(500).send("Server Error");
  }
});

//approve ads
router.put("/approve/:id", auth, async (req, res) => {
  const adsFields = {};
  adsFields.adstatus = "1";

  try {
    let ads = await Ads.findById(req.params.id);

    if (ads) {
      ads = await Ads.findOneAndUpdate(
        { _id: req.params.id },
        { $set: adsFields },
        { new: true }
      );
      return res.json(ads);
    }

    ads = new Ads(adsFields);
    await ads.save();
    res.json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
