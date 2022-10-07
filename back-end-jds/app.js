const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middleware
app.use(bodyParser());
app.use(cors());

// import routes
const dataRoutes = require('./routes/data');
const userRoutes = require('./routes/auth');

// ruoutes
app.use('/api/data', dataRoutes);
app.use('/api/user', userRoutes);

// connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connect Error!'));
db.once('open', () => {
  console.log('Database is Connected');
});

// listen
app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.PORT}`);
});
