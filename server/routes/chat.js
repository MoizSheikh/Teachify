const router = require("express").Router();
const Chat = require("./../models/chat");
const auth = require("./../middleware/auth");
const Student = require("./../models/student");
const Teacher = require("./../models/teacher");
const mongoose = require("mongoose");
const Pusher = require("pusher");

// create a new Pusher instance
const pusherConfig = {
  appId: import.meta.env.VITE_PUSHER_APP_ID,
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  secret: import.meta.env.VITE_PUSHER_APP_SECRET,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
};

router.post("/addchat", async (req, res) => {
  const newChat = new Chat(req.body);
  const { teacher_id, student_id } = req.body;
  newChat.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }
    pusher.trigger(`chat-${teacher_id}-${student_id}`, "new-message", obj);

    res.status(200).json({
      success: true,
      message: "Chat created successfully!",
      data: obj,
    });
  });
});

// router.put("/addchat1", async (req, res) => {
//   // const newChat = new Chat(req.body);
//   const newMsg = {
//     sender: req.body.msgs[0].sender_id,
//     msg: req.body.msgs[0].msg,
//   };
//   Chat.findByIdAndUpdate(
//     {
//       $or: [
//         {
//           sender_id: req.body.sender_id,
//           reciever_id: req.body.reciever_id,
//         },
//         {
//           sender_id: req.body.reciever_id,
//           reciever_id: req.body.sender_id,
//         },
//       ],
//     },
//     { $push: { msgs: newMsg } },
//     { new: true },
//     { upsert: true },
//     (err, obj) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({ success: false, error: err });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Chat updated successfully!",
//         data: obj,
//       });
//     }
//   );
// });
// router.put("/addmsg/:id", (req, res) => {

//   const newMsg = {
//     sender: req.body.sender_id,
//     msg: req.body.msg,
//   };
//   Chat.findByIdAndUpdate(
//     { _id: req.params.id },
//     { $push: { msgs: newMsg } },
//     { new: true },
//     (err, obj) => {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({ success: false, error: err });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Chat updated successfully!",
//         data: obj,
//       });
//     }
//   );
// });

router.get("/getAll", ({}, res) => {
  Chat.find({})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/get/:id", (req, res) => {
  Chat.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Chat", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
});
router.get("/getbyid/:id", (req, res) => {
  Chat.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Chat", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  })
    .populate({
      path: "msgs",
      populate: {
        path: "sender",
        model: "User",
        select: { _id: 1, nickname: 1, img: 1 },
      },
    })
    .populate({
      path: "reciever_id",
      model: "User",
      select: { _id: 1, nickname: 1, img: 1 },
    })
    .populate({
      path: "sender_id",
      model: "User",
      select: { _id: 1, nickname: 1, img: 1 },
    });
});

router.get("/getChats/:teacher_id/:student_id", (req, res) => {
  let data = [];
  Chat.find(
    {
      teacher_id: req.params.teacher_id,
      student_id: req.params.student_id,
    },
    (err, obj) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Failed to get Chat", success: false });
      }

      res.status(200).json({
        success: true,
        data: obj,
      });
    }
  )
    .populate({
      path: "student_id",
      model: "Student",
      select: { _id: 1, first_name: 1, last_name: 1, img: 1 },
    })
    .populate({
      path: "teacher_id",
      model: "Teacher",
      select: { _id: 1, first_name: 1, last_name: 1, img: 1 },
    });
});

router.get("/getTeacherContacts/:id", (req, res) => {
  Chat.aggregate(
    [
      {
        $match: {
          teacher_id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: "$student_id",
          chat: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "_id",
          as: "student",
        },
      },
      {
        $unwind: "$student",
      },
      {
        $project: {
          _id: 0,
          student: {
            _id: 1,
            img: 1,
            first_name: 1,
            last_name: 1,
          },
          chat: {
            sender: 1,
            msg: 1,
          },
        },
      },
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ message: "Failed to get Chats by teacher", success: false });
      } else {
        console.log(results);
        res.status(200).json({
          success: true,
          data: results,
        });
      }
    }
  );
});
router.get("/getStudentContacts/:id", (req, res) => {
  Chat.aggregate(
    [
      {
        $match: {
          student_id: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: "$teacher_id",
          chat: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "teachers",
          localField: "_id",
          foreignField: "_id",
          as: "teacher",
        },
      },
      {
        $unwind: "$teacher",
      },
      {
        $project: {
          _id: 0,
          teacher: {
            _id: 1,
            first_name: 1,
            last_name: 1,
            img: 1,
          },
          chat: {
            sender: 1,
            msg: 1,
          },
        },
      },
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ message: "Failed to get Chats by student", success: false });
      } else {
        console.log(results);
        res.status(200).json({
          success: true,
          data: results,
        });
      }
    }
  );
});
router.get("/getbyteacher/:id", (req, res) => {
  Chat.find({ teacher_id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Chats by teacher", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  });
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
  });
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
    }
  );
});

module.exports = router;
