import Job from "@/app/models/jobModel";
import connectMongoDb from "@/lib/mongoose";

export async function GET(req) {
  try {
    await connectMongoDb();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // filters
    const q = searchParams.get("q")?.trim();
    const skill = searchParams.get("skill")?.trim();
    const region = searchParams.get("region");
    const language = searchParams.get("language");
    const salaryType = searchParams.get("salaryType");
    const minSalary = searchParams.get("minSalary");
    const maxSalary = searchParams.get("maxSalary");
    const workDay = searchParams.get("workDay");
    const postTime = searchParams.get("postTime");
    const searchType = searchParams.get("searchType"); // not used now
    const jobTypesParam = searchParams.get("jobTypes"); // comma separated

    const jobTypes = jobTypesParam ? jobTypesParam.split(",") : [];

    const filter = {};

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { companyName: { $regex: q, $options: "i" } },
      ];
    }

    if (skill) {
      filter.skills = { $in: [new RegExp(skill, "i")] };
    }

    if (region && region !== "All") {
      filter.companyLocation = region;
    }

    if (language && language !== "Any") {
      filter.languages = language;
    }

    if (salaryType && salaryType !== "any") {
      filter.salaryType = salaryType;
    }

    if (minSalary) {
      filter.salary = { ...(filter.salary || {}), $gte: Number(minSalary) };
    }

    if (maxSalary) {
      filter.salary = { ...(filter.salary || {}), $lte: Number(maxSalary) };
    }

    if (workDay && workDay !== "Any") {
      filter.workDays = workDay;
    }

    if (jobTypes.length > 0) {
      filter.jobType = { $in: jobTypes };
    }

    if (postTime && postTime !== "Any") {
      const now = new Date();
      let startDate;
      if (postTime === "Last 24h") {
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      } else if (postTime === "Last 7 days") {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      } else if (postTime === "Last 30 days") {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      if (startDate) {
        filter.createdAt = { $gte: startDate };
      }
    }

    // total count
    const totalCount = await Job.countDocuments(filter);

    // get jobs with pagination
    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalCount / limit);

    return new Response(
      JSON.stringify({
        status: "success",
        data: jobs,
        meta: {
          totalCount,
          page,
          pageSize: limit,
          totalPages,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ status: "error", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
