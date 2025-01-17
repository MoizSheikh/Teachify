const router = require("express").Router();
const Order = require("./../models/order");
const auth = require("./../middleware/auth");

const mongoose = require("mongoose");

const Class = require("./../models/class");

router.post("/addorder", async (req, res) => {
  const isOrder = await Order.findOne({
    teacher_id: req.body.teacher_id,
    student_id: req.body.student_id,
    class_id: req.body.class_id,
    is_active: true,
    is_rated: false,
  });
  if (isOrder) {
    return res.status(201).json({
      success: false,
      message: "Order already created",
      data: isOrder,
    });
  }

  const newOrder = new Order(req.body);

  newOrder.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }

    res.status(200).json({
      success: true,
      message: "order created successfully!",
      data: obj,
    });
  });
  //}
});

router.put("/updateOrder/:order_id", async (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.params.order_id },
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

router.get("/getAll", ({}, res) => {
  Order.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/get/:id", (req, res) => {
  Order.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get order", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});

router.get("/getEachStudent/:userId/:classId", (req, res) => {
  Order.findOne(
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
          .json({ message: "Failed to get order", success: false });
      }

      res.status(200).json({
        success: true,
        data: obj,
      });
    },
  );
});

router.get("/getbyteacher/:id", (req, res) => {
  Order.find({ teacher_id: req.params.id }, (err, obj) => {
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
  }).populate("class_id");
});

router.get("/getbystudent/:id", (req, res) => {
  Order.find({ student_id: req.params.id }, (err, obj) => {
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

router.delete("/delete/:id", auth, (req, res) => {
  Order.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "Order Deleted succesfully",
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
router.put("/completeOrder", (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.body.id },

    { is_completed: true, is_rated: false },
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
        message: "Order comppleted successfully!",
        data: obj,
      });
    },
  );
});
router.put("/completeOrderTeacher", (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.body.id },

    { is_completed_teacher: true },
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
        message: "Order comppleted successfully!",
        data: obj,
      });
    },
  );
});

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

module.exports = router;
