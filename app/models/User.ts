import mongoose from "mongoose";
import UserSchema from "../../database/UserSchema";

const User = mongoose.model('User', UserSchema);

export default User;