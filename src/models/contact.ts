import { Document, Schema, model } from "mongoose";

export interface IContactDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    created_at: Date;
    updated_at: Date;
}

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: "Enter a first name"
    },
    lastName: {
        type: String,
        required: "Enter a last name"
    },
    email: {
        type: String
    },
    company: {
        type: String
    },
    phone: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

const Contact = model<IContactDocument>("Contact", ContactSchema);

export default Contact;
