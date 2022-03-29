const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');
const seedRouter = require('./routes/seedRoutes');
const productRouter = require('./routes/productRoutes');

dotenv.config();

const app = express();

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to db');
    app.listen(port, () => {
      console.log(`Server is running`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
