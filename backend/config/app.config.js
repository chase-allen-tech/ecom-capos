import express from 'express';
import {json, urlencoded} from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import jwt from '../middleware/jwt.middleware';
import routes from '../route';


const app = express();
app.use(json());
app.use(urlencoded({extended: true}));
app.use(helmet());
app.use(cors());
app.use('/api', routes);

export default app;
