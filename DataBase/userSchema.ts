import mongoose, { Schema } from "mongoose";
import { IUser } from "../model/IUser";
import exp from "constants";

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, uppercase: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }

},
    {
        timestamps: true
    }
)

export const User = mongoose.model<IUser>('User', UserSchema);
