import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Make password optional
  });
  

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
