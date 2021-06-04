const express = require('express');
const connectDB = require('./config/db')

const app = express();

//connect the database

connectDB();


app.get('/',(req,res) => {
    res.send('HELLO WORLD!!!');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {

    console.log(`SERVER UP AND RUNNING AT PORT ${PORT}`);

});