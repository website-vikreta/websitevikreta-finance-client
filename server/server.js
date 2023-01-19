
import productRoutes from './routes/products.js';
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.static('public'))
app.use(cors());


app.use('/root', productRoutes);

const CONN_URL = "mongodb+srv://rootapp:rootapp123@cluster0.spojkga.mongodb.net/root?retryWrites=true&w=majority";
const PORT = process.env.PORT|| 5000;
mongoose.set("strictQuery", false);
mongoose.connect(CONN_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


 
 


