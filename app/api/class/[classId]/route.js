import dbConnect from "@/app/utils/dbConnect";
import Class from "@/models/Class";

// GET: Fetch class details by classId
export async function GET(req, { params }) {
  await dbConnect();

  try {
    const { classId } = params;
    const classData = await Class.findById(classId);

    if (!classData) {
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(classData), { status: 200 });
  } catch (error) {
    console.error("Error fetching class:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// PUT: Update class details
export async function PUT(req, { params }) {
  await dbConnect();

  try {
    const { classId } = params;
    const body = await req.json();
    const { className, subject } = body;

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { className, subject },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Class updated successfully", updatedClass }), { status: 200 });
  } catch (error) {
    console.error("Error updating class:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

// DELETE: Remove a class
export async function DELETE(req, { params }) {
  await dbConnect();

  try {
    const { classId } = params;

    const deletedClass = await Class.findByIdAndDelete(classId);

    if (!deletedClass) {
      return new Response(JSON.stringify({ error: "Class not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Class deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting class:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
