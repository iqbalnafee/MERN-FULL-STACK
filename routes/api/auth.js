const express = require('express');
const router = express.Router();
const User = require('../../models/User');

const auth = require('../../middleware/auth');

const jwt = require('jsonwebtoken'); //jwt.io for documentation
const config = require('config');
const bcrypt = require('bcryptjs');


const { check,validationResult } = require('express-validator');

//@route  GET api/auth
//@desc   Test route 
//@access public

//whenever we use middleware we use it is as second parameter in router.get to make route protected

router.get('/',auth, async (req,res) => {

    try{

        const user = await User.findById(req.user.id).select('-password'); //this will send whole user info except user's password... req.user is getting from middleware/auth 
        
        res.json(user);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }


    //res.send('Auth route');

});

//@route  POST api/auth
//@desc   Authenticate User & get token
//@access public 

router.post('/',[

    
    check('email','Please enter a valid email').isEmail(),
    check('password','Password is required').exists()

], 
async (req,res) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array()});
    }

    //we can get form data by using req.body.name but we dont use it

    //we destructure it by following way because

    const {email,password} = req.body;

    try{

        //see if user exists

        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ errors: [{msg: 'Invalid credentials'}] });
        }

        //compare password 

        const isMatch  = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{msg: 'Invalid credentials'}] }); 
        }

        //return jsonwebtoken

        const payload = {

            user:{
                id:user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),//second param is jwt secret
            {expiresIn:3600000},
            (err,token) => {
                if(err) throw err;
                res.json({token});
            }
            )


        //res.send('User registered');

    }
    catch(error){
        console.error(error.message);
        res.status(500).send('server error');
    }

    

});

module.exports = router