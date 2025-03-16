import connectDB from "@/lib/mongodb";
import File from "../../models/File";

/**
 * Function to retrieve uploaded files of the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export async function GET(req, res) {
  try {
    // Connect to database
    await connectDB();
    console.log("[INFO] Connected to MongoDB");

    // Log the incoming request URL
    console.log("[REQUEST URL]", req.url);

    // Extract userId from query params
    const userId = new URL(req.url).searchParams.get("userId");
    if (!userId) {
      console.error("[ERROR] Missing userId");
      return new Response(
        JSON.stringify({ message: "User ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("[INFO] Fetching files for user:", userId);

    // Pagination parameters
    const page = parseInt(new URL(req.url).searchParams.get("page")) || 1;
    const limit = parseInt(new URL(req.url).searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    console.log(`[INFO] Pagination -> Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

    // Fetch files from DB with pagination and only required fields
    const userFiles = await File.find({ userId })
      .select("name url createdAt")  // Select only necessary fields
      .sort({ createdAt: -1 })       // Sort by latest files first
      .skip(skip)
      .limit(limit);

    console.log(`[INFO] Retrieved ${userFiles.length} files for user ${userId}`);

    if (userFiles.length === 0) {
      console.warn("[WARNING] No files found for user:", userId);
      return new Response(
        JSON.stringify({ message: "There are no files" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log(`[INFO] ${userFiles}`);
    // Send response
    return new Response(
      JSON.stringify({ success: true, files: userFiles }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[ERROR]", error.message);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
