const mongoose = require('mongoose');
const Product = require('./schema'); // Adjust the path as needed
const data = require('./data.json'); // Adjust the path to your data.json

mongoose.connect('mongodb://localhost/pheripherals', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = data.products;

Product.insertMany(products)
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting data:', err);
  });
