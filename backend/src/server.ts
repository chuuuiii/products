import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import { connectDB } from './config/db';

const app = express();
const PORT = process.env.PORT
//Connect to DB
connectDB();


app.get('/', (req, res) => {
  res.send('Server ready')
});


app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})