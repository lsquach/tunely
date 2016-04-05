/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */
//var allAlbums = [];

$(document).ready(function() {
    console.log('app.js loaded!');

    $.ajax({
      method: 'GET',
      url: '/api/albums',
      success: albumSuccess,
      error: handleError
    });

  $('.form-horizontal').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/albums',
      data: $(this).serialize(),
      success: newAlbumSuccess,
      error: newAlbumError
    });
  });

  $('#albums').on('click', '.add-song', function(e) {
      console.log('add-song clicked!');
      var currentAlbumId= $(this).closest('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
      console.log('currentAlbumId',currentAlbumId);
      $('#songModal').data('album-id', currentAlbumId);
      $('#songModal').modal();
  });

});


function albumSuccess(albums) {
  albums.forEach(function renderEachAlbum(album) {
    renderAlbum(album);
  });
}

function handleError(e) {
  console.log('uh oh');
  $('#albums').text('Failed to load songs, is the server working?');
}

function newAlbumSuccess(json) {
  console.log(json);
  renderAlbum(json);
  $('textarea').val('');
  $('input').val('');
}

function newAlbumError() {
  console.log('new album error!');
}

function handleNewSongSubmit(e) {
  e.preventDefault();

}

// this function takes albums and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);
  var source = $('#albums-template').html();
  var albumsTemplate = Handlebars.compile(source);
  var renderedHTML = albumsTemplate(album);
  $('#albums').prepend(renderedHTML);
}
