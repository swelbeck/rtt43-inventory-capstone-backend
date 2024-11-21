import initialData from "../data/data.mjs";
import Item from "../models/itemSchema.mjs";

// CREATE
async function createItem(req, res) {
  try {
    // Create a new item object
    let newItem = new Item(req.body);

    // Save new object to DB
    await newItem.save();

    // Return result
    res.json({ newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not create new item` });
  }
}

// READ
async function getAllItems(req, res) {
  try {
    // Find ALL {} inventory items from DB
    let allItems = await Item.find({});

    // Return results
    res.json(allItems);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: `Server Error - could not retrieve all items` });
  }
}

async function getOneItem(req, res) {
  try {
    // Find one item in inventory by ID from DB
    let oneItem = await Item.findById(req.params.id);

    // Return results
    res.json(oneItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not retrieve item` });
  }
}

async function getItemsByCategory(req, res) {
  const { category } = req.params;
  try {
    // Find items by category from DB
    let itemsByCategory = await Item.find({ category: category });

    // Return results
    if (itemsByCategory.length === 0) {
      return res
        .status(404)
        .json({ msg: `No items found for category: ${category}` });
    }

    res.json(itemsByCategory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: `Server Error - could not retrieve items by category` });
  }
}

// UPDATE
async function updateOneItem(req, res) {
  try {
    let id = req.params.id;
    let item = req.body;

    // Update item by ID from DB
    let updatedItem = await Item.findByIdAndUpdate(id, item, {
      new: true,
    });
    // {new: true} - sends back the newly updated data to the front end

    // Return results
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not update item` });
  }
}

// DELETE
async function deleteOneItem(req, res) {
  try {
    // Delete one from DB by ID
    let deletedItem = await Item.findByIdAndDelete(req.params.id, req.body);

    // Return results
    res.json(deletedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not delete item` });
  }
}

// SEED Database
async function seedDB(req, res) {
  try {
    await Item.deleteMany({});

    await Item.create(initialData.initialItems);

    res.json({ msg: "Item DB seeded" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: `Server Error - could not seed database` });
  }
}

export default {
  createItem,
  getAllItems,
  getOneItem,
  getItemsByCategory,
  updateOneItem,
  deleteOneItem,
  seedDB,
};
