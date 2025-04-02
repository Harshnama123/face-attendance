import dbConnect from "@/app/utils/dbConnect";
import User from "@/models/User"; // Ensure you're importing the right model

export async function GET(req, { params }) {
  await dbConnect();
  
  const { classId } = params; // Get classId from URL

  try {
    console.log("Fetching students for class:", classId);

    const students = await User.find({ classId }); // Ensure classId exists in DB

    console.log("Students fetched:", students); // Debugging log

    return Response.json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return Response.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
