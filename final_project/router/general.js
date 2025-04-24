const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    // Return JSON response with formatted books data
    return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Return books based on ISBN
    const isbn = req.params.isbn;
    if(books[isbn]) {
        return res.send(books[isbn]);
    } else {
        return res.send("Unable to find book")
    }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Return books based on Author
    const author = req.params.author;
    Object.keys(books).forEach(book => {
        if(books[book].author === author) {
            res.send(books[book]);
        }
    });
    res.send("Unable to find book with Author "+ author)
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Return books based on Title
    const title = req.params.title;
    Object.keys(books).forEach(book => {
        if(books[book].title === title) {
            res.send(books[book]);
        }
    });
    res.send("Unable to find book with Title "+ title)
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
   //Return reviews based on isbn
   const isbn = req.params.isbn;
    if(books[isbn]) {
        return res.send(books[isbn].reviews);
    } else {
        return res.send("Unable to find book")
    }
});

module.exports.general = public_users;
