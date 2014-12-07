// Replace all API Wrappers from SoundCloud .live to .on

// initialize client with app credentials
SC.initialize({
  client_id: 'e70a2323a96fbe32617ccb56d8df6d85',

  // change this uri to actual hosted callback.html
  redirect_uri: 'http://numero.phantastik.koding.io/callback.html',
});

// initiate auth popup
$("#login").on("click", function(){
  SC.connect(function() {
    SC.get('/me', function(me) {
      alert('Hello, ' + me.username);
    });
  });
})

// Gives top track widget
  SC.get("/tracks", { genres: 'edm', license: 'cc-by-sa' }, function(tracks){
    var randomnumber=Math.floor(Math.random()*11);
    var track = tracks[randomnumber];
    SC.oEmbed(track.uri, {maxheight: "250", color: "ff0066"}, document.getElementById("player"));
  });


// Gives a specific track widget
/*
$("#stream").on("click", function(){
  $SC.stream("/tracks/293", {autoPlay: true});
});
*/

/*
var track_url = 'http://soundcloud.com/forss/flickermood';
SC.oEmbed(track_url, {color: "ff0066", maxheight: "120"}, document.getElementById("player"));
*/
