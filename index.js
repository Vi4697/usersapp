const express = require("express");
//import the express module into the index.js file

const app = express();
//express.json() is a middleware function that parses JSON payload
//in the incoming API requests

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api/users", require("./src/routes/api/users"));
//import all the routes that we will create in another directory

app.listen(3000, () => console.log('Server started'));
//set the application to listen at port 3000
//return a message on the console stating that the server has started

