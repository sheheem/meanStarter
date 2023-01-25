const express = require('express')
const multer = require('multer')

const Post = require('../model/post')

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error("Invalid MIME type")
        if(isValid) {
            error = null;
        }
        cb(error, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-')
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '-' +ext)
    }
})


router.post('', multer({storage: storage}).single("image") , (req,res,next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    });
    post.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                id: result._id,
                title: result.title,
                content: result.content,
                imagePath: result.imagePath
            }
        })
    })
})



router.get('',(req,res,next) => {
   Post.find().then((document) => {
    console.log(document);
       res.status(200).json({
           message: 'Posts fetched successfully',
           posts: document
       })
   })
})


router.delete('/:id', (req,res,next) => {
    Post.findByIdAndDelete(req.params.id).then((document) => {
        console.log(document);
        res.status(200).json({
            message: 'Post deleted successfully'
        })
    }) 
}) 

module.exports = router;