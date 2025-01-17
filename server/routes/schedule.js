const router = require("express").Router();
const Schedule = require("./../models/schedule");
const auth = require("./../middleware/auth");
const Student = require("./../models/student");
const Teacher = require("./../models/teacher");
// const moment = require("moment");

router.post("/addschedule", (req, res) => {
  const newSchedule = new Schedule(req.body);
  newSchedule.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }

    res.status(200).json({
      success: true,
      message: "Schedule created successfully!",
      data: obj,
    });
  });
});

router.get("/getAll", ({}, res) => {
  Schedule.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/get/:id", (req, res) => {
  Schedule.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Schedule", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});

router.get("/getEachStudent/:userId/:classId", (req, res) => {
  Schedule.findOne(
    {
      student_id: req.params.userId,
      class_id: req.params.classId,
      is_active: true,
    },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Failed to get Schedule", success: false });
      }

      res.status(200).json({
        success: true,
        data: obj,
      });
    },
  );
});
router.get("/getLatestbyDateTeacher/:userId", (req, res) => {
  Schedule.find(
    {
      teacher_id: req.params.userId,
      is_class: true,
      // date: req.params.date,
    },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Failed to get Schedule", success: false });
      }

      res.status(200).json({
        success: true,
        data: obj,
      });
    },
  )
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .populate("class_id")
    .populate("teacher_id");
  // .populate("order_id");
});
router.get("/getbyDateTeacher/:userId/:date", (req, res) => {
  Schedule.find(
    {
      teacher_id: req.params.userId,
      date: req.params.date,
    },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Failed to get Schedule", success: false });
      }

      res.status(200).json({
        success: true,
        data: obj,
      });
    },
  )

    .populate("class_id")
    .populate("teacher_id")
    .populate("order_id");
});

router.get("/getbyuser/:id/:date", (req, res) => {
  Schedule.find(
    { $or: [{ student_id: req.params.id }, { student_ids: req.params.id }] },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "Failed to get schedule by student",
          success: false,
        });
      }

      res.status(200).json({
        success: true,
        data: obj,
      });
    },
  ).populate("class_id");
});

router.get("/getbystudent/:id", (req, res) => {
  Schedule.find({ student_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get orders by student", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  }).populate("class_id");
});
router.get("/getbyTeacher/:id", (req, res) => {
  Schedule.find({ teacher_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get orders by teacher", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  })
    .populate("class_id")
    .populate("teacher_id");
});
router.get("/getbyStudent/:id", (req, res) => {
  Schedule.find({ teacher_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get orders by teacher", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  })
    .populate("teacher_id")
    .populate("class_id");
});

router.delete("/delete/:id", auth, (req, res) => {
  Schedule.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "Schedule Deleted succesfully",
    });
  });
});

router.put("/edit/:id", auth, (req, res) => {
  Order.findByIdAndUpdate(
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
        message: "Order updated successfully!",
        data: obj,
      });
    },
  );
});

module.exports = router;
