SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
})

$(document).read(function() {
  SC.get('/tracks', { genres: 'pop' }, function(tracks) {
    $(tracks).each(function(index, track) {
      $('#results').append($('<li></li>').html(track.title + ' - ' +_track.genre));
    });
  });
});
