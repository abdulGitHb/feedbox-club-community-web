const express = require('express')
const router = express.Router()
const Post = require('../models/post')
const user = require('../models/user')
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')


//api to create the post
// router.post('/create-post',async(req,res)=>{
//     let post = new Post(req.body)
    
//     let data = await post.save();
//     res.send(data);
// })


router.post('/create-post',requireLogin,(req,res)=>{
    const {title,desc,collegeName,postedDate,likes,comment,pic} = req.body

    const post = new Post({
        title,
        desc,
        postedDate,
        postedBy:req.user ,
        collegeName,
        likes,
        comment,
        img:pic,

    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })

//     console.log(req.user)
//     res.send("ok")

})


//api to get all posts
//it will be used to display at the homepage feed
router.get('/getAllPost',requireLogin,(req,res)=>{
    var mySort = { date: -1 };
    Post.find()
    .sort(mySort)
    .populate('postedBy').select("-password")
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{
        console.log(err)
    })
})




//api to get all the post created by user in their profile page
// router.get('/myPost/:id',requireLogin,(req,res)=>{
// //    let postedBy=req.user
//     Post.find({postedBy:req.params.id})
  
//     .populate('postedBy').select("-password")
//     .then(post=>{
//         res.json({post})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })



router.get('/myPost',requireLogin,async(req,res)=>{
  var mySort = { date: -1 };
   
    Post.find({postedBy:req.user._id})
    .sort(mySort)
  
    .populate('postedBy').select("-password")

    .then(event=>{
        // console.log(event)
        res.json(event)
    })
    .catch(err=>{
        console.log(err)
    })


})


//update post api
  router.put('/updatePost/:postId',async(req,res)=>{
    let result = await Post.updateOne(
        {_id:req.params.postId},
        {
            $set:req.body
        }
    )
    res.send(result)
  })



//delete post
router.delete('/deletePost/:postId',async(req,res)=>{
   const result = await Post.deleteOne({_id:req.params.postId});
   res.send(result)
    
})

//like api
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.json({error:err})
        }
        else{
            res.json(result)
        }
    })
})


//unlike api
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err)
        {
            return res.json({error:err})
        }
        else{
            res.json(result)
        }
    })
})


// comment api

router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        commentBy:req.user._id,
        date:req.body.date,
        message:req.body.message,
    }
    Post.findByIdAndUpdate(req.body.postedBy,{
        $push:{comment:comment}
    },{
        new:true
    })
    .populate("comment.commentBy","_id name")
    .exec((err,result)=>{
        if(err)
        {
            return res.json({error:err})
        }
        else{
            res.json(result)
        }
    })
})




module.exports = router