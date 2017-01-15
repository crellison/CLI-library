#!/usr/bin/env node
'use strict';

const fs = require('fs');
const _  = require('underscore');

const Book = require('./Book')

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
  
}

function checkData(fd) {
  console.log(`Checking data stored in ${filepath}`)
  console.log(`No issues found in ${filepath}`)
  fs.closeSync(fd)
}

// init('./books.json')
var i = new Book({
  author: 'Carlos Ruiz Zafón',
  title: 'The Shadow of the Wind',
  publishYear: 2004
})

console.log(i)
var book, error;

try {
      book = new Book()
    } catch(err) {
      error = err;
    } finally {
      console.log(error.message)
    }