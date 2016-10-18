// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '1825528160993684', // your App ID
        'clientSecret'    : 'c7241a7d3552a2b8898271cfcc4a2737', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '852277916711-e040rfvugahpuhrf1stv3vqirg91nfqq.apps.googleusercontent.com',
        'clientSecret'     : 'qMij3M2M5nDuQVNYtg-un-vZ',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};