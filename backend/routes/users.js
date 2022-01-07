var express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var UserModel = require("../models/user");
var router = express.Router();
const jwt = require("jsonwebtoken");
const jwt_decode = require("../middlewares/jwt_decode");

// create
router.post("/", async function (req, res) {
  try {
    const body = req.body;
    const hash_password = await bcrypt.hash(body.password, 10);
    const obj = new UserModel({ ...body, password: hash_password });
    await obj.save();
    return res.status(201).send({
      message: "create user success",
    });
  } catch (error) {
    return res.status(201).send({
      message: error.message,
    });
  }
});

//  get all
router.get("/", async function (req, res) {
  try {
    const result = await UserModel.find({});
    return res.status(200).send({
      data: result,
      message: "find all users",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//  get by id
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
      });
    }
    const result = await UserModel.findById(id);
    return res.status(200).send({
      data: result,
      message: "find by id user",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//  put
router.put("/:id", jwt_decode, async function (req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
      });
    }
    await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: payload }
    );
    const result = await UserModel.findById(id);
    return res.status(200).send({
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//  delete
router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
      });
    }
    await UserModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    return res.status(200).send({
      message: "delete user success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

//  login
router.post("/auth/login", async function (req, res) {
  try {
    
    const { username, password } = req.body;
    const result = await UserModel.findOne({ username });

    if (!result) {
      return res.status(401).send({
        message: "username not found",
      });
    }

    const check = await bcrypt.compare(password, result.password);

    const token = await jwt.sign(
      { _id: result._id, username },
      process.env.JWT_SECRET
    );

    if (!check) {
      return res.status(401).send({
        message: "password  is invalid",
      });
    }

    res.status(200).send({
      data: result,
      token: token,
      message: "authentication success",
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
