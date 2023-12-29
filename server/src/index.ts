import express from 'express';
import enviroments from '../utils/enviroments';
import connectDB from './database/db';
import { authorize } from './middleware';
const app = express();

const port = enviroments.port || 8000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorize);

app.listen(port, () => {
    return console.log(`Server is listening at http://localhost:${port}`);
});