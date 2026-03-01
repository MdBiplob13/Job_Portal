// import Job from "@/app/models/jobModel";
// import connectMongoDb from "@/lib/mongoose";
// import cron from "node-cron";

// if (!global.jobCronStarted) {
//   global.jobCronStarted = true;

//   cron.schedule("* * * * *", async () => {
//     try {
//       await connectMongoDb();

//       const result = await Job.updateMany(
//         {
//           deadline: { $lt: new Date() },
//           status: "active",
//         },
//         { $set: { status: "finished" } }
//       );

//       if (result.modifiedCount > 0) {
//         console.log(`🔥 Auto-updated ${result.modifiedCount} expired jobs`);
//       }
//     } catch (err) {
//       console.log("⛔ Cron update failed:", err.message);
//     }
//   });

// }
