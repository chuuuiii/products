import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import { connectDB } from './config/db';
import cors from 'cors'
import morgan from 'morgan';
import userRoutes from './routes/user.route'


const app = express();
const PORT = process.env.PORT || 4000
//Connect to DB
connectDB();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server ready')
});



app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})