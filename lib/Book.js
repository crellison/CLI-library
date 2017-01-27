#!/usr/bin/env node
'use strict';

// this file specifies the shape of a book object

const _ = require('underscore');
const checkers = require('./bookCheckers');

function newBook(bookData) {
  // creates a new book object
  bookData = bookData || {};

  checkers.requiredKeys.forEach(elt => {
    if (!bookData.hasOwnProperty(elt)) 
      throw Error('Book data must contain the following properties: author, title, publishYear')
  })
  if (bookData.publishYear) checkers.checkNumber(bookData.publishYear);
  if (bookData.rating) checkers.checkNumber(bookData.rating);
  if (bookData.rating) checkers.checkRating(bookData.rating);
  if (bookData.genre) checkers.checkGenre(bookData.genre);
  if (bookData.summary) checkers.checkSummary(bookData.summary);

  var book = {
    title: bookData.title || '',
    genre: bookData.genre || undefined,
    rated: bookData.rated || false,
    rating: bookData.rating || undefined,
    author: bookData.author || '',
    summary: bookData.summary || '',
    publishYear: parseInt(bookData.publishYear),
    dateCreated: Date.parse(new Date()),
    dateStarted: undefined,
    dateFinished: undefined,
  }

  if (bookData.dateStarted) {
    if (checkers.isNotDate(bookData.dateStarted))
      throw Error('Date provided for date started was invalid');
    else book.dateStarted = Date.parse(bookData.dateStarted);
  }
  if (bookData.dateFinished) { 
    if (checkers.isNotDate(bookData.dateFinished))
      throw Error('Date provided for date finished was invalid');
    else book.dateFinished = Date.parse(bookData.dateFinished);
  }
  
  return book;
}

function updateBook(newData, oldBook) {
  // updates a book with new data, verifying all the information provided
  var shouldUpdate;
  _.each(newData, (val, key) => {
    shouldUpdate = true;
    if (/(title)|(genre)|(author)/.test(key)) {
      if (typeof val !== 'string') throw Error('Field input must be a string');
    } else if (/summary/.test(key) ) {
      checkers.checkSummary(val);
    } else if (/(rating)|(publishYear)/.test(key)) {
      checkers.checkNumber(val);
    } else if (/date(Started)|(Finished)/) {
      if (checkers.isNotDate(val)) throw Error('Date provided was invalid');
      oldBook[key] = Date.parse(val);
      shouldUpdate = false;
    } else {
      // console.log(`"${key}" is not a valid field for a book.`);
      shouldUpdate = false;
    }
    if (shouldUpdate) oldBook[key] = val;
  })
  if (!isNaN(oldBook.rating)) oldBook.rated = true;
  return oldBook;
}

module.exports = {
  newBook: newBook,
  updateBook: updateBook
}