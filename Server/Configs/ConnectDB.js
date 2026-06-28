import mongoose from "mongoose";
import { setMemoryStoreEnabled } from "./fallbackStore.js";

const isConfiguredMongoUrl = (value) => {
    const normalized = value?.trim();

    if (!normalized) return false;

    const lower = normalized.toLowerCase();
    if (lower.includes("add your") || lower.includes("your mongodb")) {
        return false;
    }

    return normalized.startsWith("mongodb://") || normalized.startsWith("mongodb+srv://");
};

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;

        if (!isConfiguredMongoUrl(mongoUrl)) {
            console.log("No valid MONGODB_URL found. Using in-memory user store for local auth")
            setMemoryStoreEnabled(true)
            return;
        }

        await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 5000 })
        console.log("DB Connected")
        setMemoryStoreEnabled(false)
    } catch (error) {
        console.log("DB Error", error.message || error)
        setMemoryStoreEnabled(true)
        console.log("Using in-memory user store for local auth")
    }
}

export default connectDB