import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }, // Assuming you have a Class model
});

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
