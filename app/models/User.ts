import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    email: String,
    password: String,
    email_verified_at: Date,
    created_at: Date,
    updated_at: Date
};

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, index: true, required: true },
    password: { type: String, required: true },
    email_verified_at: Date,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model<IUser>('User', UserSchema);