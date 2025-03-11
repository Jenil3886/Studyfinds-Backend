const router = require("express").Router();

const authRoutes = require("./auth.routes");
const cacheRoutes = require("./cache.routes");
const itemRoutes = require("./item.routes");
const userRoutes = require("./user.routes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/caches", cacheRoutes);
router.use("/items", itemRoutes);

module.exports = router;
