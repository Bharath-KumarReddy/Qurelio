const mongoose = require("mongoose");

const audioUploadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  transcript: { type: String },
  sentimentScore: { type: Number },
  urgencyRank: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const AudioUpload = mongoose.model("AudioUpload", audioUploadSchema);

module.exports = AudioUpload;