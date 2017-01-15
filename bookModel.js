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
    throw Error('Publish year must be an integer');
}
function checkRating(rating) {
  if (rating && ratingValues.indexOf(rating) === -1)
    throw Error('Rating must be one of -1, 0, or 1');
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
  requiredKeys.forEach(elt => {
    if (!bookData.hasOwnProperty(elt)) 
      throw Error('Book data must contain the following properties: author, title, publishYear')
  })
  checkPublishYear(bookData.publishYear);
  checkRating(bookData.rating);
  checkGenre(bookData.genre);
  checkSummary(bookData.summary);

  var newBook = {
    author: bookData.author,
    title: bookData.title,
    genre: bookData.genre || '',
    publishYear: parseInt(bookData.publishYear),
    dateCreated: Date.parse(new Date()),
    summary: bookData.summary || '',
    rating: bookData.rating || undefined,
    rated: bookData.rating || false,
  }
  
  if (bookData.dateStarted) {
    if (isNotDate(bookData.dateStarted))
      throw Error('Date provided for date started was invalid');
    else 
      newBook.dateStarted = Date.parse(bookData.dateStarted);
  }
  if (bookData.dateFinished) { 
    if (isNotDate(bookData.dateFinished))
      throw Error('Date provided for date finished was invalid');
    else
      newBook.dateFinished = Date.parse(bookData.dateFinished);
  }
  var now = Date.parse
  newBook.state = !newBook.dateStarted  || newBook.dateStarted  > newBook.dateCreated ? -1 : 
                  !newBook.dateFinished || newBook.dateFinished > newBook.dateCreated ?  0 : 1

  return newBook
}

console.log(Book({
  author: 'Carlos Ruiz Zafón',
  title: 'The Shadow of the Wind',
  publishYear: 'appke'
}))
