require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.listen(process.env.PORT || 3333)