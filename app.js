const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { requireAuth } = require('./middleware/authMiddle');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://admin:test123@cluster0.qcsdojb.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

