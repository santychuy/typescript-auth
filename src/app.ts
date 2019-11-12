import express, { Application } from 'express';
import morgan from 'morgan';

//Inits
const app: Application = express();

//Imp Routes
import authRoutes from './routes/auth.routes';


//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Init Routes
app.use('/api/auth', authRoutes);



export default app;