import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js';

const app =express();
const port =process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "*", // Allow all origins
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// API Endpoints
app.get('/',(req,res)=>{
    res.send("API Working ");
});
app.use('/api/auth', authRouter)
app.use('/api/user',userRouter)

// Export for Vercel serverless functions
export default app;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    app.listen(port,()=> console.log(`Server started on PORT:${port}`))
}