const Post = require('../../models/post');


exports.getPosts = postType => {
    return Post.find({postType: postType});
}


exports.getPost = postId => {
    return new Promise((resolve , reject) => {
        Post.findOne({_id: postId} , (err , postData) => {
            if(err) reject(err);
            postData.views++;
            postData.save();
            resolve(postData);
        });
    });
}