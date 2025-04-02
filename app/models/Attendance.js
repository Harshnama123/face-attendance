import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: "dd-mm-yyyy"
  records: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: String, required: true },
      status: { type: String, enum: ["P", "A"], required: true }, // P = Present, A = Absent
    },
  ],
});

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
