import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import File from "../../models/File";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Function to upload file to Cloudinary and store in MongoDB
 * @param {*} req 
 * @returns 
 */
export async function POST(req) {
  try {
    console.log("[INFO] Received file upload request");

    // Connect to database
    await connectDB();
    console.log("[INFO] Connected to MongoDB");

    // Parse form data
    const formData = await req.formData();
    const userId = formData.get("userId");
    const file = formData.get("file");

    if (!userId || !file) {
      console.error("[ERROR] Missing userId or file");
      return NextResponse.json(
        { success: false, message: "userId and file are required" },
        { status: 400 }
      );
    }

    console.log(`[INFO] Uploading file for userId: ${userId}`);


    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dataURI = `data:${file.type};base64,${buffer.toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "uploadthing",
    });

    // console.log(`[INFO] File uploaded in ${Date.now() - start}ms`);
    console.log(`[INFO] Cloudinary URL: ${uploadResult.secure_url}`);

    // Extract data from Cloudinary response
    const publicId = uploadResult.public_id;
    const fileSizeKB = uploadResult.bytes / 1024;
    const fileSize = fileSizeKB > 1024 
      ? (fileSizeKB / 1024).toFixed(2) + " MB" 
      : fileSizeKB.toFixed(2) + " KB";

    console.log("[DEBUG] File size before upload:", file.size / 1024, "KB");


    // Save file metadata in MongoDB
    const newFile = await File.create({
      userId,
      name: file.name || uploadResult.original_filename,
      url: uploadResult.secure_url,
      public_id: publicId,
      size: fileSize,
      uploaded: new Date().toISOString(),
      status: "Uploaded",
    });

    console.log("[INFO] File saved to database:", newFile._id);

    return NextResponse.json(
      { success: true, uploaded: true, file: newFile },
      { status: 201 }
    );
  } catch (error) {
    console.error("[ERROR] Upload handler failed:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
