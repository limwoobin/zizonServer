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

exports.getRecentPosts = () => {
    return new Promise((resolve , reject) => {
        Post.find()
            .sort('-regDate')
            .limit(5)
            .select('_id title')
            .then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
    })
}

exports.WritePost = (body) => {
    return new Promise((resolve , reject) => {
        let post = new Post();
        post.userEmail = body.userEmail;
        post.postType = body.postType;
        post.title = body.title;
        post.content = body.content;
        post.image = body.image;
        post.save((err) => {
            if(err) reject(err);
            resolve('success');
        });
    })
}