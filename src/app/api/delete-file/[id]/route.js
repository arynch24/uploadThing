import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import File from "../../../models/File";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = params;
        console.log("Received delete request for:", id);

        // Ensure ID exists
        if (!id) return NextResponse.json({ error: "Missing file ID" }, { status: 400 });

        // Find file in MongoDB
        const file = await File.findOne({ _id: id }); // 
        if (!file) return NextResponse.json({ error: "File not found in DB" }, { status: 404 });

        console.log("Deleting from Cloudinary:", file.public_id);

        // Delete from Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.destroy(file.public_id);
        console.log("Cloudinary Response:", cloudinaryResponse);

        if (cloudinaryResponse.result !== "ok" && cloudinaryResponse.result !== "not found") {
            return NextResponse.json({ error: "Cloudinary deletion failed" }, { status: 500 });
        }

        // Delete from MongoDB
        await File.deleteOne({ _id: id }); 
        console.log("File deleted from DB");

        return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
