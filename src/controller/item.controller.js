const Item = require("../models/item.model.js");

const createItem = async (req, res) => {
	try {
		const { user_id, cache_id, type, title, cover_image, description, sources } = req.body;

		if (!user_id || !cache_id || !title) {
			return res.status(400).json({ message: "user_id and title are required" });
		}
		const itemData = {
			user_id,
			cache_id,
			title,
			type: type || "PUBLIC",
			cover_image,
			description,
			sources: sources || [],
		};

		const newItem = await Item.create(itemData);

		return res.status(201).json({
			success: true,
			message: "Item created successfully",
			data: newItem,
		});
	} catch (error) {
		console.error(error);
		if (error.name === "ValidationError" || error.name === "CastError") {
			return res.status(400).json({ message: "Invalid data", error: error.message });
		}
		return res.status(500).json({
			success: false,
			message: "Server error while creating item",
			error: error.message,
		});
	}
};

const getItem = async (req, res) => {
	try {
		const { id } = req.params;
		const query = id ? { _id: id } : {};

		const items = await Item.find(query).populate("user_id").lean(); // Fixed variable name and populate path

		if (!items.length && id) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.status(200).json({
			message: id ? "Item retrieved successfully" : "Items retrieved successfully",
			data: id ? items[0] : items,
		});
	} catch (error) {
		if (error.name === "CastError") {
			return res.status(400).json({ message: "Invalid ID" });
		}
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const updateItem = async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id, title, type, cover_image, sources } = req.body; // Fixed field names

		const updateData = {};
		if (user_id) updateData.user_id = user_id;
		if (title) updateData.title = title;
		if (type) updateData.type = type;
		if (cover_image) updateData.cover_image = cover_image;
		if (sources) updateData.sources = sources;

		const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		});

		if (!updatedItem) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.status(200).json({
			message: "Item updated successfully",
			data: updatedItem,
		});
	} catch (error) {
		if (error.name === "ValidationError" || error.name === "CastError") {
			return res.status(400).json({ message: "Invalid data", error: error.message });
		}
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

const deleteItem = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedItem = await Item.findByIdAndDelete(id);

		if (!deletedItem) {
			return res.status(404).json({ message: "Item not found" });
		}

		res.status(200).json({
			message: "Item deleted successfully",
		});
	} catch (error) {
		if (error.name === "CastError") {
			return res.status(400).json({ message: "Invalid ID" });
		}
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

module.exports = { createItem, getItem, updateItem, deleteItem };
