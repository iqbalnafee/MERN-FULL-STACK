const express = require('express');
const router = express.Router();

const { check,validationResult } = require('express-validator');

//https://express-validator.github.io/docs/ for reference that any parameter has any error

//@route  POST api/users
//@desc   Register User 
//@access public

router.post('/',[

    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    check('password','Please enter a password with 6 or more character').isLength({min:6})

], (req,res) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array()});
    }

    res.send('User route');

});

module.exports = router