const express = require('express');
const connectDB = require('./config/db')

const app = express();

//connect the database

connectDB();

//Init Middleware

app.use(express.json({extended:false})); //this line allow us to get data in request.body in routes/api/users


app.get('/',(req,res) => {
    res.send('HELLO WORLD!!!');
});

app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/auth',require('./routes/api/auth'));


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {

    console.log(`SERVER UP AND RUNNING AT PORT ${PORT}`);

});