import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skills: {
    type: [
      {
        skillName: { type: String, required: true },
        proficiency: { type: String, required: true },
      },
    ],
  },
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
