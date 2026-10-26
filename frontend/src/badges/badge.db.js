const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  score: Number,
});

const Badge = mongoose.model("Badge", badgeSchema);

module.exports = Badge;
