var express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var UserModel = require("../models/user");
var router = express.Router();

// create
router.post("/", async function (req, res) {
  try {
    const body = req.body;
    const hash_password = await bcrypt.hash(body.password, 10);
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

//  get all
router.get("/", async function (req, res) {
  try {
    const result = await UserModel.find({});
    res.status(200).send({
      data: result,
      message: "find all users",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

//  get by id
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "id Invalid",
      });
    }
    const result = await UserModel.findById(id);
    res.status(200).send({
      data: result,
      message: "find by id user",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

//  put
router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "id Invalid",
      });
    }
    await UserModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: payload }
    );
    const result = await UserModel.findById(id);
    res.status(200).send({
      data: result,
    });
    res.status(200).send({
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

//  delete
router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).send({
        message: "id Invalid",
      });
    }
    await UserModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    res.status(200).send({
      message: "delete user success",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
