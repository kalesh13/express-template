import mongoose, { Document } from 'mongoose';
import { IUser } from '../../../app/models/User';

export interface IToken extends Document {
    token: String,
    expiry: Date,
    refresh_token: String,
    user: IUser['_id'],
    created_at: Date,
    updated_at: Date
};

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    token: { type: String, unique: true },
    expiry: Date,
    refresh_token: { type: String, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.model<IToken>('Token', TokenSchema);