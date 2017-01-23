#!/usr/bin/env node
'use strict';

// this small file contains some functions and arrays used in
// book object data validation

const requiredKeys = [
  'author',
  'title',
  'publishYear'
];

const bookKeys = [
  'title',
  'rated',
  'author', 
  'summary',
  'dateCreated',
  'publishYear',
]

function isNotDate(date) { return isNaN(Date.parse(date)) }
function checkNumber(data) { 
  if (isNaN(parseInt(data))) 
    throw Error('Entry must be an integer.');
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

module.exports = {
  bookKeys: bookKeys,
  isNotDate: isNotDate,
  checkGenre: checkGenre,
  checkRating: checkRating,
  checkNumber: checkNumber,
  requiredKeys: requiredKeys,
  checkSummary: checkSummary,
}