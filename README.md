# ExpresJS/MongoDB API and ReactJS/Redux frontend

## Description

This project was built to help you start Full Stack E-Commerce Web App with a boilerplate which is fully ready for most of the basic back end tasks such as authorization, authentication and CRUD

## Technologies/Libraries used

* ReactJS
* Redux
* NodeJS
* JWT
* Express
* MongoDB/Mongoose
* Styled Components


## Features

* User registration and login
* Authentication via JWT
* CRUD for adding products to e-commerce app

### Installing

```
git clone https://github.com/MrArsen1998/Front-back-e-commerce.git
cd backend
npm install
```
Same actions for frontend

```
cd frontend
npm install
```

## Getting Started

To test the application

* Register on https://www.mongodb.com/atlas/database
* Create your free shared database and choose a username and password for it
* Add your username and password to the .env file (you need to create your .env file in the root of the project)
* Example 
MONGO_URI="mongodb+srv://username:password@cluster0.nfa40se.mongodb.net/?retryWrites=true&w=majority"
* Make a temporary gmail account for testing purposes
* Enable 2 factor authentication and click on app passwords (article: https://mailtrap.io/blog/send-emails-with-nodejs/)
* Add your email and password for the app in the .env file
* Example
EMAIL_SENDER='yourchosenemail@gmail.com'
EMAIL_PASSWORD='password
* Choose a random string as JWT secret or generate it in your terminal
* Also choose another random string for secret, which is will be used for actions with users (register, login and etc.)
```
node
console.log(crypto.randomBytes(64).toString('hex'));
```
Copy it and place in in your .env file
* Example
JWT_SEC="yourrandomlygeneratedsecret"
PASS_SEC="yourrandomlygeneratedsecret"

### Start the application

For backend: 
```
nodemon server.js 
```
For frontend: 
```
npm start
```
* Register via http://localhost:3000/auth/register with username, email, and password in the body as JSON format via Postman or any alternatives
* If successful, you should get a email that confirms your registration
* Login via http://localhost:3000/auth/login with the same email and password
* Your response should have a JSON token
* Place it inside the Authentication tab Bearer Token
* Make a request to http://localhost:3000/products
* If you get 200 OK and {"posts": []} as a result, everything was successul
* From there you can edit the app based on your needs

## Authors

Arsen Yenokyan
