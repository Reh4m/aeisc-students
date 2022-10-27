const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  controlNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
