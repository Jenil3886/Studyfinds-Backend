const express = require("express");
const router = express.Router();
const {
  addCache,
  getCaches,
  updateCache,
  deleteCache,
  upload,
} = require("../controller/cache.controller.js");

router.post("/", upload.single("photo"), addCache);
router.put("/:id", updateCache);
router.delete("/:id", deleteCache);
router.get("/", getCaches);
router.get("/:id", getCaches);

module.exports = router;
