const fs = require('fs');
const _  = require('underscore');

const expectedKeys = ['author', 'title', 'genre', 'publishYear', 'dateStarted', 'dateFinished', 'summary'];
const filepath = './books.json'

function init() {
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
  expectedKeys.forEach(elt => {
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

init()