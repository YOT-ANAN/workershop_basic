var express = require("express");
const mongoose = require("mongoose");
var ProductModel = require("../models/product");
var router = express.Router();
const jwt_decode = require("../middlewares/jwt_decode");
const genProductCode = require("../functions/padZero");

// create
router.post("/", async function (req, res) {
  try {
    const body = req.body;
    const prevProduct = await ProductModel.findOne().sort({ createdAt: -1 });

    // generate product code with utils function
    const product_code = genProductCode(
      prevProduct ? prevProduct.product_code : "0",
      5
    );

    const obj = new ProductModel({ ...body, product_code });
    await obj.save();
    return res.status(201).send({
      message: "สร้างสินค้าสำเร็จ",
    });
  } catch (error) {
    return res.status(201).send({
      message: error.message,
    });
  }
});

// get all
router.get("/", async function (req, res) {
  try {
    const result = await ProductModel.find({});
    return res.status(200).send({
      data: result,
      message: "find all product",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

// get by id
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
      });
    }
    const result = await ProductModel.findById(id);
    return res.status(200).send({
      data: result,
      message: "find by id product",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

// put
router.put("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
      });
    }
    await ProductModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: payload }
    );
    const result = await ProductModel.findById(id);
    return res.status(200).send({
      data: result,
      message: "แก้ไขสินค้าสำเร็จ",
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
    await ProductModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    return res.status(200).send({
      message: "ลบสินค้าสำเร็จ",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
