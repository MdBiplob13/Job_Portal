// app/api/dashboard/profile/skill/route.js
import Skill from "@/app/models/skillModel";
import connectMongoDb from "@/lib/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDb();

    const {
      userId,
      skill,
      proficiency,
      category = "Technical",
    } = await req.json();

    if (!userId || !skill) {
      return NextResponse.json(
        { status: "fail", message: "Invalid request" },
        { status: 400 }
      );
    }

    // find skill doc for this user (by userId field)
    let skillDoc = await Skill.findOne({ userId });

    const newSkill = {
      // let mongoose create subdocument _id automatically
      skillName: skill,
      proficiency,
      category,
    };

    if (skillDoc) {
      skillDoc.skills.push(newSkill);
      await skillDoc.save();
    } else {
      skillDoc = new Skill({
        userId,
        skills: [newSkill],
      });
      await skillDoc.save();
    }

    return NextResponse.json(
      { status: "success", message: "Skill added", data: skillDoc },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongoDb();

    // read userId from query param: /api/.../skill?userId=...
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { status: "fail", message: "Invalid request" },
        { status: 400 }
      );
    }

    const skillDoc = await Skill.findOne({ userId });

    if (!skillDoc) {
      return NextResponse.json(
        { status: "success", data: { skills: [] } },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { status: "success", data: { skills: skillDoc.skills } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDb();

    const { userId, skillId } = await req.json();

    if (!userId || !skillId) {
      return NextResponse.json(
        { status: "fail", message: "Invalid request" },
        { status: 400 }
      );
    }

    const skillDoc = await Skill.findOne({ userId });
    if (!skillDoc) {
      return NextResponse.json(
        { status: "fail", message: "No skills for this user" },
        { status: 404 }
      );
    }

    skillDoc.skills = skillDoc.skills.filter(
      (sk) => sk._id.toString() !== skillId.toString()
    );
    await skillDoc.save();

    return NextResponse.json(
      {
        status: "success",
        message: "Skill deleted",
        data: { skills: skillDoc.skills },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
