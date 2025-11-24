import mongoose from "mongoose";

const certificatesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  certificateName: { type: String, required: true },
  institute: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
});

const Certificate =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", certificatesSchema);

export default Certificate;
