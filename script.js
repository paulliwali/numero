// initialize client with app credentials
SC.initialize({
  client_id: 'YOUR_CLIENT_ID'
  redirect_uri: 'file://localhost/Users/Milo/numero/callback.html'
})

// initiate auth popup
SC.connect(function() {
  SC.get('/me', function(me) { 
    alert('Hello, ' + me.username); 
  });
});

$(document).read(function() {
	SC.get('/tracks/293', function(track) {
		SC.oEmbed(track.permalink_url, document.getElementById('player'));
    });
  });
});
