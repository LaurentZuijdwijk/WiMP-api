var _ = require('lodash');
var PassThrough = require('stream').PassThrough;
var ffmpeg = require('fluent-ffmpeg');
exports = module.exports = Track;
function Track(track, _wimp){
	this._wimp = _wimp;
	this.soundQuality = _wimp._config.quality;
	_.merge(this, track);
}
Track.prototype.play = function(){
	var wimp = this._wimp;
	var stream = new PassThrough();
	var streamUrl = this.requestStreamUrl(function(err, url){
// todo we need to implement passthrough


	});

 	return stream;
};
Track.prototype.requestStreamUrl = function(fn){
	var wimp = this._wimp;
	var params = {
		'soundQuality': this.soundQuality
	};
	wimp.request('GET', 'tracks/' + this.id + '/streamUrl', params, null, function(err, res){
		if(err){
			fn(err);
		}else if(!res.body || !res.body.url){
			fn(new Error('response contained no "url"'));
		}else{
			fn(null, res.body.url);
		}
	});
};
