# BUGXINATOR (BUG TRACKING APP)

![bug](/bug.png)

## About the App

Ever lost sleep trying to figure out a problem in your app after you updated the code? Ok, ok, I hear ya!, the answer is "daaah yes of course!!". So, I imagined myself working as a programmer for a software development company and I started thinking how would they go about tackling this issue (instances, processes, people involved, tools, etc). Based on these ideas, I decided to work on a bug tracking system to manage the bug life cycle in a software company. I did a little googling so I could implement the basics given that it would be an individual project and I wanted to keep the timeline below a month.

Technologies used:

![JavaScript](https://img.shields.io/badge/-JavaScript-696969?style=flat&logo=javascript)  
![React](https://img.shields.io/badge/-React-696969?style=flat&logo=react)  
![Redux Toolkit](https://img.shields.io/badge/-Redux-696969?style=flat&logo=redux&logoColor=764ABC)  
![HTML5](https://img.shields.io/badge/-HTML5-696969?style=flat&logo=HTML5)  
![CSS](https://img.shields.io/badge/-CSS-696969?style=flat&logo=CSS3&logoColor=1572B6)  
![Node.js](https://img.shields.io/badge/-Node.js-696969?style=flat&logo=node.js)  
![Express](https://img.shields.io/badge/-Express-696969?style=flat&logo=express)  
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-696969?style=flat&logo=postgreSQL)  
![Sequelize](https://img.shields.io/badge/-Sequelize-696969?style=flat&logo=Sequelize)  
![Git](https://img.shields.io/badge/-Git-696969?style=flat&logo=git)  
![GitHub](https://img.shields.io/badge/-GitHub-696969?style=flat&logo=github)

Functionalities

CRUD operations for bugs and users. Besides naming and providing details, each bug can be assigned a priority, a severity, a nature, and a resolution status. Bugs can be viewed by app or by user or full list. The app handles authorization and authentication by levels (EndUser, Developer, Manager and Admin) using **JWT** <sub>![JWT](/icons8-json-web-token-24.png)</sub>.

I deployed the app through **[Render](https://bugxinator.onrender.com "Render")** and this is the link to the web page: **[Bugxinator](https://bugxinator.onrender.com/ "Bugxinator")**, _let me know your comments and suggestions!_

PS: Future potential enhancements: filtering, messaging system, reporting.

<h3> 🤝🏻 &nbsp;You can connect with me through </h3>

<p align="center">
<a href="https://www.linkedin.com/in/aldo-moro/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Aldo%20Moro-blue?style=flat-square&logo=linkedin"></a>
<a href="mailto:moro_bramanti@hotmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-moro_bramanti@hotmail.com-blue?style=flat-square&logo=outlook"></a>
</p>

⭐️ Link to my ![GitHub](https://img.shields.io/badge/-GitHub-696969?style=flat&logo=github) profile: [AM4772](https://github.com/AM4772)

## How to use it locally

- You must install in your computer:
  - A text editor, like **`Visual Studio Code`**.
  - **`Git`**, link to instructions: [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git "Instructions Git")
  - **`PostgreSQL`**, link to instructions: [PostgreSQL](https://www.postgresql.org/download/ "Instructions PostgreSQL"). I used version 14.
  - **`Node.js version 16.20.0`**, link: [Node.js](https://www.nodejs.org/en/download/ "Instructions Node.js")
- In this page, above, look for a green button named "Code". Click on it and copy the HTTPS address to this repository.
- In your text editor, place the cursor in the desired folder, paste the HTTPS address and hit Enter. This will download the repository to your computer. You will see the same folder structure and files as you see at the top of this page. Next, run the following commands inside the folder `npm install` and then `npm init`.
- Now you must install all the required dependencies for the front-end and back-end:
  - Front-end: place cursor inside `client`folder and run the following command:
  ```bash
      npm install react react-dom react-router-dom react-redux react-scripts react-spinners @reduxjs/toolkit date-fns jwt-decode @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fvilers/disable-react-devtools
  ```
  - Back-end: place cursor inside `api`folder and run the following command:
  ```bash
      npm install body-parser cookie-parser cors dotenv morgan bcrypt uuid express express-async-handler express-rate-limit express-static express-validator jsonwebtoken pg pg-hstore sequelize node
  ```
- In the `api` folder, create a `.env` file with the following content:
  ```javascript
  DB_USER = postgres;
  DB_PASSWORD = `your PostgreSQL password`; // this is the one you created when downloading the software
  DB_HOST = localhost;
  DB_NAME = itracker;
  PORT = 3001;
  ```
- In ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-696969?style=flat&logo=postgreSQL), you must create a new database named **itracker**.
- The content inside the `client` folder was created using **`Create React App`** with npx.
- To run the app in your localhost:
  - In the `api/config` folder, modify the _NODE_ENV_ variable from "production" to "", in the `db.js` file.
  - In the `client/sro/app` folder, modify _devTools_ to false in the `store.js` file.
  - In the `client/sro/app/api` folder, modify the _baseUrl_ to "http://localhost:3001", or port number you use in the `apiSlice.js` file.
  - Lastly, in the terminal run the command `npm start` from within the `api` folder and then do the same from the `client` folder. This should open up a browser where you will see the app running.

### 🤝🏻 &nbsp;Contact me if you have any problems with the instructions
