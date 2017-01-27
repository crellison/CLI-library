#!/usr/bin/env node
'use strict';

// This file contains the blessed interface that plugs into the
// library object and makes everything fun

const blessed = require('blessed');
const Library = require('./Library');
const bookBox = require('./components/bookBox');

var l = new Library('./test.json');

var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'CLI Library'

l.then((library) => {
  var books = library.getBooks();

  books.forEach((book,i) => {
    if (i === 0) {
      var box = bookBox(book);
      screen.append(box);
    }
  })
  screen.render()
})

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Render the screen.
screen.render();