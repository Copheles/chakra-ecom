import dotnev from 'dotenv'
import connectDb from './database.js'
import express from 'express'

//Routes
import productRoutes from './routes/productRoutes.js';

dotnev.config();
connectDb();

const app = express()

app.use(express.json())
app.use('/api/products', productRoutes)

const port = process.env.PORT || 5001

app.listen(port, ()=> {
  console.log(`Server is listening on port: ${port}`)
})