// initialize client with app credentials
SC.initialize({
  client_id: 'e70a2323a96fbe32617ccb56d8df6d85',
  redirect_uri: 'http://run2walkaway.github.io/callback.html',
});

// initiate auth popup
SC.connect(function() {
  SC.get('/me', function(me) {
    alert('Hello, ' + me.username);
  });
});

$("#stream").live("click", function(){
  SC.stream("/tracks/293", {autoPlay: true});
});

// SC.oEmbed("http://soundcloud.com/forss/sets/soulhack", {color: "ff0066"}, document.getElementById("player"));
