const express = require("express");
const router = express.Router();
const { createItem, getItem, updateItem, deleteItem } = require("../controller/item.controller.js");

router.post("/", createItem);
router.get("/:id", getItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
