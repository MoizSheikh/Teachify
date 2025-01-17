const router = require("express").Router();
const Payment = require("./../models/payment");

router.post("/addpay", (req, res) => {
  const newitem = new Payment(req.body);
  newitem.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }

    res.status(200).json({
      success: true,
      message: "Payment created successfully!",
      Payment: obj,
    });
  });
});

// router.get("/getAll", ({}, res) => {
//   Payment.find({})
//     .then((items) => {
//       res.json(items);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.get("/get/:id", (req, res) => {
//   Payment.findOne({ _id: req.params.id }, (err, obj) => {
//     if (err) {
//       console.log(err);
//       return res
//         .status(400)
//         .json({ message: "Failed to get Payment", success: false });
//     }

//     res.status(200).json({
//       success: true,
//       data: obj,
//     });
//   });
// });

router.delete("/delete/:id", (req, res) => {
  Payment.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "Payment Deleted succesfully",
    });
  });
});

router.put("/edit/:id", (req, res) => {
  Payment.findByIdAndUpdate(
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
        message: "Payment updated successfully!",
        data: obj,
      });
    },
  );
});

router.get("/getbyteacher/:id", (req, res) => {
  Payment.find({ teacher_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Payment", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});

module.exports = router;
