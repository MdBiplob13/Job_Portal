import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Utility: keep only allowed fields
const pickFields = (data, allowed) => {
  const filtered = {};
  allowed.forEach((key) => {
    if (data[key] !== undefined) filtered[key] = data[key];
  });
  return filtered;
};

export async function PUT(req) {
  try {
    await connectMongoDb();

    const { userId, userData } = await req.json();
    if (!userId || !userData) {
      return NextResponse.json(
        { status: "fail", message: "Invalid request" },
        { status: 400 }
      );
    }

    // Allowed fields only
    const allowedFields = [
      "name",
      "userName",
      "banner",
      "photo",
      "headline",
      "bio",
      "location",
      "chargeParHour",
      "Languages",
      "currentJobStatus",
      "currentPosition",
      "phone",
      "email",
      "social",
      "paymentMethods",
      "status",
      "role",

      // Nested fields allowed
      "review",
      "job",
    ];

    const updatedUserData = pickFields(userData, allowedFields);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedUserData },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectMongoDb();

    const {userId, oldPassword, newPassword} = await req.json();
    if (!userId || !oldPassword || !newPassword) {
      return NextResponse.json(
        { status: "fail", message: "Invalid request" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    // Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { status: "fail", message: "Old password is incorrect" },
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: error.message,
      },
      { status: 500 }
    )
  }
}
