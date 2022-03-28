const express = require('express');
const data = require('./data');

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running`);
});
