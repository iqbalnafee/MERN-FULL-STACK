const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile'); //it will gives us the whole table 
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

//@route  GET api/profile
//@desc   Get all profiles
//@access public

router.get('/', async (req,res) => {


    try {

        const profiles = await Profile.find().populate('user',['name','avatar']);
        return res.json(profiles);
        //console.log(profiles);
    
    } catch (error) {
        console.error(error.message);
        //res.send('Server Error');
    }
});


//@route  GET api/profile/user/:user_id //use : cause it will act as placeholder
//@desc   Get profile by user id
//@access public

router.get('/user/:user_id', async (req,res) => {


    try {

        const profile = await Profile.findOne({user : req.params.user_id}).populate('user',['name','avatar']);

        if(!profile){
            return res.status(400).json({msg:'There is no profile of this user'});
        }

        return res.json(profile);
        //console.log(profiles);
    
    } catch (error) {
        
        console.error(error.message);

        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg:'There is no profile of this user'}); 
        }

        res.status(400).send('Server Error');



    }
});

//@route  DELETE api/profile
//@desc   DELETE user,profile and posts
//@access private

router.post('/delete',auth, async (req,res) => {


    try {


        //delete posts

        //delete profile
        await Profile.findOneAndRemove({user:req.user.id}); //it is an column not array of objects

        //delete user

        await User.findOneAndRemove({_id:req.user.id});

        return res.json({msg:'User removed'});
        //console.log(profiles);
    
    } catch (error) {
        console.error(error.message);
        //res.send('Server Error');
    }
});

//@route  PUT api/profile/experience
//@desc   Add profile experience
//@access private

router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]], async (req,res) => {// 2nd parameter is always middleware.To use multiple middleware we will use []


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    //destructure the request body

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    //newExp is same as profileFields
    const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
    };

    try {

        const profile = await Profile.findOne({user:req.user.id});//findOne function object desc= columnName:value
        
        //profile.experience.push() we will not use it since it push at the begining
        //we will use

        profile.experience.unshift(newExp); //it push at the end
        await profile.save();
        res.json(profile);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }


});

//@route  DELETE api/profile/experience
//@desc   DELETE user experience
//@access private

router.delete('/experience/:exp_id',auth,async (req,res)=>{ // /experience/:exp_id same as request.getParameter(exp_id)
    try {

        //findOne function object desc= columnName:value
        const profile = await Profile.findOne({user:req.user.id});

        //experience is not an column but an array of objects. So its deletetion will be different
        //Fisrt we need to get the requested remove experience index

        //Bu using filter
        //const removeIndex = profile.experience.filter(e => e._id==req.params.exp_id);

        //By using map 
        const removeIndex = profile.experience.map(e=>e.id).indexOf(req.params.exp_id);

        //splice description = At position 2, remove 2 items: splice(2,2) //position starts from 0

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

        

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router