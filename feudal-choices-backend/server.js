const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const io = require('socket.io');
const http = require('http');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

var server = http.createServer(app);

const wealthRouter = require('./routes/wealth');
const usersRouter = require('./routes/users');

app.use('/wealth', wealthRouter);
app.use('/users', usersRouter);

require('./socket')(server);

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});