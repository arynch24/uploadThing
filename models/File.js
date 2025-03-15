// models/File.js
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  size: String,
  uploaded: String,
  status: String
}, {
  collection: 'files' // Explicitly name the collection (optional)
});

const File = mongoose.models.File || mongoose.model('File', fileSchema);

export default File;