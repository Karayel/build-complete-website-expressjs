    var request = require("request");

    var Content = require('../models/Content'),
        View = require("../views/Base"),
        Academy = require('../controllers/Academy'),
        Admin = require('../controllers/Admin');

module.exports = function(app, passport) {

// normal routes ===============================================================

    
    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        var v = new View(res, 'index');
        v.render();
        //res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        var v = new View(res,'profile');
        v.render({user : req.user});
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            var v = new View(res,'login');
            v.render({ message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            var v = new View(res,'signup');
            v.render({message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

        // handle the callback after twitter has authenticated the user
        app.get('/auth/twitter/callback',
            passport.authenticate('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect/local', function(req, res) {
            var v = new View(res,'connect-local');
            v.render({ message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // twitter --------------------------------

        // send to twitter to do the authentication
        app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

        // handle the callback after twitter has authorized the user
        app.get('/connect/twitter/callback',
            passport.authorize('twitter', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    app.get('/create',isLoggedIn,function(req,res){

        var headers = {"Authorization": "SECRET 7YAQDEXSVRGVFDSBBSEABAWEOY"};
        var task = {
          "tasks": {
            "task_name": "video.create",
            "definition": "<movie service='craftsman-1.0'><body><widget type='director.theme.tiles'><track type='video'><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/1.jpg'><track type='caption'><text>731 S Fremont Ave Springfield 65804</text></track></image><text>For Sale - $179,900A 3 Bed, 2 Bath, 1872 SqFt Home in SpringfieldContact Laura Beaty417-838-8498</text><image type='map' center='37.201035,-93.27152799999999' zoom='10.0'></image><image type='map' center='37.201035,-93.27152799999999' zoom='15.0'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/1.jpg'><track type='caption'><text>3 Bedrooms, 2 Bathrooms</text></track></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/2.jpg'><track type='caption'><text>Presented by Laura Beaty</text></track></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/3.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/4.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/5.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/6.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/7.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/8.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/9.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/10.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/11.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/12.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/13.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/14.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/15.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/16.jpg'></image><image filename='http://s3.amazonaws.com/stupeflix-assets/apiusecase/16.jpg'></image></track></widget></body></movie>",
            "thumbnail_time": 15
          }
        };

        request.post({
            url: "https://dragon.stupeflix.com/v2/create",
            body: task,
            headers: headers,
            json: true
          }, function (error, httpObj, taskCreation) {
            if (!error && httpObj.statusCode == 200) {
              request.get({
                url: "https://dragon.stupeflix.com/v2/status",
                qs: { tasks: taskCreation[0]["key"] },
                headers: headers,
                json: true
              }, function(error, httpObj, taskStatusAndResult) {
                if (!error && httpObj.statusCode == 200) {
                    res.send(taskStatusAndResult);
                  // taskStatusAndResult[0]["status"] contains either "queued", "executing", "success", or "error"
                }
              })
            }
        });
    })

    app.get('/save',function(req,res,done){
        // create the user
        var newContent  = new Content();

        newContent.title    = 'asada';
        newContent.text = 'asada';
        newContent.type = 'asada';
        newContent.picture = 'asada';

        newContent.save(function(err) {
            if (err)
                return done(err);

             return done(null, newContent);
        });

    });

    app.all('/academy',function(req,res,next){
        Academy.run(req, res, next);
    });

    app.all('/admin*',function(req, res, next) {
        Admin.run(req, res, next);
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
