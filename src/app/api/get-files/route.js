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
    // connect database
    await connectDB();

    console.log(req.url);

    // fetch userId from url params
    const userId  = new URL(req.url).searchParams.get("userId");

    // Send error response if there is no user id
    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // debug: userId
    console.log(userId);

    // Find files for the specific user
    const userFiles = await File.find({ userId });

    // no files
    if (!userFiles) {
      return new Response(
        JSON.stringify({ message: "There are no files"}), {
        status: 400
      });
    }

    // send response with all files
    return new Response(JSON.stringify({ success: true, files: userFiles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {

    // Error response
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
