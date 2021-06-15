const express = require('express');
const router = express.Router();

const { check,validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile'); //it will gives us the whole table 
const User = require('../../models/User');
const Post = require('../../models/Post');


//@route  POST api/posts
//@desc   Create a Post
//@access private
router.post('/',[auth,[

    check('text','Text is required').not().isEmpty(),
]],async (req,res) => { //2nd parameter is always middleware.To use multiple middleware we will use []

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {

        const user = await User.findById(req.user.id).select('-password');//its come from req.user = decoded.user; from middleware/auth
       

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

//@route  Get api/posts
//@desc  Get all posts
//@access private

router.get('/',auth, async (req, res) => {


    try {


        const posts = await Post.find().sort({ date: -1 }); //for getting the latest posts first.. for ascending use date : 1  and here date is column name in our table

        res.json(posts);
        
    } catch (error) {

        console.error(error.message);
        res.status(500).send('Server Error');
        
    }

});

//@route  Get api/posts/:id // :id work as ?&id=id same as : https://www.facebook.com/FamilyFeudCanada/videos/1773892642784199 where 1773892642784199 is the id not folder and same as https://www.facebook.com/FamilyFeudCanada/videos/:id

//@desc  Get post by id
//@access private

router.get('/:id',auth, async (req, res) => {


    try {


        const post = await Post.findById({_id:req.params.id});

        if(!post){
            return res.status(404).send('Post not found!');
        }

        res.json(post);
        
    } catch (error) {

        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg:'Post not found'}); 
        }
        res.status(500).send('Server Error');
        
    }

});



//@route  DELETE api/posts/:id
//@desc  Delete post
//@access private

router.delete('/:id',auth, async (req, res) => {


    try {


        const post = await Post.findById({_id:req.params.id});

        if(!post){
            return res.status(404).send('Post not found!');
        }
        
        //check if the user own the posts
        if(post.user.toString() === req.user.id){ //post.user dataType is object
            await post.remove();
            return res.json({msg:'Post removed'});
        }
        else{
            return res.status(401).json({msg: 'User not authorized'});
        }

        
        
    } catch (error) {

        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg:'Post not found'}); 
        }
        res.status(500).send('Server Error');
        
    }

});

//@route  PUT api/posts/like/:id
//@desc  Like a post
//@access private

router.put('/like/:id',auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        //check if the post has already been liked by the user
        // if(post.likes.user.toString() === req.user.id){
        //     return res.status(400).json({msg:'You have already liked this post'});
        // }

        //this commented out if condition will not work since likes is an arry of user. We will use filter

        if(post.likes.filter(like => like.user.toString()===req.user.id).length>0){
            return res.status(400).json({msg:'You have already liked this post'});
        }

        post.likes.unshift({user:req.user.id});
        await post.save();

        res.json(post.likes);
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg:'Post not found'}); 
        }
        res.status(500).send('Server Error');
    }
});



module.exports = router