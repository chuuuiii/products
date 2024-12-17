import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import { connectDB } from './config/db';
import cors from 'cors'
import path from 'path';
import morgan from 'morgan';
import userRoutes from './routes/user.route'
import productRoutes from './routes/product.route'


const app = express();
const PORT = process.env.PORT || 4000
//Connect to DB
connectDB();

// const __dirname = path.resolve();
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.get('/', (req, res) => {
  res.send('Server ready')
});



app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`)
})