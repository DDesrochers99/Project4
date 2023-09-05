const express = require("express");
const router = express.Router();
const productsCtrl = require("../../controllers/api/products");

router.get("/", productsCtrl.index);
// router.get("/", productsCtrl.getAllProducts);

router.post("/", productsCtrl.createProduct);

// router.put("/:id", productsCtrl.updateProduct);
// router.delete("/:id", productsCtrl.deleteProduct);


module.exports = router;
