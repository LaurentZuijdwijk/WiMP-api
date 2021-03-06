var lame = require('lame');
var Speaker = require('speaker');
var async = require('async');
var WiMP = require('../index');
var username = process.env.UN;
var password = process.env.PW;
WiMP.login(username, password, function(err, wimp){
	wimp.getUserPlaylists(function(err, playlists){
		var playlist = playlists[0];
		console.log(playlist);
		console.log('User playlist: %s', playlist.name);
		playlist.getTracks(function(err, tracks){
			tracks.sort(function(){
				return .5 - Math.random();
			});
			async.eachSeries(tracks, 
				function(track, callback){
					console.log('Playing: %s - %s', track.artist.name, track.name);
					track.play()
					.pipe(new lame.Decoder())
			 		.pipe(new Speaker())
			 		.on('finish', function (){
			 			callback();
			 		});
					//console.log(track.requestStreamUrl());
				}, function(err){
					console.log('The playlist %s is finished', playlist.name)
				}
			);
		});
	});			
});