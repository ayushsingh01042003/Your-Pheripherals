const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pheripherals')
.then(() => {
  console.log(`Connected to MongoDB`)
})
.catch((err) => {
  console.log(err)
})

const Product = require(`./schema`)

app.use(express.static(path.join(__dirname, 'views')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/products', async(req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.html'))
})

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', `cart.html`))
})

app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', `history.html`))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})