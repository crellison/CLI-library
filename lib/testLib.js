#!/usr/bin/env node
'use strict';

const Library = require('./Library')

var l = new Library('./test.json')

setTimeout(() => {

  l.updateBook({dateStarted: "Jan 20 2013", dateFinished: "Feb 3 2013"},0)
  l.save()
}, 500)