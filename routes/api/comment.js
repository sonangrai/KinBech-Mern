const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../../models/User");
const Ads = require("../../models/Ads");
const auth = require("../../middleware/auth");

router.post(
  "/:id",
  auth,
  [check("commentext", "Enter Comment").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { commentext } = req.body;
    try {
      const user = await User.findById(req.user.id).select("-password");
      const ads = await Ads.findById(req.params.id);
      const newComment = {
        ads: req.params.id,
        avatar: user.avatar,
        user: req.user.id,
        name: user.name,
        commentext,
      };
      ads.comments.unshift(newComment);
      await ads.save();
      res.json(ads);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id/:comment_id", auth, async (req, res) => {
  try {
    const ads = await Ads.findById(req.params.id);

    // Pull out comment
    const comment = ads.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = ads.comments
      .map((comment) => comment.id)
      .indexOf(req.params.comment_id);

    ads.comments.splice(removeIndex, 1);

    await ads.save();

    res.json({ msg: "Deleted Comments" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

router.put("/reply/:id/:comment_id", auth, async (req, res) => {
  const checkAds = await Ads.findById(req.params.id);
  if (checkAds.user != req.user.id) {
    return res.status(401).json({ msg: "Not authorised" });
  }
  const { reply } = req.body;

  try {
    ads = await Ads.findOneAndUpdate(
      {
        _id: req.params.id,
        "comments._id": req.params.comment_id,
      },
      {
        $set: {
          "comments.$.reply": reply,
        },
      }
    );

    await ads.save();
    res.json(ads);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

router.delete("/reply/:id", auth, async (req, res) => {
  try {
    const remo = await Comment.findOne({ ads: req.params.id });
    if (!remo) return res.status(400).json({ msg: "Reply not found" });
    remo.reply = null;
    await remo.save();
    res.send("Reply Removed Succesfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("error");
  }
});

module.exports = router;
