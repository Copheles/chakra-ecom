import dotnev from 'dotenv'
import connectDb from './database.js'
import express from 'express'

//Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors'

dotnev.config();
connectDb();

const app = express()
app.use(cors({
  origin: 'https://www.sandbox.paypal.com'
}));

app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const port = process.env.PORT || 5001

app.listen(port, ()=> {
  console.log(`Server is listening on port: ${port}`)
})