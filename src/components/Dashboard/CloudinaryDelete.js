import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});

export const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Delete response:", result);
    return result;
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
