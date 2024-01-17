import express, {Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import userRouter from './routes/userRoutes';
import matchRouter from './routes/matchRoutes';
import predictionRouter from './routes/predictionRoutes';
import authRouter from './routes/authRoutes';
import gameRouter from './routes/gameRoutes';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import globalErrorHandler from "./controllers/errorController";

const app : express.Application = express();


//options for cors midddleware
const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Credentials',
        'Authorization',
        'credentials'
    ],
    optionsSuccessStatus: 200,
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET','HEAD','OPTIONS','PUT','PATCH','POST','DELETE'],
};


app.use(cors(corsOptions));

// set security HTTP headers
app.use(helmet());

// limit requests from same IP
const limiter = rateLimit({
    max: 2000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});


// app.use(limiter);


app.use(morgan('dev'));

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());

// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

app.use(hpp());

// Global Middleware
app.use((req :Request, res :Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN!);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/match", matchRouter);
app.use("/api/v1/prediction", predictionRouter);
app.use("/api/v1/game", gameRouter);

app.options('*', cors(corsOptions));

// handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

app.use(globalErrorHandler)
export default app;
