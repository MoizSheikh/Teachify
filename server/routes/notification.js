const router = require("express").Router();
const Notification = require("./../models/notification");
const auth = require("./../middleware/auth");
const upload = require("./upload");

router.post("/addnotification", (req, res) => {
  const newitem = new Notification(req.body);
  newitem.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }

    res.status(200).json({
      success: true,
      message: "Notification created successfully!",
      item: obj,
    });
  });
});

router.get("/getAll", ({}, res) => {
  Notification.find({}, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Notification", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});

router.get("/get/:id", (req, res) => {
  Notification.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Notification", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  }).populate("teacher_id");
});

router.get("/getbyuser/:id", (req, res) => {
  Notification.find({ user_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Notificationes", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  })
    .sort({
      createdAt: -1,
    })
    .populate("class_id");
});

router.get("/getbystudent/:id", (req, res) => {
  Notification.find({ student_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "Failed to get Notificationes by student",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});

router.delete("/delete/:id", (req, res) => {
  Class.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "class Deleted succesfully",
    });
  });
});

router.put("/edit/:id", (req, res) => {
  Class.findByIdAndUpdate(
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
        message: "Class updated successfully!",
        data: obj,
      });
    },
  );
});

router.post("/upload", auth, (req, res) => {
  const singleUpload = upload.single("file");
  singleUpload(req, res, function (err, doc) {
    if (err) {
      return res.status(201).json({
        success: false,
        errors: {
          title: "Image Upload Error",
          detail: err.message,
          error: err,
        },
      });
    }
    const url = req.protocol + "://" + req.get("host");

    const x = url + "/uploads/" + req.file.filename;
    res.status(200).json({
      success: true,
      url: x,
    });
  });
});

module.exports = router;
