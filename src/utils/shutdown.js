import mongoose from 'mongoose';

export const shutdownServer = async (server) => {
  try {
    console.log('🛑 Shutting down server...');

    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed.');

    // Close the server
    server.close(() => {
      console.log('✅ Server closed.');
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};
