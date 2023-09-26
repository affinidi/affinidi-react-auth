# Affinidi React Auth Plugin

This plugin helps to integrate Affinidi Login into your React Application

## Prerequistes

Please go through the below steps to install Affinidi tools
1. Install Affinidi Vault from [here](https://dev.docs.affinidi.com/labs/affinidi-login-nextjs/#before-you-begin-i-classfa-solid-fa-stari)

2. Install Affinidi CLI tool from the [here](https://dev.docs.affinidi.com/dev-tools/affinidi-cli/)

## Applications folder structure
Below the folder structure we are going to create, where our entire code resides
`affinidi-apps` is main root folder, `client-app` is frontend react app and `server-app` is our backend API.
```
- affinidi-apps
    - client-app
    - server-app
```

## Create React Application

1. Create a sample react app with name `client-app` using `create-react-app` command

```
npx create-react-app client-app
```

2. Change the directory to `client-app` and open the project in VS Code

```
cd client-app
```

3. Start the app by executing the below command to see the application is working

```
npm start
```

Note: Application will be running on http://localhost:3000/

## Integrate Affinidi Login

Now follow the below steps to integrate `Affinidi Login` to your application using affinidi packages.

1. Install the affinidi npm package `affinidi-react-auth`

```
npm i affinidi-react-auth
```

2. To tell the development server to proxy any unknown requests to your API server in development, add a proxy field to your `package.json`, for example:

```
 "proxy": "http://localhost:3001",
```

3. Open the Landing React Page which is under `\src\App.js`
4. Add below import statements

```
import React from "react";
import { AffinidiLoginButton, useAffinidiProfile } from 'affinidi-react-auth'
```

5. Add below code to use affinidi's hook to get the profile information once login flow is completed

```
  const { isLoading, error, profile, handleLogout } = useAffinidiProfile()

  async function logout() {
    //clear session cookie
    handleLogout();
    window.location.href = "/";
  }
```

6. Add below code in JSX to display Affinidi Login button, error, profile etc..

```
    {!profile && <>
        <AffinidiLoginButton />
    </>}

    {isLoading && <p>Loading...</p>}

    {profile && <>
        <button style={{ marginRight: 10 }} onClick={logout}>
        Logout
        </button>

        <h3>User Profile</h3>
        <pre style={{ textAlign: "left" }}>{JSON.stringify(profile, null, 4)}</pre>
    </>}

    {error && <><h2>error</h2>{error}</>}
```
7. Sample `App.js` looks like [here](https://github.com/kamarthiparamesh/affinidi-react-auth/blob/main/playground/client/src/App.js)

8. Run the application again using `npm start`, this time you should see the Affinidi Login button. we are going to create backend in next steps 

## Create Express Server 

Now follow the below steps to create basic express server application

1. Create a folder `server-app` and change to that directory
```
mkdir server-app
cd server-app
```
2. Init the project by creating a package.json file using below npm command
```
npm init -y
```
3. Install the packages like express (for creating a server), dotenv(for creating environment variables from .env file) and nodemon(for automatic re-running)
```
npm install express dotenv nodemon
```
4. Create a file with name `index.js` and add below basic express server setup
```
var express = require('express');
require('dotenv').config()

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;

const initializeServer = async () => {

    app.get('/', function (req, res, next) {
        res.json({ success: 'Express' });
    });

    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
    });

}

initializeServer();

```
6. Add npm start command script in `package.json`
```
"start": "nodemon index.js"
```
7. Start the application using below command
```
npm start
```
Note: Backend server will be running on http://localhost:3001/


## Add Affinidi Provider to the Express Server 

Now follow the below steps to add Affinidi OAuth2.0 to complete the Code Grant flow.

1. Install the Affinidi package `passport-affinidi`
```
npm i passport-affinidi
```
2. Open `index.js` and import the package
```
const affinidiProvider = require('passport-affinidi')
```
3. Initialize provider with settings
```
  await affinidiProvider(app, {
      id: "affinidi",
      issuer: process.env.AFFINIDI_ISSUER,
      client_id: process.env.AFFINIDI_CLIENT_ID,
      client_secret: process.env.AFFINIDI_CLIENT_SECRET,
      redirect_uris: ['http://localhost:3000/auth/callback']
  });
```
  Sample `index.js` looks like [here](https://github.com/kamarthiparamesh/affinidi-react-auth/blob/main/playground/server/index.js)

4. Create file `.env` with below keys 
```
AFFINIDI_CLIENT_ID=""
AFFINIDI_CLIENT_SECRET=""
AFFINIDI_ISSUER=""
``` 
5. Create Login configuration using the [link](https://dev.docs.affinidi.com/docs/affinidi-login/login-configuration/#create-a-login-configuration) 

6. You can specify name as `Affinidi Login App` and redirect-uri as `http://localhost:3000/auth/callback` while creating login configuration

    Sample Command
    ```
    affinidi login create-config --name='Affinidi Login App' --redirect-uris='http://localhost:3000/auth/callback'
    ```

    Sample response
    ```
    {
        "ari:identity:ap-southeast-1:d085c5a5-5765-4d8f-b00e-398f0916a161:login_configuration/0143bf454065664893b030289ae17903",
        "projectId": "d085c5a5-5765-4d8f-b00e-398f0916a161",
        "id": "<LOGIN_CONFIG_ID>",
        "name": "Affinidi Login App",
        "auth": {
            "clientId": "<CLIENT_ID>",
            "clientSecret": "<CLIENT_SECRET>",
            "issuer": "<ISSUER>",
            "tokenEndpointAuthMethod": "client_secret_post"
        },
        "redirectUris": [
            "http://localhost:3000/auth/callback"
        ],
        "clientMetadata": {
            "name": "",
            "origin": "",
            "logo": ""
        },
        "creationDate": "2023-09-19T05:10:19Z"
    }

    ```

    **Important**: Keep the Client ID and Client Secret safe that will be used later for setting up your IdP or your OIDC-compliant applications. Client Secret will only be available once.
7. Open `.env` file and update the respective values of the `CLIENT_ID`, `CLIENT_SECRET` and `ISSUER`. Sample values are shown below 
```
AFFINIDI_CLIENT_ID="13456678c-67ac-429a-b0d3-5c64ec4c0577"
AFFINIDI_CLIENT_SECRET="AbcdeF-odZtJ9tc3oLuWVW.ECE_"
AFFINIDI_ISSUER="https://apse1.api.affinidi.io/vpa/v1/login/project/d085c5a5-5765-4d8f-b00e-398f0916a161"
```
5. Start the server using below command
```
npm start
```

## Test the application

1. Open the URL http://localhost:3000/ and check frontend application is running, if its not running then open the terminal to `client-app` folder and run `npm start` command
2. Open the URL http://localhost:3001/ and check backend is running, if its not running then open the terminal to `server-app` folder and run `npm start` command
3. Now click on Affinidi Login button in frontend app and see the magic


## Update Login Configuration to get profile information
The login configuration created in previous step uses default PEX query which requests only `Email` data, Now we modify the PEX query to request `Email` and `User Profile` data
1. Create a file `profile-pex.json` with contents from file [here](https://github.com/kamarthiparamesh/affinidi-react-auth/blob/main/playground/server/profile-pex.json)
2. Execute the below command to update the login configuration by replacing `LOGIN_CONFIG_ID` with value obtained from previous step
 
```
affinidi login update-config --id=LOGIN_CONFIG_ID --file=./profile-pex.json
``` 
Sample Command
```
affinidi login update-config --id=384192b3b3ea3df8cece307fda64cf98 --file=./profile-pex.json
```



