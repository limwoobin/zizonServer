'use strict';

var Post = require('../../models/post');

exports.getPosts = function (postType) {
    return Post.find({ postType: postType });
};

exports.getPost = function (postId) {
    return new Promise(function (resolve, reject) {
        Post.findOne({ _id: postId }, function (err, postData) {
            if (err) reject(err);
            postData.views++;
            postData.save();
            resolve(postData);
        });
    });
};

exports.getRecentPosts = function () {
    return new Promise(function (resolve, reject) {
        Post.find().sort('-regDate').limit(5).select('_id title').then(function (res) {
            resolve(res);
        }).catch(function (err) {
            reject(err);
        });
    });
};

exports.WritePost = function (body) {
    return new Promise(function (resolve, reject) {
        var post = new Post();
        post.userEmail = body.userEmail;
        post.postType = body.postType;
        post.title = body.title;
        post.content = body.content;
        post.image = body.image;
        post.save(function (err) {
            if (err) reject(err);
            resolve('success');
        });
    });
};