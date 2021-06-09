const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile'); //it gives us the whole table 
const User = require('../../models/User');

const { check,validationResult } = require('express-validator');

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

//@route  GET api/profile
//@desc   Craete or update profile
//@access private

router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty(),
]], async(req,res) => { // 2nd parameter is always middleware.To use multiple middleware we will use []

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({ error: error.array()});
    }
    //destructure the request

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
        
      } = req.body;

      //build profile object

      const profileFields = {};

      profileFields.user = req.user.id;
      if(company) profileFields.company = company;
      if(website) profileFields.website = website;
      if(location) profileFields.location = location;
      if(bio) profileFields.bio = bio;
      if(status) profileFields.status = status;
      if(githubusername) profileFields.githubusername = githubusername;
      if(skills){
          profileFields.skills = skills.split(',').map(s=>s.trim());
      }
      //Build social object

      profileFields.social = {};

      if(youtube) profileFields.social.youtube = youtube;
      if(twitter) profileFields.social.twitter = twitter;
      if(facebook) profileFields.social.facebook = facebook;
      if(linkedin) profileFields.social.linkedin = linkedin;
      if(instagram) profileFields.social.instagram = instagram;


      try{

        let profile = await Profile.findOne({user:req.user.id}); //whenever we use mongoose we should use await since it returns a promise

        //if profile found then update it
        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}
            );
            return res.json(profile);
        }
        
        //if profile not found then create one
        // else{
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        // }

      }
      catch(err){
          console.error(err.message);
          res.status(500).send('Server Error');
      }

      res.send('Hello');

});

module.exports = router