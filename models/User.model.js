import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['Student', 'Recruiter'],
        default: 'Student',
        required: true,

    },
    phone: {
        type: String
    },
    profile: {
        bio: {
            type: String,
        },
        skills: [{ type: String }],
        resume: {
            type: String, // URL to resume file
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
        profilePhoto: {
            type: String, // URL to profile photo file
            default: "",
        },
    },
}
    , {
        timestamps: true
    }
);
export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
