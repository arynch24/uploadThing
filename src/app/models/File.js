import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String, // Store the Cloudinary public_id
      required: true,
    },
    size: String,
    uploaded: String,
    status: String,
  },
  {
    collection: "files",//optional
  }
);

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;
