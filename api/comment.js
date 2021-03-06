/**
 * Comment Api Controller
 */

var CommentProxy = require('../proxy').Comment;
var jsonTool = require('../common/jsonTool');

exports.add = function(req, res, next){
    var postId = req.params['postId'];
    if(!postId){
        return res.json(jsonTool.object('No postId!'));
    }

    var comment = req.body;

    if(!comment || !comment.email || !comment.content){
        return res.json(jsonTool.object('Not entire comment data!'));
    }

    CommentProxy.add(postId, comment.email, comment.content,
        function(err, comment){
            return res.json(jsonTool.object(err, comment));
        });
};

exports.get = function(req, res, next){
    var postId = req.params['postId'];

    if(!postId){
        return res.json(jsonTool.object('No postId!'));
    }


    CommentProxy.total(postId, function(err, count){
        if(err){
            return res.json(jsonTool.object(err));
        }

        CommentProxy.get(postId, function(err_1, comments){
            return res.json(jsonTool.data(err_1, comments, count));
        });
    });
};

exports.getById = function(req, res, next){
    var _id = req.params['_id'];

    if(!_id){
        return res.json(jsonTool.object('No Comment _id!'));
    }

    CommentProxy.getById(_id, function(err, post){
        return res.json(jsonTool.object(err, post));
    });
};

exports.getByPostId = function(req, res, next){
    var postId = req.params['postId'];

    if(!postId){
        return res.json(jsonTool.object('No postId!'));
    }

    CommentProxy.getByPostId(postId, function(err, post){
        return res.json(jsonTool.object(err, post));
    });
};

exports.delete = function(req, res, next){
    var _id = req.params['_id'];

    if(_id){
        return res.json(jsonTool.object('No Comment _id!'));
    }

    CommentProxy.delete(_id, function(err, count){
        return res.json(jsonTool.object(err, count));
    });
};
