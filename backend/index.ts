import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/authRoute';
import 'colors';
import { connectDB } from './config/connectDb';
import { errorMiddleware } from './middlewares/errorMiddleware';
import taskRoute from './routes/taskRoute';
import path from 'path';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

const PORT = process.env.PORT || 8000;

app.use('/api/auth', authRoute);
app.use('/api/task', taskRoute);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, '/frontend/dist/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`server is running on PORT : http://localhost:${PORT}`)
);
