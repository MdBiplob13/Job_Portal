import User from "@/app/models/userModel";
import connectMongoDb from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectMongoDb();

    const { userId, language, proficiency } = await req.json();
    if (!userId || !language) {
      return NextResponse.json(
        { status: "fail", message: "Invalid request" },
        { status: 400 }
      );
    }

    // find user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    // new language entry
    const newLanguageEntry = {
      _id: new mongoose.Types.ObjectId(),
      language,
      proficiency,
    };

    // update language array
    user.languages.push(newLanguageEntry);
    await user.save();

    return NextResponse.json({
      status: "success",
      message: "Language updated successfully.",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "An error occurred while updating language.",
      error: error.message,
    });
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDb();

    const { userId, languageId } = await req.json();
    if (!userId || !languageId) {
      return NextResponse.json(
        { status: "fail", message: "Invalid request" },
        { status: 400 }
      );
    }

    // find user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { status: "fail", message: "User not found" },
        { status: 404 }
      );
    }

    console.log(user?.languages)
    console.log("🚀 ~ DELETE ~ languageId:", languageId)

    // update language array
    user.languages = user.languages.filter(
      (lang) => lang._id.toString() !== languageId.toString()
    );
    console.log("🚀 ~ DELETE ~ user.languages:", user.languages)

    
    await user.save();

    return NextResponse.json({
      status: "success",
      message: "Language deleted successfully.",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "An error occurred while deleting language.",
      error: error.message,
    });
  }
}
