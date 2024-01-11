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
import cookieParser from 'cookie-parser';

const app : express.Application = express();

// serving static files
app.use(express.static(`${__dirname}/public`));

// set security HTTP headers
app.use(helmet());
app.use(cors());


app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:", "http"],
    }
}));

// limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});


if (process.env.NODE_ENV == 'production') {
    app.use(limiter);
}

// development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(hpp());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/match", matchRouter);
app.use("/api/v1/prediction", predictionRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/game", gameRouter);


// handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

export default app;
