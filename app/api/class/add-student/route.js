import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import Class from "@/app/models/Class";
import Student from "@/app/models/Student"; // Ensure you have a Student model

export async function POST(req) {
  try {
    await dbConnect();

    const { classId, name, email } = await req.json();

    if (!classId || !name || !email) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    // Check if class exists
    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return NextResponse.json({ message: "Class not found!" }, { status: 404 });
    }

    // Check if student already exists
    let student = await Student.findOne({ email });
    if (!student) {
      // Create new student if not exists
      student = await Student.create({ name, email, classId });
    }

    // Check if student is already in the class
    if (existingClass.students.includes(student._id)) {
      return NextResponse.json({ message: "Student already registered in this class!" }, { status: 400 });
    }

    // Add student to the class
    existingClass.students.push(student._id);
    await existingClass.save();

    return NextResponse.json({ message: "Student added successfully!", student }, { status: 201 });

  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
