import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subject: { type: String, required: true },
  professorId: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Assuming students are stored in User model
});

export default mongoose.models.Class || mongoose.model("Class", ClassSchema);
