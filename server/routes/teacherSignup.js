const router = require("express").Router();
const Teacher = require("./../models/teacher");
const auth = require("./../middleware/auth");
const upload = require("./upload");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
router.get("/add/:email", async (req, res) => {
  const email = req.params.email;

  try {
    let code = Math.floor(100000 + Math.random() * 900000);
    const subject = "Teachify || Activate your account";
    const html = "<h1>Your verification code is :" + code + "</h1>";

    const isUserSaved = await Teacher.findOne({ email: email });
    if (isUserSaved) {
      if (isUserSaved.is_email_verified && !isUserSaved.is_profile_completed) {
        return res.status(200).json({
          auth: false,
          message: "Email Already Exist and verfied, Please complete profile",
          success: true,
          data: isUserSaved,
        });
      }
      if (isUserSaved.is_email_verified && isUserSaved.is_profile_completed) {
        return res.status(200).json({
          message: "Email Already Exist and completed. Please login",
          success: true,
          data: isUserSaved,
        });
      }
      if (!isUserSaved.is_email_verified) {
        return res.status(200).json({
          success: true,
          message:
            "User already created but not verified, Please verified your email first",
          data: isUserSaved,
        });
      }
    }

    if (!isUserSaved || !isUserSaved.is_email_verified) {
      const isMail = await sendMail(email, subject, html);
      if (!isMail) {
        return res
          .status(400)
          .json({ message: "Failed to send mail", success: false });
      }
    }

    const teacher = new Teacher({ email: email, token: code });

    const isSave = await teacher.save();
    res.status(200).json({
      success: true,
      message: "User created successfully!\nPlease Activate your account",
      data: isSave,
    });
    // }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false, error: err });
  }
});

router.get("/verifyEmailCode/:code", (req, res) => {
  const token = req.params.code;
  if (!token) {
    return res.status(400).json({ message: "Code not found", success: false });
  }
  console.log(token);
  Teacher.findOne({ token: token }, (err, data) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get", err: err, success: false });
    }

    if (!data) {
      return res.status(400).json({ message: "Invalid Code", success: false });
    }
    if (data.is_email_verified) {
      return res
        .status(400)
        .json({ message: "Email already verified", success: false });
    }
    data.is_email_verified = true;
    data.save((err1, doc) => {
      if (err1) {
        console.log(err1);
        return res
          .status(400)
          .json({ message: "Failed to get", err: err1, success: false });
      }

      return res.status(200).json({
        data: doc,
        message: "Email Verified successfully",
        success: true,
      });
    });
  });
});
router.post("/teacher", (req, res) => {
  const object = new Teacher(req.body);
  object.save((err, obj) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false, error: err });
    }

    res.status(200).json({
      success: true,
      message: "Teacher created successfully!",
      item: obj,
    });
  });
});

router.get("/teacher", ({}, res) => {
  Teacher.find({}, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Teacher", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  }).populate("teacher_id");
});

router.post("/login", (req, res, next) => {
  const login = req.body.email;
  Teacher.findOne({ email: login }, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to Login", success: false });
    }

    if (!user) {
      return res.status(201).json({
        message: "Invalid Email",
        success: false,
      });
    }
    // if (!user.is_email_verified) {
    //   return res.status(201).json({
    //     message: "Please Activate your email first",
    //     success: false,
    //   });
    // }
    if (!user.is_email_verified) {
      return res.status(201).json({
        message: "Please Activate your email first",
        success: false,
      });
    }
    if (user.password != req.body.password) {
      return res.status(201).json({
        message: "Invalid Password. Please try Again.",
        success: false,
      });
    }
    if (!user.password) {
      return res.status(201).json({
        message: "Invalid Password",
        success: false,
      });
    }
    // if (!bcrypt.compareSync(req.body.password, user.password)) {
    // if (!bcrypt.compareSync(req.body.password, user.password)) {
    //   return res.status(201).json({
    //     message: "Invalid Password",
    //     success: false,
    //   });
    // }

    let jwtToken;

    jwtToken = jwt.sign(
      {
        email: user.email,
        userId: user._id,
        isLoggedIn: true,
        userData: user,
      },
      "longer-secret-is-better",
      {
        expiresIn: "10h",
      },
    );

    return res.status(200).json({
      token: jwtToken,
      expiresIn: 86400,
      userData: user,
      success: true,
      message: "Login Successfull",
    });
  });
});

router.get("/teacher/:id", (req, res) => {
  Teacher.findOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to get Teacher", success: false });
    }

    res.status(200).json({
      success: true,
      data: obj,
    });
  }).populate("teacher_id");
});

router.delete("/teacher/:id", (req, res) => {
  Teacher.deleteOne({ _id: req.params.id }, (err, obj) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Failed to delete", success: false, err: err });
    }
    res.status(200).json({
      success: true,
      data: obj,
      message: "Teacher Deleted succesfully",
    });
  });
});

router.put("/teacher/:id", (req, res) => {
  Teacher.findByIdAndUpdate(
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
        message: "Teacher updated successfully!",
        data: obj,
      });
    },
  );
});

router.put("/changePassword/:id", (req, res, next) => {
  Teacher.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(400)
        .json({ message: "Failed to Find user", success: false, error: err });
    }

    if (req.body.old_password != user.password) {
      console.log("fromuser", req.body.old_password);
      console.log("fromdb", user.password);
      return res.status(201).json({
        message: "Old password is incorrect",
        success: false,
      });
    }

    if (req.body.new_password != req.body.confirm_password)
      return res
        .status(201)
        .json({ message: "Password not match", success: false });

    Teacher.findByIdAndUpdate(
      { _id: req.params.id },
      { password: req.body.new_password },
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
          message: "Student updated successfully!",
          data: obj,
        });
      },
    );
  });
});

router.post("/upload", (req, res) => {
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

async function sendMail(email, subject, msg) {
  console.log("hello");
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "moizshaikh83@gmail.com",
        // pass: 'vyywufdeguqtwkwm'
        // pass: "lcckeuhsgsdhzgya",
        pass: "cwpxictdqmylvuej",
      },
    });
    let mailDetails = {
      from: "moizshaikh83@gmail.com",
      to: email,
      subject: subject,
      html: msg,
    };

    let info = await transporter.sendMail(mailDetails);
    if (info.messageId) {
      console.log("success");
      console.log(info);
      return true;
    } else {
      console.log("error");
      console.log(info);
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
