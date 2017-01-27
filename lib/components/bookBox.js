#!/usr/bin/env node
'use strict';

// book box creator for each elt in list

const blessed = require('blessed');

function bookBox(book) {
  var box = blessed.box({
    // top: 'center',
    left: 'center',
    width: '90%',
    height: '100',
    tags: true,
    content: book.title,
    border: {
      type: 'line'
    },
    style: {
      fg: 'white',
      bg: book.dateFinished ? 'green' : book.dateStarted ? 'yellow' : 'red',
      border: {
        fg: '#f0f0f0'
      },
      hover: {
        bg: 'grey'
      }
    }
  });

  box.setLine(1, book.author);
  box.insertLine(1, book.publishYear);

  return box
}

module.exports = bookBox;