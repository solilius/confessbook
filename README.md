# Confessbook

a confessions manager for Facebook confessions pages,
allowing you to handle confession's posting and scheduling in a more orgenized way.

#### Table of Contents

  * [Abilities](#abilities)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Deployment](#deployment)
  * [How To Use](#how-to-use)
  
<br/>

## Abilities
  * Submitting confessions anonymously.
  * Organizing confessions in convenient lists.
  * Editing confessions before posting (editor's comment, confession number).
  * Posting the confession directly using Facebook API.
  * Archiving deleteld and posted confessions.
  * Token based security for authentication.


##### In Development
  * Schedule a confession for future posting.
  * Set schedulers for automatic posting from tagged confessions.
  * Full mobile compatibility.

<br/>

## Prerequisites

##### 1. Facebook Page
&emsp; If you don't already have a page use [this guide](https://www.facebook.com/help/104002523024878) to create a new Facebook Page.
##### 2. Facebook App
&emsp; Go to [Facebook for Developers](https://developers.facebook.com/apps/) and add a new app, name it as your page's name (you might need to create a Developer Account).
##### 3. Access Token
* go to [Facebook's Graph API Explorer](https://developers.facebook.com/tools/explorer), and select your Facebook App from the list.
* press on _Get Token_ and select _Get User Access Token_.
* add the following permissions from _Events Group Pages_:
  * manage_pages
	* pages_show_list
	* publish_pages
	* business_management
	* public_profile (added automatically)
* click the _Generate Access Token_ and copy the _Access Token_.
* go to [Facebook's Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/) and paste the token, then click on _Debug_, scroll down and click on _Extend Access Token_, copy the new token.
* open a new tab and paste this:
* `https://graph.facebook.com/[Page_ID]?fields=access_token&access_token=[Token]` 
    *  the _Page ID_ is in the  About section of your Facebook page.
    *  the Token is the extended one from the last step.
    * (no square brackets of course...)
* copy the _"access_token"_ and That's the Access Token we will use.
##### 4. Mongo DB
&emsp; If you don't have a MongoDB ready, you can get one for free [here](https://www.mongodb.com/atlas-signup-from-mlab?).
* sign up, create a free cluster, choose Cloud Provider & Region.
* after the cluster is created (1-3 minutes) click _connect_ on you new cluster (Clusrter0 probably).
* on _Whitelist a connection IP address_ choose _Add a Different IP Address_, insert 0.0.0.0 and click _Add IP Address_
* insert a user name and a password and click on _Choose a connection method_.
* on the next page choose _connect your application_, copy the URI you received and remember to replace _<password>_ with the new user's password.

<br/>

#### For Local Deployment

##### 5. NodeJS
&emsp; Get the latest version of NodeJS from [here](https://nodejs.org/en/), LTS version is recommended).

##### 6. Angular CLI
&emsp; Run the command: ```$ npm install -g @angular/cli ```.

<br/>

## Installation
* Clone the repository
* Run the command: ``` $ npm i``` to install all the dependencies.
* in the root repository create **.env** file. in fill it out like this:
```
FB_API=https://graph.facebook.com/104845176905...
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
| FB_API  | https://graph.facebook.com/[Page_ID] |
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
* go to the Deploy tab and choose GitHub, connect and choose this project's repository, _Enable Automatic Deploys_, but before you click _Deploy Branch_...
* go to _Settings_ tab, click on Reveal Config Vars and add all the vars from the .env file (except PORT).
* go back to _Deploy_ tab, scroll down and click _Deploy Branch_. after the build process is finished you can access the app by clicking  _Open app_ on the top right.

<br/>

## How To Use

### Save Confession 
`http://your-app.domain` + `/`
This is the route your confessors will access to send their confessions.
(it's compatible with both desktop and mobile browsers.)

### Manage Confessions
`http://your-app.domain` + `/login`
You will be moved here automaticlly if you try to go to `/manager`
and only after the authentication you will be rediredted there.

### Manage Confessions
`http://your-app.domain` + `/manager` + `/main`
Here you can view all the pending confessions
click one one to expend and reviel all the confession.
you can edit it and add a comment before posting it.
or delete it which will move it to the archive

### Archive
`http://your-app.domain` + `/manager` + `/archive`
Here you can view all the archived confessions, and restore them.
you can see when they were created and posted/deleted and by who.
there is a toggle on the top left to filter only the none-posted confession.

### Schedualers
`http://your-app.domain` + `/manager` + `/scheduler`
in development atm.
