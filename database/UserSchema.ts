import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, index: true },
    password: String,
    email_verified_at: Date,
    created_at: Date,
    updated_at: { type: Date, default: Date.now }
});

export default UserSchema;
