import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import Attendance from "@/models/Attendance"; // Create this model

export async function POST(req) {
  try {
    await dbConnect();
    
    const { date, attendance } = await req.json(); // Receiving attendance data

    if (!date || !attendance || !Array.isArray(attendance)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Save attendance
    const newAttendance = new Attendance({ date, records: attendance });
    await newAttendance.save();

    return NextResponse.json({ message: "Attendance saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving attendance:", error);
    return NextResponse.json({ error: "Failed to save attendance" }, { status: 500 });
  }
}
