var BaseController = require("./Base"),
    View = require("../views/Base"),
    model = new (require("../models/UserModel")),
    crypto = require("crypto"),
    fs = require("fs");

module.exports = BaseController.extend({
    run: function(req, res, next) {

    },

    signIn: function(req,res,next){
        var v = new View(res, 'user-signin');
        if(req.body && req.body.email){
            model.setDB(req.db);
            var user = {
                email : req.body.email,
                password: req.body.password,
                name : req.body.name,
                surname: req.body.surname,
                company: req.body.company,
                mobileNumber :req.body.mobileNumber
            }
            model.insert(user, function(err, objects) {
                v.render({
                    deneme: 'Saved'
                });
            });
        }
        v.render({
            title: 'Please signin'
        });
    }
});