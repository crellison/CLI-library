describe("Book", function() {
  var Book = require('../../lib/Book');
  var basicData = {
    author: 'Carlos Ruiz Zafón',
    title: 'The Shadow of the Wind',
    publishYear: 2004
  }
  var book;
  var error;

  beforeEach(function() {
    error = {}; // reset error each time
  });

  it("should throw an error when called without no args", function() {
    expect(() => new Book()).toThrowError();
  });
  it("should throw an error when an insufficient data object is passed", function() {
    expect(() => new Book({
      author: 'Carlos Ruiz Zafón',
      title: 'The Shadow of the Wind'
    })).toThrowError();
    expect(() => new Book({
      title: 'The Shadow of the Wind',
      publishYear: 2004
    })).toThrowError();
    expect(() => new Book({
      author: 'Carlos Ruiz Zafón',
      publishYear: 2004
    })).toThrowError();
  });
  it("should not throw an error when all the data is there", function() {
    expect(() => new Book(basicData)).not.toThrowError();
  });
  it("should set all the relevant data accurately when provided", function() {
    var before = Date.parse(new Date());
    book = new Book(basicData);
    var after = Date.parse(new Date());
    expect(book.title).toEqual(basicData.title);
    expect(book.author).toEqual(basicData.author);
    expect(book.publishYear).toEqual(basicData.publishYear);
    expect(book.summary).toEqual('')
    expect(book.genre).toEqual('');
    expect(book.state).toEqual(-1);
    expect(book.rating).toBeUndefined();
    expect(book.rated).toBeFalsy();
    expect(before <= book.dateCreated && after >= book.dateCreated).toBeTruthy();
  })

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrowError("song is already playing");
  //   });
  // });
});
