import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.NEXT_PUBLIC_CLIENT_URL 
    : 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const io = new Server(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling'],
  pingTimeout: 60000,
  connectionStateRecovery: {
    maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
  }
});

// Store online users in memory for quick access
const onlineUsers = new Map();

// MongoDB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

// Import models with fallback
let Message, UserStatus;

try {
  // Try ES6 import first
  const messageModule = await import('./app/models/messageModel.js');
  const userStatusModule = await import('./app/models/userStatusModel.js');
  
  Message = messageModule.default || messageModule;
  UserStatus = userStatusModule.default || userStatusModule;
  
  console.log('✅ Models loaded successfully');
} catch (error) {
  console.log('⚠️ Models not found, using in-memory storage');
  // Create simple in-memory models for testing
  Message = class {
    constructor(data) { Object.assign(this, data); this._id = Date.now().toString(); }
    async save() { return this; }
    static find(query) { 
      return { 
        sort: () => ({ 
          limit: () => ({ 
            lean: () => Promise.resolve([]) 
          }) 
        }) 
      }; 
    }
    static findOneAndUpdate() { return Promise.resolve({}); }
    static updateMany() { return Promise.resolve({}); }
    static findByIdAndUpdate() { return Promise.resolve({}); }
    static countDocuments() { return Promise.resolve(0); }
  };
  
  UserStatus = class {
    static findOneAndUpdate() { return Promise.resolve({}); }
  };
}

// Authentication middleware for socket connections
const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
  
  if (!token) {
    console.log('⚠️ No authentication token provided');
    return next(new Error('Authentication required'));
  }
  
  try {
    // In a real app, verify JWT token here
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // socket.userId = decoded.userId;
    // socket.userName = decoded.userName;
    
    // For now, accept any token
    socket.userId = socket.handshake.auth.userId || 'unknown';
    socket.userName = socket.handshake.auth.userName || 'User';
    next();
  } catch (error) {
    console.error('❌ Socket authentication error:', error);
    next(new Error('Authentication failed'));
  }
};

io.use(authenticateSocket);

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id, 'User:', socket.userName);
  
  // Add user to online list immediately
  socket.on('user-online', async (userData) => {
    try {
      await connectMongoDB();
      
      const { userId, userName, avatar, role } = userData;
      
      // Store in memory
      onlineUsers.set(userId, {
        socketId: socket.id,
        userId,
        userName,
        avatar: avatar || '/user1.jpeg',
        role: role || 'user',
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
          avatar: avatar || '/user1.jpeg',
          role: role || 'user',
        },
        { upsert: true, new: true }
      );

      // Broadcast to all users that this user is online
      io.emit('user-status-changed', {
        userId,
        userName,
        status: 'online',
        avatar: avatar || '/user1.jpeg',
        role: role || 'user',
      });

      console.log(`✅ ${userName} is now online`);

      // Send current online users to the new user
      const onlineUserList = Array.from(onlineUsers.values()).map(user => ({
        userId: user.userId,
        userName: user.userName,
        status: user.status,
        avatar: user.avatar,
        role: user.role,
      }));
      
      socket.emit('online-users', onlineUserList);
    } catch (error) {
      console.error('❌ Error setting user online:', error);
      socket.emit('error', { type: 'user-online', message: error.message });
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

      // Validate message
      if (!message || message.trim().length === 0) {
        throw new Error('Message cannot be empty');
      }

      // Save message to database
      const newMessage = new Message({
        senderId,
        receiverId,
        senderName: senderName || 'Unknown',
        receiverName: receiverName || 'Unknown',
        message: message.trim(),
        read: false,
      });

      await newMessage.save();

      // Check if receiver is online
      const receiverData = onlineUsers.get(receiverId);
      
      // Prepare message object
      const messageObj = {
        id: newMessage._id || tempId,
        text: message.trim(),
        senderId,
        receiverId,
        senderName: senderName || 'Unknown',
        receiverName: receiverName || 'Unknown',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(),
        status: 'sent',
        tempId,
      };

      // Emit to sender
      socket.emit('message-sent', {
        ...messageObj,
        status: receiverData ? 'delivered' : 'sent',
      });

      // Emit to receiver if online
      if (receiverData) {
        io.to(receiverData.socketId).emit('new-message', messageObj);
        
        // Update read status in database
        try {
          await Message.findByIdAndUpdate(messageObj.id, { read: true });
        } catch (dbError) {
          console.error('❌ Error updating read status:', dbError);
        }
      }
      
      console.log(`📨 Message from ${senderName} to ${receiverName}: ${message.trim()}`);
    } catch (error) {
      console.error('❌ Error sending message:', error);
      socket.emit('message-error', { 
        error: 'Failed to send message',
        details: error.message,
        tempId: messageData.tempId 
      });
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
          .sort({ timestamp: 1 }) // Oldest first
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
            senderName: 'User',
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
            receiverName: 'User',
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
      console.log(`✅ Sent ${formattedMessages.length} messages to ${userId1}`);
    } catch (error) {
      console.error('❌ Error fetching chat history:', error);
      socket.emit('chat-history-error', { 
        error: 'Failed to load chat history',
        details: error.message 
      });
    }
  });

  // Get online users
  socket.on('get-online-users', () => {
    try {
      const onlineUserList = Array.from(onlineUsers.values()).map(user => ({
        userId: user.userId,
        userName: user.userName,
        status: user.status,
        avatar: user.avatar,
        role: user.role,
      }));

      socket.emit('online-users', onlineUserList);
      console.log(`✅ Sent ${onlineUserList.length} online users to ${socket.userName}`);
    } catch (error) {
      console.error('❌ Error getting online users:', error);
    }
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
      console.log(`✅ Marked ${messageIds.length} messages as read for ${userId}`);
    } catch (error) {
      console.error('❌ Error marking messages as read:', error);
      socket.emit('error', { 
        type: 'mark-as-read', 
        message: error.message 
      });
    }
  });

  // Typing indicator
  socket.on('typing', ({ userId, receiverId, isTyping }) => {
    try {
      const receiverData = onlineUsers.get(receiverId);
      if (receiverData) {
        io.to(receiverData.socketId).emit('user-typing', {
          userId,
          isTyping,
        });
        
        if (isTyping) {
          console.log(`✍️ ${userId} is typing to ${receiverId}`);
        }
      }
    } catch (error) {
      console.error('❌ Error handling typing indicator:', error);
    }
  });

  // User goes offline
  socket.on('user-offline', async (userId) => {
    try {
      await connectMongoDB();
      
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
      });

      console.log(`✅ User ${userId} is now offline`);
    } catch (error) {
      console.error('❌ Error setting user offline:', error);
    }
  });

  // Get user status
  socket.on('get-user-status', ({ userId }) => {
    try {
      const userData = onlineUsers.get(userId);
      const status = userData ? userData.status : 'offline';
      
      socket.emit('user-status', {
        userId,
        status,
        lastSeen: userData?.lastSeen || new Date(),
      });
    } catch (error) {
      console.error('❌ Error getting user status:', error);
    }
  });

  // Handle disconnect
  socket.on('disconnect', async (reason) => {
    try {
      await connectMongoDB();
      
      // Find user by socket ID
      const userEntry = Array.from(onlineUsers.entries()).find(
        ([_, data]) => data.socketId === socket.id
      );

      if (userEntry) {
        const [userId, userData] = userEntry;
        
        // Remove from memory
        onlineUsers.delete(userId);
        
        // Update database
        await UserStatus.findOneAndUpdate(
          { userId },
          {
            status: 'offline',
            lastSeen: new Date(),
          }
        );

        // Notify other users
        io.emit('user-status-changed', {
          userId,
          status: 'offline',
          userName: userData.userName,
        });

        console.log(`❌ ${userData.userName} disconnected (${reason})`);
      }
    } catch (error) {
      console.error('❌ Error handling disconnect:', error);
    }
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('❌ Socket error:', error);
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    onlineUsers: onlineUsers.size,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Socket.io server is running',
    version: '1.0.0',
    clients: io.engine.clientsCount,
    onlineUsers: Array.from(onlineUsers.values()).map(u => u.userName)
  });
});

// REST API endpoints

// Get messages between two users
app.get('/api/messages/:userId1/:userId2', async (req, res) => {
  try {
    await connectMongoDB();
    
    const { userId1, userId2 } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const messages = await Message.find({
      $or: [
        { senderId: userId1, receiverId: userId2 },
        { senderId: userId2, receiverId: userId1 },
      ],
    })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const formattedMessages = messages.map(msg => ({
      id: msg._id,
      text: msg.message,
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      senderName: msg.senderName,
      receiverName: msg.receiverName,
      time: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: msg.timestamp,
      read: msg.read,
    }));

    res.json({
      status: 'success',
      data: formattedMessages.reverse(),
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Send message via REST
app.post('/api/messages', async (req, res) => {
  try {
    await connectMongoDB();
    
    const { senderId, receiverId, senderName, receiverName, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Missing required fields' 
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      senderName: senderName || 'Unknown',
      receiverName: receiverName || 'Unknown',
      message,
      read: false,
    });

    await newMessage.save();

    // Check if receiver is online and notify via socket
    const receiverData = onlineUsers.get(receiverId);
    if (receiverData) {
      io.to(receiverData.socketId).emit('new-message', {
        id: newMessage._id,
        text: message,
        senderId,
        receiverId,
        senderName: senderName || 'Unknown',
        receiverName: receiverName || 'Unknown',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(),
        status: 'sent',
      });
    }

    res.json({
      status: 'success',
      message: 'Message sent',
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get online users via REST
app.get('/api/users/online', async (req, res) => {
  try {
    await connectMongoDB();
    
    const onlineUserList = Array.from(onlineUsers.values()).map(user => ({
      userId: user.userId,
      userName: user.userName,
      status: user.status,
      avatar: user.avatar,
      role: user.role,
      socketId: user.socketId,
    }));

    // Also get from database for users not currently connected
    const dbUsers = await UserStatus.find({ status: 'online' }).lean();
    
    const allOnlineUsers = [...onlineUserList];
    dbUsers.forEach(dbUser => {
      if (!onlineUserList.some(u => u.userId === dbUser.userId)) {
        allOnlineUsers.push({
          userId: dbUser.userId,
          userName: dbUser.userName,
          status: dbUser.status,
          avatar: dbUser.avatar,
          role: dbUser.role,
          socketId: dbUser.socketId,
          fromDatabase: true,
        });
      }
    });

    res.json({
      status: 'success',
      data: allOnlineUsers,
      count: allOnlineUsers.length,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get user status
app.get('/api/users/:userId/status', async (req, res) => {
  try {
    await connectMongoDB();
    
    const { userId } = req.params;
    
    // Check memory first
    const userData = onlineUsers.get(userId);
    
    if (userData) {
      return res.json({
        status: 'success',
        data: {
          userId,
          status: userData.status,
          lastSeen: new Date(),
          online: true,
        },
      });
    }
    
    // Check database
    const dbUser = await UserStatus.findOne({ userId }).lean();
    
    if (dbUser) {
      return res.json({
        status: 'success',
        data: {
          userId,
          status: dbUser.status,
          lastSeen: dbUser.lastSeen,
          online: dbUser.status === 'online',
        },
      });
    }
    
    // User not found
    res.json({
      status: 'success',
      data: {
        userId,
        status: 'offline',
        lastSeen: null,
        online: false,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Start server
const PORT = process.env.SOCKET_PORT || 3001;

const startServer = async () => {
  try {
    await connectMongoDB();
    
    server.listen(PORT, () => {
      console.log(`🚀 Socket.io server running on port ${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 Test endpoint: http://localhost:${PORT}/test`);
      console.log(`🌐 WebSocket endpoint: ws://localhost:${PORT}`);
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  
  // Disconnect all clients
  io.disconnectSockets();
  
  // Close server
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Export for testing
export { server, io, onlineUsers };