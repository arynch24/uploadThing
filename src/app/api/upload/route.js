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
 * Function to upload the file in cloudinary and update it in the mongoDB 
 * @param {*} req 
 * @returns 
 */

export async function POST(req) {
  try {
    await connectDB();

    // Parse the form data
    const formData = await req.formData();

    const userId = formData.get("userId");
    const file = formData.get("file");

    // Validate inputs
    if (!userId || !file) {
      return NextResponse.json(
        { success: false, message: "userId and file are required" },
        { status: 400 }
      );
    }

    // OPTION 1: Using Cloudinary SDK directly (recommended)
    // Convert File object to buffer/dataURI for Cloudinary SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Start timing
    const start = Date.now();

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploadthing" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });

    console.log(`⏳ Upload time: ${Date.now() - start}ms`);
    
    console.log("Full Cloudinary Response:", uploadResult);

    // Extract public_id from Cloudinary response
    const publicId = uploadResult.public_id;

    console.log("Uploaded File Public ID:", publicId);


    // OPTION 2: Or if you prefer the fetch API approach:
    // const uploadFormData = new FormData();
    // uploadFormData.append("file", file);
    // uploadFormData.append("upload_preset", formData.get("upload_preset") || "ml_default");
    // uploadFormData.append("folder", formData.get("folder") || "uploadthing");
    //
    // const response = await fetch(
    //   `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    //   {
    //     method: "POST",
    //     body: uploadFormData,
    //   }
    // );
    // const uploadResult = await response.json();
    // if (!response.ok) {
    //   throw new Error(uploadResult.error?.message || "Failed to upload to Cloudinary");
    // }

    console.log("File uploaded to:", uploadResult.secure_url);

    // Save file to MongoDB
    const newFile = await File.create({
      userId: userId,
      name: file.name || uploadResult.original_filename,
      url: uploadResult.secure_url,
      public_id: publicId,
      size: (uploadResult.bytes / 1024).toFixed(2) + " KB",
      uploaded: new Date().toLocaleDateString(),
      status: "Uploaded",
    });

    console.log("File saved to database");

    // send response with file
    return NextResponse.json(
      { success: true, uploaded: true, file: newFile },
      { status: 201 }
    );
  } catch (error) {
    // error : send error response
    console.error("Error in upload handler:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
