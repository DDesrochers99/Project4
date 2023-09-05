const express = require("express");
const router = express.Router();

const authenticateAdmin = require("../../controllers/api/admin");

// Protected admin route
router.get("/admin-page", authenticateAdmin, (req, res) => {
  // This route can only be accessed by admins
  res.json({ msg: "Admin page" });
});

module.exports = router;
