const express = require('express');
const router = express.Router();
const User = require('../../models/User');

const auth = require('../../middleware/auth');

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

module.exports = router