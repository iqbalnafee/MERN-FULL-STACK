const express = require('express');
const router = express.Router();

const { check,validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile'); //it will gives us the whole table 
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route  POST api/posts
//@desc   Craete a Post
//@access private

router.post('/',[auth,[

    check('text','Text is required').not().isEmpty(),
]],async (req,res) => { //2nd parameter is always middleware.To use multiple middleware we will use []

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const user = await User.findById(req.user.id).select('-password');//its come from jwtWebtoken payload

        const newPost = new Post({

            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id

        });

        //understand the save function very well

        const post  = await newPost.save();
        res.json(post);

        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
        
    }

    

});

module.exports = router