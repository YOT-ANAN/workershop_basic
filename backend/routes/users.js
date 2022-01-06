var express = require("express");
const bcrypt = require("bcrypt");
var UserModel = require("../models/user");
var router = express.Router();

/* GET users listing. */

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const hash_password = await bcrypt.hash(body.password,10);
    const obj = new UserModel({ ...body, password: hash_password });
    await obj.save();
    res.status(201).send({
      message: "create user success",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
