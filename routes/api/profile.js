const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route  GET api/profile/me
//@desc   To get current user profile 
//@access private

router.get('/me',auth, async(req,res) => {

    try{

        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        //populate function's 1st parameter is from which model we want to get data and 2nd parameter is an array of objects of table column names

        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }

        res.json(profile);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router