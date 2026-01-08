const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store online users
const onlineUsers = new Map();

io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  // User goes online
  socket.on('user-online', (userData) => {
    const { userId, userName, avatar } = userData;
    
    onlineUsers.set(userId, {
      socketId: socket.id,
      userId,
      userName,
      avatar,
      status: 'online',
    });

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
  });

  // Send message
  socket.on('send-message', (messageData) => {
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
    }
    
    console.log(`📨 Message from ${senderName} to ${receiverName}: ${message}`);
  });

  // Get chat history (simulated)
  socket.on('get-chat-history', ({ userId1, userId2, limit = 50 }) => {
    console.log(`📜 Loading chat history for ${userId1} and ${userId2}`);
    
    // Simulated chat history
    const mockHistory = [
      {
        id: '1',
        text: 'Hello! How are you?',
        sender: 'other',
        senderId: userId2,
        receiverId: userId1,
        time: '10:30 AM',
        timestamp: new Date(),
        status: 'read',
        senderName: 'Test User',
      },
      {
        id: '2',
        text: 'I am good, thanks! How about you?',
        sender: 'me',
        senderId: userId1,
        receiverId: userId2,
        time: '10:32 AM',
        timestamp: new Date(),
        status: 'read',
        senderName: 'You',
      },
    ];
    
    socket.emit('chat-history', mockHistory);
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
  socket.on('disconnect', () => {
    // Find and remove user
    const userEntry = Array.from(onlineUsers.entries()).find(
      ([_, data]) => data.socketId === socket.id
    );

    if (userEntry) {
      const [userId, userData] = userEntry;
      onlineUsers.delete(userId);
      
      io.emit('user-status-changed', {
        userId,
        status: 'offline',
        userName: userData.userName,
      });

      console.log(`❌ ${userData.userName} disconnected`);
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

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`🚀 Socket.io server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Socket.io endpoint: ws://localhost:${PORT}`);
});