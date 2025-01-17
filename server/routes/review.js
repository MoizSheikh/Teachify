const router = require("express").Router();
const Review = require("./../models/review");
const Order = require("./../models/order");
const auth = require("./../middleware/auth");
const upload = require("./upload");

router.post("/addReview/:id", (req, res) => {
  const newReview = new Review(req.body);
  newReview.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }
    Order.findByIdAndUpdate(
      { _id: req.params.id },
      // req.body,
      { is_rated: true, is_active: false },
      { new: true },
      (err, obj) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ message: "Failed to update ", success: false });
        }
      },
    );
    res.status(200).json({
      success: true,
      message: "Review created successfully!",
      data: obj,
    });
  });
});

// router.get("/getAll", ({}, res) => {
//   Review.find({})
//     .then((items) => {
//       res.json(items);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

router.get("/get/:id", (req, res) => {
  Review.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Review", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});

// export const getReviewsByTeacher = (id) => {
// router.get(`/getbyteacher/${id}`, (req, res) => {
router.get(`/getbyteacher/:id`, (req, res) => {
  Review.find({ teacher_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Review by teacher", success: false });
    }

    return res.status(200).json({
      success: true,
      data: obj,
    });
  });
});
// };

router.get("/getbyClass/:id", (req, res) => {
  Review.find({ class_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Reviews by Class", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  }).populate("student_id");
});

router.delete("/delete/:id", auth, (req, res) => {
  Review.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "Review Deleted succesfully",
    });
  });
});

router.put("/edit/:id", auth, (req, res) => {
  Review.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Failed to update ", success: false });
      }
      res.status(200).json({
        success: true,
        message: "Review updated successfully!",
        data: obj,
      });
    },
  );
});

module.exports = router;
