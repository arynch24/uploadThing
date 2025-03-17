"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import File from "@/models/File";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFile(formData) {
  try {
    console.log("[INFO] Uploading file...");

    // Connect to MongoDB
    await connectDB();
    console.log("[INFO] Connected to MongoDB");

    // Get values from FormData
    const userId = formData.get("userId");
    const file = formData.get("file");

    if (!userId || !file) {
      return { success: false, message: "userId and file are required" };
    }

    console.log(`[INFO] Uploading file for userId: ${userId}`);

    if (!(file instanceof Blob)) {
      return { success: false, message: "Invalid file format" };
    }

    // Use a stream instead of a buffer
    const stream = file.stream();

    // Upload file to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploadthing" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.pipe(uploadStream);
    });

    console.log("[INFO] File uploaded to Cloudinary:", uploadResult.secure_url);

    // Save file metadata in MongoDB
    const newFile = await File.create({
      userId,
      name: file.name || uploadResult.original_filename,
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      size: (uploadResult.bytes / 1024).toFixed(2) + " KB",
      uploaded: new Date().toISOString(),
      status: "Uploaded",
    });

    console.log("[INFO] File saved to database:", newFile._id);

    // Revalidate the page to reflect new uploads
    revalidatePath("/dashboard");

    return { success: true, file: newFile };
  } catch (error) {
    console.error("[ERROR] Upload handler failed:", error);
    return { success: false, message: error.message };
  }
}
