import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import Class from "@/app/models/Class";

export async function POST(req) {
  try {
    await dbConnect();
    const { className, subject, professorId } = await req.json();

    if (!className || !subject || !professorId) {
      return NextResponse.json({ message: "All fields are required!" }, { status: 400 });
    }

    const newClass = new Class({ className, subject, professorId, students: [] });
    await newClass.save();

    return NextResponse.json({ message: "Class created successfully!", class: newClass }, { status: 201 });
  } catch (error) {
    console.error("Error creating class:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
