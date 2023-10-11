import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

import cookieParser from "cookie-parser";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));