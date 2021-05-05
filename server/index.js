const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./API/api')
require('dotenv/config');

// Initaitlizing Express
const app = express();

//cors middleware
// app.use(cors());
// app.options('*', cors())
app.use(cors({origin:true,credentials: true}));


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ "extended" : false}));

// defining PORT number
const PORT = 5000 || process.env.PORT;

// routes for the Index
app.get('/', (req,res) => {
    res.send('OK')
})

// route for the API
app.use('/codeflix', api);

// Connect to DB
const uri = process.env.DB_CONNECTION;
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(uri, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


// Listening for Requests
app.listen(PORT,() => {
    console.log(`Server Running on ${PORT}`)
})