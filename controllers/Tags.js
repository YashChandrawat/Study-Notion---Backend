const Tags = require("../models/Tags");
// Create handler function
exports.createTags = async (req, res) => {
  try {
    // Data fetch
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create entry in db
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });
    console.log(tagDetails);

    // Create tag entry
    return res.status(200).json({
      success: true,
      message: "Tag created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create a tag",
    });
  }
};

exports.showAllTags = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: "All Tag Fetched Out successfully",
      allTags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all the tag",
    });
  }
};
