const Cache = require("../models/cache.model.js");
const multer = require("multer");
const path = require("path");
// // Add a new cache
// const addCache = async (req, res) => {
// 	try {
// 		const { user_id, title, type, cover_img, items } = req.body;

// 		if (!user_id || !title || !cover_img) {
// 			return res.status(400).json({ message: "user_id, title, and cover_img are required" });
// 		}

// 		const newCache = new Cache({
// 			// user_id,
// 			title,
// 			type: type || "PUBLIC",
// 			cover_img,
// 			items: items || [],
// 		});

// 		const savedCache = await newCache.save();
// 		const populatedCache = await Cache.findById(savedCache._id).populate("user_id items.item_id");
// 		console.log("Populated Cache:", populatedCache);
// 		res.status(201).json({
// 			message: "Cache created successfully",
// 			data: savedCache,
// 		});
// 	} catch (error) {
// 		res.status(500).json({ message: "Server error", error: error.message });
// 	}
// };

// add cache

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add a new cache
const addCache = async (req, res) => {
  console.log("you are anterd in ass cahche");
  try {
    const { title, type, items } = req.body;
    const cover_img = req.file ? req.file.filename : null;

    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }

    const newCache = new Cache({
      title,
      type: type || "PUBLIC",
      cover_img,
      items: items || [],
    });

    const savedCache = await newCache.save();
    const populatedCache = await Cache.findById(savedCache._id).populate("user_id items.item_id");
    console.log("Populated Cache:", populatedCache);
    res.status(201).json({
      message: "Cache created successfully",
      data: savedCache,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getCaches = async (req, res) => {
  try {
    const caches = await Cache.find({ type: "public" }).populate("user_id items.item_id").lean();

    if (!caches.length && id) {
      return res.status(404).json({ message: "Cache not found" });
    }

    res.status(200).json({
      message: "Caches retrieved successfully",
      data: caches,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a specific cache by ID
const updateCache = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, title, type, cover_img, items } = req.body;

    const updatedCache = await Cache.findByIdAndUpdate(
      id,
      { user_id, title, type, cover_img, items },
      { new: true, runValidators: true }
    );

    if (!updatedCache) {
      return res.status(404).json({ message: "Cache not found" });
    }

    res.status(200).json({
      message: "Cache updated successfully",
      data: updatedCache,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a specific cache by ID
const deleteCache = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCache = await Cache.findByIdAndDelete(id);

    if (!deletedCache) {
      return res.status(404).json({ message: "Cache not found" });
    }

    res.status(200).json({
      message: "Cache deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { addCache, getCaches, updateCache, upload, deleteCache };
