const express = require("express");
const router = express.Router();
const itemsCtrl = require("../../controllers/api/products");

router.get("/", itemsCtrl.index);
router.get("/:id", itemsCtrl.show);

module.exports = router;
