import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  description: { type: String, required: true },
});

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default Experience;
