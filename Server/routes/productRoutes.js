const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

router.route("/addProduct").post(productController.addProduct);

router.route("/getProduct").get(productController.getProduct);

module.exports = router;