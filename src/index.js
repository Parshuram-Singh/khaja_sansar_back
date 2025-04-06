import app from './app.js';
import { connectDb } from './db/db.js';
import { config } from './config/config.js';
import { shutdownServer } from './utils/shutdown.js';


// Start server
connectDb()
  .then(() => {
    const server = app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
    });
    process.on('SIGINT', () => shutdownServer(server));
    process.on('SIGTERM', () => shutdownServer(server));
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });
  
