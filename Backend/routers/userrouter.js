const express = require("express");
const { userall } = require("../models/usermodel");
const router = express.Router();

router.post("/oneuser", async (req, res) => {
  const user = new userall({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    location: req.body.location,
    email: req.body.email,
    date: req.body.date,
    month: req.body.month,
    year: req.body.year,
    education: req.body.education,
  });

  await user.save();

  try {
    res.status(201).send("one user resgister sucessfully");
    console.log("sucess");
  } catch {
    res.status(401).send("something error....");
  }
});

router.get("/alluser", async (req, res) => {
  const result = await userall.find({});
  try {
    res.status(201).send({ users: result });
  } catch {
    res.status(401).send("something went wrong");
  }
});
router.delete("/deleteuser", async (req, res) => {
  await userall.findByIdAndDelete(req.body._id);
  try {
    res.status(201).send("User has been deleted succefully..!");
  } catch {
    res.status(401).send("something went wrong");
  }
});

router.put("/updateuser", async (req, res) => {
  var updateuser = await userall.findByIdAndUpdate(req.body._id);
  (updateuser.firstname = req.body.firstname),
    (updateuser.lastname = req.body.lastname),
    (updateuser.location = req.body.location),
    (updateuser.email = req.body.email),
    (updateuser.date = req.body.date),
    (updateuser.month = req.body.month),
    (updateuser.year = req.body.year),
    (updateuser.education = req.body.education);
  await updateuser.save();
  try {
    res.status(201).send("User has been updated successfully");
  } catch {
    res.status(401).send("something went wrong");
  }
});

module.exports = router;
