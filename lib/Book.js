#!/usr/bin/env node
'use strict';

const entryKeys = [
  'id', // integer // set at introduction to the dataset
  'author', // string
  'title', // string
  'genre', // string
  'publishYear', // integer
  'dateStarted', // milliseconds since 1970 Jan 1
  'dateFinished', // milliseconds since 1970 Jan 1
  'dateCreated', // timestamp of addition to database (milliseconds since 1970 Jan 1)
  'summary', // string // 250 char max
  'rating', // 0 = subpar // 1 = par // 2 = above par
  'rated', // bool
  'state' // -1 = not started // 0 = started // 1 = finished
];
const requiredKeys = [
  'author',
  'title',
  'publishYear'
];
const ratingValues = [1,2,3];
const stateValues = [-1,0,1];

function isNotDate(date) { return isNaN(Date.parse(date)) }
function checkPublishYear(data) { 
  if (isNaN(parseInt(data))) 
    throw Error('Publish year must be an integer.');
}
function checkRating(rating) {
  if (rating && ratingValues.indexOf(rating) === -1)
    throw Error('Rating must be one of 1, 2, or 3');
}
function checkGenre(genre) {
  if (genre && !(typeof genre === 'string'))
    throw Error('Genre must be a string');
}
function checkSummary(summary) {
  if (summary) {
    if (!(typeof summary === 'string'))
      throw Error('Summary must be a string');
    else if (summary.length > 250)
      throw Error('Summary has a maximum length of 250 characters');
  }
}

function Book(bookData) {
  bookData = bookData || {};
  
  requiredKeys.forEach(elt => {
    if (!bookData.hasOwnProperty(elt)) 
      throw Error('Book data must contain the following properties: author, title, publishYear')
  })
  checkPublishYear(bookData.publishYear);
  checkRating(bookData.rating);
  checkGenre(bookData.genre);
  checkSummary(bookData.summary);

  this.author = bookData.author;
  this.title = bookData.title;
  this.genre = bookData.genre || '';
  this.publishYear = parseInt(bookData.publishYear);
  this.dateCreated = Date.parse(new Date());
  this.summary = bookData.summary || '';
  this.rating = bookData.rating || undefined;
  this.rated = bookData.rating || false;
  
  if (bookData.dateStarted) {
    if (isNotDate(bookData.dateStarted))
      throw Error('Date provided for date started was invalid');
    else 
      this.dateStarted = Date.parse(bookData.dateStarted);
  }
  if (bookData.dateFinished) { 
    if (isNotDate(bookData.dateFinished))
      throw Error('Date provided for date finished was invalid');
    else
      this.dateFinished = Date.parse(bookData.dateFinished);
  }
  var now = Date.parse
  this.state = !this.dateStarted  || this.dateStarted  > this.dateCreated ? -1 : 
                  !this.dateFinished || this.dateFinished > this.dateCreated ?  0 : 1
}

Book.prototpe = {
  constructor: Book,
}

module.exports = Book;

/* ******************************************* */
//                TESTING  ZONE                //
/* ******************************************* */

