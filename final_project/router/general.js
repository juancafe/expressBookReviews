const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}


// Register a New User ???
// Task 6 screenshot in 6-register.png
public_users.post("/register", (req,res) => {
  //Write your code here
 // return res.status(300).json({message: "Yet to be implemented public_users.post'/register' in general.js"});

 const username = req.body.username;
 const password = req.body.password;

 // Check if both username and password are provided
 if (username && password) {
     // Check if the user does not already exist
     if (!doesExist(username)) {
         // Add the new user to the users array
         users.push({"username": username, "password": password});
         return res.status(200).json({message: "User successfully registered. Now you can login"});
     } else {
         return res.status(404).json({message: "User already exists!"});
     }
 }
 // Return error if username or password is missing
 return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
// Task 1 screenshot in 1-getallbooks.png
public_users.get('/',function (req, res) {
  //Write your code here
 //return res.status(300).json({message: "Yet to be implemented public_users.get'/' in general.js"});
 // Solicito devuelva el array books
  return res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
// Task 2 screenshot in 2-gedetailsISBN.png
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 // return res.status(300).json({message: "Yet to be implemented public_users.get'/isbn/:isbn' in general.js"});
  let isbn = req.params.isbn;
  const book = books[isbn];
  if(!book){
  return res.status(404).json({message: "Book not found"});
  }
  return res.status(200).json(book);
 });
  
// Get book details based on author
// Task 3 screenshot in 3-getbooksbyauthor.png
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented public_users.get'/author/:author' in general.js"});
    // Retrieve the email parameter from the request URL and send the corresponding friend's details
 //   const author = req.params.author; 
  //  res.send(books[author]);
  const author = req.params.author;
  const filteredBook = Object.values(books).filter(book => book.author === author);
  if(filteredBook.length > 0){
    return res.status(200).json(filteredBook);
  }else{
    return res.status(404).json({message: "NO books found for this author."});
  }
});


// Get all books based on title
// Task 4 Screenshot in 4-getbooksbytitle.png
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    //  return res.status(300).json({message: "Yet to be implemented public_users.get'/title/:title' in general.js"});
 //   const title = req.params.title; 
 //   res.send(books[title]);
 const title = req.params.title;
 const filteredTitleBooks = Object.values(books).filter(book => book.title === title);

 if (filteredTitleBooks.length > 0) {
   return res.status(200).json(filteredTitleBooks)
 } else {
   return res.status(404).json({message: "NO books found for this title"});
 }
});

//  Get book review
// Task 5 Screenshot in getbookreview.png
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    // return res.status(300).json({message: "Yet to be implemented public_users.get'/review/:isbn' in general.js"});
 //   const review = req.params.review; 
 //   res.send(books[review]);
 let isbn = req.params.isbn;
 const book = books[isbn];
 if (book && book.reviews) {
   return res.status(200).json(book.reviews)
 } else {
   return res.status(404).json({message: "No reviews found for this book"});
 }
});

module.exports.general = public_users;
