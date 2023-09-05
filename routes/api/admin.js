const express = require("express");
const router = express.Router();

const authenticateAdmin = require("../../controllers/api/admin");

router.get("/admin-page", authenticateAdmin, (req, res) => {
  res.json({ msg: "Admin page" });
});

module.exports = router;
