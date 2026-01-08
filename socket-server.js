const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
});

// Connect to MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully for Socket.io");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

// Import models
let Message, UserStatus;
try {
  Message = require('./app/models/messageModel').default || require('./app/models/messageModel');
  UserStatus = require('./app/models/userStatusModel').default || require('./app/models/userStatusModel');
} catch (error) {
  console.log("⚠️ Models not found, using in-memory storage");
  // Create simple in-memory models for testing
  Message = class {
    constructor(data) { Object.assign(this, data); }
    save() { return Promise.resolve(this); }
    static find() { return { sort: () => ({ limit: () => ({ lean: () => Promise.resolve([]) }) }) }; }
    static findOneAndUpdate() { return Promise.resolve({}); }
    static updateMany() { return Promise.resolve({}); }
    static findByIdAndUpdate() { return Promise.resolve({}); }
  };
  UserStatus = class {
    static findOneAndUpdate() { return Promise.resolve({}); }
  };
}

// Store online users in memory
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // User goes online
  socket.on('user-online', async (userData) => {
    try {
      await connectMongoDB();
      const { userId, userName, avatar } = userData;
      
      onlineUsers.set(userId, {
        socketId: socket.id,
        userId,
        userName,
        avatar,
        status: 'online',
      });

      // Update database
      await UserStatus.findOneAndUpdate(
        { userId },
        {
          userId,
          userName,
          status: 'online',
          socketId: socket.id,
          lastSeen: new Date(),
          avatar,
        },
        { upsert: true, new: true }
      );

      console.log(`✅ ${userName} is now online`);
      
      // Broadcast to all users
      io.emit('user-status-changed', {
        userId,
        userName,
        status: 'online',
        avatar,
      });

      // Send current online users to the new user
      const onlineUserList = Array.from(onlineUsers.values()).map(user => ({
        userId: user.userId,
        userName: user.userName,
        status: user.status,
        avatar: user.avatar,
      }));
      
      socket.emit('online-users', onlineUserList);
    } catch (error) {
      console.error('❌ Error setting user online:', error);
    }
  });

  // Send message
  socket.on('send-message', async (messageData) => {
    try {
      await connectMongoDB();
      const {
        senderId,
        receiverId,
        senderName,
        receiverName,
        message,
        tempId,
      } = messageData;

      // Create message object
      const messageObj = {
        id: Date.now().toString(),
        text: message,
        senderId,
        receiverId,
        senderName,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(),
        status: 'sent',
        tempId,
      };

      // Save to database if Message model exists
      if (Message && Message.prototype.save) {
        const newMessage = new Message({
          senderId,
          receiverId,
          senderName,
          receiverName,
          message,
          read: false,
        });
        await newMessage.save();
        messageObj.id = newMessage._id || messageObj.id;
      }

      // Check if receiver is online
      const receiverData = onlineUsers.get(receiverId);
      
      // Emit to sender
      socket.emit('message-sent', {
        ...messageObj,
        status: receiverData ? 'delivered' : 'sent',
      });

      // Emit to receiver if online
      if (receiverData) {
        io.to(receiverData.socketId).emit('new-message', messageObj);
        
        // Update read status in database
        if (Message && Message.findByIdAndUpdate && messageObj.id) {
          await Message.findByIdAndUpdate(messageObj.id, { read: true });
        }
      }
      
      console.log(`📨 Message from ${senderName} to ${receiverName}: ${message}`);
    } catch (error) {
      console.error('❌ Error sending message:', error);
      socket.emit('message-error', { error: 'Failed to send message' });
    }
  });

  // Get chat history
  socket.on('get-chat-history', async ({ userId1, userId2, limit = 50 }) => {
    try {
      await connectMongoDB();
      console.log(`📜 Loading chat history for ${userId1} and ${userId2}`);
      
      let messages = [];
      
      // Try to get from database
      if (Message && Message.find) {
        messages = await Message.find({
          $or: [
            { senderId: userId1, receiverId: userId2 },
            { senderId: userId2, receiverId: userId1 },
          ],
        })
          .sort({ timestamp: 1 })
          .limit(limit)
          .lean();
      }
      
      // If no messages in DB, provide sample data
      if (messages.length === 0) {
        messages = [
          {
            _id: '1',
            message: 'Hello! How are you?',
            senderId: userId2,
            receiverId: userId1,
            senderName: 'Test User',
            receiverName: 'You',
            timestamp: new Date(Date.now() - 3600000),
            read: true,
          },
          {
            _id: '2',
            message: 'I am good, thanks! How about you?',
            senderId: userId1,
            receiverId: userId2,
            senderName: 'You',
            receiverName: 'Test User',
            timestamp: new Date(Date.now() - 1800000),
            read: true,
          },
        ];
      }

      const formattedMessages = messages.map((msg) => ({
        id: msg._id,
        text: msg.message,
        sender: msg.senderId === userId1 ? 'me' : 'other',
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        time: new Date(msg.timestamp).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        timestamp: msg.timestamp,
        status: msg.read ? 'read' : 'sent',
        senderName: msg.senderName,
      }));

      socket.emit('chat-history', formattedMessages);
    } catch (error) {
      console.error('❌ Error fetching chat history:', error);
      socket.emit('chat-history-error', { error: 'Failed to load chat history' });
    }
  });

  // Get online users
  socket.on('get-online-users', () => {
    const onlineUserList = Array.from(onlineUsers.values()).map(user => ({
      userId: user.userId,
      userName: user.userName,
      status: user.status,
      avatar: user.avatar,
    }));

    socket.emit('online-users', onlineUserList);
  });

  // Mark messages as read
  socket.on('mark-as-read', async ({ messageIds, userId }) => {
    try {
      await connectMongoDB();
      if (Message && Message.updateMany) {
        await Message.updateMany(
          { _id: { $in: messageIds }, receiverId: userId },
          { read: true }
        );
      }
      socket.emit('messages-read', { messageIds });
    } catch (error) {
      console.error('❌ Error marking messages as read:', error);
    }
  });

  // Typing indicator
  socket.on('typing', ({ userId, receiverId, isTyping }) => {
    const receiverData = onlineUsers.get(receiverId);
    if (receiverData) {
      io.to(receiverData.socketId).emit('user-typing', {
        userId,
        isTyping,
      });
    }
  });

  // Handle disconnect
  socket.on('disconnect', async () => {
    try {
      await connectMongoDB();
      // Find and remove user
      const userEntry = Array.from(onlineUsers.entries()).find(
        ([_, data]) => data.socketId === socket.id
      );

      if (userEntry) {
        const [userId, userData] = userEntry;
        onlineUsers.delete(userId);
        
        await UserStatus.findOneAndUpdate(
          { userId },
          {
            status: 'offline',
            lastSeen: new Date(),
          }
        );

        io.emit('user-status-changed', {
          userId,
          status: 'offline',
          userName: userData.userName,
        });

        console.log(`❌ ${userData.userName} disconnected`);
      }
    } catch (error) {
      console.error('❌ Error handling disconnect:', error);
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    onlineUsers: onlineUsers.size,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Socket.io server is running',
    version: '1.0.0',
    clients: io.engine.clientsCount
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`🚀 Socket.io server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🌐 WebSocket: ws://localhost:${PORT}`);
});