#!/usr/bin/env node
'use strict';

const Library = require('./Library')

var l = new Library('./test.json')

l.then(library => {
  console.log(library.getBooks())
  
})