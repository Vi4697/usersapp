const express = require("express");
//Import express to create API routes

const router = express.Router();

const uuid = require("uuid");
//Import uuid to generate ids for new users

let users = require("../../models/Users");
// Import users to use user data


router.get("/", (req, res) => {
    
    res.json(users);

});
//route displays the users’ data in the API response



router.get("/:id", (req, res) => {
    
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        res.sendStatus(400);
    }
});
//route to search for a user’s data using their ID



//create user
router.post("/", (req, res) => { 

    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
    };


    if (!newUser.name || !newUser.email) {

        return res.sendStatus(400);
    
    }

    users.push(newUser);

    res.json(users);
});
//POST API request that enables us to add a user into the management system



//udate user
router.put(
    "/:id", (req, res) => {

        const found = users.some(user => user.id === parseInt(req.params.id));

        if (found) {

            const updateUser = req.body;

            users.forEach(user => {

                if (user.id === parseInt(req.params.id)) {
                    user.name = updateUser.name ? updateUser.name : user.name;

                    user.email = updateUser.email ? updateUser.email : user.email;

                    res.json({ msg: "User updated", user });
                }

            });
        } else { 
            res.sendStatus(400);
        } 
    }
);
//API route that takes in the ID of a particular user, updates the data of that user it found



//delete user
router.delete("/:id", (req, res) => { 
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {

        users = users.filter(user => user.id !== parseInt(req.params.id));

        res.json({
            msg: "User deleted",
            users
        });
    } else {
    
        res.sendStatus(400);
    
    } 
});
//takes in a user’s ID as input and deletes that user if found



module.exports = router ;