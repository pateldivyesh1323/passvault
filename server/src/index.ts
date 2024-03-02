import express from 'express';
import enviroments from './utils/enviroments';
import connectDB from './database/db';
import { authorize, jwtCheck } from './middleware';
import passwordRoute from './routes/password'
import cors from 'cors';

const app = express();

const port = enviroments.port || 8000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use(jwtCheck);
app.use(authorize);

app.use("/api/password", passwordRoute)

app.listen(port, () => {
    return console.log(`Server is listening at http://localhost:${port}`);
});