const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.send('HELLO WORLD!!!');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {

    console.log(`SERVER UP AND RUNNING AT PORT ${PORT}`);

});