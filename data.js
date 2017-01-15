#!/usr/bin/env node
'use strict';

const fs = require('fs');
const _  = require('underscore');

const entryKeys = [
  'id', // integer // set at introduction to the dataset
  'author', // string
  'title', // string
  'genre', // string
  'publishYear', // integer
  'dateStarted', // MDN Date object
  'dateFinished', // MDN Date object
  'summary', // string // 250 char max
  'rating', // 0 = subpar // 1 = par // 2 = above par
  'rated', // bool
  'process' // -1 = not started // 0 = started // 1 = finished
];

function init(filepath) {
  fs.open(filepath, 'r', (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`No files exists at ${filepath}. Writing new file.`)
        fs.open(filepath, 'wx', (err, fd) => {
          if (err) throw err;
          else {
            fs.writeSync(fd,'[]')
            fs.closeSync(fd)
          }
        })
      } else throw err;
    } else checkData(fd)
  })
}

function addBook(bookData) {
  // book data comes in JSON with the following keys
  // author, title, genre, publishYear, dateStarted, dateFinished, summary 
  entryKeys.forEach(elt => {
    if (!bookData.hasOwnProperty(elt)) 
      throw Error('Book data must contain the following properties: '+
      'author, title, genre, publishYear, dateStarted, dateFinished, summary')
  })
}

function checkData(fd) {
  console.log(`Checking data stored in ${filepath}`)
  console.log(`No issues found in ${filepath}`)
  fs.closeSync(fd)
}

init('./books.json')