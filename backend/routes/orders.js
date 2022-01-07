var express = require("express");
const mongoose = require("mongoose");
var OrderModel = require("../models/order");
var ProductModel = require("../models/product");
var router = express.Router();
const jwt_decode = require("../middlewares/jwt_decode");

const updateProductAmount = (item, count) => {
  return new Promise(async (resolve, reject) => {
    try {
      const obj = await ProductModel.findById(item.product._id);
      const amount = obj.amount - item.amount;
      await ProductModel.updateOne(
        { _id: item.product._id },
        { $set: { amount } }
      );
      resolve({ message: "product update success" });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};

// create
router.post("/", async function (req, res) {
  try {
    const body = req.body;
    const obj = new OrderModel({ ...body });
    await obj.save();
    for (const product of body.product_lists) {
      await updateProductAmount(product, count);
    }
    return res.status(201).send({
      message: "create order success",
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
    const result = await OrderModel.find({});
    return res.status(200).send({
      data: result,
      message: "find all order",
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
    const result = await OrderModel.findById(id);
    return res.status(200).send({
      data: result,
      message: "find by id order",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

// put
router.put("/:id", jwt_decode, async function (req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "id Invalid",
      });
    }
    await OrderModel.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: payload }
    );
    const result = await OrderModel.findById(id);
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
    await OrderModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    return res.status(200).send({
      message: "delete order success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;