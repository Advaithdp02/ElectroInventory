import Item from "../models/items.js";

// GET /api/items?page=1&limit=10&type=Laptops&sortBy=price&order=asc
export const getItems = async (req, res) => {
  try {
    let { page = 1, limit = 10, type, sortBy = "createdAt", order = "desc" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (type) {
      filter.type = type;
    }

    const sortOrder = order === "asc" ? 1 : -1;

    const items = await Item.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = await Item.countDocuments(filter);

    res.json({
      items,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      totalItems
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
};

// GET /api/items/types
export const getTypes = async (req, res) => {
  try {
    const types = await Item.distinct('type');
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch types' });
  }
};

// POST /api/items
export const createItem = async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating item", error: err.message });
  }
};

// PUT /api/items/:id
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error updating item", error: err.message });
  }
};

// DELETE /api/items/:id
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
};
