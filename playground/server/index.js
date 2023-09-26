var express = require('express');
require('dotenv').config()

const affinidiProvider = require('passport-affinidi')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {

    app.get('/', function (req, res, next) {
        res.json({ success: 'Express' });
    });

    await affinidiProvider(app, {
        id: "affinidi",
        issuer: process.env.AFFINIDI_ISSUER,
        client_id: process.env.AFFINIDI_CLIENT_ID,
        client_secret: process.env.AFFINIDI_CLIENT_SECRET,
        redirect_uris: ['http://localhost:3000/auth/callback'],
        expressSesssion: {
            session_secret: "express session secret key",
        },
        routes: {
            init: '/api/affinidi-auth/init', //The first route name which returns the URL for user to redirect to Affinidi
            complete: '/api/affinidi-auth/complete' //The second route name processes the response from Affinidi and returns user profile
        },
        verifyCallback: (tokenSet, userinfo, done) => {
            console.log('verify callback', tokenSet, userinfo);
            return done(null, tokenSet.claims());
        },
        onSuccess: (user, profile) => {
            console.log('success', profile);
        },
        onError: (err) => {
            console.log('error', err);
        },
    });

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

}

initializeServer();
