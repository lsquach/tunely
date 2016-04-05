/************
 * DATABASE *
 ************/
var db = require('../models');

// app.get('/api/songs', function (req, res) {
//   // send all songs as JSON response
//   db.Song.find(function(err, songs){
//     if (err) { return console.log("index error: " + err); }
//     res.json(songs);
//   });
// });

// GET /api/albums
function index(req, res) {
  db.Album.find(function(err, albums) {
    if (err) { return console.log("index error:" + err); }
      res.json(albums);
  });
}

function create(req, res) {
  console.log('album create', req.body);
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;
  db.Album.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });

}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
