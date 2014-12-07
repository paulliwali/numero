// Replace all API Wrappers from SoundCloud .live to .on

// initialize client with app credentials
SC.initialize({
  client_id: 'e70a2323a96fbe32617ccb56d8df6d85',

  // change this uri to actual hosted callback.html
  redirect_uri: 'http://run2walkaway.github.io/callback.html',
});

// initiate auth popup
/*
SC.connect(function() {
  SC.get('/me', function(me) {
    alert('Hello, ' + me.username);
  });
});
*/

// Gives top track widget
/*
$("#loadTracks").on("click", function(){
  SC.get("/tracks", {limit: 1}, function(tracks){
    var track = tracks[0];
    SC.oEmbed(track.uri, document.getElementById("track"));
  });
});
*/

// Gives a specific track widget
/*
$("#stream").on("click", function(){
  $SC.stream("/tracks/293", {autoPlay: true});
});
*/

// SC.oEmbed("http://soundcloud.com/forss/sets/soulhack", {color: "ff0066"}, document.getElementById("player"));
