// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRoutes from "./routes/main.routes.js"; 
import path from 'path';

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use('/images', express.static(path.join('public', 'images'))); // Serve images

app.use('/api', mainRoutes);





export default app;