# Google OAuth 2.0 login with passport-google-oauth20 and jwt token verification

## Pre-requisites for the authentication
1. Go to [Google Developer Console](console.cloud.google.com)
2. From the top left corner create new project
3. Select the project and go to `APIs & Services` -> `Credentials`
4. Click on `Create Credentials` -> `OAuth client ID`
5. Configure the consent screen -> `External` -> `Create`
6. Add app name, user support email, developer contact information -> `Save and Continue`
7. Scopes -> `Save and Continue`
8. Test users -> `Save and Continue`
9. Summary -> `Back to Dashboard`
10. Create credentials -> `OAuth client ID`
11. Select `Web application` and give a name to your application
12. Add `Authorized JavaScript Origins` -> `http://localhost`, `http://localhost:5050`, `http://localhost:3000`
13. Add `Authorized redirect URIs` -> `http://localhost:5050/auth/google/callback`, `http://localhost:3000/auth/google/callback`
14. Click on `Create`
15. Copy `Client ID` and `Client Secret` and add them to your `.env` file as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` respectively. NOTE: Add `.env` file to .gitignore
16. Add `GOOGLE_CALLBACK_URL=/auth/google/callback` to your `.env` file

## Google Sign-in button
1. Go to [Generate HTML code](https://developers.google.com/identity/gsi/web/tools/configurator)
2. Add the client ID and login URI -> The login uri is the POST endpoint where the call is made, i.e. `/api/users/login/google`
3. Click `Next`
4. Select `Enable Sign in with Google button`
5. Select desired theme and size -> `Get code`
6. Copy the code and paste it in your HTML file
7. Load the Google API script in every page where Google Sign-in button is used -> `<script src="https://accounts.google.com/gsi/client" async></script>`

NOTE: `Google Sign-in JavaScript for Web` is deprecated and therefore GIS should be used (Google Identity Services)<br />
NOTE: Sometimes when the Google Cloud Credentials are changed, the application may not work. In that case, restart the application and wait for a few minutes 
