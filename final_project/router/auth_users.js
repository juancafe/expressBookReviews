const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
// Write code to check is the username is valid
const userMatches = users.filter((user) => user.username === username);
return userMatches.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
// Write code to check if username and password match the one we have in records.
const matchingUsers = users.filter((user) => user.username === username && user.password === password);
return matchingUsers.length > 0;
}

// Only registered users can login
// Invocar con curl or Postman as endpoint customer/login
// Task 7 screenshot in 7-login.png
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented regd_users.post('/login'"});
  const username = req.body.username;
  const password = req.body.password;

  if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign({data:password}, "access", {expiresIn: 3600});
      req.session.authorization = {accessToken,username};
      return res.status(200).send("User successfully logged in");
  }
  else {
      return res.status(208).json({message: "Invalid username or password"});
  }
});

// Add a book review
// Task 8 screenshot in 8-reviewadded.png
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented regd_users.put('/auth/review/:isbn'"});
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;
  if (books[isbn]) {
      let book = books[isbn];
      book.reviews[username] = review;
      return res.status(200).send("Review successfully posted");
  }
  else {
      return res.status(404).json({message: `ISBN ${isbn} not found`});
  }
});


// Delete a book Task 9
// Screenshot 9-deletereview.png
regd_users.delete("/auth/review/:isbn", (req, res) => {
     // Update the code here
    //  res.send("Yet to be implemented")//This line is to be replaced with actual return value
    // Extract email parameter from request URL
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    if (books[isbn]) {
        let book = books[isbn];
        delete book.reviews[username];
        return res.status(200).send("Review successfully deleted");
    }
    else {
        return res.status(404).json({message: `ISBN ${isbn} not found`});
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
