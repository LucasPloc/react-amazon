const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const data = require('./data');

dotenv.config();

const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/product/slug/:slug', (req, res) => {
  const product = data.products.find(
    (product) => product.slug === req.params.slug
  );
  if (product) {
    return res.send(product);
  } else {
    return res.status(404).send({ message: 'Product Not Found' });
  }
});
app.get('/api/product/:id', (req, res) => {
  const product = data.products.find(
    (product) => product._id === req.params.id
  );
  if (product) {
    return res.send(product);
  } else {
    return res.status(404).send({ message: 'Product Not Found' });
  }
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
