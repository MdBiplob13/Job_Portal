import { NextResponse } from "next/server";
import Bid from "@/app/models/bidModel";
import connectMongoDb from "@/lib/mongoose";



export async function GET(req) {
  try {
    await connectMongoDb();

    const url = new URL(req.url);
    const params = url.searchParams;

    // pagination
    const page = Math.max(1, parseInt(params.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(params.get("limit") || "10", 10));

    // filters
    const skill = params.get("skill") || "";
    const region = params.get("region") || "";
    const q = params.get("q") || ""; // general search
    const jobTypeParam = params.get("jobType") || ""; // comma separated allowed
    const minBudget = params.get("minBudget");
    const maxBudget = params.get("maxBudget");
    const budgetType = params.get("budgetType") || ""; // BudgetType field
    const postTime = params.get("postTime") || ""; // values: "24h","7d","30d" or empty

    const filter = {};

    // skill: search in skills array text
    if (skill) {
      filter.skills = { $elemMatch: { $regex: new RegExp(skill, "i") } };
    }

    // region/companyLocation
    if (region) {
      filter.companyLocation = { $regex: new RegExp(region, "i") };
    }

    // budget type
    if (budgetType && budgetType !== "any") {
      filter.BudgetType = budgetType;
    }

    // jobType (supports comma-separated multiple types)
    if (jobTypeParam) {
      const types = jobTypeParam.split(",").map((t) => t.trim()).filter(Boolean);
      if (types.length === 1) filter.jobType = types[0];
      else if (types.length > 1) filter.jobType = { $in: types };
    }

    // budget range on `budget` field
    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = Number(minBudget);
      if (maxBudget) filter.budget.$lte = Number(maxBudget);
    }

    // general text search: title, companyName, description
    if (q) {
      filter.$or = [
        { title: { $regex: new RegExp(q, "i") } },
        { companyName: { $regex: new RegExp(q, "i") } },
        { description: { $regex: new RegExp(q, "i") } },
      ];
    }

    // postTime (recent)
    if (postTime && postTime !== "any") {
      const since = new Date();
      if (postTime === "24h") since.setDate(since.getDate() - 1);
      else if (postTime === "7d") since.setDate(since.getDate() - 7);
      else if (postTime === "30d") since.setDate(since.getDate() - 30);

      filter.createdAt = { $gte: since };
    }

    // count & query
    const total = await Bid.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const data = await Bid.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json(
      {
        status: "success",
        data,
        meta: {
          total,
          page,
          limit,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: "fail", message: error.message },
      { status: 500 }
    );
  }
}