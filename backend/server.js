const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRouter = require('./routes/seedRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

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
