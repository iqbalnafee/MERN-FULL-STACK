const express = require('express');
const router = express.Router();

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //jwt.io for documentation
const config = require('config');

//we need to require our model 

const User = require('../../models/User');

const { check,validationResult } = require('express-validator');

//https://express-validator.github.io/docs/ for reference that any parameter has any error

//@route  POST api/users
//@desc   Register User 
//@access public

router.post('/',[

    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    check('password','Please enter a password with 6 or more character').isLength({min:6})

], 
async (req,res) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array()});
    }

    //we can get form data by using req.body.name but we dont use it

    //we destructure it by following way because

    const {name,email,password} = req.body;

    try{

        //see if user exists

        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ errors: [{msg: 'User already exists'}] });
        }

        //get users avatar

        const avatar = gravatar.url(email,{

            s:'200',//size of the image
            r:'pg',//rating eg. no naked/inappropriate image
            d:'mm'//default eg. if  avatar absent there should be some icon

        });

        user = new User({name,email,password,avatar});

        //encrypt password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt); //await means they return a promise

        await user.save(); // if we dont use await then we should use user.save().then....  it is same for salt and user.password as well;

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