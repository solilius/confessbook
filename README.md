# Confessbook

a confessions manager for Facebook confessions pages,
allowing you to handle confession's posting and scheduling in a more orgenized way.
[click here to see screenshots](https://confessbook.pixieset.com/confessbook/)

#### Table of Contents

  * [Abilities](#abilities)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Deployment](#deployment)
  * [How To Use](#how-to-use)
  
  
## Abilities
  * Submitting confessions anonymously.
  * Organizing confessions in convenient lists.
  * Editing confessions before posting (editor's comment, confession number).
  * Posting the confession directly using Facebook API.
  * Schedule a single post for later publish.
  * Create an auto time based scheduler for tagged confessions. 
  * Archiving deleteld and posted confessions.
  * Token based security for authentication.


##### In Development
  * Full mobile compatibility.

<br/>

## Prerequisites

<br/>

##### 1. Facebook App
* first make sure you have a Developer Account go [Here](https://developers.facebook.com/docs/pages/getting-started/) and scroll down until you see a button saying _Create Developer Account_ and click it.
* click next and for _"as Which of the following best describes you?"_ choose _Developer_.
* then click _Create You First App_ and name it as your page.
* after it's creatred it will redirect you to the app managment page, on your left side go to _Setting > Basic_  amd in the _Privacy Policy URL_ input box paste this: <br/>
`https://www.privacypolicies.com/generic/?fbclid=IwAR2HttnlhNRWmfgZrd3aWGsaOF7FCe6p_RadxFTAH-68d2YXLxAmY9jU14M` <br/>
and click _Save Changes_ button on the bottom of the page.
* 
* on the top left you will see _In development_  toogle, click it,  _Choose a Category_ > _Businnes and Pages_, and then click _Switch Mode_. the toggle should show _Live_ now.
<br/>

##### 2. Access Token
* go to [Facebook's Graph API Explorer](https://developers.facebook.com/tools/explorer), and select your Facebook App from the list.
* press on _Get Token_ and select _Get User Access Token_.
* add the following permissions from _Events Group Pages_:
  * public_profile (added automatically)
  * manage_pages
  * publish_pages
* click the _Generate Access Token_ and copy the _Access Token_.
* go to [Facebook's Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/) and paste the token, then click on _Debug_, scroll down and click on _Extend Access Token_, copy the new token.
* open a new tab and paste this:
* `https://graph.facebook.com/[Page_ID]?fields=access_token&access_token=[Token]` 
    *  the _Page ID_ is in the  About section of your Facebook page.
    *  the Token is the extended one from the last step.
    * (no square brackets of course...)
* copy the _"access_token"_ and That's the Access Token we will use.

<br/>

##### 3. Mongo DB
If you don't have a MongoDB ready, you can get one for free [here](https://www.mongodb.com/atlas-signup-from-mlab?).
* sign up, create a free cluster, choose Cloud Provider & Region.
* after the cluster is created (1-3 minutes) click _connect_ on you new cluster (Clusrter0 probably).
* on _Whitelist a connection IP address_ choose _Add a Different IP Address_, insert 0.0.0.0 and click _Add IP Address_
* insert a user name and a password and click on _Choose a connection method_.
* on the next page choose _connect your application_, copy the URI you received and remember to replace _<password>_ with the new user's password.

<br/>

##### 4. GitHub
If you don't already have a GitHub account create on from [here](https://github.com/join?source=header-home). <br/>
now click on the _Fork_ button on the top right, now you should have a copy of this repository named **Confessbook**

<br/>

#### For Local Deployment

Get the latest version of NodeJS from [here](https://nodejs.org/en/), LTS version is recommended). <br/>
and run the command: ```$ npm install -g @angular/cli ```.


<br/>

## Installation
* Clone the repository
* Run the command: ``` $ npm i``` to install all the dependencies.
* in the root repository create **.env** file. in fill it out like this:
```
PAGE_ID=104603479746871
ACCESS_TOKEN=XrHqlfuG1ZB8zsgE7kBvovwdIeSb0TZB9...
DB_URI=mongodb+srv://myuser:mypassword@cluster...
PORT=3000
ADMIN_PASSWORD=Aa123456
SECRET=secret1234
APP_NAME=Somethimg Confessions
INTRO=don't be shy just confess!
```

<br/>

**Values Explained:**

<br/>

| Key | Value |
| ------------- |-------------|
| PAGE_ID  | Your Facebook page ID |
| ACCESS_TOKEN| The last Token we generated |
| DB_URI | Connections string to the DB  |
| ADMIN_PASSWORD |password for the Admin  User |
| PORT | Port when running locally |
| SECRET| Random string to encrypt logging token|
| APP_NAME | The name of your page|
| INTRO | The message in the confession form |

<br/>

## Deployment
**Locally**
* if it's the first time run the command: ``` $ ng build``` before to build the Angular app, or ``` $ ng build --prod``` to use the prod environment file.
* run the command: ``` $ npm start```.
* can also run ``` $ ng serve``` for a more responsive debugging of the angular app. accessible on port 4200

<br/>

**Heroku Cloud Platrofm**

* go to [Heroku](https://www.heroku.com/). sign up/in. (if you sign up choose NodeJS as _your Primary development language_, and Other as _Role_).
* Create a new app, choose an _App name_ and a _region_ and click _Create app_.
* go to the Deploy tab and choose GitHub, connect and choose your new forked repository, _Enable Automatic Deploys_, but before you click _Deploy Branch_...
* go to _Settings_ tab, click on Reveal Config Vars and add all the vars from the .env file (except PORT).
* go back to _Deploy_ tab, scroll down and click _Deploy Branch_. after the build process is finished you can access the app by clicking  _Open app_ on the top right.
 ###### Please notice! Heroku gives only 550 hours per month. use [this guide](https://medium.com/better-programming/keeping-my-heroku-app-alive-b19f3a8c3a82) to maximize the usage. 
<br/>

## How To Use

### Save a Confession 
`http://your-app.domain` + `/`
This is the route your confessors will access to send their confessions.
(it's compatible with both desktop and mobile browsers.)

### Login
`http://your-app.domain` + `/login`
You will be moved here automaticlly if you try to go to `/manager`
and only after the authentication you will be rediredted there.

### Manage Confessions
`http://your-app.domain` + `/manager` + `/main`
Here you can view all the pending confessions
click one one to expend and reveal all the confession.
you can edit it and add a comment before posting it.
or delete it which will move it to the archive.
also, you can schdule a confession for later publish by Facebook or add a custom tag and let our schedulers to post it in time.

### Schedulers
`http://your-app.domain` + `/manager` + `/scheduler`
In this tab you can mannage all the available schedulers: 
1. Set a scheduler for auto posting confessions with a custom tag on fixed interval.
2. View, edit and cancel posts that are scheduled by Facebook for later publish.

### Archive
`http://your-app.domain` + `/manager` + `/archive`
Here you can view all the archived confessions, and restore them or completely delete them (from Faebook too)
you can see when they were created and posted/deleted and by who.
there is a toggle on the top left to filter only the none-posted confession.
