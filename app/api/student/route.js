import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();
    
    const { name, email } = await req.json();
    console.log("📌 Adding Student:", name, email);

    if (!name || !email) {
      return NextResponse.json({ error: "Name and Email are required" }, { status: 400 });
    }

    // Check if student already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Student already exists" }, { status: 409 });
    }

    // Create new student
    const newUser = new User({ name, email, password: "defaultPassword123" });
    await newUser.save();
    

    console.log("✅ Student added successfully:", newUser);
    return NextResponse.json({ message: "Student added successfully", student: newUser }, { status: 201 });

  } catch (error) {
    console.error("🔥 Error Adding Student:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
