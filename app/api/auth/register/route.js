import bcrypt from "bcryptjs";
import dbConnect from "@/app/utils/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    console.log("✅ User registered:", newUser);
    return new Response(JSON.stringify({ message: "User created successfully", user: newUser }), { status: 201 });

  } catch (error) {
    console.error("❌ Registration error:", error);
    return new Response(JSON.stringify({ message: "Internal server error", error: error.message }), { status: 500 });
  }
}
