The project is using yarn as project manager. The website is an one-page application built with ReactJS. 

### yarn start 

This command will start a development build. 

### yarn build 

This command will build an optimized production of the website. Then use `serve` to deploy it.

# Pages 

## Main
The main page contains the navBar, the introduction information of the averitect engine, "make claim button" which leads to page NewClaim and a list of popular recent claims links (still under development).

## Signin
The signin page contains the navBar, signin form which consists of email & password input & signin button. On signin success, the page will switch to main. 

Each time a user sign in successfully, he will be assigned a cookie which will automatically log him in within next 7 days.

## Signup
The signup page contains the navBar, signup form. Email, password, confirm password and a verification code sent to the given email are needed to signup. <u>The email to send vericode is not a business one yet (actually an outlook personal email under my name) and this an issue that requires attention.</u> 

On clicking the `Get Code` button, the website will post a request to the server and the server will check the eligibility of the email given. If passed, it will respond with the hashed verification code. If the email has been registered, it will respond a special string: `USED_EMAIL`. More information about `Get code` button see [vericodeButton](#vericodebutton) part.

The password is required to be at least 6 in length. There are no other requirement on the password.

Before the button `Get Code` is clicked and a valid hashed verification code is returned, button `Sign In` will stay disabled.

Pop up windows are used here to give user error or success response. 

On sign up success, it will be directed to sign in page.

## New Claim
The page contains the navBar, a text area for the input of claim to be checked and a `Make Claim` button, which will activate the checking process.

If the user has not signed yet, error message of `Sign in first` will be shown and page will be directed to sign in.

## checked
This page is disigned to be the history of a user's checking history. Currently, all the history entries will be loaded at once, which may be a problem if the list is too long. By clicking one of the history entries, the claim will be checked again (navigate to result page). 

## About Us
This page presents the information of related projects and <u>other more things to be discussed</u>.

## pageResult
This page contains the navBar and the presentation of checked result.

The checked result includes both a machine result from AI engine and search result from human-check data base. The latter is list of links to related website. The following is the result from proofver model. More information see [resultPresent](#resutpresent) <u>One problem about this is that the search engine used by the database is not powerful and the results are usually unrelated.</u>


# Elements 

## veriCodeButton

The get verification code button is used to request a verication code sent to the given email. A code will expire after <b>5 mins</b> and the button will be disabled for <b>2 minutes</b> after each successful request. Successful request means that the email is valid and not registered with averitect website.

## Nav Bar 
The navgation bar is placed on every page. It contains a logo (which will navigate to the main page), several page names, signin & signup button (if not signed in) / username & signout button (otherwise).

## resutPresent
This element is for presenting check result from different sources(either human or our check engine) in different format, and also the check history list item is also rendered in this part. The activated present format are: short_human_result, history, and proofverResult. 

## popularClaims
This is expected to be the content of popular claims on main page. <u>But the function is under development. </u>  And may get ignored forever...

## proofverRender

This component renders the response of proofver check result to JSX element. 

The presentation right now is an step by step animation. The natural logic relations between each pair of phases, and the verdict states are shown on each step. The play/pause button and rewind button are used to control animation. 

# Interface with fact-checking-server

HTTP requests are used to connect the client and the server.


The detailed description of response please refer to README file in the website server. 

### SignIn
POST `/signIn` with body JSON: `{userName: string, passwd: string} `

### SignUp
Post `/signUp` with body JSON: `{userName: string, passwd: string}`


### Signout
Do not make HTTP request. Clear user info and the login cookie.

### getHistory
POST `/history` with body JSON: `{userName: string}`

### check a claim
POST `checkClaim` with body JSON: `{claim: string, userName: string}`

### request a veriCode sending
POST `/email` with body JSON: `{userName: string}`