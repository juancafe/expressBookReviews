const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented regd_users.post('/login'"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented regd_users.put('/auth/review/:isbn'"});
});


// Delete a book Task 9
// Screenshot 9-deletereview.png
regd_users.delete("/auth/review/:isbn", (req, res) => {
     // Update the code here
//  res.send("Yet to be implemented")//This line is to be replaced with actual return value
    // Extract email parameter from request URL
    const isbnmail = req.params.isbn;
    if (email) {
        // Delete books from 'booksdb' object based on provided isbn
        delete books[isbn];
    }
    
    // Send response confirming deletion of friend
    res.send(`Friend with the email ${email} deleted.`);

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
