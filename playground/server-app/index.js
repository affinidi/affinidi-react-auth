var express = require('express');
var cors = require('cors');
require('dotenv').config()
const { affinidiProvider } = require('@affinidi/passport-affinidi')

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {

    app.get('/', function (req, res, next) {
        res.json({ success: 'Express' });
    });

    app.use(cors({ credentials: true, origin: true }));
    app.set('trust proxy', 1);

    await affinidiProvider(app, {
        id: "affinidi",
        issuer: process.env.PROVIDER_ISSUER,
        client_id: process.env.PROVIDER_CLIENT_ID,
        client_secret: process.env.PROVIDER_CLIENT_SECRET,
        redirect_uris: ['http://localhost:3000/auth/callback']
    });

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

}

initializeServer();
