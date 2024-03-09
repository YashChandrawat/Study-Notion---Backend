const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
  try {
    // Data fetch
    const { sectionName, courseId } = req.body;
    // Data validation
    if (!sectionName || !courseId) {
      return res.status(401).json({
        success: false,
        message: "All fields are mandatory",
      });
    }
    // Create section
    const newSection = await Section.create({ sectionName });

    // Update the section in course schema
    // TODO :  Populate yaha pr aadhura he HOMEWORK de dia DADA ne
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // Return response

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot able to create section",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    // Data input
    const { sectionName, sectionId, courseId } = req.body;
    // Data validation
    if (!sectionName || !sectionId) {
      return res.status(401).json({
        success: false,
        message: "All the fields are mandatory",
      });
    }

    // Update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
     
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    // return res
    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
      data: course,  
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot able to update the Section",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });
    const section = await Section.findById(sectionId);
    console.log(sectionId, courseId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }

    //delete sub section
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    //find the updated course and return
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
