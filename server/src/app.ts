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
        'Access-Control-Allow-Credentials'
    ],
    optionsSuccessStatus: 200,
    // credentials: true,
    // preflightContinue: false,
    origin: ['http://localhost:5173', 'https://www.afcon.sbme.api.ibrahimmohamed.online'],
    methods: ['GET','HEAD','OPTIONS','PUT','PATCH','POST','DELETE'],
};


app.use(cors(corsOptions));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(res)
    next();
});

// set security HTTP headers
app.use(helmet());

// limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});


if (process.env.NODE_ENV == 'production') {
    app.use(limiter);
}



app.use(morgan('dev'));

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(cookieParser());
// data sanitization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

app.use(hpp());


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


export default app;
