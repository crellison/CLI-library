#!/usr/bin/env node
'use strict';

// This file contains the Library handlers which 
// manipulate the JSON data file and book objects
// just a bit of casual OOP

const fs = require('fs');
const _  = require('underscore');

const book = require('./book');
const checkers = require('./bookCheckers');

function Library(filepath) {
  this.filepath = filepath;
  return new Promise(resolve => {
    fs.readFile(filepath, {encoding: 'utf8'}, (err, data) => {
      if (err) {
        if (_.isUndefined(data)) {
          // console.log(`No files exists at ${filepath}. Writing new file.`)
          fs.open(filepath, 'wx', (err, fd) => {
            if (err) throw err;
            else {
              fs.writeSync(fd,'[]')
              fs.closeSync(fd)
              resolve(this)
            }
          })
        } else throw err;
      } else {
        data = data || '[]';
        try {
          this.data = JSON.parse(data);
        } catch(err) {
          this.data = '[]';
          this.save();
        }
        this.checkSelf().then(() => resolve(this))
      }
    })
  })
}

Library.prototype = {
  constructor: Library,
  checkSelf() {
    return new Promise(resolve => {
      // console.log(`Checking data loaded from ${this.filepath}`);
      // check to make sure no data is corrupt
      var isCorrupt;
      var updated = false
      var tempData = JSON.parse(JSON.stringify(this.data));

      if (!_.isArray(tempData)) {
        tempData = []
        updated = true
      } else {
        _.each(tempData, (book, bookIndex) => {
          isCorrupt = false;
          checkers.bookKeys.forEach((elt, index) => {
            if (!book.hasOwnProperty(elt)) {
              updated = true;
              isCorrupt = true;
            }
          })
          if (isCorrupt) {
            // console.log(`Book at index ${bookIndex} is corrupt. Removing book...`);
            delete tempData[bookIndex];
          }
        })
      }
      if (updated) {
        // console.log(`Updating data at ${this.filepath}`)
        this.data = tempData.filter(_.isNull) || [];
      // } else console.log(`No issues found data loaded from ${this.filepath}`);
      this.save()
    }
    resolve()
    })
  },
  save() {
    fs.writeFile(this.filepath, JSON.stringify(this.data, null, 2), (err) => {
      if (err) throw err;
      // console.log('Library updated successfully');
    })
  },
  addBook(bookData) {
    // check if book already in list
    var entry = book.newBook(bookData);
    this.data.push(entry);
  },
  updateBook(bookData, index) {
    if (index >= this.data.length) throw Error('Index too large');
    var updatedBook = book.updateBook(bookData, this.data[index]);
    this.data[index] = updatedBook;
  },
  deleteBook(index) {
    if (index >= this.data.length) throw Error('Index too large');
    delete this.data[index];
    this.data = this.data.filter(_.isNull);    
  },
  getBooks() {
    return this.data;
  },
  removeDuplicates() {
    // find and remove duplicate books in list
  }
}

module.exports = Library;