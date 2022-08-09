# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


The website is an one-page application built with ReactJS. 

# Pages 

## Main
The main page contains the navBar, the introduction information of the averitect engine, "make claim button" which leads to page NewClaim and a list of popular recent claims links (still under development).

## Signin
The signin page contains the navBar, signin form which consists of email & password input & signin button. On signin success, the page will switch to main.

## Signup
The signup page contains the navBar, signup form. Email, password, confirm password and a verification code sent to the given email are needed to signup. <u>The email to send vericode is not a business one yet (actually an outlook personal email under my name) and this an issue that requires attention.</u> 

On clicking the `Get Code` button, the website will post a request to the server and the server will check the eligibility of the email given. If passed, it will respond with the hashed verification code. If the email has been registered, it will respond a special string: `USED_EMAIL`. More information about `Get code` button see [here](#vericodebutton)

The password is required to be at least 6 in length. There are no other requirement on the password.

Before the button `Get Code` is clicked and a valid hashed verification code is returned, button `Sign In` will stay disabled.

Pop up windows are used here to give user error or success response. 

On sign up success, it will be directed to sign in page.

## New Claim
The page contains the navBar, a text area for the input of claim to be checked and a `Make Claim` button, which will activate the checking process.

If the user has not signed yet, error message of `Sign in first` will be shown and page will be directed to sign in.

## checked
This page is disigned to be the history of a user's checking history (still under development).

## About Us
This page presents the information of related projects and <u>other more things to be discussed</u>.

## pageResult
This page contains the navBar and the presentation of checked result.

The checked result includes both a machine result from AI engine and search result from human-check data base. <u>The former is still under development (because the engine is still not available yet). </u>The latter is list of links to related website. <u>One problem about this is that the search engine used by the database is not powerful and the results are usually unrelated.</u>



# Elements 

## veriCodeButton

The get verification code button is used to request a verication code sent to the given email. A code will expire after <b>5 mins</b> and the button will be disabled for <b>2 minutes</b> after each successful request. Successful request means that the email is valid and not registered with averitect website.

## Nav Bar 
The navgation bar is placed on every page. It contains a logo (which will navigate to the main page), several page names, signin & signup button (if not signed in) / username & signout button (otherwise).

## resutPresent
This element is for presenting check result from different sources(either human or our check engine) in different format. For now, only short & long format of human check result is included. <u>More work needed after engine is ready.</u>

## popularClaims
This is expected to be the content of popular claims on main page. <u>But the function is under development. </u>

# API functions
##