import mongoose from 'mongoose';

const userStatusSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'offline',
  },
  socketId: String,
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  avatar: String,
  role: String,
}, { timestamps: true });

const UserStatus = mongoose.models.UserStatus || mongoose.model('UserStatus', userStatusSchema);

export default UserStatus;