(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"pincchio_atlas_1", frames: [[0,0,2021,956],[0,958,1888,779]]},
		{name:"pincchio_atlas_2", frames: [[109,2023,1,15],[214,1654,82,303],[0,0,352,560],[354,0,40,157],[298,1654,82,303],[0,562,352,560],[0,1654,107,369],[214,1959,127,64],[109,1654,103,367],[343,1959,127,64],[0,1124,363,528]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_23 = function() {
	this.initialize(img.CachedBmp_23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2590,1635);


(lib.CachedBmp_22 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["pincchio_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(img.CachedBmp_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2508,1186);


(lib.CachedBmp_9 = function() {
	this.initialize(img.CachedBmp_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2343,967);


(lib.CachedBmp_8 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["pincchio_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2844,1349);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2658,1105);


(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2508,1186);


(lib.CachedBmp_3 = function() {
	this.initialize(img.CachedBmp_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2343,967);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4276,2106);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2943,1840);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.wire9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EAMZA5IUgnOgtnAW3hEo");
	this.shape.setTransform(79.3587,365.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire9, new cjs.Rectangle(-1,-1,160.7,733.2), null);


(lib.wire8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EAJsAwFUggzgppAWzg2g");
	this.shape.setTransform(61.9444,307.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire8, new cjs.Rectangle(-1,-1,125.9,617.4), null);


(lib.wire7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EAEiAptUgPcgkYAK7gvB");
	this.shape.setTransform(28.9444,266.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire7, new cjs.Rectangle(-1,-1,59.9,535.8), null);


(lib.wire6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("AgwUQQDC0ljCz6");
	this.shape.setTransform(4.85,129.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire6, new cjs.Rectangle(-1,-1,11.7,261.1), null);


(lib.wire5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgDPAo0UAKJgmVgFugrS");
	this.shape.setTransform(20.7706,261.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire5, new cjs.Rectangle(-1,-1,43.6,524.4), null);


(lib.wire4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EALhA2PUgoNgh/Ad/hKe");
	this.shape.setTransform(73.7271,347.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire4, new cjs.Rectangle(-1,-1,149.5,696.2), null);


(lib.wire3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgGcAsmUAS1gksgIsg0f");
	this.shape.setTransform(41.2615,285.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire3, new cjs.Rectangle(-1,-1,84.5,572.8), null);


(lib.wire2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgPnA51UAr+gxxgR6hB4");
	this.shape.setTransform(100.0407,370.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire2, new cjs.Rectangle(-1,-1,202.1,742.2), null);


(lib.wire1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgREA5DUAxJgz0gVlg+R");
	this.shape.setTransform(109.2916,365.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.wire1, new cjs.Rectangle(-1,-1,220.6,732.2), null);


(lib.spotlight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(135,135,113,0.867)").ss(4,1,1).p("AAAAAIAAAA");
	this.shape.setTransform(134.1875,276.1875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(32,32,32,0.655)").s().p("AgNA4QgDg4gBg3IAbAAIAHAAIAAAEQgNADgOAAIAABhIAAAHIgDAAg");
	this.shape_1.setTransform(15,6.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(50,50,50,0.988)").s().p("AA7HvQg6g6g6g4IAAgOQgFjJACjMQABghgMgQIAAgHIAAkeIAAgHIAAhiQAOAAANgDIABgEQAYAAAYgEIAAgDIA4AAIAHAAIAAFJIAAAHIAADJQAADPAEDOQABAhgMAQQAAgDgCgCg");
	this.shape_2.setTransform(21.1787,50.025);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(32,32,32,0.647)").s().p("AgNAwQgDgwAAgwIAaAAIAIAAQAAABgBABQAAAAAAABQAAAAAAABQAAAAAAAAQgNADgNAAIAABTIAAAHIgEgBg");
	this.shape_3.setTransform(75.9,5.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,51,0.71)").s().p("AjtEGIgTgVQgkgqgRgxQgSgyAAg5QAAgtAMgpQAThHA3g4QAPgTARgSIAUgWQAyg5BsgkIABAAQA9gVAsgGIApgDIAHAAIAGAAQAjADAcAJIAIAEQATAOAXAIQAvArAMBTIAEAAQAkBSgTCNQgUCOhgBYQhgBYh/AAQiBAAhbhbg");
	this.shape_4.setTransform(89.1395,132.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(26,26,26,0.992)").s().p("Ao9HzQASgiAGgxIACgIQAUhXAWhRIAZhhIALgrQAHgWABgbQAOgOAEgbQADgVAFgVQAUhXAUhRQALgtAMgnQAGgUAEgVQAEgUAJgPQARgLAZgEQCzgbCxgeIB3gTIC1geIBxgSQA3gJA5gGIgxChIhUEYQgEAAgDgCQgpgXg5gmIgEgBQgMhSgvgrQgXgJgTgNIgIgEQgcgKgjgCIgGgBIgHAAIgpADIgPABQgLAAgIADQgOAGgQADQgLACgJADIgWAJIAAABQhsAjgyA5IgUAXQgRARgPATQg3A4gTBGIgHARQgFANAAAOQABAigMAPQAAA1ATAgIAKAQQARAyAkAqIBIB6IjLAwQhWAUhSAVQgHACgFADQgKAGgIAAQgNAAgGgQg");
	this.shape_5.setTransform(86.025,127.0916);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(129,129,129,0.996)").s().p("AirG4Ig6hJIhdh2QhdhyhihsIAAgHIAAhoQAMgPgBgiQgBgOADgOQAciaBihUQANAQgBAhQgDDNAGDIIAAAOQA7A4A6A6QABACABADQAMgQgBghQgFjNABjPIAAjKQAfgLAlgIIAYgFQAbgEAcgBIAxgDQApgDApADQAEAAADAEQBfBhBaBoQABABADAAQAjAjAgAoIAPASIAzA2QBCBSBJBJQABACAAADIh3ATQiyAeiyAbQgaAEgQALQgIAQgEAUQgFAUgGAUQgMAogLAsQgUBSgTBXQgGAVgCAWQgFAbgNAOIg5hGg");
	this.shape_6.setTransform(51.4,81.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(50,50,50,0.98)").s().p("AATETIgPgTQgegngjgjIgBgHQgKi/AEjPIAAgHIAAhUQAOAAANgDQAAAAAAAAQAAgBABAAQAAgBAAAAQAAgBAAgBQAYAAAXgDIAAgEIA4AAIAHAAIAAGcIAAD1Igzg2g");
	this.shape_7.setTransform(81.7698,32.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,153,0.22)").s().p("EgILBJaIgOgbQjPlwjDl/QjLl9jHmGImTsPQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQghhEgihCQiVkbiOkkQiTkjiPkoIgohTIgyhmQhKiXhIiXIgTgoIghhFIABAAIhDhhIhDhjIgEAFIgMgdIgIgLIACgCQgVgtgWgtQhmjHhfjQIgkhMMgZugxnIgBgBIg4hfIiYkEQg6hng8hkIiZkEQhNiChPh/IhIh7IATAVQBbBbCBAAQCAAABghYQBghYAUiOQATiOgkhSQA5AmApAYQADABAEAAQA4AwBFAlQANAHALAJIAKAHQA9ArBBAoICBBPQBPAxBJA0QBBAkA9ApID6CjQB9BRB/BRQBeA7BaA/IgBABQBZAwBTA2IFjDhIECChMB/2A3/MhapBUiQjSnvg7hsgEhWXhLQQgTghAAg0QAMgQgBghQAAgOAFgNIAHgRQgMApAAAuQAAA5ASAyIgKgQgEhRghSiQAJgEALgCQAQgCAOgGQAIgEALAAIAPAAQgsAGg+AVIAWgJg");
	this.shape_8.setTransform(609.925,627.3375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.spotlight, new cjs.Rectangle(0,0,1164.6,1157.5), null);


(lib.drape = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#993333").s().p("EhbWA98QhhgShCgbQhVgjg1g3QhBhEgfhwQgVhNgLiFQgelxgIm9QgGlEAFnsQAGnwAWvcQAMoJADkVQAEm6gIlkQgWpugIk3QgOojAamBQARjuAoidQAYhhAlhSQgNgjAHgvQAOhYBGgwQA7goBagLQA7gIBpAFIUHAzQAzACAeAJQAsANATAeQBMg4B1gLQBNgICIAMIUhBuQAzg6BfgXQA/gPBwgCQG0gLDuADQECADClAbQDlAnCjBhQBAhKB5gYQBSgRCNAEIRuAeQAyACAaADQApAGAeAQQAUAKARAOQATgSAagOQAngXA8gSQCQgtC9gOQBzgIDiAAINDACQA6AAAfAFQAyAIAgAYQAJAGAIAJIAQgKQBLguBWgYQBWgZBYgBQBSgBBzAWQBBAMCBAbQDqArEFgUQCxgOAuACQB+ADBUAvQAeARAXAWIADgCQA4gvBLgYQBAgVBSgIQA1gFBhgBIMZgOQCHgDBLANQByATBHA7QBFA6AlBpQAbBLAPB6QAsFPAAGWQAAEigaHHQgjJugEB8QgQGnASFDQAHCKA6I/QAsG2gFEUQgEC2gZD3QgOCPgiEdQg5IQAjFFQANB5AlDxQAaDUgUCUQgSCHg6BuQhCB5hnBCQhIAthmAYQhIARh0AKQnFAonIgpQg4gFgogcQgvggAQgpQAEgIANgSQAMgQADgLQAEgQgNgNIgDgDQAPAGAIAZQAMAlgMAmQDkgCDmgKQgVgwgEhIQgDg9AJhwQAJh3gBg1QgChfggizQghi5gDhZQgDhaAUiqQAUixgBhTQgCjHhYhwQCBBcALDzQADBTgKCoQgJCmAEBUQADBMAsEVQAjDZgPCHQgHA+gVB9QgHBAAHAzQECgMECgVQBcgIAzgLQBNgQA3ghQBVg0A0hnQAthaAOh0QAQiOgcjLQgmjlgOhzQgnlLA3oWQAgkhAOiRQAZj6ACi4QADkPgum3Qg6oigJijQgRk9ATm6QAcn7AMj9QAirggmqRQgFhXgLgwQgRhKgmgvQg8hKh4gVQhAgLhyACIA2A/QA+BKAmBCQAuBQAVBQQAWBZgMBRQgTCIg8DkQhFEHgTBjQhWG+CcEYQArBMAQAsQAaBGgFA7QgIBlgiBiQgiBhg4BVQAfjEgBhtQgBiqhBh2QhMiJgYitQgViaAUivQARiOAvizQARhBBLj7QAqiOAJhiQALiGgshlQg9iMhOiDIgVABQhtAFjPABQjYAChkAEQkTAJjSArIAEAQQAHAugWA7IgvBlQgDgSgBhEQgBg1gOgeQgIgQgMgOIgmALQAGgRAIgPQgLgIgNgHQhAgkhfgDQgsgCh+AKQlGAbkwg9QhygZg5gKQhigShKADQh3AFiCA5IgeAOQAHAcADAgQAKBjggBiQggBhhDBKQAChzgCg6QgChHgIg8IgDAGQgQAtAFAtQgihwAWhJIgFgFQgKgIgSgDQgKgCgVAAItigCQiSAAhlAEQgpDAgQBrQgfDSAMCqQAYFphwEaQg/CggNCXQgPCqA0CNQBgEHAhCTQA0DpghC7QgwjRhJkCQgsidhdkxQgwifBEjoQAKgjA1iaQAnhzAPhLQAYhzACjCQADjtAIhKQAWjiBijlQgvADglADQjCAQiTAzQghALgZANQASBJgSBSQgMA2gqBoQgpBngMA3IgznpIzkgmQh8gEhRAbQhtAkgXBWQgHAZAAAwQgBAygEAWQgIAmgeAZQggAbgggNQgpgRAGhDQANhRgBgkQgEhMhSgwQhCgmhjgOQkKgllPgFQjNgEmQALQgwABgaAFQgoAIgZAWQgsAlgBBRQgBAuAJBgQAAAigKAZQgNAegZAKQgqAPggguQgdgrACg1QAFhSgCgSQgFg4gjgYQnSgpjQgQQl5gfkrgQQi1gLgpBZIgSA5QgKAigTAOQgZATgjgNQghgNgPgfQgNgaAAglQgBgWAGgsI1Lg0Qg+gCggACQg0ADgnAQQguASgeAlIgLARIgLBCIAsgUIgvAiQgaCzgIDQQgHDGAKGeQAOH7ATP0QAJILACD1QADGqgJFUQgGC+gYIIQgVG/gEEHQgEFsARHFQAKEYAeIZQAEBUAJAtQAOBGAhAvQAvBCBiAlIAYgCIA5gFQgghSALh4QAEgnANhNQANhPAEgmQAMhzgTiUQgHg8gjjKQgaiTgHhiQgJiHAShuQALg8AdhlQAih0AJgrQAtjFg7iAQAxBAAPBeQAMBQgOBfQgHAzgbB4QgZBtgGA/QgLBnARCDQAKBHAgCiQAjCpALBjQAQCWgPB4QgIBGgmCXQgdB2gKBKQERgVEUANQAfACALAKQAHAGACAIQBkgIBBABQB5ABBjAcQBuACBPgWQA0gOAogbQAtgeAYgpQAUgjAMg/QAQhRAHgUQAGAnAWBNQARBGgMAuQgQA/hFA3QhFA3hWAYQhKAVhkAAQgjgBiPgJIg7gDQiDAliKARQhwAOhuAAQihAAifgdgEAxtA5JQAAgXADhWQAGiPgQh1QgUiJgyhvQg1h2ASikQAHhAAUhNQAMgyAbhYQAIA3AABOIgBCGQABCiAqBeQCGEsg3DsQgJAngaBKQgZBLgJAmQgNgugBg9gEBWpAoyQiEl6gXhQQhNkEgMjYQgQkFBOjSQBjkNAfiaQAxjwgwi9QhomXA6leQAvkfgckjQAiAkATA4QAPArAIA/QARCDgHClQgFBjgUDEQgMB4AWCPQARBpAqCbQApCSgWC1QgQCIg6C9IhhE+QgxC3gDCOQgECjA3DLQAZBeBcEKQBODgAbCGQAnDGgbClQgli4hgkWgEhY/ALBQgqjqhllLQhCjTBWksQAXhQA8inQA6igAYhWQBHj+ARm6IAOlhQALjJAYiWQA3lTgVk7QgXlXhwknQCJDbAwEqQAnD0gSE7QgKC5gmFyQgdFMAPDfQAPDdhMEKQgxCth8EmQhLCyAdDzQARCNBQEiQBJEGAICtQALDzhlCoQAZkIg3k5gEBLrABHQgXjNAskSQA7k6ASidQAfkPgwjFQgsi4AGjKQAFi+AxjEQAJgmBolnQBFjxAXihQAejegkjBQgojbh7iXQCKB8A+DKQA4C0gNDRQgKClg4DbQggB+hID8Qg7DcgQClQgUDUAqCuQA0DSgVEXQgKB9g5FvQguEtACDCQADESBbDMQiJiogekEgEA6BgLpQgNjxBMjlQAyibgBilQgBilg1iaQhSjuBflXQAXhVBEjEQA/izAZhmQBVlYhnjsQBMB+ATCiQARCVghCfQgVBng2CZQhNDegKAfQgtCQgLB2QgOCQAjB3QA5DDALCYQAPDAg1CZQhIDPACEQQABC2AqEzQhnjTgOj3gEAlXgKbQAYi7ALhdQASikgNh3QgQiahEhtQhSiCgdiLQggiYAoiFQAzisAJjkQAFh8gKkfQgKkKAJiPQAPjgA9irQgkC3gBDxQgBBvAPE/QAMEOgHCeQgLDpg3C5QgiBxBCCXQARApArBRQAqBPASArQBaDbgmE7QgMBogiCjQgtDcgIAtQgTh1APiigAkw4fQgLidgElDQgDkFAGiGQAJjbAjisQANg+AoieQAkiLAOhSQArkJhTizQBDBQAaByQAXBmgLB2QgIBYgeB/IgzDVQgqDGgKDzQgHCxAJEOIAQHAQAGEAgRC/QgxjPgRkLgEhLogbQQg5imAPiTQAKhkAlh6QAWhJA1iOQA0iLAXhMQAkh5AKhlQAMh4gYhsQgbh2hEhVQBPBIAqBwQAnBmABB2QABBmgaB3QgTBYgpCAIhFDVQglB7gNBfQgQB1AxDIIAmCfQATBaABBGQhhiggtiCgEghFgfSQgIi0ApisQAPg8BAjGQA0igANhmQAMhWgEhyQgCgogMigQgFhFgMgmQgEgNgGgLQgSgngggSQAjANAZAnQATAdAPAvQAoB8AJCDQAKCDgVCBQgPBbgyCkQg0CvgPBQQgaCGgDC/QgCBuACDaQg5iogIiygEg+mgecQgDiXgNh3QgQifgFhsQgGiSAKh6QANiSAmhjQAyiBBchLQhABZgdCAQgXBigFCNQgJEUArEFQAVCDgUCMQgTCEg3CBQABi1gBhagEAyWgieQAPjHgdicQgii9gHiHQgKixAgiRQANg5AdhaQAlhyAJghQAXhTAFhEQAIhSgRhFQAiBYADBfQADBggbBaQg/DQgPCqQgUDQAxCrQA4DJgYDbQgXDUheDDQAmjsAJh4gEheNg59QgFgSgBgLIADAIIAFAcg");
	this.shape.setTransform(590.824,416.39);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-25.45,27.3,0.4763,0.4763);

	this.instance_1 = new lib.CachedBmp_22();
	this.instance_1.setTransform(251.25,713.3,0.4763,0.4763);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.drape, new cjs.Rectangle(-40.9,17.1,1263.5,798.6), null);


(lib.clouds3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(56,56,56,0.424)").s().p("AgJgrIAFgBIACAKIAMBOIgKABQgGgsgDgsg");
	this.shape.setTransform(-251.05,18.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(58,59,59,0.373)").s().p("AhOAIICTgXIAKgCIAAAFQhOARhNANIgCgKg");
	this.shape_1.setTransform(-282.2625,49.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(30,38,40,0.224)").s().p("AgZgDIgBgLQAdABAUANQADACABAFQgFAAgEADIgFAFQgPgPgXgDg");
	this.shape_2.setTransform(-178.325,-35.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(187,203,206,0.992)").s().p("AgpAgQAgglAlggQAEgCAFgBIAFgBQgeAugzAlIgCgKg");
	this.shape_3.setTransform(-150.05,-55.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(8,15,17,0.973)").s().p("AjiGXIgMgDQhWgQg5g3QgBgEgCgCQgagVgUgZIgDgTIgCgKIgNhPIgCgKQAjjnCJieQBGhQBog8QAYgOAjgIQApgIAbgKQAhgLAagCQA7gDArALQBAAQA0AfQA0AeA8ATQgHAbAiAVQAUAMgPAAQgRgBgNgMQgsgqg9gSQgBgFgDgCQgUgOgfAAQhPgehzAWQhxAWhDA3QimCMg1DXIgFARQgRA0AXBRQA9A3BSAZQBOAYBsgRQAOgCANgHQAagMABgmQAChBgVhUQgLhBAkA0QAWAgARAoQALAYAFAjQALBNgTA4QgdAWgjASQgkASgzAFQgcACgcAAQg+AAg3gNg");
	this.shape_4.setTransform(-206.4786,-1.9281);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(2,11,13,0.106)").s().p("AATAtQhegIhCguIgCgKIgBgKQgBgjAYAoQAEAFAFAFQBDAuBmgHQATgBAJgMQAKgBAJABIAWACQApADgvARQgmAMgnAAIgYgBg");
	this.shape_5.setTransform(-88.0882,47.286);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(184,202,205,0.945)").s().p("AgIAIIgBgVQgBgdABgaIAFAFQAAAlANAOQAGAGgEAGIgEAFQALAcgUAiIgKACQAHgagDgjg");
	this.shape_6.setTransform(-32.1286,-9.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(132,132,132,0.863)").s().p("AgHgrIAFgBIACAKQAPAxgNAeQgGgsgDgsg");
	this.shape_7.setTransform(-31.9785,51.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(127,127,127,0.898)").s().p("AhOAIICTgXIAKgCIAAAFQhOARhNANIgCgKg");
	this.shape_8.setTransform(-71.5125,109.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(20,30,31,0.357)").s().p("AgHAKQgDgCgFABQAOgkARAQIgBAHQgDAQgPAFQgBgFgDgCg");
	this.shape_9.setTransform(-151.6667,98.4479);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#AFE2EC").s().p("ABrLQQglgmg6gLQgOgKgYALIgeAQQgnASghAWIgMAGQhjAphagXQgJgCgGgEIgGgEQgWAGgggPQgxgXgogjIgMgJQhag4hLhOQgmgngqgfQgrgggsgbQhbg5h3gPQAPgUAqgCQAmgCAhAEQBAAHA8APQDYA2EmguIAFgBQAGgOAagEQCLgZBug2IALgEQAjgMAcgSQAYgOAjgLQBmggAzAmQAaAFAOAUIALAPQAUAeANAmQAaBOApAzQBoBQC8gfQBHgLAvgTIAGgDQAtgdAlgnQAThEgfgsIgQgXQgUgdgYgbQgag5AugGQAqgFAVAYQBFAUAZBWIACAKIADAUQAGBAgMAwIg+B6QgDAGgDgBQgVgHAAARQAAARgLALQhMBGiSAWQgUADgTgDQgbgFgkACQgKABgJgDQgzgRhJAPQhjAWgyA7QgiAphPAJQhAgHgogqgAhCASIgSgEQg0gOgvgaQhegzgyhsQgPgggUgWQgKgvANgfQADgJAKgCQBagQA6AiQBdA1BkAsQAwAUBMgQQBEgPAigpIAagZQAEgFABgHQADgvgUgUQgmgngVg+QgJhjApg9QAHgJAHgFQAPgKAJgKQA+hSCQgTIAKgBQApgEAfAGQDfAvBTD3IADAKQAbCRhNBMQgmAvhfAEQhPADhSgBQgeAAgnANQgYAJgjAGIiEBrQhCA2h1AQQggAEgcAAQggAAgegFg");
	this.shape_10.setTransform(-156.1388,22.3988);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(131,197,208,0.996)").s().p("AHQOXQgBgFgCgBQgugRgogWQAAgjAegRQAYgOAMgbQAQgFADgRIABgHQgSgQgOAlQg0AthDAjQhIAkhmAJQg5AGg2gCQg/gDgugZIgNgIQhbg3hJhOIgMgLQgPgOgNgRQhBhchdg1IgLgJQgpgigzgQQhtgiiaAcIgKABIiCANQhDAHg3gNQhvgchegyQiuhcishdQADgkAsATIANAEQByAYBrAhQBrAhB7ANQA7AGBAgFQA4gFAtABQAwADAXgQQALgIAPgBQA2gGAjgNQAZgJAOgJQAMgIANgGQAFgCAFgGQBNgbA3gpIAggZQARgPgQADIgUAFQgQAFAHgbQAEgMATgEQA5A3BWAQIAMACQBPAUBegJQAzgEAlgTQAjgRAdgWQASg4gLhNQgEgigLgZQgRgngWghQgkgzALBAQAVBUgCBBQgBAlgaANQgNAGgPADQhsARhOgYQhSgag9g1QgXhSARgzIAFgSQA1jYCmiLQBDg4BygVQBygWBPAdIACAKQAXAFAPAOIAGgEQAEgDAFAAQA9ARAsArQANALARABQAPABgUgMQgigWAHgaQAbhZA4hGQACgCgBgFQAQgGAFgQQABgCAEgBIACAKQA0glAegwIgFABQBRhJCSgYQBIgMA8AJQB2ARBXA8QCPBiBwCOQAiAsAxAUIAQAGQBEAYA8AlIANAIQAbAQAZAUQATAQAKAWQACADgEAGIgGgEQgBAZACAeIABAVQACAjgGAaIAKgCQAAAFgBAFQggBmhPBFQgFABgEADQg4AlhkAHQgLgIgNgEIgQgGQg0gXgqgmQADATALAJQAGAEADAGQAMASgOgEQgigKgyAHQhgAMg6AkQg0A1gYBIQgDAJgEAHQgRAeAQA3IAKgBIABAJIACAKQBCAvBfAJQA0AFAxgRQAvgQgpgEIgWgCQgJgBgKACQAAgCgBAAQAAgBAAgBQAAAAgBAAQAAgBAAABQhfgHhAgrQgFABgCgCQgvg1Akg2QATgeAegXQALgIAMgGQA4gcBFAEQAnACAjAJQAzALArATQBkArBKBPQAUAaAAAzQAAAlACAsIAAALQAEBcgYBIQgPAwgXAsQgyBghvA1IgMAEQh6AuiVAXQgFABgEgBQhOgeg8g5QgPAEgDgVIAAgFQgdApglAhQg4Awg9AqQgqAcg9AMQgpAHgkAAQgdAAgZgFgAGdKjQA5AKAlAmQApArBAAHQBOgJAjgpQAxg8BjgVQBJgPA0ARQAIADAKgBQAkgCAcAFQASACAUgDQCTgVBLhHQALgLAAgRQABgRAVAIQACAAADgGIA+h5QANgwgHhAIgDgVIgCgKQgYhWhFgUQgWgYgqAGQguAFAaA6QAZAaAUAeIAPAWQAgAsgTBFQgmAmgtAeIgFADQgwAThGALQi8AehphPQgpg0gahOQgNglgUgfIgKgOQgPgUgagGQgzgmhmAgQgiALgYAPQgcARgkAMIgLAFQhuA1iLAZQgbAFgGANIgFABQkkAujYg2Qg9gPhAgGQghgEgmABQgqACgPAUQB3AQBcA4QAsAcArAfQAqAgAmAnQBLBOBaA4IALAIQAoAjAxAXQAgAQAVgHIAGAEQAGAEAJACQBaAXBkgpIALgGQAhgVAngTIAfgPQAMgGAKAAQAKAAAHAFgAA2lEQgKABgEAJQgNAgALAvQAUAVAOAgQAyBsBeAzQAvAZA1AQIARAEQA5AKBCgJQB1gQBDg2ICDhsQAjgFAZgJQAmgOAeAAQBSACBQgEQBegEAnguQBNhMgciSIgDgKQhTj2jfgvQgegHgpAEIgKABQiQAUg/BRQgJALgPAKQgHAEgGAJQgqA9AKBjQAVA+AlAnQAVAUgEAwQAAAGgFAFIgaAZQghAphFAPQhLARgxgVQhlgrhdg2QgngXg2AAQgZAAgdAGg");
	this.shape_11.setTransform(-196.1795,22.0413);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(14,18,19,0.969)").s().p("AJKPMQghgFglAEQgBgEgDgBQhLgkg7g5QgTAEgJAKQgEAGgGADQgNAFgMAIQgdAUgxAKQhkAVhQADQg9ACgwgPQiMgthhhqQhJhRhShGQhFg8hegZQgegHgfgCQhCgDhKAHIiMAOIgLACQguAKgbgHQhUgUhJggQgkgQgigSIiLhLQi5hkiph6QgahDBBADIANABQB7AMBrAhQBrAhBrAeIBfAZIASAEQArAKAzAFIANAAQA5ADA/gJIABAKQBPgNBNgSIAAgFQApgFAcgKQAngOAeAGQgEAGgFACQgOAGgLAIQgOAJgaAJQgjANg1AGQgQABgLAIQgXAQgvgDQgtgBg5AFQg/AFg7gGQh7gNhrghQhrghhzgYIgMgEQgsgTgDAkQCrBdCuBcQBfAyBuAcQA4ANBDgHICBgNIAKgBQCbgcBsAiQAzAQApAiIAMAJQBcA1BCBcQAMARAQAOIALALQBKBOBaA3IANAIQAvAZA+ADQA3ACA5gGQBmgJBHgkQBEgjA0gtQAFgBADACQADACAAAFQgLAbgZAOQgeARABAjQAoAWAtARQADABAAAFQA5ALBLgNQA9gMAqgcQA9gqA3gwQAmghAcgpIABAFQACAVAQgEQA7A5BPAeQADABAFgBQCVgXB6guIAMgEQBwg1AyhgQAWgsAQgwQAXhIgDhcIgBgLQgCgsAAglQAAgzgUgaQhKhPhjgrQgrgTgzgLQgjgJgogCQhEgEg5AcQgLAGgLAIQgfAXgTAeQgkA2AvA1QACACAFgBQBAArBfAHQAAAAABAAQAAAAAAABQAAAAABABQAAABAAABQgJALgTABQhnAHhCgvQgGgEgDgGQgYgnAAAjIgKABQgQg3ARgeQAEgHADgJQAZhIAzg1QA6gkBggMQAygHAiAKQAPAEgMgSQgEgGgFgEQgLgJgEgTQArAmAzAXIARAGQANAEALAIQBjgHA5glQADgDAFgBQBPhFAhhmQABgFgBgFQAVghgLgdIAEgGQAEgFgGgGQgOgOAAgmQAEgGgBgDQgLgWgTgQQgZgUgagQIgOgIQg8glhEgYIgQgGQgxgUgigsQhviOiPhiQhYg8h2gRQg7gJhIAMQiTAYhQBJQgFABgEADQgnAggfAmQgFABgBACQgEAQgRAGIgKABQAUhSBGgvQA4gkA5giQAQgJASgIQA5gWBRgIQCOgPBnAqIAyAXQC9BgCFCvQAGAIAIAGQAJAGAHAJQCtAkB1B2QAUAUARAZQANBKgMA6QgcCHhZBcIgLAMQgXAagtAOIgKADQg1ABgCAgQBDARApA2IAMAOQAUAYAJAeQAMAmAHAnIgFABQACAtAHAsQARB0gWBZQgGAegKAaQg3CaidBNQgIAFgHAFQgWASgwAAIgKACIiUAYQhCATgtgEQg1gFgcggQgpgugwglQgVBqhpAxQgjARgqAMQg0AQgqAAQgOAAgMgCg");
	this.shape_12.setTransform(-198.4084,22.4248);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(19,126,151,0.996)").s().p("AgdFvQgJgCgJgEQjKhbh9ioQhBhXALifIAdg9QAshbBXgwQAlgNAqgJQBTgQBEAmQAzBEgICEIgICLIgBAKQgHAqgbASQAbhDgChmQgChegNhMQgFAAgBgCQgXg2hRAGQiOAcgmCEQgIAbgMAXQgFCaBABWQA5BNBNA5QAyAkA5AdQBOAEA0gUQCzhFCghVQhcBsiLA8QgxAWg0AOQgqAMgnAAQgXAAgYgEg");
	this.shape_13.setTransform(147.9265,97.5143);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(8,12,12,0.129)").s().p("AgdALQAVgJAMgSQABgCAFAAQAFAFAGADQAEACAFAAQAAAFgCABQgIADgFAFQgOANgLAAQgKAAgJgIg");
	this.shape_14.setTransform(270,38.9321);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(71,71,71,0.404)").s().p("AgEAeIAAhFQAQAcgMAyQAAABgEAAIAAgKg");
	this.shape_15.setTransform(289.5191,19);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(89,89,89,0.655)").s().p("AgIA3IAAh3QAQASAAAqQABAvgRAWIAAgKg");
	this.shape_16.setTransform(396.8507,81.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#0D7B95").s().p("ACqAmQgTgugrgdQhSg4iVAPQhBAGg4ATIAAgKQA8gyBZgXQAygNBGAFQCoANAqCJQAWAtgbAnIgKAMQgUAYgZAUQAQg3gVg1g");
	this.shape_17.setTransform(301.4889,96.3682);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(82,82,82,0.525)").s().p("ABGAFIiVAAIAAgJQBPAABQAEIAAAFIgKAAg");
	this.shape_18.setTransform(338,15.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(86,86,86,0.557)").s().p("AAeAFIhFAAIAAgJQAnAAAnAEIABAFIgKAAg");
	this.shape_19.setTransform(174,-5.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(151,210,220,0.996)").s().p("AoELOQg4gRg2gXIgYgKQgggLgGgjQBXg/A7haQAEgHADgJQACgGAFgFQAPgUAKgWQAFgNgHgKQgDgFgFAFIgKALIhBBKQifBWizBEQg0AVhQgFQg4gcgyglQhNg4g6hOQhAhWAFibQANgWAIgcQAmiDCNgcQBRgGAXA1QABACAFAAQAOBNACBdQABBmgbBEQgKAKgGAMQgEAIgFAEQgTAQgkgCQg5gFgQg0IgCgGQgGBqBvgBQBNgXAlg9QAphCALhjIAFgzQATiohGhRQgwg5hcgKQh4gNhGAoQgdAQgLgQQA1hhBBhVQACgDAAgFICthUQAMgGAPAAIAUAAQBCAFApAeIA+AvQAMAIATAAQANgIgXgWQgzgwgEhmIABgJQAMhJAqgwQAZgKAagDQBZgMA0AgQAcASAZAUIgBAGQgFAcgTALQgOAoATAPIAEgGQBXiFCvgsQA9gPAzgUIAjgNQAbgJAjgFQBBgKBKAFQBCAEA2AVQBfAjA5BKQA5BIABCBQgzA7hNAjQgCABAAAFQgFAAgBACQgMAUgWAIQAUAUAZgZQAFgFAIgEQACgBAAgFQBxg0B9grQAqgPA8gEIALgCIAwgIQB8gXCdALQCJAKBOBHIALAKQCaCMA3DrQAPBAgDBLQgBAkgLAaQgWA4geAsQg+BZhWBBQhWA/hvAjIgjANQg0AThHAGQhPAIgzgEIgogBIgKgBQgegEgegBQiMgJiCgTQhCgKg2gVQAAgFgBAAQgggLgbgOQgFAAgBgCQgEgIAAgKQAKgUAGgVQAVhSAng8QAfgtAugbIAOgJQAIgGAFgKQA4gTBBgGQCWgPBSA4QArAdATAvQAVA1gQA3QgpAdg5AQQg/ARgxggQg5gIALhHQABgGgBgCQgIgWgPAeQgLAYAAAjQAaAdAdAaIAMAKQAmAZBBgDQB5gGBPgzQAAgFADgCQApgnAag2QARiDg0g/IgKgMQgZgdgdgaQhOhHiPgGQhNgEg9ATQjdBFhgDEQgyBngYB9Qg8BLhTAyQhZA1iKAEIgTAAQhDAAg0gQg");
	this.shape_20.setTransform(249.8569,66.754);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(11,15,16,0.973)").s().p("AmVMoQh8gdhKhMQgUgUgfgJQgyAjg4AfQg1AdhHAIQijAUhgg2Qi+hph3ivQg+haAAiVQASgXgDgvQAAgFACgGQApiEBmhCIAXhZIAEgMQBKjgDwgxQAdgGAegCQA2gCAXAdQADAFAFgFQAFgFgDgJQgCgGgFgFQgQgsAFhCQADgrAXgWIAKgLIApgwQAVgYArgCIBGAAIAKAAQBhAXA4BAQACADAFAAQB1hnCig8QA2gUA5gQQAhgJAlgCIBGgFQAkgDAiAGQD+AqBVDSQALAcgBAqIAABGIAAAKQgHAqAlgXQA3giBUgKIAMgCIBugeQA1gOBCABICWAAIAKAAQBIADAxAXQDLBfBjDFQAdA7AWBIIATBFQAFAXABAcIABAUIAAB4IAAAKQgLBUglA5Qh0C0jCBmQgxAZg3ARQg7AThFAKIgKABQhBAFhBgCQiRgDh9gaIh5gaQhAgNg2gXQgGgCgFAAQg0ACACgvQA2AVBCAKQCCATCMAIQAeACAdAEIALABIAoABQAyADBQgHQBHgHA0gTIAjgMQBvgjBVg/QBXhBA+hZQAegsAWg4QAKgbACgjQADhLgPhAQg3jribiMIgLgKQhOhIiJgJQicgMh8AXIgwAJIgLABQg8AFgqAOQh9AshxA0QgFAAgEgCQgGgDgFgFQAAgFACgBQBNgkAzg6QgBiBg5hJQg5hJhfgkQg2gUhDgEQhJgFhBAJQgjAFgbAKIgkAMQgzAUg8AQQivAshXCFIgFAFQgSgOAOgoQATgLAFgdIABgFQgZgUgdgSQgzgghZALQgaAEgZAKQgrAvgLBKIgBAJQAEBlAzAxQAWAVgMAJQgUgBgLgIIg+guQgpgfhCgEIgUAAQgPAAgMAGIitBUQAAAFgDADQhBBUg0BiQALAPAdgQQBGgnB4ANQBcAKAwA5QBGBPgTCqIgGAyQgKBkgpBCQglA8hNAYQhvABAGhqIACAGQAQAzA5AFQAkADATgQQAFgEAEgIQAGgMAKgKQAbgSAHgqIABgLIAJiLQAIiEg0hDQhEgmhSAQQgrAJglANQhXAvgsBbIgdA9QgKCgBABXQB+CoDKBbQAIAEAKACQA9AMBEgUQAzgOAxgWQCLg8BchsIBBhLIAKgKQAFgFADAEQAHALgGAMQgJAXgQATQgEAGgCAGQgDAJgEAHQg7BZhXBAQAGAiAgAMIAYAJQA2AYA4ARQA7ASBPgDQCJgEBag1QBTgxA7hLQAYh+AyhmQBhjFDdhEQA9gTBNADQCOAGBPBIQAdAaAZAdIAKAMQAzA+gQCEQgaA2gqAmQgCADAAAFQhPAzh5AGQhBADgmgaIgMgJQgdgagagdQAAgkALgYQAPgdAIAVQABADgBAFQgLBIA5AIQAxAgA+gSQA5gQAqgcQAZgUAUgYIAJgNQAcgngWgsQgqiKiogNQhIgGgxANQhZAXg8AzIAAAKQgFAKgIAFIgPAJQguAbgeAuQgnA7gWBTQgFAVgKAUQAAAKAEAIQABACAFAAQhZC1jTA5QhIAUhHAAQg7AAg6gOg");
	this.shape_21.setTransform(244.5,64.6302);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.clouds3, new cjs.Rectangle(-374.4,-75,772.0999999999999,221.9), null);


(lib.Scene_1_Theater = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Theater
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(-102.05,-139.8,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(-843,-308,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},416).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_shirt = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// shirt
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#CCCC66").ss(1,1,1).p("AgJgkQAJAkAKAl");
	this.shape.setTransform(719.7,420.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(4,1,1).p("AhHBKQgDASgGARQgGAMgIALQgdAtg0AHQgzAHgrgiQgqgkgIg5QgBgMAAgLQAAgTAEgRQAGgWAOgUQAeguA0gHQAqgGAjAWQAIAFAHAHQAeAaAOAkADBi4QAEABAEABQAEABAEABQAbAHAQAIQABABACAAQANAHAGAIQADADABAEQAOAOAKARQAEAIAEAJQAHARADAUQAHAxgWAoQgBADgCACIAAAAQgCAEgDADQgUAegeANQgPAGgQADQgzAHgrgiQgNgMgKgMQgEgGgEgHQgNgZgFgdQgDgXACgTQAEghATgcQANgUASgNQALgIAOgFQAEgCAFgBQAIgDAJgBQACAAACAAABVA1QgDACgCADQgbAbgrAHQgQACgQgCIgKgBIgNgE");
	this.shape_1.setTransform(672.422,396.784);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF6600").ss(4,1,1).p("ADpnPQALBHAOBfQBCGvBKF9QAKgBAKgBQADgBADAAIACAAAG0H/IAigEQhrn4g/nxAnOnLQgEgTgEgTIA0gfQBnI4A3HoAkFIRIgiAAQgjAAgCAAIgNAAQggnohTnn");
	this.shape_2.setTransform(672.7,455.325);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AAAAAIAAAAIABAAIAAAAg");
	this.shape_3.setTransform(605.025,368);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFF00").s().p("AlBHqQgHAAgEgCQgHgDgCgLQgCgIAFgHQAFgIAJABQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAAAAAQAMABAGAKQAGALgIAJIgHAHIgEABIgCABIgCgBgAGqHUQgHAAgEgCQgHgEgCgJQgCgKAFgGQAFgIAJAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAgBQAMABAGALQAGALgIAKIgHAFIgEACIgCAAIgCAAgAmsm+IgIgCIgIgLQgBgCABgDIAAgFIAAgBIAAgHIADgEIAGgGIABAAQAEgCAEABIAAgCQAIADADACIAHAIQAEAIABAEIAAAEQgBADgEAFQgEAFAAADg");
	this.shape_4.setTransform(672.5202,456.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF3333").s().p("AjNCrQgKAAgLgDIgLgFQgIgDgCgHQgCgDABgEQgHgGgEgJQgFgHAEgDIABgBIABgDQACgDADAAQAFAAACACIACAAIALAEQAKAEAGAAIAFgBIAHABIATgDQAHAAADABQAIAAAGAEQAMAHgBAKQAAAFgDAEIAAACQAAAFgJAEIgMADIgCAAIgGACQgIADgIAAIgGAAgADfhmIgFgBIgJgCQgJgGgGgBQgJgDgLADIgZAGQgJADgEAAIgJgBQgFgDgDgDQAAgBgBAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIgBAAIgBgCIgBgJIAAAAIAAgDIADgBQABgEAFAAIADAAQgEgNAGgFQADgEAGgDQAKgEAKgCIAJgEIASgCIAKgCIAMABIAGABIACAAQARAEANAGIADACQAGADACAEQAFAEgBAIQAEAEgBAFQAAAMgGAFQgCACgDABIgDACQgIAFgJAAIgJgBg");
	this.shape_5.setTransform(672.1892,397.0938);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF0000").s().p("AkNCdQgqgkgIg5QgBgMAAgLQAAgTAEgRQAGgWAOgUQAeguA0gHQAqgGAjAWQAIAFAHAHQAeAaAOAkQAAgKgCgLIgCgMIAAgBQAbgbAqgGQAVgDAVAEIARAFIAIADIADACQgCATADAXQAEAdAOAaIAHAMIgEAEQgcAcgqAGQgQADgPgCIgKgBIgNgEIgFgCQgIgDgIgEIgFgEQgDASgGARQgGAMgIALQgdAtg0AHIgRABQgpAAgkgcgAkFB4IAAADIgCABQgEADAFAHQAEAJAHAGQAAAEABADQACAHAIADIAMAFQAKADALAAQALACALgFIAGgCIABAAIAMgDQAKgEAAgFIAAgCQACgEABgFQABgKgMgHQgHgEgIAAQgDgBgHAAIgTADIgGgBIgGABQgGAAgJgEIgLgEIgCAAQgCgCgFAAQgEAAgCADgAB6BFIgXgYIgIgNQgNgZgFgdQgDgXACgTQAEghATgcQANgUASgNQALgIAOgFIAJgDIARgEIAEAAIAIgFIAEgBIAIACIAIACQAbAHAQAIIADABQANAHAGAIQADADABAEQAOAOAKARIAIARQAHARADAUQAHAxgWAoIgDAFIAAAAIgFAHQgUAegeANQgPAGgQADIgSABQgpAAgjgcgAC/htQAHABAIAGIAKACIAFABIAJABQAIAAAJgFIACgCQADgBACgCQAHgFAAgMQAAgFgDgEQAAgIgEgEQgDgEgFgDIgDgCQgOgGgRgEIgCAAIgFgBIgMgBIgLACIgRACIgKAEQgJACgKAEQgGADgEAEQgFAFADANIgDAAQgEAAgCAEIgDABIABADIgBAAIABAJIABACIABAAQAAAAAAAAQAAABABAAQAAAAAAAAQAAABABAAQACADAGADIAIABQAFAAAIgDIAZgGIALgCIAJACg");
	this.shape_6.setTransform(672.422,396.784);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCCC66").s().p("AhZK1QgKgCgdgNQgkgPgZgGQgZgGgggBIgqgBQg4nphmo4IAbgPIAVgLIAPgHIAQgHIAUgLQgFARAAATQAAALACAMQAIA5AqAkQArAiAygHQA0gHAdgtQAIgLAGgMQAHgRACgSIAGAEQAHAEAJADIAFACIAMAEIAKABQAQACASgCQApgHAcgbIAEgFIAXAYQArAjAzgIIABAAIAFAAQAOAAAOASIAaCmQBBGuBLF+Ik0AmQg6AHgcAGIggAGIgQABQgKAAgHgBgAg2IDIACAAIAAgBIgCABgAnSKoIgGgCIgHgCIgGgCIgBgBIgBgBIgFgEIgDgDIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgCIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIABgCIAAgBIAAgBIABgBIAAgBIABgCIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIACgNIAAgBIAAgBIAAgBIAAgBIAAAAIABgBIAAgDIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgOIAAgIIgEhIQgGhXADgvIAEgjQACgUAAgOQAAgegPhAQgLgvgJgaIgCAEIgFAMIgGANIgPAZQgDAFgDACQgEADgFABIgEADQgVAPgeAGIgPADQgUAEgWADQgvAEhNgNQgQgCgIgFQgOgHgBgMIgCgDQgFgLANgYQALgUAEgNIAKgaQAGgOAHgIIADgEQANghASgmQADgKAEgFIABgBIAqhOQAYgsANgTQAWgiAXgVIAIgHQAGgHAJgEQAPgLASgLIA9gjQAMgHAJgCIAHAmIAAAFQAAADABACIACADQBSHnAgHpIgTAAIAAABIgBAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIgBACIAAAAIAAAAIgBABIAAAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIgBAAIgDADIgFAEIgBABIgCAAIgFADIgBAAIgFABIAAABIgGAAIgBAAIgCAAIAAABIgiAAgArzApIABABIAAgCIgBABgAEPl2QgEgggBgDIADgEIAEgHIABAAIACgFQAWgpgHgxQgEgYgJgUIgIgRQgJgRgPgOQgBgEgDgDQgGgHgNgHQAEgKgEgfIAhgIIARgEQBWgQBoAFQApABAXALIADABQAPABAPAGQAMAFAPAKIAZASIAnAcQAKAIATATQAtAtAUAYQAPARAIAQQAcAcAVAfIAGAJQAkA6gLArQgFATgWAeQgdAngSAUQgcAfgdAQQggARgmABQgnACgggQQgTgJgdgYQgwglgxgpIgDgDIABADIAJAjIANAoIAPAqQANApACAfIADAFQAKAXAJAwQAMA/AoCsQAiCUAOBYQAEAXAAAOQgBAMgEAKQAEAHACAIQAFASgFARIgBAFIABAGIgCAKIgDAFQgHALgQADQgLACgTgBQglgBhHAHQhsn3g/nygAiZoPQgIgHgIgFIAKgDQAMgDAFgDIALgJIABAAQADgCAGgBIALgBIBOAAQAOAAAHgDQALgDAMgNIAcgeQAKgMAIgCIACAAIABgBQAHgDAOgBQAQgBAVgGQgNAFgMAIQgbAOgSAcQgTAbgDAhIgEgCIgJgDIgQgFQgUgEgWADQgrAGgaAbIAAABIACAMQABALAAALQgNglgegagACUqHIABAAIAIAAIgIAEIgEAAIgRAEIAUgIg");
	this.shape_7.setTransform(675.5933,443.2613);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF6600").s().p("AlZKUQggnphSnnIAFAIIAFABIATACIAAgBIAQABQAAgDAEgEQAFgGAAgCIAAgFQgBgEgEgHIgGgJQgEgCgIgCIAAACQgEgBgEACIgIgDIAAACQgEgCgEADIgHAFIgCAFIgBAHIAAABIgHgmIAzggQBnI4A3HpIAAABIgjAAIglAAgAlGJQQgJAAgFAIQgEAGABAJQACAKAHADQAFACAGAAQABABAAAAQABAAAAAAQABAAAAAAQABAAAAgBIAEgBIAHgGQAIgKgGgLQgGgKgMgBQAAAAAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAgAEDimIgaimQAKgSAJgMQAYgLASgZIAGAjQA+HxBsH3IgiAFIgGAAIgEABIgCAAIgGABIgUACQhKl+hBmugAGlI6QgIAAgGAIQgEAGABAJQACAKAHAEQAFABAGABQABAAAAAAQABAAAAAAQABAAAAAAQABAAABAAIADgCIAHgGQAIgJgGgLQgGgLgMgBQAAAAAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAgAD6psIgJgHQgHgGASgaQAEAfgEAKIgCgCgADGp9IAPACIgHAAIgIgCgADpqBIgFgCIgDAAIgDgBIgHgBIgJgBIAugNIgSAXIgBgFg");
	this.shape_8.setTransform(672.7,442.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgDAyIAAAAIAAgBIAAgBIAAgCIAAgBIABACIAAABIABAAIAAABIABAAIgBABIAAAAIgCAAgAACgpIAAgCIABgBIAAgBIAAgBIAAgCIABgBIgCAJIAAgBg");
	this.shape_9.setTransform(547.925,259);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FF9966").s().p("AAAABIABgBIAAABIgBAAgAAAAAIAAAAIAAgBIAAABIAAAAg");
	this.shape_10.setTransform(547.75,263.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#CCCC66").s().p("AhZK1QgKgCgdgNQgkgPgZgGQgZgGgggBIgqgBQg4nphmo4IAbgPIAVgLIAPgHIAQgHIAUgLQgFARAAATQAAALACAMQAIA5AqAkQArAiAygHQA0gHAdgtQAIgLAGgMQAHgRACgSIAGAEQAHAEAJADIAFACIAMAEIAKABQAQACASgCQApgHAcgbIAEgFIAXAYQArAjAzgIIABAAIAFAAQAOAAAOASIAaCmQBBGuBLF+Ik0AmQg6AHgcAGIggAGIgQABQgKAAgHgBgAg2IDIACAAIAAgBIgCABgAnSKoIgGgCIgHgCIgGgCIgBgBIgBgBIgFgEIgDgDIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgCIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIABgCIAAgBIAAgBIABgBIAAgBIABgCIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIACgNIAAgBIAAgBIAAgBIAAgBIAAAAIABgBIAAgDIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIAAgOIAAgIIgEhIQgGhXADgvIAEgjQACgUAAgOQAAgegPhAIgBgEIgCABQgMAJgSAEIgOADIgWAIIgSAEIguACQgWAAgLgCIgJABQgvAEhNgNQgQgCgIgFQgOgHgBgMIgCgDQgFgLANgYQALgUAEgNIAKgaQAGgOAHgIIADgEQANghASgmQADgKAEgFIABgBIAqhOQAYgsANgTQAWgiAXgVIAIgHQAGgHAJgEQAPgLASgLIA9gjQAMgHAJgCIAHAmIAAAFQAAADABACIACADQBSHnAgHpIgTAAIAAABIgBAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIgBACIAAAAIAAAAIgBABIAAAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIgBAAIgDADIgFAEIgBABIgCAAIgFADIgBAAIgFABIAAABIgGAAIgBAAIgCAAIAAABIgiAAgArzApIABABIAAgCIgBABgAEPl2QgEgggBgDIADgEIAEgHIABAAIACgFQAWgpgHgxQgEgYgJgUIgIgRQgJgRgPgOQgBgEgDgDQgGgHgNgHQAEgKgEgfIAhgIIARgEQBWgQBoAFQApABAXALIADABQAPABAPAGQAMAFAPAKIAZASIAnAcQAKAIATATQAtAtAUAYQAPARAIAQQAcAcAVAfIAGAJQAkA6gLArQgFATgWAeQgdAngSAUQgcAfgdAQQgRAJgTAFQgeASgiAKQgiALg2AHQgfAEgTgBIAAAAIACATIADAFQAKAXAJAwQAMA/AoCsQAiCUAOBYQAEAXAAAOQgBAMgEAKQAEAHACAIQAFASgFARIgBAFIABAGIgCAKIgDAFQgHALgQADQgLACgTgBQglgBhHAHQhsn3g/nygAiZoPQgIgHgIgFIAKgDQAMgDAFgDIALgJIABAAQADgCAGgBIALgBIBOAAQAOAAAHgDQALgDAMgNIAcgeQAKgMAIgCIACAAIABgBQAHgDAOgBQAQgBAVgGQgNAFgMAIQgbAOgSAcQgTAbgDAhIgEgCIgJgDIgQgFQgUgEgWADQgrAGgaAbIAAABIACAMQABALAAALQgNglgegagACUqHIABAAIAIAAIgIAEIgEAAIgRAEIAUgIg");
	this.shape_11.setTransform(675.5933,443.2613);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_11},{t:this.shape_6},{t:this.shape_5},{t:this.shape_8},{t:this.shape_4},{t:this.shape_9},{t:this.shape_10},{t:this.shape_3},{t:this.shape_1},{t:this.shape_2}]},135).to({state:[]},245).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_nose = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// nose
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663300").ss(10,1,1).p("AD1iJInpET");
	this.shape.setTransform(580.075,367.3);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},380).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hat = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hat
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF6600").ss(12,1,1).p("AMgABQAEAHAAAHQgCAvi8gSQgZgCgcgDQixgWjngYQgagCgagDQg6gGg8gHQkOgcjPAGQg1ACgwAEQg0AEgpABQhPABgkgM");
	this.shape.setTransform(621.075,295.3446);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AgxDqIgBgJIAAgBIAAgBIAAgCIAAgCIAAgHIAAgMIAAgOIAAgMIAAgMIABgOIADgLIAEgMIABgCIAAgCIAAgBIAAgBIABgCIAAgBIAAgCIAAgBIAAgCIABgBIAAgBIAAgBIABgBIAAgCIABgBIAAgCIAAgCIABgCIAAgDIAAgBIAAgCIABgBIAAgBIABgBIAAgBIABgBIAAgBIABgCIAAgBIAAAAIABgBIAAAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIAAgBIABAAIAAAAIAAgBIAAgBIAAAAIABgBIAAgBIAAgBIABgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAgBIAAAAIAAgCIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAAAIAAgBIABAAIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIAAgCIAAgBIABAAIAAgBIAAgBIAAAAIABgBIAAAAIAAgBIAAAAIABgBIAAAAIAAgBIABAAIAAgBIABgBIAAgBIABgBIAAAAIABgBIAAAAIABAAIAAgBIABAAIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAAAIAAgBIABgBIAAgBIABgBIAAAAIABgBIABAAIAAgBIAAAAIABgBIAAgBIABAAIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIABgBIAAgBIABAAIAAAAIABgBIAAAAIAAAAIACgBIABgCIABgCIABgBIABgCIABgBIAAgBIABgBIABAAIABgCIAAgBIABgBIABgBIABgBIABgBIABAAIAAgBIABgCIABgBIABgBIAAgBIABgBIABgBIAAAAIABgBIAAAAIAAgBIABAAIAAgBIAAgBIAAgBIAAAAIABAAIAAgBIAAgBIAAAAIAAgBIABgBIAAAAIAAAAIABgBIAAAAIABgCIAAgFIABgDIABgFIABgDIABgFIAAgDIABgFIACgEIABgEIACgEIABgBIAAgHIAAgHIAAgFIAAgIIABgHIAAgGIAAgHIABgIIAAgHIAAgHIAAgDIABgFIAAgHIAAgFIAAgBIAAgCIAAgDIAAgCIAAgCIAAgBIAAgDIAAgCIAAgCIAAgCIAAgCIAAgCIAAgDIAAgBIAAAAIAAgCIAAgEIAAgCIAAgCIAAgCIAAgCIAAgBIAAAAIAAgBIAAgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgCIAAgBIgBgBIAAgBIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgCIAAgBIAAAAIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIABABIAAACIABACIACADIABADIAAACIAAADIABAEIAAACIABAEIAAADIABACIAAABIAAADIAAADIAAADIAAABIAAABIAAABIABABIAAABIAAABIAAAAIABAJIAAAJIABAIIAAACIAAAHIABAKIgBAJIAAAJIABALIAAAJIAAAJIAAAIIAAAKIAAAGIAAABIAAABIAAABIAAAKIAAANIAAAMIAAANIgCANIgBALIgDAMIgCALQgCAEgBAGIAAAAIAAACIgDALIgCAOIgCAMIgDAKIAAAEIgBACIgBADIgBAEIAAACIgBADIgBAEIgBADIgBADIAAADIgCACIgBADIgBADIgBACIAAAAIgBABIAAABIgBAAIAAABIgBABIAAABIgBABIAAABIgBABIAAABIgBAAIgBABIAAABIAAABIgBABIAAABIAAABIgBABIAAABIAAABIgBAAIAAABIAAABIAAABIgBABIAAACIAAABIAAAAIAAABIgBABIAAABIAAAAIgBABIAAABIgBABIAAAAIgBACIAAAAIAAAAIgBABIgBABIgBABIAAABIAAAAIAAABIgBABIAAABIAAAAIgBACIAAAAIgBABIgBABIAAABIgBAAIAAABIgBAAIAAABIgBABIgBAAIAAABIAAABIAAABIAAABIgBABIAAABIAAAAIAAABIAAABIgBABIAAABIAAABIgBABIgBABIAAAAIgBABIAAABIAAABIgBAAIAAABIgBABIAAABIgBACIgBAAIAAABIAAABIgBABIAAAAIgBABIAAABIgBABIAAABIAAAAIgBACIAAABIgBABIAAAAIAAABIgBABIAAAAIgBABIAAAAIgBABIAAABIgBAAIAAACIAAABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAACIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIAAABIAAABIgBAAIgCgCQgBAAAAAAQgBAAAAgBQgBAAgBAAQAAAAgBAAIgBABIAAgBIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAAAIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgCIAAgDIAAgBIABgCIAAgCIAAgDIAAAAIAAAAIAAABIgBAAIAAAAIAAAAIAAABIAAABIgBABIAAAAIgBAJIAAAHIAAAHIAAAHIgBAEIgCACIAAABIgDAAg");
	this.shape_1.setTransform(559.925,245.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgEAlIgFgCIgBgBIAAAAIAAAAIAAABIAAgBIgBAAIgBgBIgCAAIgCgBIAAAAIAAAAIgGgHQgDgFgBgHIABgNIAAgLIABgKQABgDADgDIABAAIABgBIABgBIABgBIABAAIABgBIABAAIACgBIAEgBIABAAIADAAIAAAAIADAAIAAgBIACgBIABgBIABAAQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAABIACABIABAAIAFAEIABABIACACIAAABIABACIAAABIAAAAIACABIABACIAAADIAAABIADAIIABAJIgCAJIgCAJIgEAFQgDACgEABIgBABIgCAEIgEADQgCACgDAAIgEAAgAgMgMIgBABIAAABIABAAIAAAAIABABIgBgDgAAUgWIABABIAAAAIgBgBgAAKAeIABAAIgBABg");
	this.shape_2.setTransform(555.275,272.6688);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9966").s().p("AKBD+IgLgDQgIAHgJgFIgBAAQgEgDgDgFIgpgKIhWgYQh1gglLgXQgqgDgrgBQgogCgnAAIgyACQhEADhxgCIgXgBQgyADgvAEIgMABIg9AHIgLACIgNABIhSANIgCgGIAEAAQAEAAADgCIAEgDIABgEIACgBQADgBADgCIAEgFIADgJIABgJIgBgKIgCgIIAAgCIgBgCIgBgCIgBgBIAAAAIgBgBIAAgCIgBgCIgCgBIgBgBIgEgEIAAgBIAAgBIAAgBIABgBIAAAAIABgBIAAgBIABgBIAAgBIABAAIAAgBIAAgCIABgBIAAAAIABgBIAAgBIABgBIAAgBIABAAIAAgBIAAgBIAAgCIABAAIAAgBIABAAIAAgBIABgBIAAAAIABgBIAAgBIAAAAIABgBIAAgBIABgCIAAAAIAAgBIABgBIAAgBIABAAIAAgBIABgBIAAgBIAAgBIABAAIABgCIAAgBIABgBIAAAAIABgBIAAgBIAAgBIABgBIAAAAIABgBIABgBIAAgBIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgBIABAAIABAAIAAgBIABgBIAAgBIABAAIAAgBIABgBIABgBIAAAAIABgCIAAAAIAAgBIABgBIAAgBIABAAIAAgBIABgBIABgBIABgBIAAAAIAAAAIABgCIAAAAIABgBIAAgBIABAAIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIAAgCIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAgBIABgBIAAgBIAAAAIABgBIABgBIAAgBIABgBIAAgBIABgBIAAgBIABgBIAAAAIABgBIAAgBIABAAIAAgBIABgBIABgDIABgCIACgDIAAgDIABgDIABgDIABgEIABgCIAAgDIABgEIABgCIABgDIAAgEIADgKIACgMIACgOIADgLIAAgBIAAgBIABAAIAAgBIABgBIAAgBIABgCIABgBIAAAAIABAAIAAgCIABgBIAAAAIABgBIABgBIAAgBIAAgCIABgBIAAgBIABAAIABAAIABgBIAAgBIAAgBIACgBIAAgBIABgBIAAAAIABgBIAAgCIABAAIABgBIABgBIAAgBIABgBIAAgBIABAAIABgCIAAgBIABgBIAAAAIABAAIABgCIAAgBIABgBIAAAAIABgBIABgBIAAgCIAAAAIABAAIABgBIAAgBIABgBIABgBIAAgBIABgBIAAgBIABgBIABAAIAAgBIABgBIABgBIAAgBIABAAIABgBIAAgCIABAAIAAgBIABgBIABgBIAAgBIABAAIABgBIAAgBIABAAIAAgCIABAAIABgCIABgBIABAAIABgBIAAgBIAAgBIABgBIABAAIABgBIAAgBIAAgBIABgBIABgBIAAgBIABgBIABAAIAAgBIAAgBIABAAIAAgCIABgBIABgBIABgBIAAgBIABAAIAAgBIABgBIAAAAIAAgBIABAAIAAgBIABAAIABAAIAAgCIAAgCIABgBIABAAIABAAIAAgBIABgBIAAgBIABgBIABAAIABgCIABAAIABgCIAAAAIABgCIABAAIAAAAIABgCIABAAIAAgBIAYgNQA/geBJgKQB+gUCZApIBIAVQArAMAeAEQAnAGBjgCQBYgCAxANQAhAHAgAQQAwAWAtAoQBUBJAlBcQAVAyADA0QAEAtgJAoIgVgFgAqKCqIAAABIAAgBIAAAAgAqAB1IAAAAIAAABIAAAAIAAgBgAqbBqIAAgCIAAgBIABgBIAAgBIAAgBIABAAIgBgCIABgBIAAgBIAAABIABAJIgBAAIgCAAgAqSBjIAAgHIAAgHIAAgHIABgJIAAAAIABgBIAAgBIAAgBIAAAAIAAAAIABAAIAAgBIAAAAIAAAAIAAADIAAACIgBACIAAACIAAACIAAACIAAABIAAABIAAABIgBACIAAABIAAAAIAAABIAAACIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIgBACIAAAAIAAABIAAABIAAABIgBAAIABgEg");
	this.shape_3.setTransform(621.426,258.6998);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF6600").s().p("AKHBuIg1gGQixgWjmgYIg0gGIhIgHIgvgFQkYgdjVAIQgsACgpADIhdAFQgzAAghgEQgIADgHAEIgPANQgHAGgGACIgEABIgFACQgIABgIgCQgKgDgHgHIgFgFQgHgKAAgPQgBgNAIgKQAFgHAMgKQAJgIAFgDIAHgEIALgEQAUgIAKgDIANgBQAggMAxgKIABAAIABAAIACgBIAJgBIBRgOIANgBIALgBIA9gHIANgBQAvgFAygDIAWABQBxADBEgEIAygCQAnAAApADQApABArADQFMAXB0AgIBWAYIAqAKQADAFADACIACABQAIAEAJgGIAKADIAWAFQBdAXAlAaQAWAPACAQIAAAEQgBAOgTAJQgZAMg5AAQglAAgzgFg");
	this.shape_4.setTransform(619.3735,285.1111);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AAABoIAAgBIgBgCIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIgBgCIAAgBIAAgBIAAgBIgBgCIAAgBIAAgDIgCgMIgCgNIgBgNIgBgNIABgOIgBgMIAAgNIAAgOIABgOIABgNIABgPIABgNIADgOIACgHIAAgBIAAAAIABgBIAAgBIAAAAIAAAAIABgBIABgBIAAAAIABAAIAAAAIABABIABABIABAAIABACIAAABIABABIABACIAAABIABACIAAABIAAABIAAABIABACIAAACIAAACIADAMIABANIABANIAAAOIAAAMIAAAOIAAAMIAAAOIAAANIgBAPIgBANIgBAOIgDANIgCAIIgBABIAAABIAAAAIgBABIAAAAIAAABIgBABIAAAAIgBABg");
	this.shape_5.setTransform(1306.9,370.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_1},{t:this.shape_3},{t:this.shape_4},{t:this.shape_2},{t:this.shape}]},90).to({state:[{t:this.shape_5}]},290).to({state:[]},5).wait(185));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_hair = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hair
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AgFhlQgHBsAUBf");
	this.shape.setTransform(556.839,329.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AodHIQgJgEgCgDIgHgJQgIgOgDgMIAAgBQgFgSgLgbIgRgtQgSg0AFglIgCgKQAAgGACgEQgzgOgwgVIgWgLQgTgFgTgQIgFgDQgGgDgCgFIgCgBIgCgBIAAgBIgEgDIgDgEIAAAAIgCgCIgBgBIgBgBIgDgDIgDgGIgDgCIgBgDIgBAAIgCgDIgCgDIAAgBIgCgCIgCgEIAAAAIgBgCIgBgCIAAgBIgBAAIAAgBIAAAAIgBgBIAAgBIAAAAIAAgBIgBAAIAAgBIgBgCIgBAAIAAgBIAAgBIAAAAIABABIAAAAIABABIABABIABABIABAAIABABIABAAIABAAIABAAIABABIACAAIAAAAIAAABIAOgDIAMgCIAcgGQAXgGAZgPIAJgGQAQgLAigbIBfhPIAtgnQBBg4AzgyIATgTIA0g1QAegeAYgTQBkhPCYgcQA9gMBLgDQA5gDBRACQBGACAkAKQAkAJBAAiQBcAwAqAeQBIA1A0BLQApA8AXBEIALAhQAJAjAHAuIAKBTIANB+QAGA5gYATIgCABQgPAKgagDQgXgBgVgHQgYgIgXgOQgqgbgYgqQgLgSgghaQgYhDgjgcQgRgNgZgJQgPgGgegIIhmgaIgTgBQgEAAgCgBIAAgBQgxBPhiA5QgtAag7AWQgqAQhCAVQhnAgg7AIQgqAGg1AAQgdABgygCIgQgBQhLgDglgFIgagDQgHBtAVBeQADABACAFIADALQACAIgEACIgCABIgFgCg");
	this.shape_1.setTransform(611.7388,296.4135);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[]},380).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Symbol10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(63.0728,6.0149,0.9999,0.9999,33.5179);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(45.1158,33.3982,0.9999,0.9999,33.5179);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(63.0728,6.0149,0.9999,0.9999,33.5179);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(45.1158,33.3982,0.9999,0.9999,33.5179);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#77422C").s().p("ABxCSIgKgBIgLgEQgSgGgbgPIgDgCQhwg/h7hYQgtgigTgUIgEgGQgRgWgHgXQgCgEAAgFIgCgDIAAgDQDOC5CdAsQB4AgBcgzQgFAMgHAMIgNAPQgTAWgcAQQgXANgcAGIgOABQgUAAgSgIg");
	this.shape_4.setTransform(29.275,87.8204);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#813E0C").s().p("ABICvQidgsjOi5QgHgUAEgWQACgVANgUQANgTAUgKQASgLATgEQAUgEAEADQALgEAJAAQAKABAWAVQBlBbBmA9QBmA7AAg/QABhAAqAnIADACQAuApARAjQASAkgDAkQgBAZgLAWQg4AfhDAAQgqAAgvgMg");
	this.shape_5.setTransform(29.6711,77.9456);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(0,-6,77,109.2), null);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(19.2865,2.0666,0.9999,0.9999,0.2142);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(19.3141,34.8141,0.9999,0.9999,0.2142);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(19.2865,2.0666,0.9999,0.9999,0.2142);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(19.3141,34.8141,0.9999,0.9999,0.2142);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#77422C").s().p("AiZBcQg4gDgcgHIgGgCQgagJgSgPIgIgHIgDgCIgBgCQETAqCagzQB2gmAxhcQADAMAAAPQAAAKgCAKQgEAcgPAcQgMAYgUATQgWATgaAFIgIAEIgLADQgTAFgfACIgDAAQhHAFhLAAQhBAAhFgDg");
	this.shape_4.setTransform(33.575,87.3829);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#813E0C").s().p("AkXB9QgSgNgJgUQgKgTABgYQAAgXALgUQAJgSAPgNQAOgPAEAAQAIgJAHgEQAJgFAeAFQCHAVB1gGQB3gGgjg2Qgig1A4AJIAEAAQA9ALAiATQAiAUASAgQAMAWAEAYQgxBbh2AnQhWAch4AAQhkAAh7gTg");
	this.shape_5.setTransform(31.6488,79.3646);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,-6,63.6,102.9), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfDjIjQhSICTlzIDQBSg");
	this.shape.setTransform(10.9281,20.0991,0.9128,0.9999,-21.4884);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AiwCRICSlzIDPBSIiSFzg");
	this.shape_1.setTransform(10.9281,20.0991,0.9128,0.9999,-21.4884);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(-6,-6,33.9,52.2), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape.setTransform(19.6359,36.567,1,1,1.7515);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape_1.setTransform(19.6359,36.567,1,1,1.7515);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-6,-6,51.3,85.1), null);


(lib.thigh = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ABKDCIjMggIA5ljIDMAgg");
	this.shape.setTransform(13.05,19.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AiCCiIA5ljIDMAgIg5Fjg");
	this.shape_1.setTransform(13.05,19.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.thigh, new cjs.Rectangle(-6,-6,38.1,50.9), null);


(lib.pents5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("AmSA7IJMmnIDZEyIpMGng");
	this.shape.setTransform(40.275,36.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AmSA7IJMmnIDZEzIpMGmg");
	this.shape_1.setTransform(40.275,36.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pents5, new cjs.Rectangle(-6,-6,92.6,84.9), null);


(lib.pents3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("Ah9mEIFwA/Ih1LKIlwg/g");
	this.shape.setTransform(24.325,38.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjyFGIB1rKIFwA/Ih1LKg");
	this.shape_1.setTransform(24.325,38.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pents3, new cjs.Rectangle(-6,-6,60.7,89.9), null);


(lib.pents_only = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape.setTransform(20.725,39.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjOlgIF1gSIAoLTIl2ASg");
	this.shape_1.setTransform(20.725,39.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pents_only, new cjs.Rectangle(-6,-3.5,53.5,86.2), null);


(lib.pants2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AjAiaQAFgJANADQANACAMAIIFKEJQAIAGAHAJQAAADABACQADANgFAHQgIAIgMgBQgHgBgHgFQgFgCgHgFIlJkHQgMgKgEgKQgEgMAIgIg");
	this.shape.setTransform(19.8527,16.1784);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.pants2, new cjs.Rectangle(-6,-6,51.7,44.4), null);


(lib.legR_normal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-90.7,-100.1,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(-82.35,73,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legR_normal, new cjs.Rectangle(-90.7,-100.1,71.9,205.1), null);


(lib.legL_normal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-88.35,-99.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_12();
	this.instance_1.setTransform(-105.4,73,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legL_normal, new cjs.Rectangle(-105.4,-99.5,68.60000000000001,204.5), null);


(lib.legshoegirlR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FF3300").ss(0.1,1,1).p("AiYAXQCvA9CChDQgcg3g5gN");
	this.shape_4.setTransform(26.075,74.766);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFCC99").ss(0.1,1,1).p("AhmARIDJggIAEgB");
	this.shape_5.setTransform(21.025,75.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#5D3300").ss(0.1,1,1).p("AAKgUQAAAAAAAAIgTAp");
	this.shape_6.setTransform(31.875,71.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC99").s().p("AiYAXIDIggIAEgBIgEABIAUgqQA5ANAcA3QhEAjhRAAQhIAAhUgdg");
	this.shape_7.setTransform(26.075,74.766);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0033CC").s().p("AjCBwQgVgNgMgZQgEgIgDgLQgHgRgCgNIABgOIgBgQQABgSABgLIACgJQAEgRALgNQALgOAPgIQAPgHASAAQARAAAQAIQAHADAGAGIAjAAQAWABAPgCQAMgBAQgEIAagHIAjgFQAGgGAKgEIADgBIAEgCQAJgEAPAEQAbAAAZAKIAHACIAZAKQAhANAPAQQANANAGATQAGATgDASQgDAQgMAUQgQAZgUAOQgLAJgUAIQhUAihrgaQgdgIgRgMIgIgDQgNgGgNgKIgDAGQgGAPgFAHQgJAPgNAGQgKAFgLAAQgNAAgOgHgAAmhHIjIAhQCvA8CChCQgcg3g5gOIAAAAIAAAAg");
	this.shape_8.setTransform(27.0529,80.9408);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legshoegirlR, new cjs.Rectangle(-2.4,-5.9,53.9,98.80000000000001), null);


(lib.legshoegirlL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(11.5641,3.0297,0.9999,0.9999,-6.2726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(15.2913,35.5654,0.9999,0.9999,-6.2726);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FF3300").ss(0.1,1,1).p("AiYAXQCvA9CChDQgcg3g5gN");
	this.shape_4.setTransform(26.075,74.766);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFCC99").ss(0.1,1,1).p("AhmARIDJggIAEgB");
	this.shape_5.setTransform(21.025,75.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#5D3300").ss(0.1,1,1).p("AAKgUQAAAAAAAAIgTAp");
	this.shape_6.setTransform(31.875,71.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFCC99").s().p("AiYAXIDIggIAUgqQA5ANAcA3QhEAjhRAAQhIAAhUgdgAAwgJIAEgBg");
	this.shape_7.setTransform(26.075,74.766);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0033CC").s().p("AjCBwQgVgNgMgZQgEgIgDgLQgHgRgCgNIABgOIgBgQQABgSABgLIACgJQAEgRALgNQALgOAPgIQAPgHASAAQARAAAQAIQAHADAGAGIAjAAQAWABAPgCQAMgBAQgEIAagHIAjgFQAGgGAKgEIADgBIAEgCQAJgEAPAEQAbAAAZAKIAHACIAZAKQAhANAPAQQANANAGATQAGATgDASQgDAQgMAUQgQAZgUAOQgLAJgUAIQhUAihrgaQgdgIgRgMIgIgDQgNgGgNgKIgDAGQgGAPgFAHQgJAPgNAGQgKAFgLAAQgNAAgOgHgAAmhHIjIAhQCvA8CChCQgcg3g5gOgAA6hxIAAAAIAAAAIAAAAIAAAAg");
	this.shape_8.setTransform(27.0529,80.9408);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legshoegirlL, new cjs.Rectangle(-2.4,-5.9,53.9,98.80000000000001), null);


(lib.legshoe = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape.setTransform(11.5641,2.9297,0.9999,0.9999,-6.2726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_1.setTransform(15.2913,35.4654,0.9999,0.9999,-6.2726);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_2.setTransform(11.5641,2.9297,0.9999,0.9999,-6.2726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_3.setTransform(15.2913,35.4654,0.9999,0.9999,-6.2726);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#77422C").s().p("AjhB0QgfgFgWgPIgIgGIgEgCIgBgCQHoAVBajgQADAMACAOIAAAUQgBAdgLAeQgKAZgSAUQgUAWgZAIIgSAJQgUAHggAGQiAAXiWAJIgsABQgYAAgQgCg");
	this.shape_4.setTransform(33.6625,85.7266);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#813E0C").s().p("AkKCcQgSgLgLgTQgNgSgCgXQgDgXAJgWQAIgUAMgOQANgPAEgBQAHgJAGgGQAIgFAgACQCHAGB1gTQB1gTgogyQgqgyA/ADQA9AEAkAQQAkAQAWAeQANAUAIAYQhTDNmgAAQgnAAgogCg");
	this.shape_5.setTransform(31.1875,78.7241);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legshoe, new cjs.Rectangle(-2.4,-6,65.3,103.6), null);


(lib.Tween8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(2,1,1).p("AhOAJQB8BpAhij");
	this.shape.setTransform(0.025,0.0016);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.9,-6,17.9,12);


(lib.Tween7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(2,1,1).p("Ag+AGQBbBSAih9");
	this.shape.setTransform(0.025,0.0308);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.3,-4.8,14.7,9.7);


(lib.Tween6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(2,1,1).p("Ag+ARQBTAiAqhN");
	this.shape.setTransform(0.025,0.0232);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.3,-3.7,14.7,7.5);


(lib.Tshirt = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF6600").ss(4,1,1).p("AjonPQgLBHgPBfQhBGvhLF9QgJgBgKgBQgDgBgDAAIgCAAAHPnLQADgTAFgTIg0gfQhnI4g3HoAEFIRIAjAAQAjAAACAAIANAAQAgnoBTnnAm0H/IgigEQBsn4A/nx");
	this.shape.setTransform(87.95,201.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(4,1,1).p("AjAi4QgEABgEABQgEABgEABQgbAHgQAIQgBABgCABQgNAGgGAIQgDADgBAEQgOAOgKARQgEAIgEAJQgHARgDAUQgHAxAWAoQABADACACIAAAAQACAEADADQAUAeAeANQAPAGAQADQAzAHArgiQANgMAKgMQAEgGAEgHQANgZAFgdQADgXgCgTQgEghgTgcQgNgUgSgNQgLgIgOgFQgEgCgFgBQgIgDgJgBQgCAAgCAAAhUA1QADACACADQAbAbArAHQAQACAQgCIAKgBIANgEABIBKQADASAGARQAGAMAIALQAdAtA0AHQAzAHArgiQAqgkAIg5QABgMAAgLQAAgTgEgRQgGgWgOgUQgegug0gHQgqgGgjAWQgIAFgHAHQgeAagOAk");
	this.shape_1.setTransform(88.2155,142.784);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AE+HqIgEgBIgHgGQgIgKAGgLQAGgLAMgBQAAABAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAJAAAFAIQAFAGgCAJQgCALgHADQgEACgHAAIgCAAIgCAAgAmtHUIgEgCIgHgGQgIgJAGgLQAGgKAMgBQAAAAAAAAQAAAAABAAQAAAAAAAAQABABAAgBQAJABAFAHQAFAHgCAJQgCAJgHAEQgEACgHAAIgCABIgCgBgAGZnFQgEgFgBgDIAAgEQABgEAEgIIAHgIQADgCAIgCIAAABQAEgBAEACIABAAIAGAGIADAEIAAAHIAAABIAAAFQABADgBACIgIALIgIACIgQABQAAgEgEgEg");
	this.shape_2.setTransform(88.1298,202.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AAAAAIAAAAIABAAIAAAAg");
	this.shape_3.setTransform(155.625,114);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF3333").s().p("AC4CoIgGgCIgCAAIgMgDQgJgEAAgFIAAgCQgDgEAAgFQgBgKAMgHQAGgEAIAAQADgBAHAAIATADIAHgBIAFABQAGAAAKgEIALgEIACAAQACgCAFAAQADAAACADIABADIABABQAEADgFAHQgEAJgHAGQABAEgCADQgCAHgIADIgLAFQgLADgKAAIgGAAQgIAAgIgDgAj4hqIgDgCQgDgBgCgCQgGgFAAgMQgBgFAEgEQgBgIAFgEQACgEAGgDIADgCQANgGARgEIACAAIAGgBIAMgBIAKACIASACIAJAEQAKACAKAEQAGADADAEQAGAFgEANIADAAQAFAAABAEIADABIAAADIAAAAIgBAJIgBACIgBAAQAAAAAAAAQAAABAAAAQAAAAAAAAQgBAAAAABQgDADgFADIgJABQgEAAgJgDIgZgGQgLgDgJADQgGABgJAGIgJACIgFABIgJABQgJAAgIgFg");
	this.shape_4.setTransform(88.4608,143.0938);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FF0000").s().p("ACwC4Qg0gHgdgtQgIgLgGgMQgGgRgDgSIgFAEQgIAEgIADIgFACIgNAEIgKABQgPACgQgDQgqgGgcgcIgEgEIAHgMQAOgaAEgdQADgXgCgTIADgCIAIgDIARgFQAVgEAVADQAqAGAbAbIAAABIgCAMQgCALAAAKQAOgkAegaQAHgHAIgFQAjgWAqAGQA0AHAeAuQAOAUAGAWQAEARAAATIgBAXQgIA5gqAkQgkAcgpAAIgRgBgAC0B9QgIAAgHAEQgMAHABAKQABAFACAEIAAACQAAAFAKAEIAMADIABAAIAGACQALAFALgCQALAAAKgDIAMgFQAIgDACgHQABgDAAgEQAHgGAEgJQAFgHgEgDIgCgBIAAgDQgCgDgEAAQgFAAgCACIgCAAIgLAEQgJAEgGAAIgGgBIgGABIgTgDIgDAAIgHABgAjXBgQgQgDgPgGQgegNgUgeIgFgHIAAAAIgDgFQgWgoAHgxQADgUAHgRIAIgRQAKgRAOgOQABgEADgDQAGgIANgGIADgCQAQgIAbgHIAIgCIAIgCIAEACIAIAEIAEAAQAJABAIADIAJADQAOAFALAIQASANANAUQATAcAEAhQACATgDAXQgFAdgNAZIgIANIgXAYQgjAcgpAAIgSgBgAjMimIgFABIgCAAQgRAEgOAGIgDACQgFADgDAEQgEAEAAAIQgDAEAAAFQAAAMAHAFQACACADABIACACQAJAFAIAAIAJgBIAFgBIAKgCQAIgGAHgBQAIgDAMADIAZAGQAIADAFAAIAIgBQAGgDACgDQABAAAAgBQAAAAAAAAQABAAAAgBQAAAAAAAAIABAAIABgCIABgJIgBAAIABgDIgDgBQgCgEgEAAIgDAAQADgNgFgFQgEgEgGgDQgKgEgJgCIgKgEIgRgCIgLgCg");
	this.shape_5.setTransform(88.2155,142.784);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FF6600").s().p("AFNKUIglgBIgiAAIgBAAQA3noBmo4IA1AeIgIAnIAAgCIgBgGIgCgFIgHgFQgEgCgEABIAAgCIgJADQgEgDgDACIAAgCQgJACgDADIgGAIQgEAHgBAEIAAAEQAAAEAEAEQAFAFAAADIAQgBIAAABIAUgCIAEAAIAGgJQhTHoggHogAEzJaQgGALAIAKIAHAGIADABQABABABAAQAAAAABAAQAAAAABAAQAAAAABgBQAHAAAEgBQAHgEACgKQACgJgFgGQgGgIgIAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQgMABgGAKgAmhKEIgGgBIgCAAIgEgBIgHgBIgigDQBsn4A/nxIAFgiQATAYAYAMQAKALAJASIgaCmQhBGuhLF+IgTgCgAm4JFQgGAKAIAKIAHAGIADACQABAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAHAAAEgCQAHgEACgKQACgJgGgHQgEgHgJAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQgMABgGALgAj7qTQASAagHAGQgIAGgBABIgCACQgEgKAEgfgAjUp8IAPgBIgIACgAj7qTQAWAGAYAHIgJABIgHABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAABIgDAAIgFADIgBADg");
	this.shape_6.setTransform(87.95,188.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#CCCC66").s().p("AA5K1IgggGQgcgGg6gHIk0gmQBLl+BBmuIAaimQAOgSAOAAIAFAAIABAAQAzAIArgjIAXgYIAEAFQAcAbApAHQASACAQgCIAKgBIAMgEIAFgCQAJgDAHgEIAGgEQACASAHARQAGAMAIALQAdAtA0AHQAyAHArgiQAqgkAIg5IACgXQAAgTgFgRIAUALIAQAHIAPAHIAUALIAcAPQhmI4g4HpIgqABQggABgZAGQgZAGgkAPQgdANgKACQgHABgKAAIgQgBgAA1IDIACAAIgCgBgAGxKoIAAgBIgCAAIgBAAIgGAAIAAgBIgFgBIgBAAIgFgDIgCAAIgBgBIgFgEIgDgDIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIAAAAIgBgBIAAAAIAAAAIgBgCIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIgBAAIAAgBIgTAAQAgnpBSnnIACgDQABgCAAgDIAAgFIAHgmQAJACAMAHIA9AjQASALAPALQAJAEAGAHIAIAHQAXAVAWAiQANATAYAsIAqBOIABABQAEAFADAKQASAmANAhIADAEQAHAIAGAOIAKAaQAEANALAUQANAYgFALIgCADQgBAMgOAHQgIAFgQACQhNANgvgEIgJgBQgLACgWAAIgugCIgSgEIgWgIIgOgDQgSgEgMgJIgCgBIgBAEQgPBAAAAeQAAAOACAUIAEAjQADAvgGBXIgEBIIAAAIIAAAOIAAABIAAAAIAAABIABABIAAABIAAAAIAAABIABABIAAABIAAAAIAAABIAAABIABABIAAAAIAAABIAAABIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAADIABABIAAAAIAAABIAAABIAAABIAAABIACANIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIABABIAAABIAAABIAAAAIAAABIABABIAAABIAAAAIAAABIAAABIABACIAAABIABABIAAABIAAABIABACIAAAAIAAABIAAABIABABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIAAACIAAABIAAAAIAAABIAAABIAAABIAAAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIAAAAIAAABIgBABIAAABIAAAAIgBABIAAABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIAAAAIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIAAAAIAAABIgBABIAAABIAAAAIgBABIAAABIAAABIgBAAIAAABIgBABIAAABIgBAAIAAABIgBABIAAABIgBAAIgDADIgFAEIgBABIgBABIgGACIgHACIgGACIgiAAgALzAqIABgBIgBgBIAAACgAolJtQgTABgLgCQgQgDgHgLIgDgFIgCgKIABgGIgBgFQgFgRAFgSQACgIAEgHQgEgKgBgMQAAgOAEgXQAOhYAiiUQAoisAMg/QAJgwAKgXIADgFIACgTQgTABgfgEQg2gHgigLQgigLgfgRQgSgFgRgJQgdgQgcgfQgSgUgdgnQgWgegFgTQgLgrAkg6IAGgJQAVgfAcgcQAIgQAPgRQAUgYAtgtQATgTAKgIIAngcIAZgSQAPgKAMgFQAPgGAPgBIADgBQAXgLApgBQBogFBWAQIARAEIAhAIQgEAfAEAKQgNAGgGAIQgDADgBAEQgPAOgJARIgJARQgJAUgDAYQgHAxAWApIACAFIABAAIAEAHIADAEIgFAjQg/HyhsH3QhHgHglABgABwnmIACgMIAAgBQgagbgrgGQgWgDgUAEIgQAFIgJADIgEACQgDghgTgbQgSgcgbgOQgMgIgNgFQAVAGAQABQAOABAHADIABABIACAAQAIACAKAMIAcAeQAMANALADQAHADAOAAIBOAAIALABQAGABADACIABAAIALAJQAFADAMADIAKADQgIAFgIAHQgeAagNAlQAAgLABgLgAiQqDIgEAAIgJgEIAJAAIABAAIATAIQgIgDgIgBg");
	this.shape_7.setTransform(85.0567,189.2613);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF9966").s().p("AAAABIAAgBIAAABIAAAAIAAAAgAABAAIAAAAIgBAAIAAAAIABAAg");
	this.shape_8.setTransform(212.9,9.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AACAyIAAAAIgBgBIABgBIAAAAIABAAIAAgBIABgCIAAABIAAABIAAABIAAACIAAAAIgCAAgAgDgxIABABIAAACIAAABIAAABIABABIAAABIAAABIgCgIg");
	this.shape_9.setTransform(212.725,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Tshirt, new cjs.Rectangle(0,0,213.1,258.7), null);


(lib.sed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AgxAgIABgBIAAgCIAAAAIAAgCIABgBIAAgBIAAgBIAAgBIABAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgCIABAAIAAgCIABAAIAAgBIAAgBIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAgBIAAAAIAAgBIABgBIAAAAIAAgBIAAgBIAAgBIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAgBIAAAAIAAgBIABAAIAAgBIAAgBIABAAIAAgBIAAAAIAAAAIABgBIAAAAIABgBIAAAAIAAgBIABAAIAAgBIAAAAIAAAAIABgBIAAAAIAAAAIABgBIAAAAIAAgBIAAAAIAAgBIABAAIABgBIAAgBIAAAAIAAAAIABgBIAAAAIAAAAIABgBIAAAAIAAgBIACgBIAAAAIAAAAIAAgBIABAAIABgCIAAAAIABAAIAAgBIAAAAIABAAIAAgBIABgCIABAAIAAAAIABgBIAAAAIABAAIABgBIAAAAIAAAAIABAAIAAgBIACAAIAAAAIABAAIAAgBIABAAIAAAAIABAAIAAgBIABAAIAAAAIABAAIABgBIAAAAIABAAIABAAIAAgBIABAAIAAAAIADAAIAAgBIABAAIAAAAIAHAAIAAAAIADAAIAAABIACAAIAAAAIABAAIABABIACAAIAAAAIAFAAIABABIACAAIAAAAIACAAIAAABIACAAIAAAAIACAAIAAABIABAAIAAAAIAAAAIABABIABAAIAAAAIABAAIAAABIABAAIAAAAIABAAIABABIAAAAIABAAIAAAAIABABIAAAAIABAAIAAABIABAAIAAAAIAAABIABAAIAAAAIABABIAAAAIABAAIAAABIABAAIABAAIAAABIABAAIAAAAIAAAAIABABIAAAAIAAAAIABAAIAAABIAAAAIAAAAIAAABIgBAAIAAAAIgCAAIAAABIgCAAIAAAAIgBAAIgBABIgBAAIAAAAIgBAAIgBABIAAAAIgBAAIgBAAIgBABIgBAAIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAABIAAAAIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAABIgBAAIgBAAIAAAAIgBABIAAAAIgBAAIAAAAIgBABIAAAAIAAAAIgBABIAAAAIgBAAIgBABIAAAAIgBAAIgBABIAAAAIgBAAIgBAAIAAABIgBAAIAAAAIgBAAIAAABIgBAAIgBAAIgBAAIAAABIgCAAIgBAAIgBAAIAAABIgBAAIgBAAIAAAAIgBABIgBAAIAAAAIgBAAIAAABIgBAAIAAAAIAAAAIgBAAIAAAAIgBAAIAAABIgBAAIAAAAIgBABIAAAAIgBAAIAAABIgBAAIAAAAIgBABIAAAAIgBAAIgBABIAAAAIgBAAIAAABIgBAAIAAAAIgBAAIAAABIgBAAIAAAAIgBAAIgBABIgBAAIAAAAIgBAAIgBABIAAAAIgBAAIAAAAIgBABIAAAAIAAAAIgBAAIgBACIAAAAIAAAAIgBAAIAAABIgBAAIAAABIgBAAIAAAAIAAABIgBAAIgBAAIAAAAIAAABIgBAAIAAAAIgBAAIAAABIAAAAIgBAAIAAABIgBAAIAAAAIAAAAIAAABIgBAAIAAAAIAAABIgBAAIAAAAIgBABIAAAAIAAAAIgBAAIgBABIAAAAIgBAAIAAABIAAAAIgBAAIAAAAIAAABIgBAAIAAABIAAABIgBABIAAAAIgBABIAAAAIAAAAIgBABIAAAAIAAABIgBAAIAAAAIAAABIgBAAIAAABIgBAAIAAAAIAAABIgBAAIAAABIAAAAIgBAAIAAABIAAAAIgBABIAAABIgBAAg");
	this.shape.setTransform(4.95,3.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sed, new cjs.Rectangle(0,0,9.9,7.5), null);


(lib.open_mouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(1,1,1,3,true).p("AGgiSIAAASIt5AAIAAh0AGgkAIEkAAQgkDJjHCXQjICYkRAJQkQAIjDiiQjCihgujGIDqAA");
	this.shape.setTransform(69.825,25.6983);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#990000").ss(2,1,1).p("AnZAAIN5AAIA7AA");
	this.shape_1.setTransform(69.9,1.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Am8A6IAAhzIN5AAIAABhIAAASg");
	this.shape_2.setTransform(66.95,7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AnSBnQjDihgujGIDqAAIAAAMIAAB0IN5AAIAAgSIAAhiIAAgMIEkAAQgkDJjICXQjHCYkRAJIgbAAQj/AAi4iagAHbj0Ig7AAg");
	this.shape_3.setTransform(69.825,25.6983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.open_mouth, new cjs.Rectangle(-2,-1,143.7,53.4), null);


(lib.nose = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#663300").ss(10,1,1).p("Aj0iJIHpET");
	this.shape.setTransform(24.525,13.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.nose, new cjs.Rectangle(-5,-5,59.1,37.5), null);


(lib.hat = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF6600").ss(12,1,1).p("AsfABQgEAGAAAHQAAAEACAEQAQAmCsgQQAZgDAcgDQBBgIBJgIQB8gPCSgOQAagDAagDQA6gGA8gGQEOgcDPAGQA1ABAwAEQA0AFApABQBPABAkgM");
	this.shape.setTransform(82.025,72.8508);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgEAjIgEgDIgCgEIgBgBQgEgBgDgCIgEgFIgCgJIgCgJIABgJIADgIIAAgBIAAgDIABgCIACgBIAAAAIAAgBIABgCIAAgBIACgCIABgBIAFgEIABAAIACgBQAAgBABAAQAAAAABAAQAAAAABAAQABAAAAAAIABAAIABABIABABIABABIADAAIAAAAIADAAIABAAIAEABIACABIABAAIABABIABAAIABABIABABIABABIABAAQADADABADIABAKIAAALIABANQgBAHgDAFIgGAHIAAAAIAAAAIgCABIgCAAIgBABIgBAAIAAABIAAgBIAAAAIAAAAIgBABIgFACIgEAAQgDAAgCgCgAAMgJIABgBIAAAAIABAAIAAgBIgBgBIAAAAIgBADgAgUgVIAAAAIABgBIAAAAIgBABgAgKAeIABAAIAAABIgBgBg");
	this.shape_1.setTransform(147.825,50.1688);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF9966").s().p("AqaCvQADg1AVgyQAlhdBUhIQAtgnAwgYQAggPAhgHQAxgNBYACQBjACAngGQAegEArgMIBIgVQCZgqB+AVQBJAJA/AgIAYAMIAAABIABAAIABACIAAAAIABABIABABIAAABIABABIABAAIABACIABAAIABABIAAABIABABIAAABIABAAIABABIABABIAAAAIAAADIABAAIABAAIAAABIABAAIAAABIAAAAIABABIAAABIABABIAAABIABAAIABAAIABACIAAACIABAAIAAABIAAABIABABIABABIAAAAIABABIABABIAAAAIAAACIABABIABAAIABABIAAABIAAABIABABIABABIABAAIABABIABABIAAACIABAAIAAABIABABIABABIAAABIABABIABAAIAAAAIABABIAAACIABABIABAAIAAABIABABIABABIAAABIABABIABAAIAAAAIABACIAAABIABABIABABIAAABIABABIABAAIAAABIAAABIABAAIABABIAAABIABABIAAABIABACIABAAIAAABIABABIAAABIABAAIABABIAAABIABABIAAABIABABIABABIABAAIAAACIABABIAAAAIABABIAAABIACABIAAABIAAABIABABIABABIABAAIAAABIABABIAAABIAAABIABABIABABIAAAAIABABIAAACIABABIAAAAIABABIABAAIAAABIABACIAAABIABAAIAAABIAAABIADAMIACANIACAMIADALIAAADIABADIABADIABADIAAADIABADIABADIABADIABADIAAADIACADIABACIABACIABACIAAABIABAAIAAABIABABIAAABIABABIAAAAIABAAIAAABIABACIAAABIABABIABABIAAABIAAABIABAAIAAABIAAABIABABIAAABIAAABIABABIAAABIAAABIAAAAIABACIAAAAIAAABIAAABIAAABIABABIAAABIAAABIABAAIAAABIABABIAAABIABAAIAAAAIAAABIABABIABABIABABIAAABIABAAIAAABIABABIAAABIAAABIABAAIAAABIABABIABABIAAABIABAAIAAABIABABIAAABIABABIABAAIAAAAIAAABIAAABIAAABIABABIAAABIAAABIAAABIAAABIABAAIAAABIAAABIABAAIABABIAAABIABABIAAABIAAABIABABIAAABIABABIAAABIABAAIABAAIAAABIAAACIABABIAAABIABAAIAAABIABABIAAABIAAABIABAAIAAABIABACIAAAAIAAABIABABIAAAAIABABIAAABIABABIAAAAIABABIAAAAIAAABIAAACIABAAIAAABIABABIAAABIABABIAAABIABABIAAAAIAAABIABABIAAABIABABIAAABIABABIAAAAIABABIAAABIAAABIAAABIgEAEIgBABIgCACIgBABIAAACIgBABIAAAAIgBABIgBACIgBADIAAABIgCAIIgBAKIABAJIADAIIAEAGQADACADABIACAAIABAFIAEADQADACAEAAIAEgBIgCAIIhSgOIgNgCIgLgBIg9gGIgMgCQgvgEgygDIgXABQhxAChEgDIgygDQgnABgoACQgrABgqAEQlLAWh1AhIhWAXIgpALQgDAEgEADIgBAAQgJAFgIgHIgLAEIgVAEQgJgpAEgrgAKLCrIAAgBIAAAAIAAABgAKBB2IAAgBIAAAAIAAABgAKaBpIgBAAIABgJIAAAAIAAAAIABACIgBACIABAAIAAABIAAABIABACIAAAAIAAABIAAABIgCgBgAKTBnIAAAAIAAgCIAAgBIAAAAIgBgCIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgBIAAgCIAAgBIAAAAIAAgCIAAAAIAAgBIgBgCIAAgBIAAgBIAAgCIAAgBIAAgCIAAgCIgBgDIAAgBIAAgCIAAgBIAAABIAAAAIABAAIAAABIAAAAIAAAAIAAABIABAAIAAABIABAJIAAAHIAAAHIAAAHIABAFIgBgBg");
	this.shape_2.setTransform(81.674,36.1998);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF6600").s().p("AswBnQgTgJgBgOIAAgEQACgQAWgPQAlgaBdgXIAWgFIAKgDQAJAGAIgEIACgBQADgCADgFIAqgKIBWgYQB0ggFMgXQArgDApgBQApgDAnAAIAyACQBEAEBxgDIAWgBQAyADAvAFIANABIA9AHIALABIANABIBRAOIAJABIACABIABAAIABAAQAxAKAgAMIANABQAKADAUAIIALAEIAHAEQAFADAJAIQAMAKAFAHQAIAKgBANQAAAPgHAKIgFAFQgHAHgKADQgIACgIgBIgFgCIgEgBQgGgDgHgFIgPgNQgHgEgIgDQghAEgzAAIhdgFQgpgDgsgCQjVgIkYAdIgvAFIhIAHIg0AGQjmAYixAWIg1AGQgzAFglAAQg5AAgZgMg");
	this.shape_3.setTransform(83.7265,62.6111);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CCCCCC").s().p("AAvDoIgCgBIgBgEIAAgHIAAgHIAAgHIgBgJIAAgBIgBAAIAAgBIAAgBIAAAAIAAAAIgBAAIAAAAIAAgBIAAABIAAACIAAABIABADIAAACIAAACIAAABIAAACIAAABIAAABIABACIAAAAIAAABIAAABIAAABIAAABIAAACIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIAAABIABACIAAAAIAAABIAAABIAAABIgBgBQgBAAAAAAQgBAAgBAAQAAABgBAAQAAAAgBAAIgCABIgBABIAAgBIAAgBIAAgBIgBgBIAAAAIgBgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAAAIgBgBIAAgBIgBgBIAAgBIgBAAIAAgCIAAgBIAAgBIgBAAIAAgBIgBgBIAAAAIgBgBIAAAAIgBgBIAAgBIAAAAIgBgCIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIAAgCIAAgBIgBAAIgBgBIAAgBIgBAAIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIgBgBIgBAAIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIgBAAIgBAAIAAgBIgBgBIAAgBIgBAAIAAgBIgBgBIgBgBIAAgBIgBgBIAAAAIAAgBIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIgBgBIAAgBIAAAAIgBgBIAAAAIgBgBIAAgBIgBAAIAAgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgBIgBgBIAAAAIAAgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIAAgBIgBgBIAAgBIAAAAIgBgBIgBgBIAAgBIgBgCIAAgBIgBAAIAAgBIgBgBIAAAAIgBgBIAAgBIgBAAIAAgBIgBgDIgBgCIgBgCIgCgDIAAgDIgBgDIgBgDIgBgEIgBgCIAAgDIgBgEIgBgCIgBgDIAAgEIgDgKIgCgMIgCgOIgDgLIAAgBIAAgBQgBgFgCgFIgCgMIgDgLIgBgLIgCgNIAAgMIAAgNIAAgNIAAgKIAAgBIAAgBIAAgBIAAgGIAAgJIAAgJIAAgJIAAgJIABgLIAAgJIgBgJIABgKIAAgGIAAgDIABgIIAAgJIABgIIAAgBIAAgBIAAgBIABgBIAAgBIAAgBIAAgBIAAgDIAAgDIAAgDIAAgBIABgCIAAgEIABgDIAAgCIABgEIAAgDIAAgCIABgDIACgDIABgBIAAgDIABgBIAAABIAAABIgBABIAAABIAAABIAAABIAAABIAAABIAAAAIgBACIAAABIAAABIAAABIAAABIgBABIAAABIAAAAIAAABIAAACIAAABIAAABIAAABIAAAAIgBABIAAABIAAABIAAABIAAACIAAABIAAABIAAABIAAAAIAAABIAAAAIAAABIAAACIAAACIAAACIAAACIAAACIAAABIAAADIAAAAIAAACIAAACIAAABIAAADIAAACIAAACIAAACIAAADIAAABIAAACIAAACIAAACIAAADIAAACIAAAEIAAAHIAAAFIABADIAAAIIAAAGIABAHIAAAIIAAAGIABAIIAAAHIAAAFIAAAHIAAAHIABABIACAEIABAEIACAEIABAFIAAADIABAFIABAEIABADIABAFIAAADIABADIAAAAIABABIAAAAIAAABIABABIAAAAIAAAAIAAABIAAABIABAAIAAAAIAAABIAAABIAAAAIABABIAAABIAAAAIABABIAAABIABABIABAAIAAABIABABIABABIABABIAAACIABAAIABABIABACIABAAIABABIAAABIABABIABABIABABIAAABIABACIABABIABABIABACIABACIACABIAAAAIAAAAIABABIAAAAIABABIAAABIAAAAIAAABIAAAAIABABIAAABIAAAAIAAABIABABIAAABIAAAAIABABIAAAAIABABIAAAAIAAABIABAAIABABIAAAAIABABIAAAAIABABIAAACIAAAAIABAAIAAABIAAAAIAAABIABABIAAAAIAAAAIAAABIABAAIAAABIAAABIAAAAIAAABIABAAIAAACIAAAAIAAABIABABIAAAAIABABIAAAAIABAAIAAAAIABABIAAABIABABIAAAAIABABIAAAAIAAABIABABIAAAAIAAABIAAABIABAAIAAABIAAAAIAAABIABAAIAAABIAAABIAAABIAAAAIAAABIABABIAAAAIAAABIABAAIAAABIAAAAIABABIAAAAIAAABIAAAAIABAAIAAABIAAABIAAABIAAABIABABIAAAAIAAABIAAAAIABABIAAABIAAAAIAAAAIABABIAAAAIAAABIABABIAAABIAAAAIABACIAAAAIAAABIAAABIAAAAIABABIAAAAIAAABIAAAAIAAABIABABIAAABIAAAAIAAACIAAAAIABABIAAABIAAABIABABIAAABIABABIAAABIABABIAAABIABACIAAABIAAABIAAADIABACIAAACIAAACIABABIAAABIABABIAAACIAAACIABABIAAABIAAABIAAABIAAABIABADIAAABIAAABIAAACIABABIAEANIADAMIABAMIAAANIAAAMIAAAOIAAAMIAAAIIAAABIAAACIAAABIAAAAIgBAJIgDABIAAgCg");
	this.shape_4.setTransform(143.175,23.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hat, new cjs.Rectangle(-4.3,0,172.70000000000002,83.7), null);


(lib.hair = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AIXHJQgEgCACgIIADgLQACgFADgBQAVhegHhtIgaADQglAFhLADIgQABQgyACgdgBQg1AAgqgGQg7gIhnggQhCgVgqgQQg7gWgtgaQhJgrgtg3QgQgSgNgUIAAABQgCABgEAAIgTABIhmAaIgfAJIgOAFQgZAJgRANQgjAcgYBDQggBagLASQgYAqgqAbQgXAOgYAIQgVAHgXABQgaADgPgKIgCgBQgYgTAGg5IANh+QAGg4AEgbIAGgkIAKgtIAKghQAXhEAqg8QA0hLBIg1QAqgeBcgwQBAgiAkgJQAkgKBGgCQBRgCA5ADQBLADA9AMQCYAcBkBPQAYATAeAeIA0A1IATATQAzAyBBA4IAtAnIBfBOIAAABQAiAbAQALIAJAGQAZAPAXAGIAcAGIAMACIAOADIAAgBIAAAAIACAAIABgBIABAAIABAAIABAAIABgBIABAAIABgBIABgBIABgBIAAAAIABgBIAAAAIAAABIAAABIgBAAIgBACIAAABIgBAAIAAABIAAAAIAAABIgBABIAAAAIAAABIgBAAIAAABIgBACIgBACIAAAAIgCAEIgCACIAAABIgCADIgCADIgBAAIgBADIgDACIgDAGIgDADIgBABIgBABIgCACIAAAAIgDAEIgEADIAAABIgCABIgCABQgCAFgGADIgFADQgTAQgTAFIgWALQgwAVgzAOQACAEAAAGIgCAKQAFAlgSA0IgRAtQgLAbgFASIAAABQgDAMgIAOIgHAJQgCADgJAEIgFACIgCgBg");
	this.shape.setTransform(83.015,45.7635);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hair, new cjs.Rectangle(0,0,166.1,91.6), null);


(lib.face_clean = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF99CC").s().p("AhsARQgMhDA6gmQAUgOAXAHQBWAagUBTQgFAUgUAGQhTAXAHhTQACgXAWgHQARACALAPQALAQgEASIgBADIgDAEIgCAEIgCABQgFADgEABIgLABIgBgCQAAgDAFgBIAKgDIAEgDQAGgLgEgMIgDgFQgGgLgOgHIgDgBQgSAIgBAUQgBATAHARIABACQA9AjAUhBQAHgUgNgTQgohAg+AoQgRAMgIATQggBRBSAfQAeAMAegLQApgQAXgsQAWgqgIgqIADgCIAEABIADADQASA2ggAuQgfAsguARQgQADgPAAQhNAAgOhRg");
	this.shape.setTransform(84.3993,46.8293);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("Ah/IGQhygChIgXQhmghg0hIQgrg6gPhmIgCgNQgDgWgFg5QgLgKgLgQQgng0gZgkQgbgmgOgaQgUgmgHgiIgGgkIgFgqQgFgpAAgUQgBgiAJgaQAIgXAOgIQAOgIARAIQANAGAFAMQAFAGAGALIAGALQADgIAEgEQAOgOAUAGQASAGAHATQADgPAPgHQAPgIAOAHQAOAGAOAdQAPgKATAHQATAIAFARIAAAAQAKgCALADIACgCIAEgEQALgLAZAFIAHACIAEgHQADgEAGgEIAKgGQAJgFAPgNQAQgKAMAGQgCgLAGgKQAFgKAKgFQAKgFAMACQALACAIAIQAGAGAGARQAHAQAGAGQAAgJAJgGQAIgGALgBIAUAAQANAAAGgBIARgGQAJgDAGAAQA2goAmgiQA/g5Arg7IA6ALIAmAwQALgCAKAGQAIAEANAMQAJAHAWAFQAoAJAnABQArADAIACQAeAGAOAUQAEAGAEAKIAHASQAHATAVAiQAhA1AXAVIATASIADACQArgiAUgtIARgqIADgIQAJAWAGAVQAJAfAJAwQAHApABAVQAJBxgyBsQgfBEgxA8IAAASIAACYIgBABIgCAAQgIACgKAMIgcAeQgNANgLADQgHADgOAAIhOAAQgNAAgHAEIgIgNQgLgUgJgXQhZAxiCArQhkAfg7AIQgqAFg1AAIgSAAgACeiKQg6AmAMBEQARBgBqgTQAugRAfgrQAggvgSg2IgDgDIgEgBIgDACQAIAqgWArQgXArgpAQQgfALgegMQhSgeAghSQAIgTARgMQA+goApBAQANATgHAUQgUBBg+giIgBgCQgHgRABgUQABgUASgIIADABQAOAHAGALIADAFQAFAMgHAMIgEADIgKADQgFABAAADIABACIALgBQAEgBAFgDIACgBIADgEIADgEIABgDQAEgTgMgQQgLgPgRgCQgWAHgCAXQgHBTBUgWQAUgGAFgUQAUhUhXgaQgIgCgIAAQgOAAgNAJg");
	this.shape_1.setTransform(62.2923,51.8321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.face_clean, new cjs.Rectangle(-8.3,0,141.3,103.7), null);


(lib.open_eye = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("ABdAAQAAA3gbAnQgbAngnAAQgmAAgbgnQgbgnAAg3QAAgiALgdQAHgQAJgOQAbgnAmAAQAnAAAbAnQAJAOAGAQQAMAdAAAig");
	this.shape.setTransform(9.25,13.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AAAANIgDAAIgEgCQgEgCgCgFQgBgEABgDQABgEAEgCQAEgDAEAAIAAgBQAGACADACQAEADABAFQABAEgDADQgDAFgGACIgDABIAAgBg");
	this.shape_1.setTransform(6.5518,20.0083);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AhABdQgcgmAAg3QAAgiALgcQAHgRAKgOQAbgnAlAAQAnAAAbAnQAJAOAGARQAMAcAAAiQAAA3gbAmQgbAngnAAQglAAgbgngAgjA5QgDADgBAEQgCAEACAEQACAFADABIAEADIADAAIAEAAQAGgCAEgFQACgEgBgFQgBgEgEgDQgCgCgIgCIAAABIgBAAQgDAAgEACg");
	this.shape_2.setTransform(9.25,13.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.open_eye, new cjs.Rectangle(-1,-1,20.5,28.5), null);


(lib.close_blink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(0.1,1,1).p("ABdgRQgBAzgaAmQgbAngnAAQglAAgbgnQgbgmAAg2QAAg1AYgl");
	this.shape.setTransform(20.15,15.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFB684").ss(0.1,1,1).p("ABQA4IAAAAABQA4Qgnich5BAQAdAqArAXQAmAVAyAGg");
	this.shape_1.setTransform(21.35,8.5359);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAAANIgDAAIgEgCQgEgCgCgFQgBgEABgDQABgEAEgCQAEgDAEAAIAAgBQAGACADACQAEADABAFQABAEgDADQgDAFgGACIgDABIAAgBg");
	this.shape_2.setTransform(17.4518,20.5583);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFBD7B").s().p("AgHAdQgrgXgdgqQB5hAAmCcQgygGglgVg");
	this.shape_3.setTransform(21.325,8.5359);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhBBIQgbgnAAg2QAAg0AZglQAdAqAqAYQAmAVAyAGIABAAQgBAzgaAmQgbAngnAAQgmAAgbgngAgjAkQgEACAAAEQgCAFACADQACAFADACIAEACIADAAIAEAAQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgDgIgCIAAABIgBAAQgDAAgEADg");
	this.shape_4.setTransform(20.15,15.95);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFB684").ss(0.1,1,1).p("ABQAtIAAAAABQAtQgnich5BBQASBdAqAOQAqAPA6gfg");
	this.shape_5.setTransform(21.35,9.5557);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFBD7B").s().p("AgTA9QgrgOgRhdQB5hBAmCcQgnAVggAAQgPAAgNgFg");
	this.shape_6.setTransform(21.325,9.5557);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhBBIQgbgnAAg2QAAg0AZglQARBeAqAOQAqAOA6gdIABAAQgBAzgaAmQgbAngnAAQgmAAgbgngAgjAkQgEACAAAEQgCAFACADQACAFADACIAEACIADAAIAEAAQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgDgIgCIAAABIgBAAQgDAAgEADg");
	this.shape_7.setTransform(20.15,15.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFB684").ss(0.1,1,1).p("ABQALIAAAAABQALQgnich5BAQAIC0AsABQArACBBhbg");
	this.shape_8.setTransform(21.35,13.0251);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFBD7B").s().p("AgcBlQgsgCgHi0QB5hAAmCcQhABagqAAIgCAAg");
	this.shape_9.setTransform(21.325,13.0251);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhBBIQgbgnAAg2QAAg0AZglQAHCzAsACQArACBBhaIABAAQgBAzgaAmQgbAngnAAQgmAAgbgng");
	this.shape_10.setTransform(20.15,15.95);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFBD7B").ss(0.1,1,1).p("ABdgRQgBAzgaAmQgbAngnAAQglAAgbgnQgbgmAAg2QAAg1AYgl");
	this.shape_11.setTransform(20.15,15.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFBD7B").s().p("AhBBRQgbgmAAg2QAAg0AZgmQAHC0AsACIABAAIAAAAIACAAQAngCA4hLIAAAAIACgCIABgBIAGgIIABgBIABAAQgBA0gaAlQgbAngnAAQgmAAgbgngAgPBRIgBAAQgsgCgHi0QB4hAAnCdIgBABIgGAIIgBABIgCACIAAAAQg4BLgnACIgCAAIAAAAgABcgIIAAAAg");
	this.shape_12.setTransform(20.15,15.0109);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},6).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_2},{t:this.shape_5},{t:this.shape}]},5).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape}]},5).to({state:[{t:this.shape_12},{t:this.shape_8},{t:this.shape_11}]},5).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape}]},5).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},4).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.9,2,20.5,26.1);


(lib.bottonreplay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AicMUQAoglA1g7QBdhnBBhdQBNhvAthsQAvhzANh1QAOh8gahxQgXhkg3hfQg0hZhLhPQh/iFjTh0QAZAjAPApQgigcgLgSQgUghAOgdQATgnBSAFQgcABgZANQgZAMgQAWQDcB4CDCKQBPBSA1BdQA5BjAWBnQAcCBgXCMQgWCEg+B/Qg4BzhaByQhLBhhrBqQgmAlgZATQgkAdgjAOQAzgiA2gyg");
	this.shape.setTransform(508.01,134.3914);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AjGMUQAzglBDg7QB2hnBShdQBhhvA5hsQA9hzAQh1QASh8gihxQgdhkhGhfQhBhZhfhPQihiFkLh0QAgAjASApQgqgcgPgSQgYghARgdQAYgnBoAFQgjABggANQggAMgUAWQEXB4ClCKQBkBSBDBdQBIBjAdBnQAjCBgeCMQgbCEhPB/QhHBzhyByQheBhiIBqQgwAlgfATQgvAdgsAOQBBgiBEgyg");
	this.shape_1.setTransform(508.0138,124.1914);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ai5LiQAwgjA+g3QBvhhBNhXQBahnA2hmQA4hsAPhtQARh0gfhqQgbhdhChaQg9hThZhKQiXh8j6htQAeAhARAmQgngagOgRQgXgfAQgbQAXglBhAGQghABgdALQgeAMgTAUQEFBxCbCBQBdBMA/BYQBDBcAbBhQAhB4gcCEQgZB7hKB4QhCBrhrBrQhZBah/BkQgtAigdASQgrAbgqANQA9gfBAgvg");
	this.shape_2.setTransform(497.7644,142.9894);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AjfLmQAyghBBgzQBzhbBShTQBfhjA7hiQA+hpAUhtQAXhzgahrQgWhfg9hdQg4hWhWhOQiQiEj0h5QAcAiAPAnQgmgcgMgSQgWggASgaQAYgkBhALQghgBgeAKQgeAKgUATQD+B+CVCJQBZBRA6BbQA/BgAWBiQAaB5giCCQggB7hQBzQhIBnhwBmQhdBWiEBcQgvAhgdAQQgtAZgqALQA+gdBCgrg");
	this.shape_3.setTransform(515.6256,149.6315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).wait(1));

	// Layer_1
	this.text = new cjs.Text("Replay ", "96px 'Tempus Sans ITC'");
	this.text.lineHeight = 127;
	this.text.lineWidth = 428;
	this.text.parent = this;
	this.text.setTransform(165.15,57.75,1.2275,1.2275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#996633").ss(1,1,1).p("EghEgMLQAUgXAWgWQEUkTGFAAMAp4AAAQFXAQCcBgQgFALAQAZEAgqgJxQB5DQAAECIAAE/QAAE1isDsEggpgJ+Qh5DQAAECIAAE/QAAE1CsDsAQURMMgmVAAAQmFAAkUkTQhNhOg4hW");
	this.shape_4.setTransform(330.875,128.875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#996633").s().p("ALvUaQFMAMFLgJQEQgID/htQEAhtDBi/QBohlCejVQCqjkBWhbQBahgCIhbQBQg1CchYQjehXjaifQjAiMjFjKQimiyhYhTQiWiQiJhJQiyhfj7gfQifgUkqAAIpwgDIJMgIQEtgDCcARQD9AcC1BaQCvBWDGDDQAxAwB1B6QBoBuA+A6QE0ElGFCyIAPgJIgOAKIAIADIgJgDIkDCnQiqBvjEEEQhpCPg2BGQheB7hOBPQjBDEkFByQkDBxkWAMQhzAEhyAAQjdAAjfgRgA2PUJQkWgMkDhwQkFhyjBjFQhOhPheh6Qg2hHhpiPQjEkEiqhuIkDinIgJADIAIgEIgOgJIAPAJQGFizE0kkQA+g7BohuQB1h6AxgwQDGjCCvhXQC1haD9gbQCcgREtACIJMAIIpwADQkqAAifAUQj7AgiyBfQiJBJiWCPQhYBUimCxQjFDLjACLQjaCfjeBXQCcBZBQA1QCIBbBaBfQBWBbCqDlQCeDUBoBmQDBC/EABtQD/BtEQAHQFLAJFMgMQjfASjdAAQhyAAhzgFgAPHQqMgmVAAAQmGAAkTkUQhOhNg3hWIgigsIgxhAQh4icglgoQi+jRkDhwQgggNgQgMQgYgSgCgYQgFgsBJgmICvhcQBig2BDg1QBZhGB9iTIA6hEQBkhzAwgsIAagYQAUgXAWgWQETkTGGAAMAp4AAAQFWAQCdBgQgCADAAADQAAALANATQgNgTAAgLQAAgDACgDQgogaBpA2QBWAsBPA4IAKAHQBFAyA/A8QAwAsBkBzIA6BEQB9CTBZBGQBDA1BiA2ICvBcQBJAmgFAsQgCAYgYASQgQALggAOQkDBwi+DRQglAoh4CcIgxBAQh7ChhjBRIgJAHIgKAIQi8CPkVAxQh5AViPADIg9ABQhMAAhagEgEAhWAB+QAAE0itDtQCtjtAAk0IAAlAQAAkCh5jQQB5DQAAECgEgjwABxQAAE0CtDtQitjtAAk0IAAlAQAAkCB5jQQh5DQAAECIAAFAgAlSz3QgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQABAAAAAAQAAgBABAAQAAAAABAAQABAAABAAQAAAAABAAQAAAAAAABQAAABAAABQABAAAAABQAAAAgBABQAAAAAAAAQgBABgBAAg");
	this.shape_5.setTransform(338.625,132.348);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#996633").ss(1,1,1).p("EgiRgMoQAVgYAXgWQEdkdGUAAMArZAAAQFjAQCiBkQgFALARAaEAh2gKIQB9DYAAELIAAFLQAAFAiyD1Egh1gKWQh9DYAAELIAAFMQAAE/CyD2AQ6R0MgnuAAAQmUAAkdkeQhQhQg6hZ");
	this.shape_6.setTransform(330.325,119.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#996633").s().p("AMKVJQFYAMFYgJQEZgIEIhxQEKhxDIjFQBrhqCkjcQCwjtBaheQBdhjCNheQBSg4CihbQjmhajiilQjHiQjMjSQisi4hbhXQiciUiOhMQi5hikDghQikgVk2AAIqGgDIJhgIQE4gDCiASQEGAcC8BeQC0BZDODKQAzAyB5B+QBsByBAA9QE/EvGTC5IAQgKIgPAKIAIAEIgJgDIkNCtQivByjMEOQhtCUg3BJQhhB/hSBSQjIDLkOB2QkMB1kgAMQh6AFh5AAQjjAAjkgSgA3CU4QkhgNkMh0QkPh2jIjMQhRhShhh/Qg3hJhtiUQjLkNiwhzIkNitIgJADIAIgDIgPgKIAQAJQGTi5E/kvQBAg9BshyQB5h+AzgyQDOjJC0haQC8hdEGgdQCjgRE3ACIJhAJIqGADQk2AAikAUQkEAhi5BiQiNBMicCVQhbBWisC4QjMDSjHCRQjiCkjmBbQCiBcBSA2QCNBfBdBjQBaBeCwDtQCkDcBrBpQDJDGEIBxQEJBxEZAIQFYAJFXgNQjmASjlAAQh3AAh2gEgAPqRQMgnuAAAQmUAAkekdQhPhQg6haIgjgtIgzhCQh8iigngqQjEjYkNh0QghgNgRgNQgYgTgDgYQgEguBLgnIC2hfQBlg5BFg2QBchJCDiZIA7hGQBoh3AxguIAbgYQAVgYAWgXQEekdGUAAMArZAAAQFjARCiBjIgBAGQAAAMAMATQgMgTAAgMIABgGQgpgbBsA4QBaAtBRA6IALAIQBIA0BBA+QAyAuBnB3IA8BGQCCCZBcBIQBFA3BlA4IC2BfQBLAngEAuQgDAZgYATQgRALggAPQkNBzjFDZQgnAqh8ChIgzBCQh/CohmBTIgKAIIgLAIQjCCUkfAzQh+AViUAEIhEAAQhNAAhagEgEAijACCQAAFAiyD1QCyj1AAlAIAAlLQAAkLh9jYQB9DYAAELgEglDAB1QABE/CyD2Qiyj2gBk/IAAlLQAAkMB9jXQh9DXAAEMIAAFLgAle0lQgBAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABgBAAAAQABAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAABAAABQAAAAgBAAQAAABgBAAg");
	this.shape_7.setTransform(338.35,122.846);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5,p:{scaleX:1,scaleY:1,x:338.625,y:132.348,rotation:0}},{t:this.shape_4,p:{scaleX:1,scaleY:1,x:330.875,y:128.875,rotation:0}},{t:this.text,p:{scaleX:1.2275,scaleY:1.2275,x:165.15,y:57.75,rotation:0}}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.text,p:{scaleX:1.2719,scaleY:1.2719,x:158.55,y:45.5,rotation:0}}]},1).to({state:[{t:this.shape_5,p:{scaleX:0.9703,scaleY:0.9703,x:338.8303,y:140.1221,rotation:0}},{t:this.shape_4,p:{scaleX:0.9703,scaleY:0.9703,x:331.3102,y:136.7522,rotation:0}},{t:this.text,p:{scaleX:1.191,scaleY:1.191,x:170.5,y:67.65,rotation:0}}]},1).to({state:[{t:this.shape_5,p:{scaleX:0.9703,scaleY:0.9703,x:359.7342,y:139.9833,rotation:4.6679}},{t:this.shape_4,p:{scaleX:0.9703,scaleY:0.9703,x:352.5134,y:136.0126,rotation:4.6679}},{t:this.text,p:{scaleX:1.191,scaleY:1.191,x:197.85,y:53.85,rotation:4.6672}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.5,-14.3,721.2,817.8);


(lib.botton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("", "96px 'TempusSansITC'");
	this.text.lineHeight = 127;
	this.text.lineWidth = 100;
	this.text.parent = this;
	this.text.setTransform(1372.35,74.8);

	this.text_1 = new cjs.Text("Pinocchio ", "96px 'Tempus Sans ITC'");
	this.text_1.lineHeight = 127;
	this.text_1.lineWidth = 428;
	this.text_1.parent = this;
	this.text_1.setTransform(364.15,186.15,1.2275,1.2275);

	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(0,-19.5,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(43.2,32.85,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(-97.85,-60,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_5();
	this.instance_3.setTransform(-49,-2.15,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_8();
	this.instance_4.setTransform(128.6,-10.95,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_7();
	this.instance_5.setTransform(163.35,31.2,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_10();
	this.instance_6.setTransform(2.3,-17.7,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_9();
	this.instance_7.setTransform(45.5,34.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.text_1,p:{scaleX:1.2275,scaleY:1.2275,rotation:0,x:364.15,y:186.15}},{t:this.text,p:{scaleX:1,scaleY:1,rotation:0,x:1372.35,y:74.8,text:"",font:"96px 'TempusSansITC'",lineWidth:100}}]}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.text_1,p:{scaleX:1.3925,scaleY:1.3925,rotation:0.7855,x:316.1,y:169.85}},{t:this.text,p:{scaleX:1.1344,scaleY:1.1344,rotation:0.7853,x:1461.5,y:59.3,text:"",font:"96px 'TempusSansITC'",lineWidth:100}}]},1).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.text,p:{scaleX:0.9892,scaleY:0.9892,rotation:0,x:421.95,y:154.7,text:"Pinocchio ",font:"96px 'Tempus Sans ITC'",lineWidth:428}}]},1).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.text,p:{scaleX:1.2275,scaleY:1.2275,rotation:0,x:366.45,y:187.95,text:"Pinocchio ",font:"96px 'Tempus Sans ITC'",lineWidth:428}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-97.8,-60,1675.1,1067.8);


(lib.handd3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(26.2934,57.7196,0.9999,0.9999,0,9.4912,-170.5088);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(14.5222,30.9605,0.9999,0.9999,0,9.4912,-170.5088);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(26.2934,57.7196,0.9999,0.9999,0,9.4912,-170.5088);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(14.5222,30.9605,0.9999,0.9999,0,9.4912,-170.5088);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.handd3, new cjs.Rectangle(-5.9,-5.9,41,73.80000000000001), null);


(lib.handd2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AiWjCQgKAEADAMQACAOAIANIECFOQAGAIAKAGQABABAFACQAMACAGgFQAIgJgBgJQAAgJgEgGQgDgFgEgHIkClOQgKgMgKgEQgLgGgIAKg");
	this.shape.setTransform(15.8618,20.1124);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.handd2, new cjs.Rectangle(-6,-6,43.7,52.2), null);


(lib.handd = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AgOmAQgUAAgPASQgOARABAXIAZKQQABAXAPARQAQAPAUAAQAVgCAOgQQAOgRgCgYIgZqPQgBgYgPgQQgPgQgUABg");
	this.shape.setTransform(27.7243,29.4985,1,1,44.9988);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("AgVFyQgPgRgBgXIgZqQQgBgXAOgRQAPgSAVAAQATgBAQAQQAOAQABAYIAZKPQACAYgOARQgOAQgVACIgBAAQgUAAgPgPg");
	this.shape_1.setTransform(27.7243,29.4985,1,1,44.9988);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.handd, new cjs.Rectangle(-6,-6,67.4,71), null);


(lib.hand2L = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgagQQACgBADgBQANgGAOACQANADAJAPQABAEACAEAgagQQABgBACgBQADgEAGgDQALgGALADQAMAEAGAKQADAFACAGQAAADAAAEQAAABgBADQgDALgLAGQgLAHgMgEQgLgDgIgLQgGgLADgKQACgGABgDg");
	this.shape.setTransform(9.7888,2.9554);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAXhkQAAAAAHgSQAHgSASAEQARAFARAYQADAGADAFQACACABACQAIAOADANQAFASgDATQgFAggQADQgRABgXgaQgBADgBBBQgBAxgXATQgIAHgMAEQgqAMgcgjQgGgIgFgHQgUgcgJgdQgLgmAMgsQAGgbALgUQAHgKAIgIQADgFAEgDQANgNANgFAARhxQADAFADAIAAagSQgNgHgHgNQgHgNACgQQAAgCACgEQACgIAEgHQAFgHAJgFAAygOQgHABgIgDQgEgBgFgBQAbgSgDAWg");
	this.shape_1.setTransform(11.2258,14.8422);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgHAZQgLgDgIgLQgGgLADgKIADgJIAFgCQANgGAOACQANADAJAPIADAIIgBAEQgDALgLAGQgIAEgIAAIgHgBg");
	this.shape_2.setTransform(9.7888,3.2833);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhCBuIgLgPQgUgcgJgdQgLgmAMgsQAGgbALgUQAHgKAIgIIAHgIQANgNANgFIgDAJQgEALAHALQAHAMAMADQAMADAKgHQAMgGADgLIABgDQADAFADAIIAHgSQAHgSASAEQARAFARAYIAGALIADAEQAIAOADANQAFASgDATQgFAggQADQgRABgXgaIAAgCQABgKgHgBIAAAAIgCABQgFAAgIAGIgBAAIgBABIgBABIAJACQAIADAHgBQgBADgBBBQgBAxgXATQgIAHgMAEQgKADgJAAQgeAAgVgagAAGgmQAHANANAHQgNgHgHgNQgGgJAAgMIABgIIACgGQACgIAEgHQAFgHAJgFQgJAFgFAHQgEAHgCAIIgCAGIgBAIQAAAMAGAJgAAjgQIgJgCIABgBIABgBIABAAQAIgGAFAAIACgBIAAAAQAHABgBAKIAAACIgEAAQgFAAgGgCg");
	this.shape_3.setTransform(11.2258,14.8422);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand2L, new cjs.Rectangle(-1,-1,24.5,30.5), null);


(lib.hand1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgYAUQACABABACQAIAIANAAQAMgBAJgJQAJgIAAgNQABgMgJgJQgDgEgEgBQgBgBgDAAQgEgCgGgBQgMADgJAIQgJAJAAALQAAAGABAGQACADACAEgAAPgaQgCAAgDAAQgOABgLAKQgKAJAAAQQAAAEABAG");
	this.shape.setTransform(8.2451,3.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgrAWQACACAiA5QAYApAeAGQAKACANgDQAqgMAIgsQABgKABgIQADgigHgdQgJglghgjQgSgTgVgLQgLgGgLgEQgEgCgFgBQgRgEgOACAg/hBQAAgBgPgMQgPgMgOAOQgLAMgDAeQAAAFgBAHQAAACAAADQAAAPAEANQAFARALAQQAWAaAPgHQAQgHAGgiAgZAGQAIgLAAgOQAAgQgKgMQgCgDgCgCQgHgGgHgEQgIgDgKAAAhAhQQAAAGABAJAgZAGQgggCAOASQAGgEAGgFQADgEADgDg");
	this.shape_1.setTransform(12.2833,13.1214);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgXAVIgDgDIgBgKQAAgQAKgJQALgJAOgBIAFgBQAEACADAEQAJAIgBAMQAAANgJAIQgJAJgMABQgNAAgIgIg");
	this.shape_2.setTransform(8.4264,3.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AAvCAQgegGgYgpQgig5gCgCQAGgEAGgFIAGgHIgGAHQgGAFgGAEIgBgBIAAAAIgBgBIAAAAIAAgBQgJgNAXAAIAAAAIAAAAIAGAAIgGAAIAAAAIAAAAQgXAAAJANIAAABIAAAAIABABIAAAAIABABQgGAigQAHQgPAHgWgaQgLgQgFgRQgEgNAAgPIAAgFIABgMQADgeALgMQAOgOAPAMIAPANQAKAAAIADQAHAEAHAGIAEAFQAKAMAAAQQAAAOgIALQAIgLAAgOQAAgQgKgMIgEgFQgHgGgHgEQgIgDgKAAIgBgPIACADQAJAIANAAQAMgBAJgJQAJgIABgOQAAgMgIgIQgEgEgEgCQAOgCARAEIAJADQALAEALAGQAVALASATQAhAjAJAlQAHAdgDAiIgCASQgIAsgqAMIgOACIgJgBgAgrAWIAAAAg");
	this.shape_3.setTransform(12.2833,13.1214);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand1, new cjs.Rectangle(-1,-1,26.6,28), null);


(lib.fingers = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgYgRIgBAAIAAgBQgBABgCADQgEAKADAKQAFANALAHQAIAGANgEQAMgDAHgLQABgDAEgFQgBAAAAAAIgBgBQgBgBAAgCQgFgLgNgKQgKgGgSACQgCAEgFACgAAeAFQABAAAAgBQABgGgDgGQgEgMgLgFQgNgFgJACQgGACgDACQgEACgDAF");
	this.shape.setTransform(27.0933,-0.1694);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAphRQAAAAAIgTQAHgRgPgJQgSgJgcAFQgFADgHABQgBAAgCACQgQADgLAHQgRAJgKAQQgVAaAKAPQAMAMAigBQg4glAUABQAaADAqANQApANABgDQAFgJACgGQAAgJgBgKgAA2hWQgHAAgGAFAgmglQgGAGgoArQgiAgABAfQABAMAHALQAXAmAsgEQAKgCAIgCQAggGAagOQAjgVAZgmQANgXAHgYQACgLAAgKQABgGABgGQgCgRgEgOAgkgjIAAAAIACABIAAABIACAAQADABAEACQAEADACADQgFgigOAVQACABAAABQAAgBgCgBAgnglQABgBAAABIAAAAg");
	this.shape_1.setTransform(19.0219,6.6548);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgNAYQgLgIgFgMQgDgLAEgJIADgEIAAAAIABAAQAFgCACgDQASgDAKAHQANAKAFALIABADIABAAIABAAIgFAJQgHAKgMADQgGACgEAAQgHAAgEgDg");
	this.shape_2.setTransform(27.0933,0.0745);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhtBiQgHgLgBgMQgBgfAiggIAugxIACACIAAAAIACABIAAABIACAAQADABAEACIAGAGIAAgCQgDgTgHAAIAAAAIAAAAQgEAAgEAGIgBABIAAABIAAAAIAAAAIAAgBIABgBQAEgGAEAAIAAAAIAAAAQAHAAADATIAAACIgGgGQgEgCgDgBIgCAAIAAgBIgCgBIAAAAIgCgCIACACIgCgCIAAAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAAAAAAAIgBAAIgBgBIgCgBIgBgBQgxghARAAIABAAIAAAAIAAAAQAaADAqANIAAAAIAEABIAEACIABAAIACABIABAAIABAAIACABIAFABIACABIAAAAQAPAEAEAAIAAAAIABgBQAFgJACgGIAAgGIgBgNQAGgFAHAAIgDAEQgEAJAEAMQAEAMALAIQAJAFANgEQANgDAGgKIAFgJQAEAOACARIgCAMQAAAKgCALQgHAYgNAXQgZAmgjAVQgaAOggAGIgSAEIgIAAQgmAAgVgigAgTgYIAAAAgAgkgjIAAAAgAgkgjIAAAAgAhVgwQgKgPAVgaQAKgQARgJQALgHAQgDIADgCQAHgBAFgDQAcgFASAJQAPAJgHARIgIATIABANIAAAGQgCAGgFAJIgBABIAAAAQgEAAgPgEIAAAAIgCgBIgFgBIgCgBIgBAAIgBAAIgCgBIgBAAIgEgCIgEgBIAAAAQgqgNgagDIAAAAIAAAAIgBAAQgRAAAxAhIABABIACABIABABIABAAIgDAAQgfAAgMgLgAAphRIAAAAg");
	this.shape_3.setTransform(19.0219,6.6548);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.fingers, new cjs.Rectangle(6.3,-7.6,25.5,28.5), null);


(lib.arm20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AiXlgQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgUAIgUgJQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHg");
	this.shape.setTransform(16.182,36.5165,1,1,3.5177);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("ABwFhQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgKAEgJAAQgKAAgLgFg");
	this.shape_1.setTransform(16.182,36.5165,1,1,3.5177);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm20, new cjs.Rectangle(-6,-6,44.4,85), null);


(lib.arm19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(2.7473,56.7983,1,1,-7.3213);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(15.5244,30.5016,1,1,-7.3213);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(2.7473,56.7983,1,1,-7.3213);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(15.5244,30.5016,1,1,-7.3213);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm19, new cjs.Rectangle(-6,-6,43.1,73), null);


(lib.arm18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(1,1,1).p("ABRgpQABAAASgIQARgIAKAQQAIAQgFAcQgCAGgBAGQAAACgCACQgDAQgHAMQgKAQgPALQgbAUgNgKQgNgLACgjQgDABguAvQgiAhgfgCQgLgBgLgGQgmgWAFgtQABgJABgIQAGgiAOgaQAUgjAogYQAXgOAWgGQALgDAMAAQAFgBAFABQASAAANAFABWg3QgBAHgEAHAAaASQgFgNAFgOQADgOAOgKQABgBAEgCQAHgEAIgCQAIgBAKACAAnAmQgFgEgDgIQgCgEgDgEQAgAGgTAOg");
	this.shape.setTransform(13.1889,11.7223);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#996600").ss(1,1,1).p("AgGgeQABAAACABQAEgBAHACQALAEAHALQAFALgCAKQgCAGgDAFQgBADgEADAgGgeQACABACABQAMAFAKANQAHAKgEAQQgCAEgCAFQgBABgDABQgJAGgMgEQgMgDgGgLQgHgKADgNQAEgMAJgFQAGgDADgCg");
	this.shape_1.setTransform(19.9167,3.6092);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC99").s().p("AhLB1QgLgBgLgGQgmgWAFgtIACgRQAGgiAOgaQAUgjAogYQAXgOAWgGQALgDAMAAQAFgBAFABQASAAANAFIgJAFQgKAFgDAMQgDAOAGAKQAGALANADQAMAEAKgGIADgCQgBAHgEAHIgCgBIgKgBIgBAAIAAAAIgFABIAAAAQgIACgHAEIgFADQgOAKgDAOQgDAIAAAGQAAAHADAGQgDgGAAgHQAAgGADgIQADgOAOgKIAFgDQAHgEAIgCIAAAAIAFgBIAAAAIABAAIAKABIACABQABAAASgIQARgIAKAQQAIAQgFAcIgDAMIgCAEQgDAQgHAMQgKAQgPALQgbAUgNgKQgNgLACgjQAHgFAAgEQAAgHgUgEIAFAIQADAIAFAEQgDABguAvQggAfgdAAIgEAAgAAnAmIAAAAgAAfAaIgFgIQAUAEAAAHQAAAEgHAFQgFgEgDgIg");
	this.shape_2.setTransform(13.1889,11.7223);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#996600").s().p("AgDAdQgNgDgGgLQgGgKADgNQADgMAKgFIAJgFIADACQANAFAKANQAHAKgEAQIgFAJIgDACQgGAEgGAAQgFAAgEgCg");
	this.shape_3.setTransform(19.6754,3.6092);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm18, new cjs.Rectangle(-1,-1,28.4,25.5), null);


(lib.arm16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(3.1924,62.3633,0.9999,0.9999,-32.3283);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(3.6554,33.1319,0.9999,0.9999,-32.3283);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(3.1924,62.3633,0.9999,0.9999,-32.3283);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(3.6554,33.1319,0.9999,0.9999,-32.3283);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm16, new cjs.Rectangle(-6,-6,19.3,78.3), null);


(lib.arm15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AgHj3QAJgCAGALQAHAMACANIANGoQABAKgDALQgCACgBADQgIAKgIABQgLgCgGgJQgFgGAAgIQgCgFAAgJIgPmlQAAgPAFgLQAGgKAMABg");
	this.shape.setTransform(3.0542,24.8019);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm15, new cjs.Rectangle(-6,-6,18.1,61.6), null);


(lib.arm14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAegCQABABABACQgDALgIAHQgJAKgNABQgKAAgLgKQgJgJAAgLQABgFgBgEQACgBADgCQAKgIAQgBQAMgCANAMQACAEADAFgAgfgJQABgBACgBQACgGAEgEQAKgIAMABQANABAHAHQAEAEADAFQACACABAH");
	this.shape.setTransform(7.15,3.1497);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhjQABgBABgVQACgSASAAQATABAXATQAEAFAFADQABABABAEQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQgBgBgBAAIABAAQAAABABAAQBCgFgTgIQgWgLgsgKQgqgJABgFQAAgJACgHQADgHAGgHgAgGhvQAGAEADAIAAvgVIgBAAIgBAAIAAAAIgCAAQgDgBgEAAQgGAAgDABQAWgaABAZQgCAAgBABQABgBADAAQABAHANA6QANAugQAaQgHAKgMAGQgnAVgigaQgIgGgGgGQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKQACgEADgFQAJgPALgJ");
	this.shape_1.setTransform(10.8019,14.0242);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgWARQgIgJgBgMQACgEgCgFIAFgCQALgJAPgBQAMgCAOANQABAEADAEIABAFQgCAJgIAIQgJAJgNABIgBAAQgKAAgKgJg");
	this.shape_2.setTransform(7.15,3.4874);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgeB+IgOgMQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKIAFgJQAJgPALgJQABAEgBAFQAAAMAJAJQAKAKAKAAQAOgBAJgKQAIgHADgLIgCgEQAGAEADAIIACgWQACgSASAAQATABAXATQAEAFAFADIACAFQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQA0gEgBgGQAAgBgEgCQgWgLgsgKQgpgJAAgFIAAAAIACgQQADgHAGgHQgGAHgDAHIgCAQIAAAAQAAAFApAJQAsAKAWALQAEACAAABQABAGg0AEIgCgBIABAAQgBAAAAAAQgBAAAAABQgBAAAAAAQAAAAgBAAIADgBQAAgMgFAAIgBAAIAAAAQgFAAgIAIIgBABIgBACIgBABIgBABIAJgBIAHABIACAAIAAAAIABAAIABAAQABAAAAAAQAAAAABAAQAAgBABAAQAAAAABAAIAOBBQANAugQAaQgHAKgMAGQgRAJgRAAQgUAAgTgOgAAugVIgBAAIAAAAIgCAAIgHgBIgJABIABgBIABgBIABgCIABgBQAIgIAFAAIAAAAIABAAQAFAAAAAMIgDABgAAvgVIAAAAg");
	this.shape_3.setTransform(10.8019,14.0242);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm14, new cjs.Rectangle(-1,-1,23.6,30.1), null);


(lib.arm13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ABVjnQAKABACANQACANgEANIiQGPQgDAJgGAJQgDABgCADQgLAGgIgCQgKgGgDgLQgCgHACgIQABgFADgIICOmNQAGgOAIgHQAKgIAKAGg");
	this.shape.setTransform(9.7489,23.4582);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm13, new cjs.Rectangle(-6,-6,31.5,58.9), null);


(lib.arm12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAaARQAAABgCADQgHAHgMABQgMACgLgIQgIgGgDgOQgBgMAHgJQAEgDACgEQABgBADABQAEgEAGAAQAMAAAJAHQAKAKACAKQAAAFgBAFQAAADgDAGgAgRgZQACAAADABQAMgBAOAIQALAHADARQgCAEAAAG");
	this.shape.setTransform(14.7708,2.9609);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AA2hKQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfQA3AlgKgTQgLgWgcghQgcgiADgEQAFgGAGgFQAHgEAKgBgAA2hZQACAHgCAIAAsAQQgDAGgZA3QgSAsgcAKQgLAEgOgDQgrgHgNgqQgCgKAAgIQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEQAFgDAFgCQAQgGAOAAAAsAPQgCgBgCgBQACABACACQAAAAABABQAAgCgBAAIAAABAAoANIAAAAIgBAAIAAgBIgBgBQgCgCgDgDQgEgDgEgCQAhgFgOAT");
	this.shape_1.setTransform(12.0216,13.6771);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgRAWQgIgGgDgOQgBgMAHgKIAGgHIAFABQAMAAAOAIQALAHADARQgCADAAAGIgCAFQgHAHgMABIgEAAQgKAAgJgGg");
	this.shape_2.setTransform(14.6875,3.1375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("Ag3CEQgrgHgNgqIgCgSQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEIAKgFQAQgGAOAAIgGAHQgHAJACANQABAOAJAGQALAIANgCQALgBAIgHIACgEQACAHgCAIQgKABgHAEQgGAFgFAGIgBABQAAAGAaAfQAcAhALAWIAAABIABAAQACAFgDAAIAAAAQgHAAgbgRIgCgBIgBgBIAAAAIgBgBIgDgCIgBAAIgCgBIgBgBIABABIACABIABAAIADACIABABIAAAAIABABIACABQAbARAHAAIAAAAQADAAgCgFIgBAAIAAgBQgLgWgcghQgagfAAgGIABgBQAFgGAGgFQAHgEAKgBQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfIgBgCIAAgBIABAAIAAgBQAJgNgPAAIgBAAIAAAAIgMABIgBAAIAIAFIAFAFIABABIAAABIABAAIAAAAIAAAAIgBAAIAAgBIgBgBIgFgFIgIgFIABAAIAMgBIAAAAIABAAQAPAAgJANIAAABIgBAAIAAABIgEgCIAEADIgEgDIAEACIAAABIgcA9QgSAsgcAKQgGACgIAAIgLgBg");
	this.shape_3.setTransform(12.0216,13.6771);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm12, new cjs.Rectangle(-1,-1,26,29), null);


(lib.arm11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAfgCQABABAAADQgCAKgJAIQgJAJgNABQgKAAgKgKQgJgJAAgLQAAgEgBgFQABgBAAAAQACgBACAAQAKgJAQgCQAMgBANANQACADADAFIABAAAgegKQABAAABgBQACgHAFgDQAKgIALAAQANACAIAHQAEAFACAEQACADABAG");
	this.shape.setTransform(7.175,3.0747);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgRASgBQATABAXATQADAFAGAEQAAABACADQALAKAHALQAJAQABAUQAFAhgPAIQgQAEgdgRQgBgBAAAAQgDAAAAABIAAAAIgBAAIgBgBIgBABIgBAAQgEgBgEAAQgFABgEAAQAXgaABAZIAAABQAAAAABAAQBDgEgTgJQgXgLgrgKQgqgKAAgDQAAgKACgGQAEgIAFgIgAgFhvIAAAAQAFAEADAHAAwgVQAAgBADABQACAHANA5QANAtgRAbQgGAJgMAGQgnAWgjgaQgIgHgFgFQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIQABgFADgGQAJgOALgJ");
	this.shape_1.setTransform(10.836,13.9969);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgVARQgJgKAAgLIgBgJIABAAIAEgCQAKgIAQgCQAMgBANAMIAFAIIABABIAAAAIABAEQgCAKgJAHQgJAJgNABIgBAAQgKAAgJgJg");
	this.shape_2.setTransform(7.175,3.4225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIIAEgLQAJgOALgJIAAAJQAAAMAKAJQAJAKAKAAQAOgBAKgJQAIgIACgKIgBgFQAFAEADAHQABAAABgVQADgRASgBQATABAXATQADAFAGAEIACAEQALAKAHALQAJAQABAUQAFAhgPAIQgQAEgdgRQA0gEAAgGQAAgBgEgCQgXgLgrgKQgqgKAAgDIAAAAQAAgKACgGQAEgIAFgIQgFAIgEAIQgCAGAAAKIAAAAQAAADAqAKQArAKAXALQAEACAAABQAAAGg0AEIgBgBQgBgMgFAAIgBAAIgBAAQgFABgHAIIgCACIgBABIAAAAIgBABIAJgBIAIABIABAAIABgBIABABIABAAIAAAAIAAAAIABgBIABAAIABABIAPBAQANAtgRAbQgGAJgMAGQgSAKgSAAQgTAAgTgOgAAvgVIgBgBIgBABIgBAAIgIgBIgJABIABgBIAAAAIABgBIACgCQAHgIAFgBIABAAIABAAQAFAAABAMIgDABIAAAAgAAzgWIAAABIgBgBIgBAAIgBABIAAAAIADgBgAAzgWIAAAAg");
	this.shape_3.setTransform(10.836,13.9969);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm11, new cjs.Rectangle(-1,-1,23.7,30), null);


(lib.arm10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AAVj2QAKgBAFAMQAFAMABAOIglGmQgBAKgEALQgBABgCAEQgIAIgJAAQgMgDgEgKQgFgGABgIQgBgGAAgHIAkmlQACgPAGgKQAGgKAMADg");
	this.shape.setTransform(4.15,24.7154);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm10, new cjs.Rectangle(-6,-6,20.3,61.5), null);


(lib.arm9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgfgFQAAgBACgCQABgGAEgEQAKgJALgBQANgBAIAGQAFAEADAEQACACACAHQABABABADQgBAKgHAIQgIALgNACQgKACgMgIQgKgIgBgNQAAgDgBgEQACgCACgBQAKgKAPgEQAMgDAOALQACAEAEAE");
	this.shape.setTransform(6,3.9349);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgFhhQABgBgCgUQAAgTASgCQASgBAZAPQAFAFAFADQACABABADQANAJAJAKQALAPADATQAIAhgOAIQgPAHgegNQgBgBgBAAQgDABAAABQAAgBADgBQABABABAAQBBgNgUgGQgXgIgtgFQgrgEAAgEQgBgJABgHQACgIAGgIgAAwgYIgBAAIgBgBIAAABIgCAAQgDAAgEAAQgGABgDABQATgcAEAYIAAAAQADAHAUA3QATAtgNAbQgGALgLAHQgkAaglgVQgJgFgGgGQgegTgSgWQgYgggHguQgDgaACgXQADgMAEgKQABgFADgFQAHgQAJgKAgQhrQAGADAFAH");
	this.shape_1.setTransform(10.6787,14.0411);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgTAUQgKgIgBgMQAAgEgBgEIAEgDQAKgKAPgEQAMgDAPALQABAEAEAEIACAEQgBAKgHAIQgIALgOACIgCABQgIAAgLgHg");
	this.shape_2.setTransform(6,4.2196);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgKCDIgPgLQgegTgSgWQgYgggHguQgDgaACgXQADgMAEgKIAEgKQAHgQAJgKQACAEgBAEQACANAKAIQAMAIAKgCQANgCAIgLQAHgIABgLIgCgEQAGADAFAHIgBgVQAAgTASgCQASgBAZAPIAKAIQACABABADQANAJAJAKQALAPADATQAIAhgOAIQgPAHgegNQAxgKAAgGQAAgCgEgBQgXgIgtgFQgrgEAAgEIgBgJIABgHQACgIAGgIQgGAIgCAIIgBAHIABAJQAAAEArAEQAtAFAXAIQAEABAAACQAAAGgxAKIgCgBIgBgCQgBgJgFAAIAAAAIgBAAQgFABgHAJIgBABIgBABIAAAAIAAABIgBACIAJgCIAHAAIACAAIAAgBIABABIABAAIADgCIAXA+QATAtgNAbQgGALgLAHQgUAOgUAAQgRAAgQgJgAAcgWIABgCIAAgBIAAAAIABgBIABgBQAHgJAFgBIABAAIAAAAQAFAAABAJIABACIAAAAIgDACIADgCIgDACIgBAAIgBgBIAAABIgCAAIgHAAIgJACIAAAAgAAwgYIAAAAg");
	this.shape_3.setTransform(10.6787,14.0411);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm9, new cjs.Rectangle(-1,-1,23.4,30.1), null);


(lib.arm8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(2.6921,57.4301,0.9999,0.9999,-8.8301);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(14.7717,30.8075,0.9999,0.9999,-8.8301);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(2.6921,57.4301,0.9999,0.9999,-8.8301);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(14.7717,30.8075,0.9999,0.9999,-8.8301);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm8, new cjs.Rectangle(-6,-6,41.6,73.6), null);


(lib.arm7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ABHjrQALAAACANQACANgCAPIh5GUQgCAKgHAJQgCABgCAEQgLAGgIgCQgLgFgCgKQgEgHADgIQABgGABgHIB4mVQAFgOAJgIQAIgJAKAGg");
	this.shape.setTransform(8.5104,23.8785);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm7, new cjs.Rectangle(-6,-6,29,59.8), null);


(lib.arm6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(1,1,1).p("AAfA0QgHAEgzAbQgpAZgegKQgKgDgJgKQgfggAPgqQAFgJADgFQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEQAGAAAGABQAQAFAMAIAAfA1QAVBAAEgVQAEgZgBgsQgCgrADgBQALgCAFAAQAJACAJAEABngYQgCAGgHAFQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGQgBABgDACQgHAOgJAKQgNANgSAFQgfAOgMgNQgIgOAJghAAeAyIAAAAIAAgCIAAAAIgBgBIAAgCQAAgEgBgEQgCgEgCgDQAgAOgZAIQAAgCgBAAQABAAAAACAAfA0IAAAAQAAABAAAAQABgBgBAAg");
	this.shape.setTransform(13.879,10.6189);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#996600").ss(1,1,1).p("AAMAeIgBAAIAAABQAAAAgEABQgJABgKgGQgLgHgFgNQgDgJAHgLQAHgMAMgDQADgBAEgCQABAAAAABIAAAAQABAAABABQAGAAAFAEQALAIACALQACANgFAJQgDAFgEADQgCADgFADgAADgeQABABABACQALAIAGAOQAEALgIARQgDACgDAF");
	this.shape_1.setTransform(23.0238,5.0321);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC99").s().p("AAeBkQgIgOAJghIABADIABADIABADIABACIAAAAIAAABIAAABIABACIACAFIAAABIABABIABADIACAEIAAABIABABIAAAAIABAFIADAFIAAAAIACAEIAAAAIABABIAAAAIABABIAAAAIABABIAAAAIAAAAIAAAAIABAAIAAAAIAAAAQACAAABgFQADgSAAgcIAAgXIgBgZQAAgSACgBQALgCAFAAQAJACAJAEQgJgEgJgCQgFAAgLACQgCABAAASIABAZIAAAXQAAAcgDASQgBAFgCAAIAAAAIAAAAIgBAAIAAAAIAAAAIAAAAIgBgBIAAAAIgBgBIAAAAIgBgBIAAAAIgCgEIAAAAIgDgFIgBgFIAAAAIgBgBIAAgBIgCgEIgBgDIgBgBIAAgBIgCgFIgBgCIAAgBIAAgBIAAAAIgBgCIgBgDIgBgDIgBgDQAAAAABAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQALgDAAgFQAAgGgSgIIAEAHIABAIIAAACIABABIAAAAIAAACIAAAAIAAAAIAAgCIAAAAIgBgBIAAgCIgBgIIgEgHQASAIAAAGQAAAFgLADIgBgCIABACIg6AfQgpAZgegKQgKgDgJgKQgfggAPgqIAIgOQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEIAMABQAQAFAMAIIgJADQgMADgGAMQgHALADAKQAEANALAHQAKAGALgBIAEgBQgCAGgHAFQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGIgEADQgHAOgJAKQgNANgSAFQgQAHgLAAQgKAAgGgGgAAfA0IgBgCIABACg");
	this.shape_2.setTransform(13.879,10.6189);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#996600").s().p("AgJAbQgLgHgFgNQgDgJAHgLQAHgMAMgDIAHgDIABABIAAAAIACADQALAIAGAOQAEALgIARQgDACgDAFIgBAAIAAABIgEABIgDAAQgIAAgIgFg");
	this.shape_3.setTransform(22.719,5.0321);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm6, new cjs.Rectangle(-1,-1,29.8,23.3), null);


(lib.arm5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgfgBQAAgBACgCQAAgGAEgFQAHgKAMgDQAMgCAKAFQAFADADAEQACABADAHAgfgBQACgCACgCQAIgLAOgFQALgFARAJQACADAEAEQACABABADQAAAKgFAJQgHALgNAFQgJADgMgHQgLgGgEgMQAAgFgCgDg");
	this.shape.setTransform(5.0521,4.7414);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgNhdQABgBgFgUQgCgSASgFQARgEAbAMQAFAEAGACQABABACADQAOAHAKAJQANANAFATQANAfgMALQgOAIgggJQgBgBgBABQgCAAgBACIAAAAIgBAAIgBABIgCAAQgDAAgEAAQgFACgDACQAOgfAIAYIAAAAQABAAABAAQA/gVgVgEQgZgEgsACQgrABgBgEQgCgJAAgHQABgIAFgJgAAxgcQABgBACgBQAEAGAbA0QAZApgKAeQgDALgKAJQggAfgpgQQgKgEgFgFQgggPgVgTQgdgdgNgsQgHgZAAgYQAAgMADgLQABgFACgFQAEgRAIgMAgZhmQAGACAGAH");
	this.shape_1.setTransform(10.6064,13.8973);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgOAWQgLgGgEgMQAAgEgCgEIAEgEQAIgLAOgFQALgFARAJQACADAEAEIADAEQAAAKgFAJQgHALgNAFIgGABQgGAAgJgFg");
	this.shape_2.setTransform(5.0521,5.0274);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AAMCGQgKgEgFgFQgggPgVgTQgdgdgNgsQgHgZAAgYQAAgMADgLIADgKQAEgRAIgMQADAFAAAEQADAMALAGQANAHAJgDQAOgEAGgMQAGgJgBgLIgCgEQAGACAGAHQgFAJgBAIQAAAHACAJQABADAWAAIAAAAIAAAAIASAAIADAAIABgBIAJAAIAGAAIAJAAIAAAAIABAAQAaAAAQADIABAAQAFABAAACQAAAGgvAQQAvgQAAgGQAAgCgFgBIgBAAQgQgDgaAAIgBAAIAAAAIgJAAIgGAAIgJAAIgBABIgDAAIgSAAIAAAAIAAAAQgWAAgBgDQgCgJAAgHQABgIAFgJIgEgVQgCgSASgFQARgEAbAMQAFAEAGACIADAEQAOAHAKAJQANANAFATQANAfgMALQgOAIgggJIgCAAIAAgBIAAAAIgBgBIAAgBQgDgIgEAAIAAAAIAAAAQgGABgHAOIAAABIgBABIAAABIAIgEIAHAAIACAAIABgBIABAAIAAAAQAAgBABAAQAAAAAAAAQABgBAAAAQABAAAAAAIAfA6QAZApgKAeQgDALgKAJQgVAUgZAAQgNAAgOgFgAAegXIAAgBIABgBIAAgBQAHgOAGgBIAAAAIAAAAQAEAAADAIIAAABIABABIAAAAIAAABIAAAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBAAAAABQAAgBABAAQAAAAAAAAQAAgBABAAQAAAAABAAQgBAAAAAAQgBAAAAABQAAAAAAAAQgBAAAAABIAAAAIgBAAIgBABIgCAAIgHAAIgIAEIAAAAgAAxgcIAAAAgAAxgcIAAAAg");
	this.shape_3.setTransform(10.6064,13.8973);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm5, new cjs.Rectangle(-1,-1,23.2,29.8), null);


(lib.arm4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAegCIABAAIAAAAQABABAAADQgCAKgIAIQgKAJgNABQgKAAgJgKQgKgJAAgLQAAgEgBgFQABgBAAAAIABAAQAAAAABgBQACgGAFgEQAKgIALAAQANACAIAHQAEAFACAEQACADABAGgAgdgKQABgBACAAQALgIAPgDQAMAAAOAMQABADADAF");
	this.shape.setTransform(7.175,3.0747);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgSARAAQAUABAXATQADAFAGADQAAABABADQAMALAHALQAJAQABATQAFAigQAIQgQAEgcgSQBCgEgSgJQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIgAgFhvQAFADADAIAAwgWIAAABIgCgBIAAAAIgBABIgCgBQgDgBgEAAQgGABgDABQAWgbABAaQgBAAgBAAQABAAABAAQADAIAMA5QANAtgQAaQgHAJgLAHQgnAWgjgaQgIgHgFgFQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIQACgGADgGQAJgOAKgJAA0gWQgBgBgBABIAAAAQABABABgBg");
	this.shape_1.setTransform(10.8595,14.0042);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgUARQgKgJAAgMIgBgJIABAAIABAAIADgCQALgIAPgCQAMgBAOAMQABAEADAEIABABIAAAAIABAEQgCAKgIAIQgKAIgNABIgBAAQgKAAgIgJg");
	this.shape_2.setTransform(7.175,3.4252);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIIAFgMQAJgOAKgJIABAJQAAANAKAJQAJAKAKgBQAOgBAKgIQAIgIACgLIgBgEQAFADADAIQgFAIgEAIQgCAFAAALQAAADApAKQArAKAYAKQAEACAAACQAAAGg0ADQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAQAAgMgFAAIgBAAIAAAAQgFAAgIAJIAAAAIgBABIgBACIAAAAIgBABIgBAAIAJgCIAHABIACABIABgBIAAAAIACABIAAgBIAAABIgCgBIAAAAIgBABIgCgBIgHgBIgJACIABAAIABgBIAAAAIABgCIABgBIAAAAQAIgJAFAAIAAAAIABAAQAFAAAAAMIgCAAIACAAIgCAAIACAAIAAAAQADAIAMA5QANAtgQAaQgHAJgLAHQgSAKgRAAQgUAAgTgOgAA0gWQA0gDAAgGQAAgCgEgCQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIQABAAABgVQADgSARAAQAUABAXATQADAFAGADIABAEQAMALAHALQAJAQABATQAFAigQAIIgGABQgPAAgXgPgAAygWgAAygWIAAAAgAADhkIAAAAg");
	this.shape_3.setTransform(10.8595,14.0042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm4, new cjs.Rectangle(-1,-1,23.7,30), null);


(lib.arm3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAfACQAAgBAAgCQgBgFgBgFQgIgLgLgFQgLgEgLAFQgGACgEAEQgDADgCAEAAfACQgBgCgCgCQgGgNgPgGQgLgFgOAHQgFACgEAEQgBACAAABQgEAKAGAMQAFALAMAFQALAEAMgFQAMgFADgLQADgFgBgEg");
	this.shape.setTransform(17.0462,5.2697);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgwgiQgCADglA2QgaApAIAcQACALAIAJQAcAiAsgMQAJgDAJgDQAfgLAXgTQAegZARgsQAKgZABgWQABgNgBgMQgBgFAAgEQgEgSgJgLAAWhZQAAgCAEgSQAFgSgTgHQgOgFgcAKQgFACgHADQgCABgCAAQgOAHgLAJQgNANgJARQgPAeANALQANALAigJAAihhQgFADgHAFAgagZQAOACAMgGQAOgHAGgOQACgCACgDQADgJgBgIQAAgIgEgJAgagZQgMgegKAVQAFAEAIADQAEABAFABg");
	this.shape_1.setTransform(10.7703,13.6954);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgJAZQgMgFgFgLQgGgLAEgLIABgDIAJgGQAOgHALAFQAPAGAGANIADAFQABADgDAFQgDALgMAFQgHADgGAAQgFAAgFgCg");
	this.shape_2.setTransform(17.0462,5.5599);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AhfBwQgIgJgCgLQgIgcAagpIAng5QgiAJgNgLQgNgLAPgeQAJgRANgNQALgJAOgHIAEgBIAMgFQAcgKAOAFQATAHgFASIgEAUIAMgIIgBADQgDALAFAMQAGALAMAFQALAEANgFQALgFAEgLQACgFgBgEQAJALAEASIABAJQABAMgBANQgBAWgKAZQgRAsgeAZQgXATgfALIgSAGQgMADgKAAQgdAAgVgZgAgagZQAOACAMgGQAOgHAGgOIAEgFQACgIAAgHIAAgCQAAgIgEgJQAEAJAAAIIAAACQAAAHgCAIIgEAFQgGAOgOAHQgMAGgOgCIgBgBIAAgBIAAAAQgGgQgGAAIgBAAIAAAAQgEABgDAGIgBAAIAAACQAFAEAIADIAJACIAAAAgAgjgbQgIgDgFgEIAAgCIABAAQADgGAEgBIAAAAIABAAQAGAAAGAQIAAAAIAAABIABABIgJgCg");
	this.shape_3.setTransform(10.7703,13.6954);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm3, new cjs.Rectangle(-1,-1,23.6,29.4), null);


(lib.arm = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.7,1,1).p("AAYAAQAAAJgIAHQgGAHgKAAQgJAAgGgHQgIgHAAgJQAAgJAIgHQAGgHAJAAQAKAAAGAHQAIAHAAAJg");
	this.shape.setTransform(32.9411,4.582,0.9999,0.9999,0,33.1134,-146.8866);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfkGIAAAUIAAH7QAAATgJANQgIAMgMABQgBAAAAAAIgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAHgMAMgBIACAAQAAAAABAAQABAAAAAAQALABAIALIAAABQAHAKACAN");
	this.shape_1.setTransform(18.6999,26.5999,0.9999,0.9999,0,33.1134,-146.8866);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgUAcQgKgIgDgLQgEgQALgNQAHgJAMgDQALgDALAFIABAAIAAABQAHAKACANQgCgNgHgKIAAgBQAKAFAFALIADAIQABAGgBAEIAAABIAAACQgCAJgHAIIgDADQgKAIgMAAIAAAAQgLAAgJgHgAgbAFQAAAJAHAHQAHAHAJAAQAJAAAHgHQAHgHAAgJIAAAAQAAgJgHgHQgHgHgJAAQgJAAgHAHQgHAHAAAJIAAAAgAAZAYIAAgUgAgUAVQgHgHAAgJQAAgJAHgHQAHgHAJAAQAJAAAHAHQAHAHAAAJIAAAAQAAAJgHAHQgHAHgJAAQgJAAgHgHgAATAFIAAAAgAAQgeIAAAAg");
	this.shape_2.setTransform(32.81,3.9537,0.9999,0.9999,0,33.1134,-146.8866);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AABE2IgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAIgMALgBIACAAIABAAIABAAQALABAIALQgIgLgLgBQAPABALAMQAJAKACANIgDgIQgFgLgKgFIgBAAQgLgFgLADQgMADgHAJQgLANAEARQADALAKAIQAKAHAKAAQAMAAAKgIIADgDIAAH7QAAATgJANQgIAMgMABQAMgBAIgMQAJgNAAgTIAAn7QAHgIACgJIAAgCIABIOQAAATgMANQgLAMgQABIgBAAgAgcEpQgMgNAAgTIABoRQAAgTALgNQALgNAQAAQgLABgIAMQgJANAAATIgBIRQAAATAKANQAJANALAAQgPAAgNgNgAAfjygAgBk1IAAAAg");
	this.shape_3.setTransform(18.7208,26.6136,0.9999,0.9999,0,33.1134,-146.8866);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.arm, new cjs.Rectangle(-5.4,-5.8,48.199999999999996,64.7), null);


(lib._2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AgeAGQABgCACgCQAFgMAMgJQAKgHASADQADADAFACAgeAGQAAgBABgCQgBgFACgFQAFgNAKgFQANgFAJACQAGACAEACQACABAFAFQABABACADQAEAKgDAJQgEANgMAIQgIAGgNgEQgMgDgHgLQgBgEgDgEg");
	this.shape.setTransform(3.6192,6.4075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAngkQAFAFApArQAiAhgCAfQAAAMgHAKQgYAngrgFQgLgBgHgDQghgGgagOQgjgUgZgnQgNgXgGgXQgDgMABgKQgBgFAAgGQAAgRAFgOAgohQQABgBgKgTQgHgQAQgJQARgJAcAEQAFADAHABQABAAADACQAPAEAMAGQAQAJAKAQQAVAbgKAOQgLAMghgBQA3glgVACQgZADgqANQgpAMgCgDQgEgJgCgGQgBgJACgJgAAlgiIgBAAIgBAAIAAABIgCABQgDABgEABQgEAEgDACQAGgiAOAWQgDABABABQgBgBADgBQABAAABgBQgBAAgBABIAAAAAg2hWQAHABAHAF");
	this.shape_1.setTransform(11.7282,13.2287);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgHAZQgMgDgHgKQgBgEgDgEIADgEQAFgMAMgJQAKgIASAEQADADAFACIADADQAEALgDAJQgEANgMAIQgEADgHAAIgKgCg");
	this.shape_2.setTransform(3.6192,6.6535);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AArCEQgLgBgHgDQghgGgagOQgjgUgZgnQgNgXgGgXQgDgMABgKIgBgLQAAgRAFgOQADAEABAEQAHALAMADQAOAEAIgGQAMgIAEgNQADgKgEgKIgDgEQAHABAHAFQABgBgKgTQgHgQAQgJQARgJAcAEQAFADAHABIAEACQAPAEAMAGQAQAJAKAQQAVAbgKAOQgLAMghgBIACgBIABgBIAEgCIAAgBQAsgegPAAIgCAAQgZADgqANIgBAAIgBAAIgBABIgCAAQgZAIgJABIgBAAIgBAAIAAAAIgCgBIgGgPIgBgFQAAgGACgHQgCAHAAAGIABAFIAGAPIACABIAAAAIABAAIABAAQAJgBAZgIIACAAIABgBIABAAIABAAQAqgNAZgDIACAAQAPAAgsAeIAAABIgEACIgBABIgCABQAAAAgBAAQAAAAAAAAQAAAAgBAAQAAAAAAABQgFgIgEgBIgBAAIAAAAQgGAAgEAVIAHgGIAHgCIACgBIAAgBIABAAIABAAIAAAAIACgCIgCACIAAAAIAAAAIACgCIAAAAIAuAwQAiAhgCAfQAAAMgHAKQgVAiglAAIgJAAgAAdgtIAAAAIABAAQAEABAFAIIgCACIAAAAIgBAAIgBAAIAAABIgCABIgHACIgHAGQAEgVAGAAgAAlgiIAAAAgAAlgiIAAAAg");
	this.shape_3.setTransform(11.7282,13.2287);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._2, new cjs.Rectangle(-1,-1,25.5,28.5), null);


(lib._1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.7,1,1).p("AAYAAQAAAJgIAHQgGAHgKAAQgJAAgGgHQgIgHAAgJQAAgJAIgHQAGgHAJAAQAKAAAGAHQAIAHAAAJg");
	this.shape.setTransform(4.2,4.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfkGIAAAUIAAH7QAAATgJANQgIAMgMABQgBAAAAAAIgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAHgMAMgBIACAAQAAAAABAAQABAAAAAAQALABAIALIAAABQAHAKACAN");
	this.shape_1.setTransform(4.1,31.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgUAcQgKgIgDgLQgEgQALgNQAHgJAMgDQALgDALAFIABAAIAAABQAHAKACANQgCgNgHgKIAAgBQAKAFAFALIADAIQABAGgBAEIAAABIAAACQgCAJgHAIIgDADQgKAIgMAAIAAAAQgLAAgJgHgAgbAFQAAAJAHAHQAHAHAJAAQAJAAAHgHQAHgHAAgJIAAAAQAAgJgHgHQgHgHgJAAQgJAAgHAHQgHAHAAAJIAAAAgAAZAYIAAgUgAgUAVQgHgHAAgJQAAgJAHgHQAHgHAJAAQAJAAAHAHQAHAHAAAJIAAAAQAAAJgHAHQgHAHgJAAQgJAAgHgHgAATAFIAAAAgAAQgeIAAAAg");
	this.shape_2.setTransform(4.6532,4.3453);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AABE2IgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAIgMALgBIACAAIABAAIABAAQALABAIALQgIgLgLgBQAPABALAMQAJAKACANIgDgIQgFgLgKgFIgBAAQgLgFgLADQgMADgHAJQgLANAEARQADALAKAIQAKAHAKAAQAMAAAKgIIADgDIAAH7QAAATgJANQgIAMgMABQAMgBAIgMQAJgNAAgTIAAn7QAHgIACgJIAAgCIABIOQAAATgMANQgLAMgQABIgBAAgAgcEpQgMgNAAgTIABoRQAAgTALgNQALgNAQAAQgLABgIAMQgJANAAATIgBIRQAAATAKANQAJANALAAQgPAAgNgNgAAfjygAgBk1IAAAAg");
	this.shape_3.setTransform(4.075,31.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._1, new cjs.Rectangle(-5,-6,18.2,74.1), null);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Scene_1_wire9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire9
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgD4AxzUAIngxAgA7gyl");
	this.shape.setTransform(905.6869,282.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EgIAA2GUAQ5g5lgA7gym");
	this.shape_1.setTransform(879.0788,309.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EgIlA2ZUASDg6LgA7gym");
	this.shape_2.setTransform(875.3443,311.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EgJdA3jUAT0g8ggA8gyl");
	this.shape_3.setTransform(869.7071,318.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EgLbA4OUAXwg91gA7gym");
	this.shape_4.setTransform(857.061,323.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EgNxA4/UAeOg+tgC8gzQ");
	this.shape_5.setTransform(843.5619,328);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EgNtA4qUAeGg+DgC8gzQ");
	this.shape_6.setTransform(843.9651,325.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EgNoA48UAd8g+ogC8gzP");
	this.shape_7.setTransform(844.4691,327.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EgNoA5OUAd9g/LgC9gzQ");
	this.shape_8.setTransform(844.4439,329.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EgNFA43UAd9g99gEUgzw");
	this.shape_9.setTransform(849.6922,327.225);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EgMVA4iUAdMg9BgFXg0C");
	this.shape_10.setTransform(856.4057,325.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EgLnA4QUAbug8dgFXg0C");
	this.shape_11.setTransform(861.2236,323.325);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(1,1,1).p("EgKlA3+UAZmg75gFXg0C");
	this.shape_12.setTransform(868.214,321.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EgKOA3rUAY3g7TgFXg0C");
	this.shape_13.setTransform(870.636,319.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#452300").ss(1,1,1).p("EgJoA3jUAXog7DgFWg0C");
	this.shape_14.setTransform(874.6894,318.875);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#452300").ss(1,1,1).p("EgJYA3FUAXHg6HgFXg0C");
	this.shape_15.setTransform(876.4226,315.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#452300").ss(1,1,1).p("EgJPA2yUAW0g5hgFWg0C");
	this.shape_16.setTransform(877.3806,313.9);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#452300").ss(1,1,1).p("EgJNA2yUAWwg5hgFXg0C");
	this.shape_17.setTransform(877.6138,313.9);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#452300").ss(1,1,1).p("EgI4A2wUAWFg5dgFXg0C");
	this.shape_18.setTransform(879.8437,313.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#452300").ss(1,1,1).p("EgI7A2oUAWLg5NgFXg0C");
	this.shape_19.setTransform(879.5064,312.975);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#452300").ss(1,1,1).p("EgIrA2fUAVqg47gFXg0C");
	this.shape_20.setTransform(881.2459,312.075);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#452300").ss(1,1,1).p("EgImA2aUAVgg4xgFXg0C");
	this.shape_21.setTransform(881.7656,311.525);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#452300").ss(1,1,1).p("EgIbA2RUAVJg4fgFXg0C");
	this.shape_22.setTransform(882.9619,310.675);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#452300").ss(1,1,1).p("EgISA2BUAU1g3/gFWg0C");
	this.shape_23.setTransform(883.9772,309.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#452300").ss(1,1,1).p("EgIRA1/UAUzg37gFWg0C");
	this.shape_24.setTransform(884.0814,308.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#452300").ss(1,1,1).p("EgH1A1qUAT5g3RgFXg0C");
	this.shape_25.setTransform(887.1072,306.75);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#452300").ss(1,1,1).p("EgHvA1fUATtg27gFXg0C");
	this.shape_26.setTransform(887.7605,305.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#452300").ss(1,1,1).p("EgHrA1QUATkg2dgFWg0C");
	this.shape_27.setTransform(888.1788,304.125);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#452300").ss(1,1,1).p("EgHoA1HUATeg2LgFXg0C");
	this.shape_28.setTransform(888.5188,303.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#452300").ss(1,1,1).p("EgHnA1IUATbg2NgFWg0C");
	this.shape_29.setTransform(888.6758,303.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#452300").ss(1,1,1).p("EgHMA0qUASjg1RgFXg0C");
	this.shape_30.setTransform(891.6112,300.375);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#452300").ss(1,1,1).p("EgHIA0rUASag1TgFXg0C");
	this.shape_31.setTransform(892.1101,300.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#452300").ss(1,1,1).p("EgHJA03UASdg1rgFXg0C");
	this.shape_32.setTransform(891.9525,301.675);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#452300").ss(1,1,1).p("EgHGA04UASWg1tgFXg0C");
	this.shape_33.setTransform(892.3203,301.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#452300").ss(1,1,1).p("EgHKA1BUASfg1/gFXg0C");
	this.shape_34.setTransform(891.8212,302.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#452300").ss(1,1,1).p("EgHQA1EUASrg2FgFWg0C");
	this.shape_35.setTransform(891.1913,302.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#452300").ss(1,1,1).p("EgHUA1DUAS0g2DgFXg0C");
	this.shape_36.setTransform(890.7191,302.85);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#452300").ss(1,1,1).p("EgHFA1JUASVg2PgFXg0C");
	this.shape_37.setTransform(892.3466,303.45);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#452300").ss(1,1,1).p("EgGYAz5UAQ1gzwgFXg0B");
	this.shape_38.setTransform(897.4346,295.475);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#452300").ss(1,1,1).p("EgHDAz7UAUUgxbgI9g2a");
	this.shape_39.setTransform(902.405,295.7);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#452300").ss(1,1,1).p("EgHLA01UAUXgzOgIgg2b");
	this.shape_40.setTransform(900.0683,301.425);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#452300").ss(1,1,1).p("EgHoA19UAVXg1fgIhg2a");
	this.shape_41.setTransform(896.6541,308.7);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#452300").ss(1,1,1).p("EgIlA2yUAYSg2igKDg3B");
	this.shape_42.setTransform(893.8215,313.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#452300").ss(1,1,1).p("EgJ8A2+UAcEg17gLig4A");
	this.shape_43.setTransform(887.8832,315.175);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#452300").ss(1,1,1).p("EgKnA3wUAdig3egLig4B");
	this.shape_44.setTransform(882.7987,320.125);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#452300").ss(1,1,1).p("EgLrA3/UAgzg3RgNQg4s");
	this.shape_45.setTransform(879.6392,321.7);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#452300").ss(1,1,1).p("EgMwA4EUAj8g3AgOrg5H");
	this.shape_46.setTransform(875.5806,322.175);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#452300").ss(1,1,1).p("EgNWA4bUAk2g3zgOAg5C");
	this.shape_47.setTransform(869.2642,324.4);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#452300").ss(1,1,1).p("EgOTA4cUAndg3lgO8g5S");
	this.shape_48.setTransform(864.634,324.55);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#452300").ss(1,1,1).p("EgOuA36UAoWg2igO7g5R");
	this.shape_49.setTransform(861.546,321.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#452300").ss(1,1,1).p("EgPBA39UAo/g2ngO8g5S");
	this.shape_50.setTransform(859.4019,321.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#452300").ss(1,1,1).p("EgPdA3/UAqeg15gP2g6E");
	this.shape_51.setTransform(858.5648,321.7);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#452300").ss(1,1,1).p("EgPzA3tUArNg1UgP2g6F");
	this.shape_52.setTransform(856.0437,319.825);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#452300").ss(1,1,1).p("EgQIA3jUAr6g1AgP2g6F");
	this.shape_53.setTransform(853.6337,318.8);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#452300").ss(1,1,1).p("EgSNA2uUAyogwhgTvg86");
	this.shape_54.setTransform(848.8482,313.55);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#452300").ss(1,1,1).p("EgSUA21UAy3gwvgTug86");
	this.shape_55.setTransform(847.9855,314.225);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#452300").ss(1,1,1).p("EgSbA29UAzXgwngUMg9S");
	this.shape_56.setTransform(848.4414,315);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#452300").ss(1,1,1).p("EgScA3bUAzugxGgUyg9v");
	this.shape_57.setTransform(850.0215,318);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#452300").ss(1,1,1).p("EgSYA38UAzlgyIgUxg9v");
	this.shape_58.setTransform(850.4814,321.375);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#452300").ss(1,1,1).p("EgSSA4NUAzYgyqgUxg9v");
	this.shape_59.setTransform(851.1851,323.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#452300").ss(1,1,1).p("EgSAA4vUAywgzugUyg9v");
	this.shape_60.setTransform(853.4065,326.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#452300").ss(1,1,1).p("EgSKA4mUAzGgzcgUxg9v");
	this.shape_61.setTransform(852.1871,325.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#452300").ss(1,1,1).p("EgR4A4+UAygg0MgUyg9v");
	this.shape_62.setTransform(854.2471,327.975);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#452300").ss(1,1,1).p("EgR0A5CUAyWg0UgUyg9v");
	this.shape_63.setTransform(854.8168,328.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#452300").ss(1,1,1).p("EgRzA5PUAyVg0ugUyg9v");
	this.shape_64.setTransform(854.8439,329.65);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#452300").ss(0.1,1,1).p("EgR1A5YUAyYg1AgUxg9v");
	this.shape_65.setTransform(854.6811,330.525);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#452300").ss(0.1,1,1).p("EgQrA49UAv2g0KgUxg9v");
	this.shape_66.setTransform(863.4968,327.875);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#452300").ss(1,1,1).p("EgQ6A4zUAwzgzUgVlg+R");
	this.shape_67.setTransform(864.0436,326.875);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#452300").ss(1,1,1).p("EgRCA5IUAxEgz+gVlg+R");
	this.shape_68.setTransform(863.1414,328.95);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#452300").ss(1,1,1).p("EgREA5DUAxJgz0gVlg+R");
	this.shape_69.setTransform(862.8954,328.45);

	this.instance = new lib.wire1();
	this.instance.setTransform(862.9,328.45,1,1,0,0,0,109.3,365.1);
	this.instance._off = true;

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#452300").ss(1,1,1).p("EgRBA46UAxAgzsgVhg+H");
	this.shape_70.setTransform(860.6634,-377.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},131).to({state:[{t:this.shape_2}]},9).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},4).to({state:[{t:this.shape_5}]},9).to({state:[{t:this.shape_5}]},5).to({state:[{t:this.shape_6}]},9).to({state:[{t:this.shape_7}]},5).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},2).to({state:[{t:this.shape_54}]},2).to({state:[{t:this.shape_55}]},12).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},2).to({state:[{t:this.shape_63}]},4).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},2).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},2).to({state:[{t:this.shape_69}]},2).to({state:[{t:this.instance}]},118).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_70}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({x:864.75,y:279.45},0).wait(1).to({x:866.65,y:230.45},0).wait(1).to({x:868.5,y:181.45},0).wait(1).to({x:870.4,y:132.45},0).wait(1).to({x:872.25,y:83.45},0).wait(1).to({x:874.15,y:34.4},0).wait(1).to({x:876.5,y:23.65},0).wait(1).to({x:878.85,y:12.9},0).wait(1).to({x:881.2,y:2.15},0).wait(1).to({x:883.6,y:-8.65},0).wait(1).to({x:885.95,y:-19.4},0).wait(1).to({x:888.3,y:-30.15},0).wait(1).to({x:890.65,y:-40.9},0).wait(1).to({x:893.05,y:-51.7},0).wait(1).to({x:895.4,y:-62.45},0).wait(1).to({x:897.75,y:-73.2},0).wait(1).to({x:900.1,y:-83.95},0).wait(1).to({x:902.5,y:-94.75},0).wait(1).to({x:904.85,y:-105.5},0).wait(1).to({x:907.2,y:-116.25},0).wait(1).to({x:909.55,y:-127},0).wait(1).to({x:911.95,y:-137.8},0).wait(1).to({x:914.9,y:-153.2},0).wait(1).to({x:917.85,y:-168.6},0).wait(1).to({x:920.85,y:-184},0).wait(1).to({x:923.8,y:-199.4},0).wait(1).to({x:926.75,y:-214.85},0).wait(1).to({x:929.75,y:-230.25},0).wait(1).to({x:932.7,y:-245.65},0).wait(1).to({x:935.65,y:-261.05},0).wait(1).to({x:938.65,y:-276.5},0).wait(4).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire8
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgGtA3AUAQMgzwgDVg6P");
	this.shape.setTransform(845.6422,233);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EgJSA4ZUAVeg2hgDVg6Q");
	this.shape_1.setTransform(828.3811,241.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EgIuA4VUAUUg2ZgDVg6Q");
	this.shape_2.setTransform(832.1765,241.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EgKOA5NUAXXg4JgDVg6Q");
	this.shape_3.setTransform(822.2298,247.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EgMlA5mUAf3g3BgIdg8K");
	this.shape_4.setTransform(815.799,249.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EgOIA5yUAjFg3YgIeg8L");
	this.shape_5.setTransform(805.1055,250.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EgN8A56UAisg3ogIdg8L");
	this.shape_6.setTransform(806.3771,251.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EgN9A53UAlNg1cgMWg+R");
	this.shape_7.setTransform(815.2963,251.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EgNJA6JUAi/g2YgLlg95");
	this.shape_8.setTransform(819.3013,253.05);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EgMzA55UAjCg0zgM6g++");
	this.shape_9.setTransform(825.3185,251.425);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EgMWA5pUAidg0CgNng/P");
	this.shape_10.setTransform(830.6181,249.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EgLwA5YUAhKgzhgNmg/O");
	this.shape_11.setTransform(835.0555,248.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(0.1,1,1).p("EgLKA5IUAf4gzAgNng/P");
	this.shape_12.setTransform(839.5391,246.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EgLJA45UAgQgyRgOYg/g");
	this.shape_13.setTransform(841.9884,245.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#452300").ss(1,1,1).p("EgKzA4qUAfFgyEgNng/P");
	this.shape_14.setTransform(842.3211,243.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#452300").ss(1,1,1).p("EgKqA4bUAexgxmgNmg/P");
	this.shape_15.setTransform(843.387,242.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#452300").ss(1,1,1).p("EgKZA4gUAeLgxwgNmg/P");
	this.shape_16.setTransform(845.4678,242.55);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#452300").ss(1,1,1).p("EgKUA4TUAeBgxWgNng/P");
	this.shape_17.setTransform(846.0437,241.25);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#452300").ss(1,1,1).p("EgKqA4GUAewgw8gNmg/P");
	this.shape_18.setTransform(843.4691,239.925);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#452300").ss(1,1,1).p("EgKoA4OUAesgxMgNng/P");
	this.shape_19.setTransform(843.7153,240.725);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#452300").ss(1,1,1).p("EgKXA3+UAeHgwsgNmg/P");
	this.shape_20.setTransform(845.6872,239.125);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#452300").ss(1,1,1).p("EgKQA4SUAd4gxVgNng/O");
	this.shape_21.setTransform(846.5375,241.175);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#452300").ss(1,1,1).p("EgKYA4iUAeJgx0gNng/P");
	this.shape_22.setTransform(845.6323,242.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#452300").ss(1,1,1).p("EgKxA4cUAgCgwIgPnhAv");
	this.shape_23.setTransform(848.8122,242.125);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#452300").ss(1,1,1).p("EgKzA4dUAgHgwKgPnhAv");
	this.shape_24.setTransform(848.5077,242.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#452300").ss(1,1,1).p("EgK2A4dUAgPgwKgPnhAv");
	this.shape_25.setTransform(848.0927,242.25);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#452300").ss(1,1,1).p("EgLLA4VUAhngvRgQ7hBY");
	this.shape_26.setTransform(849.7682,241.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#452300").ss(1,1,1).p("EgLRA4tUAh1gwBgQ8hBY");
	this.shape_27.setTransform(849.0178,243.85);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#452300").ss(1,1,1).p("EgLnA4wUAixgwBgRPhBe");
	this.shape_28.setTransform(847.1371,244.125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#452300").ss(1,1,1).p("EgL8A45UAjggwUgRPhBd");
	this.shape_29.setTransform(844.5605,245.05);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#452300").ss(1,1,1).p("EgMUA5FUAkWgwrgRPhBe");
	this.shape_30.setTransform(841.5493,246.225);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#452300").ss(1,1,1).p("EgMrA5LUAlIgw4gRPhBd");
	this.shape_31.setTransform(838.8222,246.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#452300").ss(1,1,1).p("EgNCA5QUAl7gxCgROhBd");
	this.shape_32.setTransform(835.9649,247.375);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#452300").ss(1,1,1).p("EgNVA5VUAmmgxMgRPhBd");
	this.shape_33.setTransform(833.6625,247.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#452300").ss(1,1,1).p("EgN2A5gUAnugxhgROhBe");
	this.shape_34.setTransform(829.6719,248.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#452300").ss(1,1,1).p("EgOMA5lUAoegxsgRPhBd");
	this.shape_35.setTransform(827.1098,249.45);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#452300").ss(1,1,1).p("EgOcA5qUApCgx1gRPhBe");
	this.shape_36.setTransform(825.1237,249.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#452300").ss(1,1,1).p("EgOuA5wUAppgyCgROhBd");
	this.shape_37.setTransform(822.9779,250.575);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#452300").ss(1,1,1).p("EgO0A5xUAp3gyEgRPhBd");
	this.shape_38.setTransform(822.2453,250.675);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#452300").ss(1,1,1).p("EgO/A5tUAqOgx8gROhBd");
	this.shape_39.setTransform(820.9711,250.275);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#452300").ss(1,1,1).p("EgPEA54UAqZgyRgRPhBe");
	this.shape_40.setTransform(820.4022,251.325);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#452300").ss(1,1,1).p("EgPEA51UAqZgyMgRPhBd");
	this.shape_41.setTransform(820.4022,251.075);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#452300").ss(1,1,1).p("EgPjA56UArdgyWgROhBd");
	this.shape_42.setTransform(816.6964,251.575);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#452300").ss(1,1,1).p("EgPnA51UAr9gxxgR5hB4");
	this.shape_43.setTransform(818.1371,251.05);

	this.instance = new lib.wire2();
	this.instance.setTransform(818.1,251.05,1,1,0,0,0,100,370.1);
	this.instance._off = true;

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#452300").ss(1,1,1).p("EgPlA5sUAr3gxpgR2hBu");
	this.shape_44.setTransform(816.0958,-426.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},131).to({state:[{t:this.shape_2}]},4).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_3}]},3).to({state:[{t:this.shape_4}]},5).to({state:[{t:this.shape_5}]},9).to({state:[{t:this.shape_5}]},5).to({state:[{t:this.shape_6}]},13).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},2).to({state:[{t:this.shape_16}]},2).to({state:[{t:this.shape_17}]},4).to({state:[{t:this.shape_18}]},18).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},2).to({state:[{t:this.shape_21}]},3).to({state:[{t:this.shape_22}]},5).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},2).to({state:[{t:this.shape_25}]},2).to({state:[{t:this.shape_26}]},3).to({state:[{t:this.shape_27}]},12).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},2).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},3).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},2).to({state:[{t:this.shape_43}]},2).to({state:[{t:this.instance}]},118).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_44}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({x:827,y:205.65},0).wait(1).to({x:835.9,y:160.2},0).wait(1).to({x:844.85,y:114.75},0).wait(1).to({x:853.75,y:69.35},0).wait(1).to({x:862.65,y:23.9},0).wait(1).to({x:871.6,y:-21.55},0).wait(1).to({x:869.55,y:-32.75},0).wait(1).to({x:867.5,y:-43.95},0).wait(1).to({x:865.45,y:-55.15},0).wait(1).to({x:863.4,y:-66.35},0).wait(1).to({x:861.35,y:-77.55},0).wait(1).to({x:859.3,y:-88.75},0).wait(1).to({x:857.25,y:-99.95},0).wait(1).to({x:855.25,y:-111.2},0).wait(1).to({x:853.2,y:-122.4},0).wait(1).to({x:851.15,y:-133.6},0).wait(1).to({x:849.1,y:-144.8},0).wait(1).to({x:847.05,y:-156},0).wait(1).to({x:845,y:-167.2},0).wait(1).to({x:842.95,y:-178.4},0).wait(1).to({x:840.9,y:-189.6},0).wait(1).to({x:838.9,y:-200.85},0).wait(1).to({y:-218.25},0).wait(1).to({y:-235.65},0).wait(1).to({y:-253.05},0).wait(1).to({y:-270.45},0).wait(1).to({y:-287.85},0).wait(1).to({y:-305.25},0).wait(1).to({y:-322.65},0).wait(1).to({y:-340.05},0).wait(1).to({y:-357.5},0).wait(1).to({y:-377.6},0).wait(1).to({y:-397.75},0).wait(1).to({y:-417.9},0).wait(1).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire7
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgEMAq8UALvgjIgErgyv");
	this.shape.setTransform(802.5297,246.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EgD/AqpUALTgijgErgyu");
	this.shape_1.setTransform(804.0461,244.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EgE1ArNUANHgjrgErgyu");
	this.shape_2.setTransform(797.8547,247.975);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EgGIAsLUAQmglGgF2gzP");
	this.shape_3.setTransform(791.3682,254.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EgF6AsBUAQHgkygF2gzP");
	this.shape_4.setTransform(793.0255,253.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EgGNAsVUARMgk8gGngzt");
	this.shape_5.setTransform(792.9134,255.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EgFMAs5UAO+gmFgGmgzs");
	this.shape_6.setTransform(800.5888,258.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EgFjAsKUAPxgkngGngzs");
	this.shape_7.setTransform(797.8631,254.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EgFLAsKUAO8gkngGmgzs");
	this.shape_8.setTransform(800.6709,254.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EgFpAsaUASTgkVgLWg0e");
	this.shape_9.setTransform(812.5054,255.625);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EgFEAsaUAPvgkUgIsg0f");
	this.shape_10.setTransform(808.2512,255.625);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EgFyAsOUARYgj8gIsg0f");
	this.shape_11.setTransform(802.3238,254.45);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(1,1,1).p("EgGRAshUASdgkigIsg0f");
	this.shape_12.setTransform(798.5341,256.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EgGcAsmUAS1gksgIsg0f");
	this.shape_13.setTransform(797.213,256.85);

	this.instance = new lib.wire3();
	this.instance.setTransform(797.15,256.85,1,1,0,0,0,41.2,285.4);
	this.instance._off = true;

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#452300").ss(1,1,1).p("EgGbAsgUASygkngIqg0Y");
	this.shape_14.setTransform(795.5724,-308.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},131).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_3}]},3).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},8).to({state:[{t:this.shape_5}]},5).to({state:[{t:this.shape_5}]},5).to({state:[{t:this.shape_6}]},23).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_8}]},3).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_10}]},51).to({state:[{t:this.shape_11}]},3).to({state:[{t:this.shape_12}]},2).to({state:[{t:this.shape_13}]},11).to({state:[{t:this.instance}]},120).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_14}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({regX:41.3,x:795.6,y:224.95},0).wait(1).to({x:793.95,y:193.05},0).wait(1).to({x:792.3,y:161.15},0).wait(1).to({x:790.65,y:129.25},0).wait(1).to({x:789,y:97.35},0).wait(1).to({x:787.4,y:65.45},0).wait(1).to({x:788.3,y:53},0).wait(1).to({x:789.25,y:40.5},0).wait(1).to({x:790.2,y:28},0).wait(1).to({x:791.15,y:15.5},0).wait(1).to({x:792.05,y:3},0).wait(1).to({x:793,y:-9.5},0).wait(1).to({x:793.95,y:-22},0).wait(1).to({x:794.9,y:-34.5},0).wait(1).to({x:795.8,y:-46.95},0).wait(1).to({x:796.75,y:-59.45},0).wait(1).to({x:797.7,y:-71.95},0).wait(1).to({x:798.65,y:-84.45},0).wait(1).to({x:799.55,y:-96.95},0).wait(1).to({x:800.5,y:-109.45},0).wait(1).to({x:801.45,y:-121.95},0).wait(1).to({x:802.4,y:-134.45},0).wait(1).to({x:804.7,y:-144.45},0).wait(1).to({x:807,y:-154.5},0).wait(1).to({x:809.35,y:-164.55},0).wait(1).to({x:811.65,y:-174.6},0).wait(1).to({x:814,y:-184.65},0).wait(1).to({x:816.3,y:-194.7},0).wait(1).to({x:818.65,y:-204.75},0).wait(1).to({x:820.95,y:-214.8},0).wait(1).to({x:823.3,y:-224.85},0).wait(1).to({y:-244.75},0).wait(1).to({y:-264.7},0).wait(1).to({y:-284.65},0).wait(1).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EAAnAzIUgCRgzCAB9gzN");
	this.shape.setTransform(562.9217,247.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EADOA1HUgKUg2GAGOg0H");
	this.shape_1.setTransform(570.5503,259.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EAD6A1eUgLlg0cAFmg2f");
	this.shape_2.setTransform(578.2551,262.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EAGtA2iUgTqgzVAJNg5u");
	this.shape_3.setTransform(588.9637,268.95);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EAIpA27UgZngyPAMYg7m");
	this.shape_4.setTransform(594.3059,271.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EAIXA3DUgY/gyfAMZg7m");
	this.shape_5.setTransform(592.0345,272.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EAHqA2+UgXagyUAMZg7n");
	this.shape_6.setTransform(586.4333,271.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EAHXA21UgWugyCAMZg7n");
	this.shape_7.setTransform(583.9367,270.85);
	this.shape_7._off = true;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EAHQA21UgWPgyBAL6g7o");
	this.shape_8.setTransform(584.6889,270.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EAGoA25UgU0gyKAL6g7n");
	this.shape_9.setTransform(579.5908,271.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EAF6A2xUgTIgx6AL5g7n");
	this.shape_10.setTransform(573.4383,270.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EAFSA2IUgRpgwnAL5g7o");
	this.shape_11.setTransform(567.9845,266.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(1,1,1).p("EAEmA2HUgQAgwmAL4g7n");
	this.shape_12.setTransform(561.8637,266.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EAEnA1oUgQCgvoAL5g7n");
	this.shape_13.setTransform(561.8933,263.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#452300").ss(1,1,1).p("EAEjA1jUgQbguxANRg8U");
	this.shape_14.setTransform(555.9608,262.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#452300").ss(1,1,1).p("EAEKA1EUgPcgtzANRg8U");
	this.shape_15.setTransform(552.1905,259.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#452300").ss(1,1,1).p("EAD1A0vUgOngtJANRg8U");
	this.shape_16.setTransform(548.9579,257.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#452300").ss(1,1,1).p("EADVA0VUgNTgsVANRg8U");
	this.shape_17.setTransform(543.7602,254.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#452300").ss(1,1,1).p("EADEA0PUgM+gsKANRg8T");
	this.shape_18.setTransform(543.3638,254.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#452300").ss(1,1,1).p("EACpA0FUgMfgr1ANRg8U");
	this.shape_19.setTransform(542.9601,253.275);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#452300").ss(1,1,1).p("EACoAz6UgMegrfANRg8U");
	this.shape_20.setTransform(542.9468,252.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#452300").ss(1,1,1).p("EACtA0AUgMkgrrANRg8U");
	this.shape_21.setTransform(543.0262,252.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#452300").ss(1,1,1).p("EAA9Ay/UgKhgppANRg8U");
	this.shape_22.setTransform(541.1577,246.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#452300").ss(1,1,1).p("EABqAy2UgLWgpYANRg8T");
	this.shape_23.setTransform(541.9466,245.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#452300").ss(1,1,1).p("EACSAy4UgNwgm4APog+3");
	this.shape_24.setTransform(538.2173,245.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#452300").ss(1,1,1).p("EACYAy2UgN3gm0APog+3");
	this.shape_25.setTransform(538.3089,245.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#452300").ss(1,1,1).p("EACFAywUgNhgmoAPog+3");
	this.shape_26.setTransform(538.0034,244.825);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#452300").ss(1,1,1).p("EACZAzLUgN4gneAPog+3");
	this.shape_27.setTransform(538.323,247.525);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#452300").ss(1,1,1).p("EACeAzLUgN+gneAPpg+3");
	this.shape_28.setTransform(538.3999,247.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#452300").ss(1,1,1).p("EACYAzGUgN3gnUAPog+3");
	this.shape_29.setTransform(538.3159,247);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#452300").ss(1,1,1).p("EADKAzbUgOxgn+APog+3");
	this.shape_30.setTransform(539.106,249.1);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#452300").ss(1,1,1).p("EACvAzZUgOSgn6APpg+3");
	this.shape_31.setTransform(538.6828,248.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#452300").ss(1,1,1).p("EADeAzmUgPIgoUAPpg+3");
	this.shape_32.setTransform(539.3935,250.15);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#452300").ss(1,1,1).p("EAE6A0OUgTDgncAR+hA/");
	this.shape_33.setTransform(540.3521,254.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#452300").ss(1,1,1).p("EAFEA0OUgTegncAR+hA/");
	this.shape_34.setTransform(542.0167,254.2);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#452300").ss(1,1,1).p("EAFNA0rUgT1goWAR+hA/");
	this.shape_35.setTransform(543.4291,257.125);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#452300").ss(1,1,1).p("EAFfA00UgUjgooAR+hA/");
	this.shape_36.setTransform(546.2089,258);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#452300").ss(1,1,1).p("EAGBA1EUgV5gpIAR+hA/");
	this.shape_37.setTransform(551.4438,259.625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#452300").ss(1,1,1).p("EAG5A1SUgZCgnrAUdhC4");
	this.shape_38.setTransform(550.0408,260.975);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#452300").ss(1,1,1).p("EAHhA1SUgamgnrAUdhC4");
	this.shape_39.setTransform(556.0184,261);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#452300").ss(1,1,1).p("EAIDA1xUgcQgpYAVXhCJ");
	this.shape_40.setTransform(557.4086,264.1);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#452300").ss(1,1,1).p("EAH0A12UgbUgozAUdhC4");
	this.shape_41.setTransform(558.7763,264.6);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#452300").ss(1,1,1).p("EAH7A14Ugblgo3AUehC4");
	this.shape_42.setTransform(559.6926,264.775);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#452300").ss(1,1,1).p("EAMwA24UgrMgjRAeAhKe");
	this.shape_43.setTransform(567.7959,271.15);

	this.instance = new lib.wire4();
	this.instance.setTransform(556.55,267.1,1,1,0,0,0,73.7,347.1);
	this.instance._off = true;

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#452300").ss(1,1,1).p("EALkA2DUgoSghzAd6hKS");
	this.shape_44.setTransform(555.8691,-373.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},131).to({state:[{t:this.shape_2}]},9).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_4}]},9).to({state:[{t:this.shape_4}]},5).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_7}]},24).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_7}]},57).to({state:[{t:this.shape_8}]},22).to({state:[{t:this.shape_9}]},26).to({state:[{t:this.shape_10}]},3).to({state:[{t:this.shape_11}]},3).to({state:[{t:this.shape_12}]},3).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},2).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},4).to({state:[{t:this.shape_18}]},2).to({state:[{t:this.shape_19}]},2).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},9).to({state:[{t:this.shape_24}]},4).to({state:[{t:this.shape_25}]},5).to({state:[{t:this.shape_26}]},6).to({state:[{t:this.shape_27}]},4).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},2).to({state:[{t:this.shape_30}]},2).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},2).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},2).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.instance}]},7).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_44}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(166).to({_off:false},0).wait(1).to({x:583.9648,y:270.875},0).wait(82).to({_off:true},22).wait(349));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({x:547.95,y:232.85},0).wait(1).to({x:539.4,y:198.6},0).wait(1).to({x:530.85,y:164.3},0).wait(1).to({x:522.25,y:130.05},0).wait(1).to({x:513.7,y:95.8},0).wait(1).to({x:505.15,y:61.5},0).wait(1).to({x:503.55,y:44.45},0).wait(1).to({x:501.95,y:27.35},0).wait(1).to({x:500.35,y:10.3},0).wait(1).to({x:498.75,y:-6.8},0).wait(1).to({x:497.15,y:-23.85},0).wait(1).to({x:495.55,y:-40.95},0).wait(1).to({x:493.95,y:-58.05},0).wait(1).to({x:492.35,y:-75.1},0).wait(1).to({x:490.75,y:-92.2},0).wait(1).to({x:489.15,y:-92.1},0).wait(1).to({x:487.55,y:-92},0).wait(1).to({x:485.95,y:-91.9},0).wait(1).to({x:484.35,y:-91.8},0).wait(1).to({x:482.75,y:-91.7},0).wait(1).to({x:481.15,y:-91.6},0).wait(1).to({x:479.6,y:-91.5},0).wait(1).to({x:472.25,y:-107.65},0).wait(1).to({x:464.9,y:-123.8},0).wait(1).to({x:457.6,y:-139.95},0).wait(1).to({x:450.25,y:-156.15},0).wait(1).to({x:442.9,y:-172.3},0).wait(1).to({x:435.6,y:-188.45},0).wait(1).to({x:428.25,y:-204.6},0).wait(1).to({x:420.9,y:-220.8},0).wait(1).to({x:413.6,y:-236.95},0).wait(1).to({x:406.25,y:-253.1},0).wait(1).to({x:398.95,y:-269.3},0).wait(1).to({y:-341.95},0).wait(1).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire5
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgAiAmhUABrgkJgA7go4");
	this.shape.setTransform(778.6893,204.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EgBLAoAUADFgnHgA7go4");
	this.shape_1.setTransform(773.7919,213.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EgCMAoiUAFMgoLgA8go4");
	this.shape_2.setTransform(766.8302,217.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EgCLAoiUAFJgoKgA8go5");
	this.shape_3.setTransform(767.0093,217.025);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EgDFAogUAJyglugFugrR");
	this.shape_4.setTransform(773.7426,216.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EgC9AozUAJfgmTgFugrS");
	this.shape_5.setTransform(774.8241,218.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EgCnAoZUAIsglggFtgrR");
	this.shape_6.setTransform(777.6962,216.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EgC5AoZUAJWglggFugrR");
	this.shape_7.setTransform(775.3668,216.15);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EgC9AojUAJggl0gFugrR");
	this.shape_8.setTransform(774.7671,217.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EgCrAohUAI1glwgFugrR");
	this.shape_9.setTransform(777.234,216.95);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EgCrAokUAI1gl1gFugrS");
	this.shape_10.setTransform(777.2628,217.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EgDPAo0UAKJgmVgFugrS");
	this.shape_11.setTransform(772.4681,218.825);
	this.shape_11._off = true;

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(0.1,1,1).p("EgDPAo0UAKJgmVgFugrS");
	this.shape_12.setTransform(772.4681,218.825);

	this.instance = new lib.wire5();
	this.instance.setTransform(772.5,218.75,1,1,0,0,0,20.8,261.1);
	this.instance._off = true;

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EgDOAovUAKHgmQgFtgrN");
	this.shape_13.setTransform(770.9758,-312.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},131).to({state:[{t:this.shape}]},2).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},5).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},16).to({state:[{t:this.shape_4}]},3).to({state:[{t:this.shape_5}]},23).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},3).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},2).to({state:[{t:this.shape_10}]},47).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},6).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},4).to({state:[{t:this.shape_11}]},3).to({state:[{t:this.instance}]},122).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_13}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(241).to({_off:false},0).wait(9).to({_off:true},4).wait(3).to({_off:false},0).to({_off:true},122).wait(241));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({regY:261.2,x:772.25,y:189.75},0).wait(1).to({x:772,y:160.6},0).wait(1).to({x:771.75,y:131.45},0).wait(1).to({x:771.5,y:102.3},0).wait(1).to({x:771.25,y:73.15},0).wait(1).to({x:771.05,y:44},0).wait(1).to({x:771.7,y:32.2},0).wait(1).to({x:772.35,y:20.35},0).wait(1).to({x:773,y:8.55},0).wait(1).to({x:773.7,y:-3.3},0).wait(1).to({x:774.35,y:-15.1},0).wait(1).to({x:775,y:-26.95},0).wait(1).to({x:775.7,y:-38.75},0).wait(1).to({x:776.35,y:-50.6},0).wait(1).to({x:777,y:-62.45},0).wait(1).to({x:777.7,y:-74.25},0).wait(1).to({x:778.35,y:-86.1},0).wait(1).to({x:779,y:-97.9},0).wait(1).to({x:779.7,y:-109.75},0).wait(1).to({x:780.35,y:-121.55},0).wait(1).to({x:781,y:-133.4},0).wait(1).to({x:781.7,y:-145.25},0).wait(1).to({y:-155.65},0).wait(1).to({y:-166.1},0).wait(1).to({y:-176.55},0).wait(1).to({y:-186.95},0).wait(1).to({y:-197.4},0).wait(1).to({y:-207.85},0).wait(1).to({y:-218.3},0).wait(1).to({y:-228.7},0).wait(1).to({y:-239.15},0).wait(1).to({y:-249.6},0).wait(1).to({y:-260.05},0).wait(2).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("AgwUQQDC0ljCz6");
	this.shape.setTransform(625.9507,107.55);

	this.instance = new lib.wire6();
	this.instance.setTransform(626,107.6,1,1,0,0,0,4.9,129.6);
	this.instance._off = true;

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("AgvUOQDA0ijAz5");
	this.shape_1.setTransform(625.2875,-187.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},131).to({state:[{t:this.shape}]},12).to({state:[{t:this.shape}]},19).to({state:[{t:this.instance}]},217).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_1}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.shape).wait(162).to({_off:true},217).wait(241));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({regX:4.8,x:623.55,y:75.3},0).wait(1).to({x:621.25,y:43},0).wait(1).to({x:618.95,y:10.7},0).wait(1).to({x:616.65,y:-21.6},0).wait(1).to({x:614.35,y:-53.9},0).wait(1).to({y:-56.55},0).wait(1).to({y:-59.2},0).wait(1).to({y:-61.85},0).wait(1).to({y:-64.5},0).wait(1).to({y:-67.15},0).wait(1).to({y:-69.8},0).wait(1).to({y:-72.45},0).wait(1).to({y:-75.1},0).wait(1).to({y:-77.8},0).wait(1).to({y:-80.45},0).wait(1).to({y:-83.1},0).wait(1).to({y:-85.75},0).wait(1).to({y:-88.4},0).wait(1).to({y:-91.05},0).wait(1).to({y:-93.7},0).wait(1).to({y:-96.35},0).wait(1).to({y:-99.05},0).wait(1).to({y:-103.5},0).wait(1).to({y:-107.95},0).wait(1).to({y:-112.45},0).wait(1).to({y:-116.9},0).wait(1).to({y:-121.4},0).wait(1).to({y:-125.85},0).wait(1).to({y:-130.35},0).wait(1).to({y:-134.8},0).wait(1).to({y:-139.3},0).wait(1).to({y:-143.75},0).wait(1).to({y:-148.25},0).wait(2).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EgAvAouUAC+gpPgC+goM");
	this.shape.setTransform(583.1727,220.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EAAEApFUACCgp9gC+goM");
	this.shape_1.setTransform(584.0802,222.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EAAMApRUAB4gqVgC+goM");
	this.shape_2.setTransform(584.2535,224.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EABkAp3UgDQgqSAAJgpb");
	this.shape_3.setTransform(588.3801,227.875);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EAB0AprUgD8gqGAAXgpP");
	this.shape_4.setTransform(589.7771,226.675);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EACtAprUgIhgnIAE8gsN");
	this.shape_5.setTransform(584.084,226.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EADAAprUgJygmUAGNgtB");
	this.shape_6.setTransform(582.1732,226.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EADfAprUgL0glFAIPguQ");
	this.shape_7.setTransform(579.0565,226.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EADTAphUgLXgkxAIOguQ");
	this.shape_8.setTransform(577.4152,225.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EABtAplUgEJgo6AA6gqP");
	this.shape_9.setTransform(588.3133,226.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EACJAppUgFVgpfABUgpy");
	this.shape_10.setTransform(587.5032,227.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EACLApXUgF3gowACEgp9");
	this.shape_11.setTransform(585.9178,226.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(1,1,1).p("EAB1ApWUgFsgohADMgqK");
	this.shape_12.setTransform(579.7508,225.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EABhApDUgFQgoIAD4gp9");
	this.shape_13.setTransform(574.5101,224.1);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#452300").ss(1,1,1).p("EABYApDUgEogn8ADMgqJ");
	this.shape_14.setTransform(575.8528,224.125);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#452300").ss(1,1,1).p("EABcApAUgExgn1ADNgqK");
	this.shape_15.setTransform(576.3473,223.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#452300").ss(1,1,1).p("EABmApEUgFKgn9ADNgqK");
	this.shape_16.setTransform(577.8176,224.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#452300").ss(1,1,1).p("EACBApYUgGHgomADMgqJ");
	this.shape_17.setTransform(581.267,226.225);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#452300").ss(1,1,1).p("EACXApmUgG5gpBADNgqK");
	this.shape_18.setTransform(584.0382,227.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#452300").ss(1,1,1).p("EADEApZUgJQgnZAEwgrY");
	this.shape_19.setTransform(584.7027,226.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#452300").ss(1,1,1).p("EADvAppUgLlgmJAGbgtI");
	this.shape_20.setTransform(584.5882,227.925);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#452300").ss(1,1,1).p("EADtApiUgMlgk4AI1guL");
	this.shape_21.setTransform(575.837,227.15);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#452300").ss(1,1,1).p("EADBApGUgK5gkAAI0guL");
	this.shape_22.setTransform(569.4422,224.375);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#452300").ss(1,1,1).p("EADeApUUgM1gjmAK7gvB");
	this.shape_23.setTransform(565.3741,225.75);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#452300").ss(1,1,1).p("EADsApkUgNYgkGAK7gvB");
	this.shape_24.setTransform(567.5162,227.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#452300").ss(1,1,1).p("EAD4ApiUgN2gkCAK7gvB");
	this.shape_25.setTransform(569.3137,227.2);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#452300").ss(1,1,1).p("EAEEAphUgOUgkAAK7gvB");
	this.shape_26.setTransform(571.1297,227.125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#452300").ss(1,1,1).p("EAEiAptUgPcgkYAK7gvB");
	this.shape_27.setTransform(575.3459,228.3);

	this.instance = new lib.wire7();
	this.instance.setTransform(575.3,228.3,1,1,0,0,0,28.9,266.9);
	this.instance._off = true;

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#452300").ss(1,1,1).p("EAEhApoUgPagkTAK5gu8");
	this.shape_28.setTransform(574.2515,-295.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},131).to({state:[{t:this.shape_1}]},4).to({state:[{t:this.shape_2}]},4).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_3}]},3).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},6).to({state:[{t:this.shape_6}]},3).to({state:[{t:this.shape_7}]},3).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_11}]},2).to({state:[{t:this.shape_12}]},14).to({state:[{t:this.shape_13}]},2).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},75).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},2).to({state:[{t:this.shape_20}]},2).to({state:[{t:this.shape_21}]},9).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},2).to({state:[{t:this.shape_24}]},83).to({state:[{t:this.shape_25}]},3).to({state:[{t:this.shape_26}]},3).to({state:[{t:this.shape_27}]},4).to({state:[{t:this.instance}]},13).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_28}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({x:572.5,y:200.35},0).wait(1).to({x:569.7,y:172.4},0).wait(1).to({x:566.95,y:144.45},0).wait(1).to({x:564.15,y:116.5},0).wait(1).to({x:561.35,y:88.55},0).wait(1).to({x:558.6,y:60.6},0).wait(1).to({x:556.75,y:49},0).wait(1).to({x:554.9,y:37.4},0).wait(1).to({x:553.05,y:25.8},0).wait(1).to({x:551.2,y:14.15},0).wait(1).to({x:549.35,y:2.55},0).wait(1).to({x:547.55,y:-9.05},0).wait(1).to({x:545.7,y:-20.7},0).wait(1).to({x:543.85,y:-32.3},0).wait(1).to({x:542,y:-43.9},0).wait(1).to({x:540.15,y:-55.55},0).wait(1).to({x:538.35,y:-67.15},0).wait(1).to({x:536.5,y:-78.75},0).wait(1).to({x:534.65,y:-90.4},0).wait(1).to({x:532.8,y:-102},0).wait(1).to({x:530.95,y:-113.6},0).wait(1).to({x:529.15,y:-125.25},0).wait(1).to({x:526.65,y:-133.6},0).wait(1).to({x:524.15,y:-141.95},0).wait(1).to({x:521.7,y:-150.3},0).wait(1).to({x:519.2,y:-158.65},0).wait(1).to({x:516.7,y:-167},0).wait(1).to({x:514.25,y:-175.35},0).wait(1).to({x:511.75,y:-183.7},0).wait(1).to({x:509.25,y:-192.05},0).wait(1).to({x:506.8,y:-200.4},0).wait(1).to({x:504.3,y:-208.75},0).wait(1).to({x:501.85,y:-217.15},0).wait(1).to({y:-270.45},0).wait(1).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EABoAnYUgGfgmVAGfgoa");
	this.shape.setTransform(539.9033,197.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EgAHAoPUgEcgoDAGfgoa");
	this.shape_1.setTransform(537.942,203.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EACHApqUgIUgpxAIFgpi");
	this.shape_2.setTransform(538.3207,212.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EABiArmUgIZgs/AJUgqM");
	this.shape_3.setTransform(534.5856,224.975);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EAJFAulUge/grTAV6gx2");
	this.shape_4.setTransform(550.4098,244.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EAJQAulUgfrgqyAWlgyX");
	this.shape_5.setTransform(549.3497,244.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EAHtAuaUgZQgrKAQJgxp");
	this.shape_6.setTransform(559.3678,243);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EAHqAu0UgZHgr+AQJgxp");
	this.shape_7.setTransform(558.8492,245.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EAHpAu1UgZGgsAAQJgxp");
	this.shape_8.setTransform(558.8204,245.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EAHJAvUUgX6gs+AQJgxp");
	this.shape_9.setTransform(554.4216,248.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EAHbAvFUgYlgsgAQJgxp");
	this.shape_10.setTransform(556.8568,247.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EAITAuPUgaogq0AQJgxp");
	this.shape_11.setTransform(564.4435,241.875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(1,1,1).p("EAIvAtwUgcAgo9AQ8gyi");
	this.shape_12.setTransform(565.2983,238.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EAIkAtnUgbmgorAQ8gyi");
	this.shape_13.setTransform(563.8407,237.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#452300").ss(1,1,1).p("EAIhAuIUgbggptAQ8gyi");
	this.shape_14.setTransform(563.4972,241.225);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#452300").ss(1,1,1).p("EAISAuRUga8gp/AQ8gyi");
	this.shape_15.setTransform(561.4325,242.05);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#452300").ss(1,1,1).p("EAIEAuzUgacgrDAQ8gyi");
	this.shape_16.setTransform(559.6203,245.45);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#452300").ss(1,1,1).p("EAHrAupUgZhgqvAQ8gyi");
	this.shape_17.setTransform(556.1532,244.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#452300").ss(1,1,1).p("EAIDAvgUgaZgsdAQ8gyi");
	this.shape_18.setTransform(559.4186,250.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#452300").ss(1,1,1).p("EAH4AvZUgZ/gsPAQ8gyi");
	this.shape_19.setTransform(557.9182,249.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#452300").ss(1,1,1).p("EAH5AvQUgargqXASdg0I");
	this.shape_20.setTransform(552.526,248.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#452300").ss(1,1,1).p("EAHAAvXUgYxgqfATGg0O");
	this.shape_21.setTransform(541.7999,249.075);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#452300").ss(1,1,1).p("EAFuAvHUgVkgp/ATGg0O");
	this.shape_22.setTransform(529.5142,247.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#452300").ss(1,1,1).p("EAFqAu4UgVagpiATGg0N");
	this.shape_23.setTransform(528.9036,246.025);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#452300").ss(1,1,1).p("EAF2Au9UgWBgpKATgg0v");
	this.shape_24.setTransform(529.0081,246.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#452300").ss(1,1,1).p("EAF6AvIUgWMgpfATgg0w");
	this.shape_25.setTransform(529.679,247.55);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#452300").ss(1,1,1).p("EAF0AvAUgV8gpQATgg0v");
	this.shape_26.setTransform(528.7028,246.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#452300").ss(1,1,1).p("EAGAAvKUgWcgpkAThg0v");
	this.shape_27.setTransform(530.6226,247.825);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#452300").ss(1,1,1).p("EAGMAvKUgW6gpkATgg0v");
	this.shape_28.setTransform(532.4738,247.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#452300").ss(1,1,1).p("EAGjAvyUgX0gqzATgg0w");
	this.shape_29.setTransform(535.9743,251.75);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#452300").ss(1,1,1).p("EAGnAvgUgX+gqQATgg0v");
	this.shape_30.setTransform(536.6053,250);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#452300").ss(1,1,1).p("EAGeAu5UgYLgp8AVAgz1");
	this.shape_31.setTransform(529.1739,246.075);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#452300").ss(1,1,1).p("EAGMAu2UgXdgp2AVBgz1");
	this.shape_32.setTransform(526.3075,245.8);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#452300").ss(1,1,1).p("EAGGAuWUgXNgo2AVBgz1");
	this.shape_33.setTransform(525.3278,242.6);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#452300").ss(1,1,1).p("EAHgAu6Ugaxgp9AVAgz2");
	this.shape_34.setTransform(539.1706,246.15);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#452300").ss(1,1,1).p("EAH/AvUUgb9gqxAVAgz2");
	this.shape_35.setTransform(543.6579,248.75);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#452300").ss(1,1,1).p("EAJOAv9Uge8gsEAVBgz1");
	this.shape_36.setTransform(554.8945,252.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#452300").ss(1,1,1).p("EAJsAwFUgg0gppAW0g2g");
	this.shape_37.setTransform(552.4424,253.675);

	this.instance = new lib.wire8();
	this.instance.setTransform(552.5,253.7,1,1,0,0,0,62,307.7);
	this.instance._off = true;

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#452300").ss(1,1,1).p("EAJqAv8UggtgphAWvg2W");
	this.shape_38.setTransform(550.8743,-330.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},131).to({state:[{t:this.shape_1}]},4).to({state:[{t:this.shape_2}]},5).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},5).to({state:[{t:this.shape_5}]},3).to({state:[{t:this.shape_6}]},3).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_8}]},4).to({state:[{t:this.shape_9}]},14).to({state:[{t:this.shape_10}]},2).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},2).to({state:[{t:this.shape_13}]},7).to({state:[{t:this.shape_13}]},3).to({state:[{t:this.shape_14}]},63).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},4).to({state:[{t:this.shape_18}]},3).to({state:[{t:this.shape_19}]},3).to({state:[{t:this.shape_20}]},3).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},2).to({state:[{t:this.shape_23}]},2).to({state:[{t:this.shape_24}]},2).to({state:[{t:this.shape_25}]},2).to({state:[{t:this.shape_26}]},2).to({state:[{t:this.shape_27}]},6).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},5).to({state:[{t:this.shape_31}]},22).to({state:[{t:this.shape_32}]},3).to({state:[{t:this.shape_33}]},3).to({state:[{t:this.shape_34}]},34).to({state:[{t:this.shape_34}]},3).to({state:[{t:this.shape_35}]},4).to({state:[{t:this.shape_36}]},2).to({state:[{t:this.shape_37}]},6).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_38}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(379).to({_off:false},0).wait(1).to({regX:61.9,x:551.15,y:222.85},0).wait(1).to({x:549.95,y:192},0).wait(1).to({x:548.7,y:161.15},0).wait(1).to({x:547.5,y:130.3},0).wait(1).to({x:546.25,y:99.45},0).wait(1).to({x:545.05,y:68.55},0).wait(1).to({x:541.7,y:55.8},0).wait(1).to({x:538.4,y:43},0).wait(1).to({x:535.1,y:30.2},0).wait(1).to({x:531.8,y:17.45},0).wait(1).to({x:528.5,y:4.65},0).wait(1).to({x:525.15,y:-8.15},0).wait(1).to({x:521.85,y:-20.9},0).wait(1).to({x:518.55,y:-33.7},0).wait(1).to({x:515.25,y:-46.5},0).wait(1).to({x:511.95,y:-59.25},0).wait(1).to({x:508.6,y:-72.05},0).wait(1).to({x:505.3,y:-84.85},0).wait(1).to({x:502,y:-97.6},0).wait(1).to({x:498.7,y:-110.4},0).wait(1).to({x:495.4,y:-123.2},0).wait(1).to({x:492.1,y:-136},0).wait(1).to({x:486.1,y:-150.8},0).wait(1).to({x:480.15,y:-165.6},0).wait(1).to({x:474.15,y:-180.4},0).wait(1).to({x:468.2,y:-195.2},0).wait(1).to({x:462.25,y:-210},0).wait(1).to({x:456.25,y:-224.8},0).wait(1).to({x:450.3,y:-239.6},0).wait(1).to({x:444.35,y:-254.4},0).wait(1).to({x:438.35,y:-269.2},0).wait(1).to({x:432.4,y:-284},0).wait(1).to({x:426.45,y:-298.85},0).wait(2).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_wire1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wire1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#452300").ss(1,1,1).p("EABPAxoUgE7gxoAE7gxn");
	this.shape.setTransform(480.2562,273.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#452300").ss(1,1,1).p("EADpA2UUgKpg6+AE8gxp");
	this.shape_1.setTransform(501.4526,303.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#452300").ss(1,1,1).p("EAEyA2wUgODg6jAGngy8");
	this.shape_2.setTransform(505.2411,306.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#452300").ss(1,1,1).p("EAI2A5DUgWOg8MAFug15");
	this.shape_3.setTransform(537.2557,321.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#452300").ss(1,1,1).p("EAKEA55UgXrg8kAEMg3N");
	this.shape_4.setTransform(548.5689,326.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#452300").ss(1,1,1).p("EAJxA5NUgXDg7NAEMg3M");
	this.shape_5.setTransform(546.4973,322.125);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#452300").ss(1,1,1).p("EAI8A5WUgVWg7eAELg3N");
	this.shape_6.setTransform(540.936,322.975);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#452300").ss(1,1,1).p("EAIiA5qUgUhg8HAELg3M");
	this.shape_7.setTransform(538.2384,325.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#452300").ss(1,1,1).p("EAHqA5gUgSug7yAEMg3N");
	this.shape_8.setTransform(532.2853,323.95);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#452300").ss(1,1,1).p("EAHWA5KUgSEg7HAELg3M");
	this.shape_9.setTransform(530.1133,321.825);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#452300").ss(1,1,1).p("EAHRA5HUgR6g7AAEMg3N");
	this.shape_10.setTransform(529.5956,321.45);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#452300").ss(1,1,1).p("EAGaA5BUgQHg60AELg3N");
	this.shape_11.setTransform(523.6217,320.9);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#452300").ss(1,1,1).p("EAGoA4nUgSyg49AH2g4Q");
	this.shape_12.setTransform(515.8052,318.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#452300").ss(1,1,1).p("EAHZA4nUgWxg2cAMVg6x");
	this.shape_13.setTransform(507.7967,318.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#452300").ss(1,1,1).p("EAG0A4IUgVcg1eAMUg6x");
	this.shape_14.setTransform(503.0593,315.15);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#452300").ss(1,1,1).p("EAGVA3tUgUTg0pAMUg6w");
	this.shape_15.setTransform(498.8787,312.525);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#452300").ss(1,1,1).p("EAFxA3TUgS/gz1AMUg6w");
	this.shape_16.setTransform(494.0554,309.875);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#452300").ss(1,1,1).p("EAFWA2uUgSAgyrAMUg6w");
	this.shape_17.setTransform(490.4025,306.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#452300").ss(1,1,1).p("EAE4A2eUgQ3gyLAMTg6w");
	this.shape_18.setTransform(486.1568,304.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#452300").ss(1,1,1).p("EAEaA2EUgPtgxXAMTg6w");
	this.shape_19.setTransform(481.7716,302.025);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#452300").ss(1,1,1).p("EAEFA1lUgO5gwZAMTg6w");
	this.shape_20.setTransform(478.6553,298.875);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#452300").ss(1,1,1).p("EAD5A1QUgOagvuAMTg6x");
	this.shape_21.setTransform(476.7523,296.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#452300").ss(1,1,1).p("EADgA0wUgNaguvAMTg6w");
	this.shape_22.setTransform(472.8779,293.575);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#452300").ss(1,1,1).p("EADcA0jUgNQguUAMTg6x");
	this.shape_23.setTransform(472.2628,292.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#452300").ss(1,1,1).p("EADIA0WUgMcgt7AMTg6w");
	this.shape_24.setTransform(469.0098,290.975);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#452300").ss(1,1,1).p("EADIAz2UgMcgs7AMTg6w");
	this.shape_25.setTransform(469.0098,287.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#452300").ss(1,1,1).p("EACbAzMUgLjgrnAMTg6w");
	this.shape_26.setTransform(467.8224,283.625);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#452300").ss(1,1,1).p("EAB8AytUgK/gqpAMTg6w");
	this.shape_27.setTransform(467.3318,280.475);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#452300").ss(1,1,1).p("EACEAyoUgLIgqeAMTg6x");
	this.shape_28.setTransform(467.4636,279.95);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#452300").ss(1,1,1).p("EABhAx7UgKfgpFAMTg6w");
	this.shape_29.setTransform(466.8827,275.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#452300").ss(1,1,1).p("EABFAxcUgJ/goGAMTg6x");
	this.shape_30.setTransform(466.4062,272.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#452300").ss(1,1,1).p("EAAzAxEUgJpgnXAMTg6w");
	this.shape_31.setTransform(466.066,269.975);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#452300").ss(1,1,1).p("EAAhAwcUgJUgmHAMTg6w");
	this.shape_32.setTransform(465.7312,266.025);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#452300").ss(1,1,1).p("EAAAAvjUgIsgkUAMTg6x");
	this.shape_33.setTransform(465.0388,260.25);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#452300").ss(1,1,1).p("EgAJAwcUgIhgmHAMTg6w");
	this.shape_34.setTransform(464.8568,265.975);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#452300").ss(1,1,1).p("EAALAxiUgJdgn3ANFg7M");
	this.shape_35.setTransform(463.8036,273.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#452300").ss(1,1,1).p("EAAcAyzUgJygqYANGg7N");
	this.shape_36.setTransform(464.1441,281.1);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#452300").ss(1,1,1).p("EAB+AzyUgM0gq+AO0g8l");
	this.shape_37.setTransform(462.7006,287.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#452300").ss(1,1,1).p("EACvA0cUgNtgsSAO0g8l");
	this.shape_38.setTransform(463.5015,291.55);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#452300").ss(1,1,1).p("EAEvA1cUgSRgtBARBg92");
	this.shape_39.setTransform(465.8199,298.025);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#452300").ss(1,1,1).p("EAFXA1ZUgT5gs7ARCg92");
	this.shape_40.setTransform(472.1769,297.7);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#452300").ss(1,1,1).p("EAF2A1nUgVHgtWARBg93");
	this.shape_41.setTransform(476.9099,299.05);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#452300").ss(1,1,1).p("EAGTA1wUgWPgtpARBg92");
	this.shape_42.setTransform(481.2067,300.025);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#452300").ss(1,1,1).p("EAHPA12UgZJgsgASmg/L");
	this.shape_43.setTransform(483.7378,300.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#452300").ss(1,1,1).p("EAHeA2MUgZugtNASmg/K");
	this.shape_44.setTransform(485.9181,302.775);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#452300").ss(1,1,1).p("EAHLA2BUgY/gs3ASmg/K");
	this.shape_45.setTransform(483.147,301.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#452300").ss(1,1,1).p("EAGmA2CUgXlgs4ASng/L");
	this.shape_46.setTransform(477.7999,301.75);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#452300").ss(1,1,1).p("EAGgA1zUgXWgsbASmg/K");
	this.shape_47.setTransform(476.9032,300.3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#452300").ss(1,1,1).p("EAFyA1gUgVigr0ASng/L");
	this.shape_48.setTransform(469.8805,298.35);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#452300").ss(1,1,1).p("EAF2A1hUgVsgr3ASmg/K");
	this.shape_49.setTransform(470.5178,298.525);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#452300").ss(1,1,1).p("EAFhA1XUgU3grjASmg/K");
	this.shape_50.setTransform(467.3216,297.5);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#452300").ss(1,1,1).p("EAFTA07UgUSgqrASmg/K");
	this.shape_51.setTransform(465.0238,294.725);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#452300").ss(1,1,1).p("EAFWA06UgUbgqoASmg/L");
	this.shape_52.setTransform(465.6071,294.55);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#452300").ss(1,1,1).p("EAFdA1WUgUsgrhASmg/K");
	this.shape_53.setTransform(466.6183,297.425);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#452300").ss(1,1,1).p("EAFeA1eUgUwgrwASng/L");
	this.shape_54.setTransform(466.863,298.15);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#452300").ss(1,1,1).p("EAFjA1XUgU7griASmg/L");
	this.shape_55.setTransform(467.5354,297.45);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#452300").ss(1,1,1).p("EAFSA1UUgURgrdASng/K");
	this.shape_56.setTransform(464.9623,297.175);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#452300").ss(1,1,1).p("EAFtA2LUgVWgtLASng/K");
	this.shape_57.setTransform(469.1813,302.725);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#452300").ss(1,1,1).p("EAGfA17UgXTgsrASmg/K");
	this.shape_58.setTransform(476.7237,301.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#452300").ss(1,1,1).p("EAG4A2gUgYSgt1ASmg/K");
	this.shape_59.setTransform(480.5101,304.775);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#452300").ss(1,1,1).p("EAHoA2/UgaYgt1ATThAI");
	this.shape_60.setTransform(484.646,307.9);
	this.shape_60._off = true;

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#452300").ss(1,1,1).p("EAH2A3SUga7gubATThAI");
	this.shape_61.setTransform(486.7049,309.8);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#452300").ss(1,1,1).p("EAIGA31UgbigviATVhAH");
	this.shape_62.setTransform(488.9907,313.325);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#452300").ss(1,1,1).p("EAIbA3UUgcUgufATUhAI");
	this.shape_63.setTransform(491.9086,310);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#452300").ss(1,1,1).p("EAIzA3zUgdNgvdATUhAI");
	this.shape_64.setTransform(495.2475,313.1);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#452300").ss(1,1,1).p("EAJvA4xUgfbgxZATVhAI");
	this.shape_65.setTransform(503.3656,319.3);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#452300").ss(1,1,1).p("EAMpA5xUgmGgzZATUhAI");
	this.shape_66.setTransform(527.5058,325.65);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#452300").ss(0.1,1,1).p("EANYA5rUgpfgutAW4hEo");
	this.shape_67.setTransform(521.7743,325.075);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#452300").ss(1,1,1).p("EANVA50UgpXgu/AW4hEo");
	this.shape_68.setTransform(521.2955,326.025);

	this.instance = new lib.wire9();
	this.instance.setTransform(513.65,321.6,1,1,0,0,0,79.4,365.6);
	this.instance._off = true;

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#452300").ss(1,1,1).p("EAMXA4/UgnIgtgAW0hEd");
	this.shape_69.setTransform(512.2598,-397.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},131).to({state:[{t:this.shape_2}]},9).to({state:[{t:this.shape_2}]},3).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_4}]},9).to({state:[{t:this.shape_4}]},5).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},8).to({state:[{t:this.shape_7}]},126).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},2).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},2).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},2).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},2).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},3).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},2).to({state:[{t:this.shape_53}]},2).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_60}]},2).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},2).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},2).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},8).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_69}]},1).to({state:[]},1).wait(204));
	this.timeline.addTween(cjs.Tween.get(this.shape_60).wait(358).to({_off:false},0).wait(4).to({_off:true},1).wait(257));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(380).to({_off:false},0).wait(1).to({x:509.65,y:258.7},0).wait(1).to({x:505.65,y:195.75},0).wait(1).to({x:501.65,y:132.8},0).wait(1).to({x:497.65,y:69.85},0).wait(1).to({x:493.7,y:6.9},0).wait(1).to({x:491.1,y:-5.9},0).wait(1).to({x:488.55,y:-18.75},0).wait(1).to({x:486,y:-31.6},0).wait(1).to({x:483.45,y:-44.45},0).wait(1).to({x:480.85,y:-57.3},0).wait(1).to({x:478.3,y:-70.15},0).wait(1).to({x:475.75,y:-83},0).wait(1).to({x:473.2,y:-95.85},0).wait(1).to({x:470.6,y:-108.65},0).wait(1).to({x:468.05,y:-121.5},0).wait(1).to({x:465.5,y:-134.35},0).wait(1).to({x:462.95,y:-147.2},0).wait(1).to({x:460.35,y:-160.05},0).wait(1).to({x:457.8,y:-172.9},0).wait(1).to({x:455.25,y:-185.75},0).wait(1).to({x:452.7,y:-198.6},0).wait(1).to({x:446.15,y:-214.6},0).wait(1).to({x:439.6,y:-230.6},0).wait(1).to({x:433.05,y:-246.6},0).wait(1).to({x:426.5,y:-262.6},0).wait(1).to({x:419.95,y:-278.6},0).wait(1).to({x:413.45,y:-294.65},0).wait(1).to({x:406.9,y:-310.65},0).wait(1).to({x:400.35,y:-326.65},0).wait(1).to({x:393.8,y:-342.65},0).wait(1).to({x:387.25,y:-358.65},0).wait(1).to({x:380.75,y:-374.7},0).wait(2).to({_off:true},1).wait(205));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_thighR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// thighR
	this.instance = new lib.thigh();
	this.instance.setTransform(712.2,602.3,1,1,-14.9992,0,0,13.1,19.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(12).to({y:602.4},0).wait(1).to({rotation:-17.9854,x:720.6,y:601},0).wait(1).to({rotation:-20.9719,x:729,y:599.6},0).wait(1).to({rotation:-24.7214,x:735.4,y:597.15},0).wait(1).to({rotation:-28.4708,x:741.8,y:594.75},0).wait(1).to({rotation:-32.2203,x:748.3,y:592.3},0).wait(1).to({rotation:-35.9698,x:754.7,y:589.85},0).wait(1).to({rotation:-38.3864,x:757.45,y:588.2},0).wait(1).to({rotation:-40.8029,x:760.25,y:586.55},0).wait(1).to({rotation:-43.2195,x:763,y:584.9},0).wait(5).to({regX:13,rotation:-44.9988,x:762.9,y:585.55},0).wait(51).to({regX:12.5,regY:15.1,scaleX:0.9999,scaleY:0.9999,rotation:-44.9981,x:763.05,y:585.6},0).wait(1).to({regX:13.1,regY:19.4,scaleX:1,scaleY:1,rotation:-42.4052,x:761.85,y:589.9},0).wait(1).to({rotation:-39.8118,x:757.15,y:591.7},0).wait(1).to({rotation:-37.2183,x:752.6,y:593.55},0).wait(1).to({rotation:-34.6248,x:747.9,y:595.25},0).wait(1).to({rotation:-32.0313,x:743.3,y:597},0).wait(1).to({rotation:-29.4378,x:738.6,y:598.75},0).wait(1).to({rotation:-26.8444,x:733.95,y:600.5},0).wait(1).to({rotation:-24.2509,x:729.3,y:602.25},0).wait(1).to({rotation:-23.0884,x:727.3,y:602.2},0).wait(1).to({rotation:-21.9259,x:725.3,y:602.15},0).wait(1).to({rotation:-20.7634,x:723.35},0).wait(1).to({rotation:-19.6009,x:721.3,y:602.1},0).wait(1).to({rotation:-18.4384,x:719.35,y:602.05},0).wait(1).to({rotation:-17.2759,x:717.3,y:601.95},0).wait(5).to({regX:13.2,regY:19.6,scaleX:0.9999,scaleY:0.9999,rotation:-14.9746,x:713.8,y:606.65},0).to({_off:true},121).wait(163));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_thighL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// thighL
	this.instance = new lib.thigh();
	this.instance.setTransform(651.2,582.7,1,1,-7.7628,0,0,16.1,0.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(1).to({regX:13.1,regY:19.4,rotation:-4.9471,x:646.1,y:599.65},0).wait(1).to({rotation:-2.1313,x:641.4,y:597.05},0).wait(1).to({rotation:0.6845,x:636.7,y:594.4},0).wait(1).to({rotation:0.6845},0).wait(3).to({regX:15.9,regY:-1.4,rotation:7.2364,x:641.1,y:582.6},0).wait(127).to({regX:13.9,regY:0,rotation:7.2355},0).wait(1).to({regX:13.1,regY:19.4,rotation:8.2041,x:633.75,y:600.35},0).wait(1).to({rotation:9.1713,x:629.65,y:599.05},0).wait(1).to({rotation:10.1385,x:625.6,y:597.7},0).wait(1).to({rotation:11.1057,x:622.8,y:596.6},0).wait(1).to({rotation:12.0729,x:620.05,y:595.55},0).wait(1).to({rotation:13.0401,x:617.3,y:594.5},0).wait(1).to({rotation:14.0073,x:614.6,y:593.4},0).wait(1).to({rotation:14.9745,x:611.85,y:592.35},0).wait(1).to({rotation:15.9417,x:609.1,y:591.25},0).wait(1).to({rotation:18.9417,x:605.8,y:589.5},0).wait(1).to({rotation:21.9416,x:602.5,y:587.7},0).wait(1).to({rotation:24.9416,x:599.25,y:585.85},0).wait(1).to({rotation:27.9415,x:595.95,y:583.95},0).wait(1).to({rotation:30.9415,x:592.8,y:582.05},0).wait(1).to({rotation:31.9762,x:591.1,y:580.75},0).wait(1).to({rotation:33.0109,x:589.4,y:579.45},0).wait(1).to({rotation:34.0456,x:587.7,y:578.2},0).wait(1).to({rotation:35.0803,x:586,y:576.95},0).wait(1).to({rotation:36.115,x:584.35,y:575.6},0).wait(1).to({rotation:37.1497,x:582.75,y:574.3},0).wait(1).to({rotation:38.1844,x:581.05,y:573.05},0).wait(4).to({regX:16,regY:-1.4,scaleX:0.9999,scaleY:0.9999,rotation:48.2822,x:590.6,y:552.75},0).wait(32).to({regX:13.9,regY:-1.2,x:590.5,y:552.65},0).wait(1).to({regX:13.1,regY:19.4,rotation:46.4074,x:577.9,y:568},0).wait(1).to({rotation:44.5325,x:581.2,y:570.25},0).wait(1).to({rotation:42.6577,x:584.5,y:572.4},0).wait(1).to({rotation:40.7829,x:587.85,y:574.6},0).wait(1).to({rotation:38.908,x:590.5,y:576.2},0).wait(1).to({rotation:37.0332,x:593.15,y:577.75},0).wait(1).to({rotation:35.1583,x:595.9,y:579.3},0).wait(1).to({rotation:33.2835,x:598.6,y:580.8},0).wait(1).to({rotation:31.1406,x:601.7,y:582.5},0).wait(1).to({rotation:28.9978,x:604.85,y:584.15},0).wait(1).to({rotation:26.8549,x:608.05,y:585.8},0).wait(1).to({rotation:24.7121,x:611.2,y:587.4},0).wait(1).to({scaleX:1,scaleY:1,rotation:22.5692,x:614.25,y:588.4},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:20.4264,x:617.45,y:589.3},0).wait(1).to({rotation:18.2835,x:620.5,y:590.15},0).wait(2).to({regX:16.1,regY:-1.3,rotation:-3.9973,x:653.25,y:584.55},0).to({_off:true},9).wait(159));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_spotlight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// spotlight
	this.instance = new lib.spotlight();
	this.instance.setTransform(871.6,405.1,1.0158,1.0158,-14.5973,0,0,582,578.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(150).to({regX:0.4,regY:0.4,scaleX:1.0157,scaleY:1.0157,rotation:-12.3829,x:151.85,y:-14.3},0).wait(34).to({regX:0.5,regY:0.3,rotation:-12.3824,x:150.8,y:-14.4},0).wait(232));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_pantsR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pantsR
	this.instance = new lib.legR_normal();
	this.instance.setTransform(714.6,504.1,0.9999,0.9999,-48.7177,0,0,-59.3,-107.7);

	this.instance_1 = new lib.pents_only();
	this.instance_1.setTransform(709.65,552.65,1,1,0,0,0,20.7,37.1);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(129).to({regX:-57.2,regY:-102.7,rotation:-48.7183,x:714.45,y:504.15},0).wait(1).to({regX:-54.8,regY:2.4,rotation:-46.446,x:792.25,y:574.85},0).wait(1).to({rotation:-44.1743,x:789.35,y:578},0).wait(1).to({rotation:-41.9026,x:786.4,y:581.05},0).wait(1).to({rotation:-39.6309,x:783.3,y:583.95},0).wait(1).to({rotation:-37.3592,x:780.1,y:586.7},0).wait(1).to({rotation:-35.0876,x:776.8,y:589.35},0).wait(1).to({rotation:-32.8159,x:773.4,y:591.85},0).wait(1).to({rotation:-30.5442,x:769.85,y:594.25},0).wait(1).to({rotation:-28.2725,x:766.35,y:596.45},0).wait(1).to({rotation:-26.0008,x:762.65,y:598.55},0).wait(1).to({rotation:-23.7291,x:758.9,y:600.55},0).wait(1).to({rotation:-22.3655,x:756.65,y:601.65},0).wait(1).to({rotation:-21.0019,x:754.3,y:602.75},0).wait(1).to({rotation:-19.6383,x:752,y:603.75},0).wait(1).to({rotation:-18.2747,x:749.65,y:604.8},0).wait(1).to({rotation:-16.9111,x:747.25,y:605.7},0).wait(1).to({rotation:-15.5475,x:744.9,y:606.55},0).wait(1).to({rotation:-14.1839,x:742.5,y:607.4},0).wait(1).to({rotation:-12.8203,x:740.1,y:608.1},0).wait(1).to({rotation:-11.4567,x:737.65,y:608.8},0).wait(1).to({rotation:-10.0931,x:735.2,y:609.4},0).wait(1).to({rotation:-8.7295,x:732.75,y:609.95},0).wait(1).to({rotation:-7.4835,x:730.45,y:610.5},0).wait(1).to({rotation:-6.2375,x:728.25,y:610.9},0).wait(1).to({rotation:-4.9915,x:725.95,y:611.25},0).wait(1).to({rotation:-3.7455,x:723.65,y:611.65},0).wait(1).to({rotation:-2.4995,x:721.4,y:611.9},0).wait(1).to({rotation:-1.2535,x:719.1,y:612.1},0).wait(5).to({_off:true},1).wait(352));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(163).to({_off:false},0).wait(12).to({regX:11.2,regY:-13,x:700.15,y:502.55},0).wait(1).to({regX:20.7,regY:39.6,rotation:-4.8656,x:714.05,y:554.1},0).wait(1).to({rotation:-9.7312,x:718.4,y:552.75},0).wait(1).to({rotation:-13.4809,x:721.65,y:551.4},0).wait(1).to({rotation:-17.2307,x:724.8,y:549.9},0).wait(1).to({rotation:-20.9804,x:727.85,y:548.2},0).wait(1).to({rotation:-24.7302,x:730.75,y:546.3},0).wait(1).to({rotation:-26.719,x:732.25,y:545.2},0).wait(1).to({rotation:-28.7077,x:733.7,y:544.1},0).wait(1).to({rotation:-30.6965,x:735.1,y:542.9},0).wait(5).to({regX:12.3,regY:-12.4,rotation:-30.2805,x:701.2,y:503.05},0).wait(51).to({regX:10.4,regY:-9.3,rotation:-30.2809,y:503.15},0).wait(1).to({regX:20.7,regY:39.6,rotation:-27.5974,x:732.95,y:541.7},0).wait(1).to({rotation:-24.9145,x:731.1,y:543.15},0).wait(1).to({rotation:-22.2315,x:729.2,y:544.5},0).wait(1).to({rotation:-19.5485,x:727.25,y:545.75},0).wait(1).to({rotation:-16.8655,x:725.2,y:546.95},0).wait(1).to({rotation:-14.1826,x:723.1,y:548.05},0).wait(1).to({rotation:-11.4996,x:721.05,y:549},0).wait(1).to({rotation:-8.8166,x:718.8,y:549.95},0).wait(1).to({rotation:-7.6529,x:717.85,y:550.25},0).wait(1).to({rotation:-6.4892,x:716.95,y:550.55},0).wait(1).to({rotation:-5.3255,x:715.95,y:550.95},0).wait(1).to({rotation:-4.1619,x:714.95,y:551.2},0).wait(1).to({rotation:-2.9982,x:713.95,y:551.45},0).wait(1).to({rotation:-1.8345,x:713,y:551.75},0).wait(5).to({regX:12.3,regY:-12.4,rotation:-0.2806,x:701.25,y:503.1},0).to({_off:true},121).wait(135));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_pantsL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pantsL
	this.instance = new lib.legL_normal();
	this.instance.setTransform(662.2,510.75,1,1,51.4082,0,0,-54.8,-103.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("Aiol0IF1AWIgjLTIl2gVg");
	this.shape.setTransform(653.175,555.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjMFgIAkrTIF1AUIgjLUg");
	this.shape_1.setTransform(653.175,555.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#3333CC").ss(12,1,1).p("Ah9mEIFwA/Ih1LKIlwg/g");
	this.shape_2.setTransform(646.425,553.625);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3333CC").s().p("AjyFGIB1rKIFwA/Ih1LKg");
	this.shape_3.setTransform(646.425,553.625);

	this.instance_1 = new lib.pents3();
	this.instance_1.setTransform(654.9,508.7,1,1,0,0,0,32.8,-6);
	this.instance_1._off = true;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#3333CC").ss(12,1,1).p("AC6lrIDZEyIpMGmIjZkyg");
	this.shape_4.setTransform(617.725,533.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3333CC").s().p("AmSA7IJMmnIDZEyIpMGmg");
	this.shape_5.setTransform(617.725,533.55);

	this.instance_2 = new lib.pents5();
	this.instance_2.setTransform(656.15,508.9,1,1,0,0,0,78.7,11.8);
	this.instance_2._off = true;

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#3333CC").ss(12,1,1).p("AlODYIFfpoIE+C5IlgJng");
	this.shape_6.setTransform(638.475,545.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3333CC").s().p("AlODZIFfpoIE+C4IlgJog");
	this.shape_7.setTransform(638.475,545.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#3333CC").ss(12,1,1).p("AgUmYIFUCdIkrKUIlUicg");
	this.shape_8.setTransform(643.25,548.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3333CC").s().p("Ak/D9IEqqVIFUCdIkqKUg");
	this.shape_9.setTransform(643.25,548.125);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#3333CC").ss(12,1,1).p("AiulxIF2APIgZLUIl2gPg");
	this.shape_10.setTransform(655.425,555.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3333CC").s().p("AjHFjIAZrUIF2APIgZLUg");
	this.shape_11.setTransform(655.425,555.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},128).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_3},{t:this.shape_2}]},3).to({state:[{t:this.instance_1}]},131).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.instance_2}]},32).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_7},{t:this.shape_6}]},1).to({state:[{t:this.shape_9},{t:this.shape_8}]},3).to({state:[{t:this.shape_11},{t:this.shape_10}]},1).to({state:[]},9).wait(135));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(128).to({regX:-52.9,regY:-101.8,scaleX:0.9999,scaleY:0.9999,rotation:51.409,y:510.85},0).wait(1).to({regX:-71.1,regY:2.8,scaleX:1,scaleY:1,rotation:49.0655,x:571.25,y:565.65},0).wait(1).to({rotation:46.7225,x:573.55,y:569.3},0).wait(1).to({rotation:44.3795,x:576.05,y:572.85},0).wait(1).to({rotation:42.0365,x:578.65,y:576.35},0).wait(1).to({rotation:39.6935,x:581.4,y:579.7},0).wait(1).to({rotation:37.3505,x:584.3,y:582.95},0).wait(1).to({rotation:35.0075,x:587.25,y:586.05},0).wait(1).to({rotation:32.6645,x:590.4,y:589.1},0).wait(1).to({rotation:30.6646,x:593.15,y:591.55},0).wait(1).to({rotation:28.6646,x:596,y:593.9},0).wait(1).to({rotation:26.6647,x:598.95,y:596.15},0).wait(1).to({rotation:24.6648,x:602,y:598.35},0).wait(1).to({rotation:22.6648,x:605.05,y:600.35},0).wait(1).to({rotation:20.6649,x:608.25,y:602.25},0).wait(1).to({rotation:18.6649,x:611.45,y:604.15},0).wait(1).to({rotation:16.665,x:614.75,y:605.85},0).wait(1).to({rotation:14.6651,x:618.1,y:607.45},0).wait(1).to({rotation:12.6651,x:621.5,y:608.95},0).wait(1).to({rotation:10.6652,x:624.95,y:610.3},0).wait(1).to({rotation:8.6653,x:628.45,y:611.5},0).wait(1).to({rotation:6.6653,x:632,y:612.65},0).wait(1).to({rotation:4.6654,x:635.5,y:613.65},0).wait(1).to({rotation:2.6655,x:639.15,y:614.5},0).wait(1).to({rotation:2.1326,x:640.1,y:614.7},0).wait(1).to({rotation:1.5998,x:641.05,y:614.9},0).wait(1).to({rotation:1.067,x:642,y:615.15},0).wait(1).to({rotation:0.5341,x:642.95,y:615.3},0).wait(1).to({rotation:0.0013,x:643.95,y:615.45},0).wait(1).to({rotation:-0.5315,x:644.95,y:615.65},0).wait(5).to({_off:true},1).wait(352));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(297).to({_off:false},0).wait(1).to({regX:24.3,regY:38.9,rotation:3.3439,x:643.8,y:553},0).wait(1).to({rotation:6.6877,x:641.2,y:552.3},0).wait(1).to({rotation:10.0316,x:638.65,y:551.4},0).wait(1).to({rotation:11.739,x:637.45,y:550.95},0).wait(1).to({rotation:13.4463,x:636.15,y:550.4},0).wait(1).to({rotation:15.1537,x:634.95,y:549.8},0).wait(1).to({rotation:16.8611,x:633.7,y:549.2},0).wait(1).to({rotation:18.5684,x:632.5,y:548.5},0).wait(1).to({rotation:20.2758,x:631.3,y:547.85},0).wait(1).to({rotation:22.2648,x:630,y:547},0).wait(1).to({rotation:24.2539,x:628.65,y:546.1},0).wait(1).to({rotation:26.2429,x:627.4,y:545.2},0).wait(1).to({rotation:28.232,x:626.1,y:544.2},0).wait(1).to({rotation:30.221,x:624.9,y:543.2},0).wait(1).to({rotation:31.5766,x:624.1,y:542.45},0).wait(1).to({rotation:32.9322,x:623.3,y:541.7},0).wait(1).to({rotation:34.2878,x:622.55,y:541},0).wait(1).to({rotation:35.6434,x:621.8,y:540.2},0).wait(1).to({rotation:36.999,x:621.05,y:539.35},0).wait(1).to({rotation:38.3546,x:620.3,y:538.6},0).wait(1).to({rotation:39.7102,x:619.65,y:537.75},0).wait(3).to({_off:true},1).wait(193));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(354).to({_off:false},0).wait(1).to({regX:40.3,regY:36.5,rotation:-2.6682,x:618.9,y:535.3},0).wait(1).to({rotation:-5.3364,x:620.15,y:537.05},0).wait(1).to({rotation:-8.0047,x:621.55,y:538.7},0).wait(1).to({rotation:-10.6729,x:622.95,y:540.25},0).wait(1).to({rotation:-12.232,x:623.85,y:541.1},0).wait(1).to({rotation:-13.7911,x:624.75,y:542},0).wait(1).to({rotation:-15.3502,x:625.6,y:542.85},0).wait(1).to({rotation:-16.9093,x:626.55,y:543.65},0).wait(1).to({rotation:-18.965,x:627.8,y:544.7},0).wait(1).to({rotation:-21.0206,x:629.15,y:545.65},0).wait(1).to({rotation:-23.0763,x:630.5,y:546.65},0).wait(1).to({rotation:-25.132,x:631.85,y:547.55},0).to({_off:true},1).wait(148));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_kneeR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// kneeR
	this.instance = new lib.legshoe();
	this.instance.setTransform(711.2,624.55,1,1,3.2077,0,0,9.3,4.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(12).to({regX:7.8,regY:2.4,rotation:3.2068,x:711.15,y:624.5},0).wait(1).to({regX:29.9,regY:45.5,rotation:8.6952,x:735.7,y:670.45},0).wait(1).to({rotation:14.1826,x:740.55,y:671.7},0).wait(1).to({rotation:12.5075,x:750.45,y:668.35},0).wait(1).to({rotation:10.8324,x:760.3,y:665},0).wait(1).to({rotation:9.1573,x:770.15,y:661.55},0).wait(1).to({rotation:7.4822,x:780.05,y:658.1},0).wait(1).to({rotation:5.8071,x:784.55,y:654.75},0).wait(1).to({rotation:4.132,x:788.95,y:651.45},0).wait(1).to({rotation:2.4569,x:793.45,y:648.05},0).wait(1).to({rotation:0.7903,x:794.7,y:647.4},0).wait(1).to({rotation:-0.8763,x:796,y:646.8},0).wait(1).to({rotation:-2.5429,x:797.2,y:646.05},0).wait(1).to({rotation:-4.2095,x:798.4,y:645.4},0).wait(1).to({rotation:-5.8761,x:799.6,y:644.6},0).wait(1).to({rotation:-7.5427,x:800.8,y:643.85},0).wait(1).to({rotation:-9.2093,x:801.95,y:643},0).wait(1).to({rotation:-10.8759,x:803.05,y:642.15},0).wait(1).to({rotation:-12.5425,x:804.2,y:641.25},0).wait(1).to({rotation:-14.6888,x:805.5,y:640.05},0).wait(1).to({rotation:-16.8352,x:806.85,y:638.85},0).wait(1).to({rotation:-18.9815,x:808.1,y:637.55},0).wait(1).to({rotation:-21.1278,x:809.4,y:636.25},0).wait(1).to({rotation:-23.2741,x:810.55,y:634.9},0).wait(1).to({rotation:-25.4205,x:811.7,y:633.45},0).wait(1).to({rotation:-27.5668,x:812.75,y:632},0).wait(1).to({rotation:-26.8114,x:812.4,y:632.5},0).wait(1).to({rotation:-26.056,x:812,y:633},0).wait(1).to({rotation:-25.3007,x:811.65,y:633.5},0).wait(1).to({rotation:-24.5453,x:811.25,y:634.05},0).wait(1).to({rotation:-23.7899,x:810.8,y:634.55},0).wait(4).to({regX:9.2,regY:4.5,scaleX:0.9999,scaleY:0.9999,rotation:-36.2332,x:772.75,y:603.1},0).wait(2).to({regX:6.5,regY:3.6,rotation:-36.233,x:772.85,y:603.2},0).wait(1).to({regX:29.9,regY:45.5,rotation:-27.2331,x:812.75,y:629.7},0).wait(1).to({rotation:-18.2332,x:808.15,y:635.65},0).wait(1).to({scaleX:1,scaleY:1,rotation:-9.2334,x:802.6,y:640.8},0).wait(1).to({rotation:-0.2336,x:796.35,y:645},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:8.7663,x:789.5,y:648.15},0).wait(1).to({rotation:16.2656,x:783.45,y:649.95},0).wait(1).to({rotation:23.7649,x:777.25,y:651},0).wait(1).to({rotation:31.2643,x:771,y:651.15},0).wait(1).to({rotation:38.7636,x:764.7,y:650.5},0).wait(1).to({rotation:41.7634,x:762.3,y:650},0).wait(1).to({rotation:44.7632,x:759.85,y:649.4},0).wait(1).to({rotation:47.7629,x:757.4,y:648.7},0).wait(1).to({rotation:50.7627,x:755.05,y:647.8},0).wait(1).to({rotation:53.7625,x:752.75,y:646.8},0).wait(3).to({regX:9.3,regY:4.5,rotation:68.7675,x:772.75,y:603},0).wait(12).to({regX:6.5,regY:1.5,x:772.9,y:602.95},0).wait(1).to({regX:29.9,regY:45.5,rotation:63.6744,x:738.65,y:645.35},0).wait(1).to({rotation:58.5816,x:737.2,y:649.65},0).wait(1).to({rotation:53.4889,x:736,y:653.7},0).wait(1).to({rotation:48.3961,x:734.9,y:657.35},0).wait(1).to({rotation:43.3034,x:733.9,y:660.65},0).wait(1).to({rotation:39.5996,x:732.8,y:662.45},0).wait(1).to({rotation:35.8959,x:731.65,y:664.1},0).wait(1).to({rotation:32.1921,x:730.6,y:665.5},0).wait(1).to({rotation:28.4883,x:729.55,y:666.65},0).wait(1).to({rotation:24.7846,x:728.5,y:667.65},0).wait(1).to({rotation:21.0808,x:727.45,y:668.4},0).wait(1).to({x:725.9},0).wait(1).to({x:724.4},0).wait(1).to({x:722.9},0).wait(2).to({regX:9.4,regY:4.5,rotation:7.5043,x:717.95,y:624.5},0).wait(3).to({rotation:7.5043,x:712.55},0).to({_off:true},121).wait(156));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_kneeL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// kneeL
	this.instance = new lib.legshoe();
	this.instance.setTransform(649.3,621.65,1,1,0,-5.2187,174.7813,8.2,-0.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(163).to({_off:false},0).wait(1).to({regX:29.9,regY:45.5,skewX:-10.2183,skewY:169.7817,x:630.05,y:668.55},0).wait(1).to({skewX:-15.2178,skewY:164.7822,x:628.4,y:667},0).wait(1).to({skewX:-20.2173,skewY:159.7827,x:626.8,y:665.1},0).wait(1).to({skewX:-17.3632,skewY:162.6368,x:624.3,y:664.8},0).wait(1).to({skewX:-14.5092,skewY:165.4908,x:621.75,y:664.4},0).wait(2).to({regX:28.1,regY:-7.9,skewX:-6.4616,skewY:173.5384,x:614.15,y:616.1},0).wait(127).to({regX:6.1,regY:1.4,skewX:-6.4581,skewY:173.5419,x:630.35,y:623.8},0).wait(1).to({regX:29.9,regY:45.5,skewX:-4.4889,skewY:175.5111,x:606.1,y:669},0).wait(1).to({skewX:-2.5183,skewY:177.4817,x:600.65,y:667.65},0).wait(1).to({skewX:-0.5477,skewY:179.4523,x:595.15,y:666.3},0).wait(1).to({skewX:1.423,skewY:181.423,x:590.35,y:664},0).wait(1).to({skewX:3.3936,skewY:183.3936,x:585.65,y:661.7},0).wait(1).to({skewX:5.3642,skewY:185.3642,x:581,y:659.35},0).wait(1).to({skewX:7.3348,skewY:187.3348,x:576.3,y:656.95},0).wait(1).to({skewX:9.3055,skewY:189.3055,x:571.7,y:654.45},0).wait(1).to({skewX:11.2761,skewY:191.2761,x:567.1,y:651.9},0).wait(1).to({skewX:13.626,skewY:193.626,x:561.9,y:647.75},0).wait(1).to({skewX:15.9759,skewY:195.9759,x:556.8,y:643.55},0).wait(1).to({skewX:18.3258,skewY:198.3258,x:551.7,y:639.3},0).wait(1).to({skewX:20.6757,skewY:200.6757,x:546.75,y:634.9},0).wait(1).to({skewX:23.0256,skewY:203.0256,x:541.75,y:630.5},0).wait(1).to({skewX:24.3764,skewY:204.3764,x:538.7,y:628.25},0).wait(1).to({skewX:25.7272,skewY:205.7272,x:535.75,y:625.9},0).wait(1).to({skewX:27.078,skewY:207.078,x:532.85,y:623.6},0).wait(1).to({skewX:28.4289,skewY:208.4289,x:529.9,y:621.2},0).wait(1).to({skewX:29.7797,skewY:209.7797,x:527,y:618.9},0).wait(1).to({skewX:31.1305,skewY:211.1305,x:524.1,y:616.55},0).wait(1).to({skewX:32.4813,skewY:212.4813,x:521.25,y:614.15},0).wait(1).to({skewX:37.3435,skewY:217.3435,x:519.35,y:610.3},0).wait(1).to({skewX:42.2056,skewY:222.2056,x:517.75,y:606.4},0).wait(2).to({regX:10.6,regY:-4.2,scaleX:0.9999,scaleY:0.9999,skewX:38.937,skewY:218.937,x:558.35,y:568},0).wait(1).to({regX:29.9,regY:45.5,skewX:43.581,skewY:223.581,x:510.3,y:591.35},0).wait(1).to({skewX:48.225,skewY:228.225,x:508.75,y:588.1},0).wait(1).to({skewX:52.8691,skewY:232.8691,x:507.6,y:584.7},0).wait(1).to({skewX:57.5131,skewY:237.5131,x:506.75,y:581.25},0).wait(1).to({skewX:62.1571,skewY:242.1571,x:506.25,y:577.65},0).wait(1).to({skewX:53.1569,skewY:233.1569,x:506.7,y:584.95},0).wait(1).to({skewX:44.1568,skewY:224.1568,x:508.4,y:591.9},0).wait(1).to({skewX:35.1566,skewY:215.1566,x:511.3,y:598.35},0).wait(1).to({skewX:26.1565,skewY:206.1565,x:515.25,y:604},0).wait(1).to({skewX:17.1563,skewY:197.1563,x:520.25,y:608.8},0).wait(3).to({regX:9.9,regY:-0.1,skewX:5.2235,skewY:185.2235,x:553.9,y:568.3},0).wait(1).to({regX:29.9,regY:45.5,skewX:-0.0156,skewY:179.9844,x:533.85,y:613.85},0).wait(1).to({skewX:-5.2552,skewY:174.7448,x:538.15,y:615.5},0).wait(1).to({skewX:-10.4949,skewY:169.5051,x:542.5,y:616.75},0).wait(1).to({skewX:-15.7345,skewY:164.2655,x:546.95,y:617.6},0).wait(1).to({scaleX:1,scaleY:1,skewX:-20.9742,skewY:159.0258,x:551.55,y:618.05},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,skewX:-17.1824,skewY:162.8176,x:548.25,y:617.75},0).wait(1).to({skewX:-13.3907,skewY:166.6093,x:544.95,y:617.25},0).wait(1).to({skewX:-9.5989,skewY:170.4011,x:541.75,y:616.55},0).wait(1).to({scaleX:1,scaleY:1,skewX:-5.8072,skewY:174.1928,x:538.6,y:615.6},0).wait(1).to({skewX:-2.0154,skewY:177.9846,x:535.45,y:614.55},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,skewX:1.7763,skewY:181.7763,x:532.45,y:613.25},0).wait(1).to({scaleX:1,scaleY:1,skewX:5.5681,skewY:185.5681,x:529.55,y:611.75},0).wait(4).to({regX:14.1,regY:-5.1,scaleX:0.9999,scaleY:0.9999,skewX:5.2245,skewY:185.2245,x:553.95,y:568.35},0).wait(3).to({regX:6.2,regY:0.3,x:557.55,y:574.25},0).wait(1).to({regX:29.9,regY:45.5,skewX:1.4751,skewY:181.4751,x:536.65,y:620.4},0).wait(1).to({skewX:-2.2748,skewY:177.7252,x:543.6,y:623.5},0).wait(1).to({skewX:-6.0246,skewY:173.9754,x:550.6,y:626.45},0).wait(1).to({skewX:-9.7745,skewY:170.2255,x:557.75,y:629.2},0).wait(1).to({skewX:-6.9079,skewY:173.0921,x:558.35,y:631.6},0).wait(1).to({skewX:-4.0412,skewY:175.9588,x:559.1,y:633.95},0).wait(1).to({skewX:-1.1746,skewY:178.8254,x:559.8,y:636.2},0).wait(1).to({skewX:1.6921,skewY:181.6921,x:560.6,y:638.3},0).wait(1).to({skewX:2.3096,skewY:182.3096,x:564,y:639.35},0).wait(1).to({skewX:2.9271,skewY:182.9271,x:567.4,y:640.45},0).wait(1).to({skewX:3.5445,skewY:183.5445,x:570.75,y:641.55},0).wait(1).to({skewX:4.162,skewY:184.162,x:574.2,y:642.65},0).wait(1).to({skewX:1.4236,skewY:181.4236,x:580.9,y:645.85},0).wait(1).to({skewX:-1.3149,skewY:178.6851,x:587.75,y:648.95},0).wait(1).to({skewX:-4.0533,skewY:175.9467,x:594.65,y:651.9},0).wait(2).to({regX:14.1,regY:-5,skewX:-5.2167,skewY:174.7833,x:647.4,y:614.75},0).to({_off:true},9).wait(159));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_handR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// handR
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("AjtktQAQgNAWAEQAWADAOATIGWIEQAOASgBAWQgCAWgQANQgQAMgWgDQgWgEgOgTImWoDQgOgTABgWQACgWAQgMg");
	this.shape.setTransform(754.0999,428.0426);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFCC99").s().p("ADIE4QgWgEgOgTImWoDQgOgTABgWQACgWAQgMQAQgNAWAEQAWADAOATIGVIEQAPASgBAWQgCAWgQANQgNAJgQAAIgJAAg");
	this.shape_1.setTransform(754.0999,428.0426);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFCC99").s().p("AgIAmQgMgDgIgJQgJgKgBgMQgBgLAGgLQAGgLALgGQALgFAMADQAMACAJAIQAIAJACAMQADAMgGALQgGAMgMAGQgJAEgIAAIgIgBg");
	this.shape_2.setTransform(765.425,442.2583);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AgRAiQgLgFgGgLQgGgMADgLQABgMAKgJQAIgJAMgDQALgCAMAGQALAFAGAKQAGALgBAMQgBAMgIAJQgJALgOACIgHABQgJAAgIgFg");
	this.shape_3.setTransform(753.0759,450.2081);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(12,1,1).p("AiXlgQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgUAIgUgJQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHg");
	this.shape_4.setTransform(740.9682,435.1721,1,1,7.7063);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC99").s().p("ABwFhQgUgKgJgVIkCpbQgIgWAGgVQAHgVATgHQATgJAVAKQATAIAJAWIEDJcQAJAVgHAVQgHAVgTAIQgKAEgJAAQgKAAgLgFg");
	this.shape_5.setTransform(740.9682,435.1721,1,1,7.7063);

	this.instance = new lib.arm20();
	this.instance.setTransform(743.6,434.45,1,1,0,0,0,16.1,36.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{rotation:0,x:754.0999,y:428.0426}},{t:this.shape,p:{rotation:0,x:754.0999,y:428.0426}}]}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{rotation:0,x:754.0999,y:428.0426}},{t:this.shape,p:{rotation:0,x:754.0999,y:428.0426}}]},50).to({state:[{t:this.shape_3},{t:this.shape_1,p:{rotation:14.9992,x:745.8263,y:433.5722}},{t:this.shape,p:{rotation:14.9992,x:745.8263,y:433.5722}}]},85).to({state:[{t:this.shape_5,p:{rotation:7.7063,x:740.9682,y:435.1721}},{t:this.shape_4,p:{rotation:7.7063,x:740.9682,y:435.1721}}]},5).to({state:[{t:this.instance}]},44).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_5,p:{rotation:6.9703,x:741.4601,y:435.1271}},{t:this.shape_4,p:{rotation:6.9703,x:741.4601,y:435.1271}}]},1).to({state:[{t:this.shape_5,p:{rotation:10.4077,x:739.1909,y:435.6727}},{t:this.shape_4,p:{rotation:10.4077,x:739.1909,y:435.6727}}]},52).to({state:[]},137).wait(159));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(184).to({_off:false},0).wait(1).to({regX:16.2,rotation:1.3137,x:743.65,y:434.4},0).wait(1).to({rotation:2.6274,x:743.7},0).wait(1).to({rotation:3.9411,x:743.65},0).wait(3).to({_off:true},1).wait(348));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_handL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// handL
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.8,1,1).p("AAYAGQgDAKgJAFQgJAFgIgCQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJg");
	this.shape.setTransform(579.7753,484.3576,1,1,7.7133);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ACxkXQALAKAAASQABAUgLARIksHdQgLARgQAFQgPAFgLgKQgLgKgBgSQAAgUAKgRIEtneQALgRAPgFQAQgEALAKg");
	this.shape_1.setTransform(598.9377,462.2742,1,1,7.7133);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgFAYQgKgDgFgJQgFgJACgIQADgKAJgGQAJgFAJADQAJADAFAIQAFAJgCAJQgDAKgJAFQgGAEgGAAIgFgBg");
	this.shape_2.setTransform(579.7753,484.3576,1,1,7.7133);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AivEYQgLgKgBgSQgBgUALgRIEsneQAMgRAOgFQAQgEAMAKQALAKAAASQAAAUgKARIksHdQgMARgPAFIgJACQgJAAgIgHgAisDfQgIAFgDAKQgCAKAEAIQAGAJAKADQAJADAJgGQAJgFACgJQADgKgFgJQgFgJgKgCIgHgBQgGAAgGADg");
	this.shape_3.setTransform(598.9377,462.2742,1,1,7.7133);

	this.instance = new lib.arm19();
	this.instance.setTransform(611.25,437.4,1,1,0,0,0,27.6,4.6);
	this.instance._off = true;

	this.instance_1 = new lib.arm16();
	this.instance_1.setTransform(606.85,434.05);

	this.instance_2 = new lib.arm8();
	this.instance_2.setTransform(614.7,432.85,1,1,0,0,0,29.6,0);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3,p:{y:462.2742,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:484.3576,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:462.2742,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape,p:{y:484.3576,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}}]}).to({state:[{t:this.shape_3,p:{y:463.2242,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:485.3076,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:463.2242,rotation:7.7133,x:598.9377,scaleX:1,scaleY:1}},{t:this.shape,p:{y:485.3076,rotation:7.7133,x:579.7753,scaleX:1,scaleY:1}}]},130).to({state:[{t:this.shape_3,p:{y:463.2232,rotation:-7.2857,x:598.9809,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:489.5132,rotation:-7.2857,x:586.1868,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:463.2232,rotation:-7.2857,x:598.9809,scaleX:1,scaleY:1}},{t:this.shape,p:{y:489.5132,rotation:-7.2857,x:586.1868,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.shape_3,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.shape_3,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:466.1886,rotation:-22.2839,x:605.654,scaleX:1,scaleY:1}},{t:this.shape,p:{y:494.8931,rotation:-22.2839,x:600.0995,scaleX:1,scaleY:1}}]},5).to({state:[{t:this.shape_3,p:{y:464.9184,rotation:-14.564,x:602.224,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:492.6164,rotation:-14.564,x:592.864,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:464.9184,rotation:-14.564,x:602.224,scaleX:1,scaleY:1}},{t:this.shape,p:{y:492.6164,rotation:-14.564,x:592.864,scaleX:1,scaleY:1}}]},31).to({state:[{t:this.shape_3,p:{y:463.3016,rotation:-7.3213,x:599.1744,scaleX:1,scaleY:1}},{t:this.shape_2,p:{y:489.5983,rotation:-7.3213,x:586.3973,scaleX:1,scaleY:1}},{t:this.shape_1,p:{y:463.3016,rotation:-7.3213,x:599.1744,scaleX:1,scaleY:1}},{t:this.shape,p:{y:489.5983,rotation:-7.3213,x:586.3973,scaleX:1,scaleY:1}}]},2).to({state:[{t:this.instance}]},76).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_3,p:{y:467.2695,rotation:-33.8174,x:611.1895,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{y:496.5038,rotation:-33.8174,x:611.4862,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{y:467.2695,rotation:-33.8174,x:611.1895,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{y:496.5038,rotation:-33.8174,x:611.4862,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:0,rotation:0,x:606.85,y:434.05}}]},5).to({state:[{t:this.instance_1,p:{regX:3.7,regY:33.1,rotation:9.2157,x:605.2,y:467.3}}]},1).to({state:[{t:this.shape_3,p:{y:463.6575,rotation:-8.8301,x:599.8717,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{y:490.2801,rotation:-8.8301,x:587.7921,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{y:463.6575,rotation:-8.8301,x:599.8717,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{y:490.2801,rotation:-8.8301,x:587.7921,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[{t:this.instance_2}]},82).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_3,p:{y:467.1434,rotation:-31.2874,x:610.0451,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_2,p:{y:496.3613,rotation:-31.2874,x:609.0511,scaleX:0.9999,scaleY:0.9999}},{t:this.shape_1,p:{y:467.1434,rotation:-31.2874,x:610.0451,scaleX:0.9999,scaleY:0.9999}},{t:this.shape,p:{y:496.3613,rotation:-31.2874,x:609.0511,scaleX:0.9999,scaleY:0.9999}}]},1).to({state:[]},9).wait(159));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(254).to({_off:false},0).wait(1).to({regX:15.5,regY:30.5,rotation:-4.9996,x:601.45,y:464.25},0).wait(1).to({rotation:-9.9993,x:603.8,y:465},0).wait(1).to({rotation:-14.9989,x:606.2,y:465.5},0).wait(1).to({rotation:-17.056,x:607.25,y:465.65},0).wait(1).to({rotation:-19.1132,x:608.3,y:465.75},0).wait(1).to({rotation:-21.1703,x:609.25,y:465.9},0).wait(1).to({rotation:-23.2275,x:610.35,y:465.95},0).wait(2).to({_off:true},1).wait(275));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(353).to({_off:false},0).wait(1).to({regX:14.8,regY:30.8,rotation:-1.2186,x:600.55,y:463.95},0).wait(1).to({rotation:-2.4372,x:601.2,y:464.2},0).wait(1).to({rotation:-3.6557,x:601.85,y:464.5},0).wait(1).to({rotation:-4.8743,x:602.55,y:464.8},0).wait(1).to({rotation:-6.0929,x:603.2,y:465.05},0).wait(1).to({rotation:-7.3115,x:603.9,y:465.25},0).wait(1).to({rotation:-8.53,x:604.6,y:465.45},0).wait(1).to({rotation:-9.7486,x:605.3,y:465.7},0).wait(1).to({rotation:-10.9672,x:606,y:465.9},0).wait(1).to({rotation:-12.5894,x:606.95,y:466.1},0).wait(1).to({rotation:-14.2115,x:607.9,y:466.3},0).wait(1).to({rotation:-15.8337,x:608.85,y:466.5},0).wait(1).to({rotation:-17.4559,x:609.8,y:466.65},0).wait(4).to({_off:true},1).wait(168));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_fingersLEFT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fingersLEFT
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAJgdQACABABABQAFACAEAEQAIAKAAALQAAANgIAJQgEAEgFADQgEABgEABQgCAAgCAAQgLAAgIgJQgJgJAAgNQAAgLAJgKQAIgJALAAQAFAAAEABQACACABACQAKALABAOQABANgMAMQgDADgFAD");
	this.shape.setTransform(551.025,445.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AAZAzQgEAAg/AQQgvALgYgRQgJgGgHgKQgWgnAagjQAGgIAGgHQAWgaAZgQQAhgUAvgBQAbgBAWAGQAMAEALAFQAEACAEADQAQAJAIAMABwgGQgEAEgHAEAAXAbQADgOAKgKQALgKAQgCQADgBADAAQAJAAAIADQAIADAHAGQABAAATACQATACAAAUQAAAQgTAXQgEAEgFAFQgBACgCACQgLALgMAHQgRAJgSACQgiAEgGgQQgGgQAUgcQgCgHAAgIQAAgFAAgEQAYAVgWAD");
	this.shape_1.setTransform(540.1708,449.7053);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AADAfQgLAAgIgJQgJgJAAgNQAAgLAJgKQAIgJALAAQAFAAAEABIADAEQAKALABAOQABANgMAMIgIAGIgEAAg");
	this.shape_2.setTransform(550.7288,445.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AALBfQgGgQAUgcQgCgHAAgIIAAgJQANALAAAGQAAAFgLACQALgCAAgFQAAgGgNgLIAAAJQAAAIACAHQgEAAg/AQQgvALgYgRQgJgGgHgKQgWgnAagjIAMgPQAWgaAZgQQAhgUAvgBQAbgBAWAGQAMAEALAFIAIAFQAQAJAIAMQgEgCgFAAQgMAAgJAJQgJAKAAANQAAAMAJAJQAJAKAMAAIADAAIgLAIQgHgGgIgDQgIgDgJAAIgGABQgQACgLAKQgKAKgDAOQADgOAKgKQALgKAQgCIAGgBQAJAAAIADQAIADAHAGIAUACQATACAAAUQAAAQgTAXIgJAJIgDAEQgLALgMAHQgRAJgSACIgMABQgXAAgFgNgAAZAzIAAAAg");
	this.shape_3.setTransform(540.1708,449.7053);

	this.instance = new lib.hand2L();
	this.instance.setTransform(548.35,447.95,1,1,75.004,0,0,8.6,0.7);
	this.instance._off = true;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(1,1,1).p("AAshVQABAAALgPQALgQARAJQAPAJAKAcQABAFACAHQABACABADQAEAPAAANQgBATgHARQgOAegQgCQgRgDgPggQgHgBgHgDQgEgDgDgCQAegKgJATQgCAEgSA/QgNAvgaANQgKAEgMABQgtAAgSgqQgEgIgDgIQgMghgBgeQgBgmAXgqQANgXAQgQQAJgJALgGQADgDAFgDQAQgIAOgCAAqhjQACAGAAAIAAbgFQgLgKgEgNQgEgPAHgPQABgCABgDQAFgIAGgFQAHgGAJgD");
	this.shape_4.setTransform(547.2995,459);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#996600").ss(1,1,1).p("AgUgWQABgBACAAQADgDAGgCQAMgCALAGQALAGADAMQACAGAAAEQgBAEgBAFAgUgWQACAAACAAQAPgDANAGQAMAGAEAPQAAAFABAGQgBABgBACQgGAKgNADQgLADgLgGQgLgGgEgNQgDgLAGgKQADgFADgDg");
	this.shape_5.setTransform(548.575,447.7363);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AhgBeIgHgRQgMgggBgeQgBgmAXgqQANgXAQgQQAJgIALgHIAIgFQAQgJAOgCIgGAIQgGAKADAMQAEANALAGQAKAHAMgEQANgDAGgKIACgDQACAGAAAIQgJADgHAGQgGAFgFAHIgCAGQgFAJAAAJIACALQAEAPALAJQgLgJgEgPIgCgLQAAgJAFgJIACgGQAFgHAGgFQAHgGAJgDIAMgQQALgPARAKQAPAIAKAcIADAMIACAEQAEAQAAAOQgBASgHARQgOAfgQgDQgRgDgPggQAGgMgMAAIAAgBIgCABIgKACIgDABIAHAFQAHADAHABQgCADgSBAQgNAugaANQgKAFgMABQgtAAgSgqgAAwAEQgHgBgHgDIgHgFIADgBIAKgCIACgBIAAABQAMAAgGAMIAAAAg");
	this.shape_6.setTransform(547.2995,459);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#996600").s().p("AgNAXQgLgGgEgNQgDgLAGgKIAGgIIAEAAQAPgDANAGQAMAGAEAQIABAKIgCADQgGAKgNADIgIABQgHAAgHgEg");
	this.shape_7.setTransform(548.475,448.0139);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#996600").ss(1,1,1).p("AAdANQgBABgBACQgGAKgNADQgLADgLgGQgLgGgEgNQgDgLAGgKQADgFADgDQACAAACAAQAPgDANAGQAMAGAEAPQAAAFABAGgAgUgWQABgBACAAQADgDAGgCQAMgCALAGQALAGADAMQACAGAAAEQgBAEgBAF");
	this.shape_8.setTransform(536.925,463.9363);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFCC99").ss(1,1,1).p("AAwAEQgCAEgSA/QgNAvgaANQgKAEgMABQgtAAgSgqQgEgIgDgIQgMghgBgeQgBgmAXgqQANgXAQgQQAJgIALgHQADgDAFgDQAQgIAOgCAAshVQABAAALgPQALgQARAJQAPAJAKAcQABAFACAHQABACABADQAEAPAAANQgBATgHARQgOAfgQgDQgRgCgPghQgHgBgHgDQgEgCgDgDQAegKgJATAAqhjQACAGAAAIAAbgFQgLgKgEgNQgEgPAHgPQABgCABgDQAFgIAGgFQAHgGAJgD");
	this.shape_9.setTransform(535.6495,475.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFCC99").s().p("AhgBeIgHgRQgMgggBgeQgBgmAXgqQANgXAQgQQAJgIALgHIAIgFQAQgJAOgCIgGAIQgGAKADAMQAEANALAGQAKAHAMgEQANgDAGgKIACgDQACAGAAAIQgJADgHAGQgGAFgFAHIgCAGQgFAJAAAJIACALQAEAPALAJQgLgJgEgPIgCgLQAAgJAFgJIACgGQAFgHAGgFQAHgGAJgDIAMgQQALgPARAKQAPAIAKAcIADAMIACAEQAEAQAAAOQgBASgHARQgOAfgQgDQgRgDgPggQAGgMgMAAIAAAAIgCAAIgKACIgDABIAHAFQAHADAHABQgHgBgHgDIgHgFIADgBIAKgCIACAAIAAAAQAMAAgGAMQgCADgSBAQgNAugaAOQgKAEgMABQgtAAgSgqg");
	this.shape_10.setTransform(535.6495,475.2);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#996600").ss(1,1,1).p("AAZAUQgBABgBABQgJAIgNAAQgMAAgJgJQgJgIAAgNQAAgNAJgIQADgDAEgDQABAAACAAQAEgCAGAAQAMABAJAJQAJAIAAALQAAAHgBAFQgCAEgCAEgAgNgbQACAAACABQAOABAMAKQAKAIAAARQgBAEgBAG");
	this.shape_11.setTransform(553.275,481.9015);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFCC99").ss(1,1,1).p("AAsAWQgDACghA5QgYApgeAGQgLACgMgDQgrgLgHgtQgBgKgBgIQgDgiAHgdQAJgmAhgiQATgTATgMQALgFAMgEQAEgCAFgBQARgEAOACAAaAGQgIgLAAgOQAAgQAKgMQACgCACgDQAHgGAHgDQAIgEAKAAQAAAAAPgMQAPgNAOAOQAMAMACAeQAAAGAAAGQABACAAADQAAAPgEANQgFASgMAPQgVAagPgGQgQgHgGgjABBhQQAAAHgBAIAAaAGQAggCgOASQgGgDgGgGQgDgEgDgDg");
	this.shape_12.setTransform(549.2776,491.9637);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#996600").s().p("AADAdQgMAAgJgJQgJgIAAgNQgBgNAKgIIAHgGIAEABQANABAMAKQAKAIAAARIgCAKIgBACQgJAIgLAAIgCAAg");
	this.shape_13.setTransform(553.1,482.0265);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFCC99").s().p("AhFB/QgrgLgHgtIgCgSQgDgiAHgdQAJgmAhgiQATgTATgMQALgFAMgEIAJgDQARgEAOACIgHAGQgJAIAAAMQAAAOAJAJQAJAJANgBQANABAJgIIACgDQAAAHgBAIQgKAAgIAEQgHADgHAGIgEAFQgKAMAAAOIAAACIAAACQAAANAIAKQgIgKAAgNIAAgCIAAgCQAAgOAKgMIAEgFQAHgGAHgDQAIgEAKAAIAPgMQAPgNAOAOQAMAMACAeIAAAMIABAFQAAAPgEANQgFASgMAPQgVAagPgGQgQgHgGgjQAMgQgXAAIAAAAIAAAAIgHAAIAHAAIAAAAIAAAAQAXAAgMAQQgGgDgGgGIgGgHIAGAHQAGAGAGADQgDACghA5QgYApgeAGIgKABIgNgCgAAsAWIAAAAgAAsAWIAAAAg");
	this.shape_14.setTransform(549.2776,491.9637);

	this.instance_1 = new lib.arm18();
	this.instance_1.setTransform(608.55,542.05,1,1,0,0,0,20.5,1.2);
	this.instance_1._off = true;

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FFCC99").ss(1,1,1).p("Ag0hIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAQABAAACABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACQABACA0ApQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCQgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKQgBgFAAgGQgCgRADgOAANgYQACghAQARQgEAFgHAFQgDACgEAEQgNAFgOgCQgPgCgLgMQgBgBgCgEQgFgHgEgHQgCgIACgKAhDhMQAHABAIAD");
	this.shape_15.setTransform(618.5409,552.3402);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#996600").ss(1,1,1).p("AgdALQAAgBABgDQgCgFABgFQADgMAKgHQALgHAKABQAGAAAFADQADABAEAEAgdALQABgDABgBQADgNAMgLQAKgJAQACQAEACAFACQABAAACADQAGAJgCALQgCANgKAIQgJAHgNgBQgMgCgHgJQgDgFgDgDg");
	this.shape_16.setTransform(609.4431,546.8);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFCC99").s().p("AAnB+QgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKIgBgLQgCgRADgOIAGAIQAHAJAMACQAOABAJgHQAKgHACgNQACgMgGgJIgDgEQAHABAIADIgBAIIABAKIAJAOIADAFQALAMAPACIAEAAIAFAAQAJAAAJgDQAEgEADgCQAHgFAEgFIgBAAIAAgBIgBAAIAAAAQgEgEgDgBIgBAAIAAAAQgHAAgBAWQgJADgJAAIgFAAIgEAAQgPgCgLgMIgDgFIgJgOIgBgKIABgIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAIADABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACIA1ArQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCgAANgYIAAAAgAAVguIAAAAIABAAQADABAEAEIAAAAIABAAIAAABIABAAQgEAFgHAFQgDACgEAEQABgWAHAAg");
	this.shape_17.setTransform(618.5409,552.3402);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#996600").s().p("AgEAbQgNgCgHgJIgFgIIACgEQADgMALgMQAKgIARACIAJADIACAEQAHAJgDALQgCANgKAHQgHAGgLAAIgDAAg");
	this.shape_18.setTransform(609.4597,547.0122);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#FFCC99").ss(1,1,1).p("Ag0hIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAQABAAACABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACQABACA0ApQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCQgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKQgBgFAAgGQgCgRADgOAhDhMQAHABAIADAANgYQgNAFgOgCQgPgCgLgMQgBgBgCgEQgFgHgEgHQgCgIACgKAANgYQACghAQARQgEAFgHAFQgDACgEAEg");
	this.shape_19.setTransform(612.0409,556.5902);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#996600").s().p("AgEAbQgNgCgHgJIgFgIIACgEQADgMALgMQAKgIARACIAJADIACAEQAHAJgDALQgCANgKAHQgHAHgLAAIgDgBg");
	this.shape_20.setTransform(602.9597,551.2622);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFCC99").s().p("AAnB+QgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKIgBgLQgCgRADgOIAGAIQAHAJAMACQAOABAJgHQAKgHACgNQACgMgGgJIgDgEQAHABAIADQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAIADABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgjACIA1ArQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCgAgFgVQAJAAAIgDIAAAAIABAAQAEgEADgCQAHgFAEgFIgBAAIAAgBIgBAAQgDgEgDgBIgCAAIAAAAQgHAAgBAWIgBAAIAAAAQgIADgJAAIAAAAIgBAAIgDAAIgFAAQgPgCgLgMIgDgFIgJgOIgBgKIABgIIgBAIIABAKIAJAOIADAFQALAMAPACIAFAAIADAAIABAAIAAAAgAANgYIAAAAgAAVguIAAAAIACAAQADABADAEIABAAIAAABIABAAQgEAFgHAFQgDACgEAEQABgWAHAAg");
	this.shape_21.setTransform(612.0409,556.5902);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#FFCC99").ss(1,1,1).p("Ag0hIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAQABAAACABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgiACQAzgqgUAEQgYAEgoATQgoATgCgEQgFgHgEgHQgCgIACgKgAAfgnQAGAFAvAlQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCQgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKQgBgFAAgGQgCgRADgOAAfgnQABgBAAAAQgBAAAAAAgAAfgoQgEAFgHAFQgDACgEAEQAKgIAIgHAhDhMQAHABAIADAANgYQACghAQAR");
	this.shape_22.setTransform(616.2909,553.5902);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFCC99").s().p("AAnB+QgkgBgagLQglgPgdglQgQgVgKgWQgDgLgCgKIgBgLQgCgRADgOIAGAIQAHAJAMACQAOABAJgHQAKgHACgNQACgMgGgJIgDgEQAHABAIADIgBAIIABAKIAJAOIABABIAAAAQAFAAAWgKIAAAAIAFgCIABAAIAAgBIABAAIAEgCIACgBIABAAQAogTAYgEIAAAAIAAAAIACgBIAAAAIAAAAQANAAgpAjIgCACIgDACIADgCIACgCQApgjgNAAIAAAAIAAAAIgCABIAAAAIAAAAQgYAEgoATIgBAAIgCABIgEACIgBAAIAAABIgBAAIgFACIAAAAQgWAKgFAAIAAAAIgBgBIgJgOIgBgKIABgIQAAgBgLgRQgJgQAPgMQAOgKAeACQAGACAGAAIADABQAQABANAFQARAIAMAOQAYAZgIAOQgKAOgiACIgBAAIAAABIA1AqQAmAeABAeQABALgFANQgSAogtABQgKAAgHgCgAANgYIASgPIgSAPQAEgEADgCQAHgFAEgFIgBAAIAAgBIgBAAIAAAAQgEgEgDgBIgBAAIAAAAQgHAAgBAWIAAAAgAANgYIAAAAgAAVguIAAAAIABAAQADABAEAEIAAAAIABAAIAAABIABAAQgEAFgHAFQgDACgEAEQABgWAHAAg");
	this.shape_23.setTransform(616.2909,553.5902);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#FFCC99").ss(1,1,1).p("AAvgiQAEAHAjAwQAeAmgHAeQgCALgIAKQgcAigsgKQgJgDgHgDQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMQABgFABgFQADgRAGgNAgZhXQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABQACABACACQAPAFALAIQAOAMAIARQARAegMALQgMALghgGQA7gcgUgCQgZgBgsAIQgrAHgBgEQgDgIgBgIQAAgIAEgJgAgmhfQAGACAHAGAAogfQgDACgDABQgEACgEACQAKgfALAVIAAAAQABABABgBQgBAAgBAAQgDACgEABQAEgBADgC");
	this.shape_24.setTransform(625.0637,548.0289);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#996600").ss(1,1,1).p("AAcgOQABAAABAEQAEAKgGAKQgFAMgMAFQgKAEgMgEQgMgFgEgLQgCgFgBgEQAAgBACgBQgBgGACgFQAGgLAMgFQALgDALADQAFADAEADQADACADAFgAgeACQABgCACgBQAGgMAOgIQALgGAQAHQADADAFAD");
	this.shape_25.setTransform(618.3342,539.95);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#996600").s().p("AgLAZQgMgFgEgLIgDgJIADgDQAGgMAOgIQALgGAQAHIAIAGQAAAAABAAQAAAAAAABQAAAAAAABQABABAAABQAEAKgGAKQgFAMgMAFQgFACgGAAQgEAAgHgCg");
	this.shape_26.setTransform(618.3342,540.1935);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFCC99").s().p("AAbCGIgQgGQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMIACgKQADgRAGgNIAEAJQAEALAMAFQANAFAKgFQALgFAGgMQAFgLgEgKQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAQAGACAHAGQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABIAEADQAPAFALAIQAOAMAIARQARAegMALQgMALghgGQAsgVAAgGQAAgCgFgBIgBAAIgDAAIgEAAIAAAAIgCAAIgFAAIgFAAIgeAEIgBAAIgCAAIgJACIgBAAIgGABIAAAAIgBAAIgCAAIgDABIAAAAIgBAAIgNACIgDAAIgHABIgDAAIgCAAIgDAAIAAAAQgFAAgBgBQgDgIgBgIQAAgIAEgJQgEAJAAAIQABAIADAIQABABAFAAIAAAAIADAAIACAAIADAAIAHgBIADAAIANgCIABAAIAAAAIADgBIACAAIABAAIAAAAIAGgBIABAAIAJgCIACAAIABAAIAegEIAFAAIAFAAIACAAIAAAAIAEAAIADAAIABAAQAFABAAACQAAAGgsAVIgCAAQgEgJgFAAIAAAAIAAAAQgGAAgGATIAIgEIAGgDIgGADIgIAEQAGgTAGAAIAAAAIAAAAQAFAAAEAJIgHADIAHgDIAnA3QAeAmgHAeQgCALgIAKQgWAageAAQgJAAgLgCgAAvgiIAAAAIgHADIAHgDg");
	this.shape_27.setTransform(625.0637,548.0289);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FFCC99").ss(1,1,1).p("AgZhXQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABQACABACACQAPAFALAIQAOAMAIARQARAegMALQgMALghgGQA7gcgUgCQgZgBgsAIQgrAHgBgEQgDgIgBgIQAAgIAEgJgAgmhfQAGACAHAGAAvgiQAEAHAjAwQAeAmgHAeQgCALgIAKQgcAigsgKQgJgDgHgDQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMQABgFABgFQADgRAGgNAApgfIgBABQgDABgDABQgEACgEACQAKgfALAVQgDABgDACQADgBADgCQABABABgBQgBAAgBAAIAAAA");
	this.shape_28.setTransform(629.3137,542.2789);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#996600").ss(1,1,1).p("AgeACQAAgBACgBQgBgGACgFQAGgLAMgFQALgDALADQAFADAEADQADACADAFAgeACQABgCACgBQAGgMAOgIQALgGAQAHQADADAFADQABAAABAEQAEAKgGAKQgFAMgMAFQgKAEgMgEQgMgFgEgLQgCgFgBgEg");
	this.shape_29.setTransform(622.5842,534.2);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#FFCC99").s().p("AAbCGIgQgGQghgKgXgSQghgYgSgrQgKgZgDgXQgBgLABgMIACgKQADgRAGgNIAEAJQAEALAMAFQANAFAKgFQALgFAGgMQAFgLgEgKQAAgBAAAAQAAgBAAgBQAAAAgBAAQAAgBAAAAQAGACAHAGQAAgCgGgSQgFgSASgIQAQgGAcAJQAFAEAGABIAEADQAPAFALAIQAOAMAIARQARAegMALQgMALghgGQAsgVAAgGQAAgCgFgBIgIAAIAAAAIgCAAQgQAAgXADIgRADIgDABIgBAAIgCAAIgCABIgBAAIgEAAIAAAAIgNACIAAAAIgFABIgDAAIgBAAIgDAAIgDAAIAAAAQgFAAgBgBQgDgIgBgIQAAgIAEgJQgEAJAAAIQABAIADAIQABABAFAAIAAAAIADAAIADAAIABAAIADAAIAFgBIAAAAIANgCIAAAAIAEAAIABAAIACgBIACAAIABAAIADgBIARgDQAXgDAQAAIACAAIAAAAIAIAAQAFABAAACQAAAGgsAVIgCAAIAAAAIAnA3QAeAmgHAeQgCALgIAKQgWAageAAQgJAAgLgCgAAagYIAIgEIAGgCIABgBIAGgDIgGADIgBABIgGACIgIAEIABgCIAAgBQAGgPAFgBIAAAAIABAAQAEABAEAIIgGADIAGgDQgEgIgEgBIgBAAIAAAAQgFABgGAPIAAABIgBACIAAAAg");
	this.shape_30.setTransform(629.3137,542.2789);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#FFCC99").ss(1,1,1).p("AgFhhQABgBgBgUQAAgTARgCQASgCAZAQQAEAFAGADQACABABADQANAIAJALQALAPADATQAIAhgOAIQgPAHgegOQBBgMgUgHQgYgIgsgEQgrgEAAgEQgBgJABgHQACgIAGgIgAAzgaQADAHAUA3QATAtgOAbQgFAKgLAIQgkAagmgWQgIgEgGgGQgegSgSgXQgZgggGgvQgEgZADgYQACgLAFgLQACgFACgEQAHgQAKgLAgPhsQAFAEAFAHAAzgbQgDABgCABIgBAAIgCAAQgCABgEAAQgFAAgEABQASgbAFAXgAAzgaQABAAABAAQgBgBgBAAgAAugZQACgBADAA");
	this.shape_31.setTransform(625.9663,543.8603);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#996600").ss(1,1,1).p("AgegFQAAgBACgCQABgFAEgFQAIgJAMgBQANAAAJAGQAEAEADADQACADADAGAgegFQABgCADgBQAJgKAPgEQAMgDAOALQACAEAFAEQAAABAAADQABAKgIAJQgIAKgNACQgJACgMgIQgKgIgBgMQgBgEAAgEg");
	this.shape_32.setTransform(621.2766,533.72);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#996600").s().p("AgSAUQgKgIgBgLIgBgJIAEgCQAJgKAPgFQAMgCAOAKQACAEAFAEIAAAFQABAJgIAJQgIAKgNACIgDAAQgJAAgJgGg");
	this.shape_33.setTransform(621.2766,533.996);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#FFCC99").s().p("AgLCCQgIgEgGgGQgegSgSgXQgZgggGgvQgEgZADgYQACgLAFgLIAEgJQAHgQAKgLIABAKQABALAKAIQAMAIAKgCQANgCAIgKQAIgJgBgKIAAgFQAFAEAFAHQABgBgBgUQAAgTARgCQASgCAZAQQAEAFAGADQACABABADQANAIAJALQALAPADATQAIAhgOAIQgPAHgegOQAygJAAgGQAAgCgFgCQgYgIgsgEQgrgEAAgEIgBgIIABgIQACgIAGgIQgGAIgCAIIgBAIIABAIQAAAEArAEQAsAEAYAIQAFACAAACQAAAGgyAJIgCgBIAAABIAXA+QATAtgOAbQgFAKgLAIQgTAOgVAAQgRAAgRgKgAAcgXIAJgBIAGgBIACAAIABAAIAFgCIgBgBQgCgJgEAAIAAAAIgBAAQgFAAgIAMIgCACIAAAAIAAAAgAAugZIAFgBIgFABgAAcgXIAAAAIACgCQAIgMAFAAIABAAIAAAAQAEAAACAJIABABIgFACIgBAAIgCAAIgGABIgJABIAAAAgAAzgbIAAAAg");
	this.shape_34.setTransform(625.9663,543.8603);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#996600").ss(1,1,1).p("AgXgTQAAgBADAAQADgFAGgCQALgDALAFQAMAGAEAKQACAGABADQABADgBAHAgXgTQACgBADAAQAMgEAPAEQAMAEAHAQQAAAEACAGQAAABgCADQgFAJgLAEQgMAFgLgFQgKgDgGgNQgFgLAFgLQACgEACgEg");
	this.shape_35.setTransform(619.9583,533.1404);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#FFCC99").ss(1,1,1).p("AAwgBQgCAGgKA7QgGAwgZARQgJAGgOACQgsAEgXgmQgEgIgDgJQgQgegFgdQgFgnARgsQALgYAOgTQAIgJAIgHQAFgEAEgDQAOgKAOgEAAihbQABgBAIgRQAKgRARAHQAQAIAOAaQACAGADAFQABACAAADQAGAOADAOQACATgHARQgJAggQAAQgRgBgTgaQA+AUgOgPQgQgSgkgZQglgaACgEQAEgIAFgGQAFgGAKgDgAAehqQADAGABAJAAqgDIAAAAIgBAAIgBgBQgCgBgEgCQgEgCgFgBQAegPgIAXQgCAAgDgBQADABADABQAAAAABABQgBgCgBAAIABAB");
	this.shape_36.setTransform(619.9828,544.794);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#996600").s().p("AgLAYQgKgEgGgMQgFgMAFgKIAEgJIAFAAQANgEAOAEQANAEAHAQQgBAEACAFIgBAFQgFAJgLAEQgHACgGAAQgFAAgGgCg");
	this.shape_37.setTransform(619.925,533.4625);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFCC99").s().p("AhVBnQgEgIgDgJQgQgegFgdQgFgnARgsQALgYAOgTQAIgJAIgHIAJgHQAOgKAOgEIgEAJQgFAKAFANQAGAMAKAEQALAEAMgEQALgEAFgJIACgFQADAGABAJQgKADgFAGQgFAGgEAIIAAABQAAAEAjAZQAkAZAQASIABABQAEAFgGAAIAAAAIgBAAIgBAAIgLgCIAAAAIgMgDIAAAAIgIgDIgLgDIgBAAIgBAAIgBAAIABAAIABAAIABAAIALADIAIADIAAAAIAMADIAAAAIALACIABAAIABAAIAAAAQAGAAgEgFIgBgBQgQgSgkgZQgjgZAAgEIAAgBQAEgIAFgGQAFgGAKgDQABgBAIgRQAKgRARAHQAQAIAOAaQACAGADAFQABACAAADQAGAOADAOQACATgHARQgJAggQAAQgRgBgTgaIgCgCIABgCQAEgMgJAAIAAAAIgCAAQgFABgIADIAAAAIgBABIAAAAIgBAAIAAAAIgBABIAJADIAGADIABABIABAAIAAAAIAAAAIgBAAIgBgBIgGgDIgJgDIABgBIAAAAIABAAIAAAAIABgBIAAAAQAIgDAFgBIACAAIAAAAQAJAAgEAMIgBACIgFgBIAGACIgMBBQgGAwgZARQgJAGgOACIgIAAQgmAAgVgigAAqgDIAFABIABABIgGgCgAAvgCg");
	this.shape_38.setTransform(619.9828,544.794);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#FFCC99").ss(1,1,1).p("AAsAQQgDAGgZA3QgSAsgcAKQgLAEgOgDQgrgHgNgqQgCgKAAgIQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEQAFgDAFgCQAQgGAOAAAA2hKQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfQA3AlgKgTQgLgWgcghQgcgiADgEQAFgGAGgFQAHgEAKgBgAAoANIAAAAIgBAAIAAgBIgBgBQgCgCgDgDQgEgDgEgCQAhgFgOATIAAABQAAAAABABQAAgCgBAAQgCgBgCgBQACABACACAA2hZQACAHgCAI");
	this.shape_39.setTransform(617.2716,543.1271);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#996600").ss(1,1,1).p("AgRgZQABgBADABQAEgEAGAAQAMAAAJAHQAKAKACAKQAAAFgBAFQAAADgDAGAgRgZQACAAADABQAMgBAOAIQALAHADARQgCAEAAAGQAAABgCADQgHAHgMABQgMACgLgIQgIgGgDgOQgBgMAHgJQAEgDACgEg");
	this.shape_40.setTransform(620.0208,532.4109);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFCC99").s().p("Ag3CEQgrgHgNgqIgCgSQgIgiADgdQAFgnAcgmQARgVASgOQAKgHAKgEIAKgFQAQgGAOAAIgGAHQgHAJACANQABAOAJAGQALAIANgCQALgBAIgHIACgEQACAHgCAIQACAAAMgPQAOgOAPAMQANALAHAeQAAAGABAFQABADgBADQADAPgBAOQgDARgLAPQgRAegQgEQgQgGgMgfIAFADIAAAAIACABIAAAAIABABIABAAIACACIABAAQAXAQAIABIAAAAIACAAIAAAAQADAAgCgFIAAAAIgBgBIAAAAQgLgWgcghQgagfAAgGIABgBQAFgGAGgFQAHgEAKgBQgKABgHAEQgGAFgFAGIgBABQAAAGAaAfQAcAhALAWIAAAAIABABIAAAAQACAFgDAAIAAAAIgCAAIAAAAQgIgBgXgQIgBAAIgCgCIgBAAIgBgBIAAAAIgCgBIAAAAIgFgDIgBgCIAAgBIABAAIAAgBQAJgNgPAAIgBAAIAAAAIgMABIgBAAIAIAFIAFAFIABABIAAABIABAAIAAAAIAAAAIgBAAIAAgBIgBgBIgFgFIgIgFIABAAIAMgBIAAAAIABAAQAPAAgJANIAAABIgBAAIAAABIgEgCIAEADIgcA9QgSAsgcAKQgGACgIAAIgLgBgAAsAQIgEgDIAEACIAAABIAAAAg");
	this.shape_41.setTransform(617.2716,543.1271);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#996600").s().p("AgRAWQgIgGgDgOQgBgMAHgKIAGgHIAFABQAMAAAOAIQALAHADARQgCADAAAGIgCAFQgHAHgMABIgEAAQgKAAgJgGg");
	this.shape_42.setTransform(619.9375,532.5875);

	this.instance_2 = new lib.arm12();
	this.instance_2.setTransform(617.25,529.45,1,1,0,0,0,12,0);
	this.instance_2._off = true;

	this.instance_3 = new lib.arm9();
	this.instance_3.setTransform(610.95,554.1,1,1,0,0,0,6.9,3.6);
	this.instance_3._off = true;

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#996600").ss(1,1,1).p("AAegCQABABAAACQgCALgIAHQgJAKgNABQgKAAgLgKQgIgJAAgLQABgFgBgEQAAgBACgBQACgGAEgEQAKgIAMABQANABAIAHQAEAEACAFQACACABAHgAgegJQACgBADgCQAKgIAPgBQAMgCAOAMQAAAEAEAF");
	this.shape_43.setTransform(610.15,554.0497);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#FFCC99").ss(1,1,1).p("AAzgWQABAHANA6QANAugQAaQgHAKgMAGQgnAVgigaQgIgGgGgGQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKQACgEADgFQAJgPALgJAADhjQABgBABgVQACgSASAAQATABAXATQAEAFAFADQABABABAEQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQBCgFgTgIQgWgLgsgKQgqgJABgFQAAgJACgHQADgHAGgHgAgGhvQAGAEADAIAAvgVIgBAAIgBAAIAAAAIgCAAQgDgBgEAAQgGAAgDABQAWgaABAZQgCAAgBABQABgBADAAQAAABABAAQgBgBgBAAIABAA");
	this.shape_44.setTransform(613.8019,564.9242);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#996600").s().p("AgWARQgIgJgBgMQABgEgBgFIAGgCQAKgJAPgBQAMgCAOANQABAEADAEIABAFQgCAJgIAIQgJAJgNABIgBAAQgKAAgKgJg");
	this.shape_45.setTransform(610.15,554.3874);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFCC99").s().p("AgeB+IgOgMQgagXgQgYQgUgkgBgtQAAgbAFgXQAEgLAGgKIAFgJQAJgPALgJQABAEgBAFQAAAMAJAJQAKAKAKAAQAOgBAJgKQAIgHADgLIgCgEQAGAEADAIIACgWQACgSASAAQATABAXATQAEAFAFADIACAFQALAKAIAMQAJAPABAUQAEAhgPAHQgQAFgcgRQA0gEgBgGQAAgBgEgCQgWgLgsgKQgpgJAAgFIAAAAIACgQQADgHAGgHQgGAHgDAHIgCAQIAAAAQAAAFApAJQAsAKAWALQAEACAAABQABAGg0AEIgCgBIABAAIgEABIADgBQAAgMgFAAIgBAAIAAAAQgFAAgIAIIgBABIgBACIgBABIgBABIAJgBIAHABIACAAIAAAAIABAAIABAAIAEgBIAOBBQANAugQAaQgHAKgMAGQgRAJgRAAQgUAAgTgOgAAvgVIAAAAgAAugVIgBAAIAAAAIgCAAIgHgBIgJABIABgBIABgBIABgCIABgBQAIgIAFAAIAAAAIABAAQAFAAAAAMIgDABg");
	this.shape_46.setTransform(613.8019,564.9242);

	this.instance_4 = new lib.arm14();
	this.instance_4.setTransform(613.8,564.9,1,1,0,0,0,10.8,14);

	this.instance_5 = new lib.arm5();
	this.instance_5.setTransform(566.95,549.2,1,1,0,0,0,3.9,3.2);
	this.instance_5._off = true;

	this.instance_6 = new lib._2();
	this.instance_6.setTransform(572,552.2,1,1,0,0,0,5.8,7.9);
	this.instance_6._off = true;

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#996600").ss(1,1,1).p("AAegCQAAAAABAAQABABAAADQgCAKgJAIQgJAJgNABQgKAAgKgKQgJgJAAgLQAAgEgBgFQABgBAAAAQABAAABgBQACgHAFgDQAKgIALAAQANACAIAHQAEAFACAEQACADABAGgAgegKQACgBACAAQAKgJAQgCQAMgBANANQACADADAF");
	this.shape_47.setTransform(581.675,555.2747);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgRASgBQATABAXATQADAFAGAEQAAABACADQALAKAHALQAJAQABAUQAFAhgPAIQgQAEgdgRQBDgEgTgJQgXgLgrgKQgqgKAAgDQAAgKACgGQAEgIAFgIgAAzgWQgDAAAAABIAAAAIgBAAIgBgBIgBABIgBAAQgEgBgEAAQgFABgEAAQAXgaABAZIAAABQACAHANA5QANAtgRAbQgGAJgMAGQgnAWgjgaQgIgHgFgFQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIQABgFADgGQAJgOALgJAAwgVQAAgBADABQAAAAABAAQgBgBAAAAAgFhvQAFADADAI");
	this.shape_48.setTransform(585.336,566.1969);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#996600").s().p("AgVARQgJgKAAgLIgBgJIABAAIAEgCQAKgIAQgCQAMgBANAMIAFAIIABABQAAAAAAAAQAAABAAAAQABABAAABQAAAAAAABQgCAKgJAHQgJAJgNABIgBAAQgKAAgJgJg");
	this.shape_49.setTransform(581.675,555.6225);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgYQgUgkgCgtQAAgaAGgXQAEgNAGgIIAEgLQAJgOALgJIAAAJQAAAMAKAJQAJAKAKAAQAOgBAKgJQAIgIACgKQAAgBAAgBQAAgBAAgBQAAAAAAgBQgBAAAAAAQAFADADAIQgFAIgEAIQgCAGAAAKIAAAAQAAADAqAKQArAKAXALQAEACAAABQAAAGg0AEIgBgBIAAAAQgBgMgFAAIgBAAIgBAAQgEABgHAHIgBAAIAAABIgBAAIgBABIAAABIgCACIAJgBIAIABIABAAIABgBIABABIABAAIAAAAIAAAAIADgBIAAABIgCgBIAAAAIgBABIABgBIAAAAIACABIAPBAQANAtgRAbQgGAJgMAGQgSAKgSAAQgTAAgTgOgAA0gVQA0gEAAgGQAAgBgEgCQgXgLgrgKQgqgKAAgDIAAAAQAAgKACgGQAEgIAFgIQABAAABgVQADgRASgBQATABAXATQADAFAGAEIACAEQALAKAHALQAJAQABAUQAFAhgPAIIgHABQgOAAgYgOgAAvgVIgBgBIgBABIgBAAIgIgBIgJABIACgCIAAgBIABgBIABAAIAAgBIABAAQAHgHAEgBIABAAIABAAQAFAAABAMIAAAAIgDABIAAAAIAAAAgAAzgWIAAAAg");
	this.shape_50.setTransform(585.336,566.1969);

	this.instance_7 = new lib.arm11();
	this.instance_7.setTransform(585.3,551.7,1,1,0,0,0,10.8,-0.5);
	this.instance_7._off = true;

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#996600").ss(1,1,1).p("AADgeQABABABACQALAIAGAOQAEALgIARQgDACgDAFAADgeQABAAABABQAGAAAFAEQALAIACALQACANgFAJQgDAFgEADQgCADgFADIgBAAIAAAAQAAABgEABQgJABgKgGQgLgHgFgNQgDgJAHgLQAHgMAMgDQADgBAEgCQABAAAAABQAAAAAAAAg");
	this.shape_51.setTransform(566.0738,540.7821);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#FFCC99").ss(1,1,1).p("AAfA0QgHAEgzAbQgpAZgegKQgKgDgJgKQgfggAPgqQAFgJADgFQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEQAGAAAGABQAQAFAMAIAAfA1QAVBAAEgVQAEgZgBgsQgCgrADgBQALgCAFAAQAJACAJAEQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGQgBABgDACQgHAOgJAKQgNANgSAFQgfAOgMgNQgIgOAJghQABgBgBAAQAAgCgBAAQABAAAAACQAAABAAAAgAAeAyIAAAAIAAgCIAAAAIgBgBIAAgCQAAgEgBgEQgCgEgCgDQAgAOgZAIIAAAAABngYQgCAGgHAF");
	this.shape_52.setTransform(556.929,546.3689);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#996600").s().p("AgJAbQgLgHgFgNQgDgJAHgLQAHgMAMgDIAHgDIABABIAAAAIACADQALAIAGAOQAEALgIARQgDACgDAFIgBAAIAAAAIgEACIgDAAQgIAAgIgFg");
	this.shape_53.setTransform(565.769,540.7821);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFCC99").s().p("AAeBkQgIgOAJghQAAAAABAAQAAAAAAgBQAAAAAAAAQgBAAAAAAQALgDAAgFQAAgGgSgIIAEAHIABAIIAAACIABABIAAAAIAAACIAAAAIAAAAIAAgCIAAAAIgBgBIAAgCIgBgIIgEgHQASAIAAAGQAAAFgLADIAAAAIAAgCIgBAAIAAAAIAAAAIAAAAIABACIg6AfQgpAZgegKQgKgDgJgKQgfggAPgqIAIgOQAPggAVgVQAcgcAsgPQAZgGAYAAQANAAAJAEIAMABQAQAFAMAIIgJADQgMADgGAMQgHALADAKQAEANALAHQAKAGALgBIAEgBQgCAGgHAFQgJgEgJgCQgFAAgLACQgCABAAASIABAZIAAAXQAAAcgDASIAAABIAAAAQAAABAAABQgBABAAAAQAAABgBAAQAAAAgBAAIAAAAIgBAAIAAAAIgBgBIAAAAIgBgBQgFgGgIgYIgBgBIgCgGIgBgDIgBgDIgBgDIABADIABADIABADIACAGIABABQAIAYAFAGIABABIAAAAIABABIAAAAIABAAIAAAAQABAAAAAAQABAAAAgBQAAAAABgBQAAgBAAgBIAAAAIAAgBQADgSAAgcIAAgXIgBgZQAAgSACgBQALgCAFAAQAJACAJAEQABABAUgFQASgCAFASQAEASgMAbQgFAEgBAGIgEADQgHAOgJAKQgNANgSAFQgQAHgLAAQgKAAgGgGgAAfA0IgBgCIAAAAIAAAAIAAAAIABAAIAAACIAAAAg");
	this.shape_54.setTransform(556.929,546.3689);

	this.instance_8 = new lib.arm6();
	this.instance_8.setTransform(568.75,538.25,1,1,0,0,0,25.7,2.5);
	this.instance_8._off = true;

	this.instance_9 = new lib.arm4();
	this.instance_9.setTransform(616.75,554,1,1,0,0,0,9,-3.2);
	this.instance_9._off = true;

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#996600").ss(1,1,1).p("AgdgKQAAAAABgBQACgGAFgEQAKgIALAAQANACAIAHQAEAFACAEQACADABAGAgdgKQABgBACAAQALgIAPgDQAMAAAOAMQABADADAFIABAAIAAAAQABABAAADQgCAKgIAIQgKAJgNABQgKAAgJgKQgKgJAAgLQAAgEgBgFQABgBAAAAg");
	this.shape_55.setTransform(614.925,560.2747);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#FFCC99").ss(1,1,1).p("AADhkQABAAABgVQADgSARAAQAUABAXATQADAFAGADQAAABABADQAMALAHALQAJAQABATQAFAigQAIQgQAEgcgSQBCgEgSgJQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIgAAygWQADAIAMA5QANAtgQAaQgHAJgLAHQgnAWgjgaQgIgHgFgFQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIQACgGADgGQAJgOAKgJAgFhvQAFADADAIAAwgWIAAABIgCgBIAAAAIgBABIgCgBQgDgBgEAAQgGABgDABQAWgbABAaIAAAAQABABABgBQgBgBgBABQgBAAgBAAQABAAABAA");
	this.shape_56.setTransform(618.6095,571.2042);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#996600").s().p("AgUARQgKgJAAgMIgBgJIABAAIABAAIADgCQALgIAPgCQAMgBAOAMQABAEADAEIABABIAAAAIABAEQgCAKgIAIQgKAIgNABIgBAAQgKAAgIgJg");
	this.shape_57.setTransform(614.925,560.6252);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#FFCC99").s().p("AgeB+IgNgMQgbgXgPgZQgUgjgDgtQABgaAGgYQAEgMAFgIIAFgMQAJgOAKgJIABAJQAAANAKAJQAJAKAKgBQAOgBAKgIQAIgIACgLIgBgEQAFADADAIQABAAABgVQADgSARAAQAUABAXATQADAFAGADIABAEQAMALAHALQAJAQABATQAFAigQAIQgQAEgcgSQA0gDAAgGQAAgCgEgCQgYgKgrgKQgpgKAAgDQAAgLACgFQAEgIAFgIQgFAIgEAIQgCAFAAALQAAADApAKQArAKAYAKQAEACAAACQAAAGg0ADQAAAAAAAAQgBAAAAAAQAAAAAAAAQAAAAgBAAQAAgMgFAAIgBAAIAAAAQgFAAgIAJIAAABIgBABIAAAAIgDACIAJgCIAHABIACABIABgBIAAAAIACABIAAgBIACAAQADAIAMA5QANAtgQAaQgHAJgLAHQgSAKgRAAQgUAAgTgOgAArgWIgHgBIgJACIADgCIAAAAIABgBIAAgBQAIgJAFAAIAAAAIABAAQAFAAAAAMIgCAAIACAAIAAAAIgCAAIAAABIgCgBIAAAAIgBABgAAygWIAAAAg");
	this.shape_58.setTransform(618.6095,571.2042);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},61).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_7,p:{x:548.475,y:448.0139}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_10},{t:this.shape_7,p:{x:536.825,y:464.2139}},{t:this.shape_9},{t:this.shape_8}]},14).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},5).to({state:[{t:this.instance}]},5).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16,p:{x:609.4431,y:546.8}},{t:this.shape_15}]},1).to({state:[{t:this.shape_21},{t:this.shape_20,p:{x:602.9597,y:551.2622}},{t:this.shape_19},{t:this.shape_16,p:{x:602.9431,y:551.05}}]},19).to({state:[{t:this.shape_21},{t:this.shape_20,p:{x:602.9597,y:551.2622}},{t:this.shape_19},{t:this.shape_16,p:{x:602.9431,y:551.05}}]},1).to({state:[{t:this.shape_23},{t:this.shape_20,p:{x:607.2097,y:548.2622}},{t:this.shape_22},{t:this.shape_16,p:{x:607.1931,y:548.05}}]},1).to({state:[{t:this.shape_27},{t:this.shape_26,p:{x:618.3342,y:540.1935}},{t:this.shape_25},{t:this.shape_24}]},2).to({state:[{t:this.shape_30},{t:this.shape_26,p:{x:622.5842,y:534.4435}},{t:this.shape_29},{t:this.shape_28}]},2).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31}]},2).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31}]},1).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]},1).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39}]},2).to({state:[{t:this.instance_2}]},66).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43}]},1).to({state:[{t:this.instance_4,p:{rotation:0,x:613.8,y:564.9}}]},1).to({state:[{t:this.instance_4,p:{rotation:14.9996,x:607.8,y:564.85}}]},1).to({state:[{t:this.instance_4,p:{rotation:29.9992,x:585.25,y:564.85}}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]},1).to({state:[{t:this.instance_7}]},21).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51}]},1).to({state:[{t:this.instance_8}]},31).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55}]},1).to({state:[]},3).wait(162));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(61).to({_off:false},0).wait(1).to({regX:11.2,regY:14.2,rotation:80.6276,x:535.4,y:452.65},0).wait(1).to({rotation:86.2525,x:535.05,y:451.45},0).wait(1).to({rotation:91.8774,x:534.75,y:450.1},0).wait(1).to({rotation:97.5024,x:534.6,y:448.75},0).wait(1).to({rotation:103.1273,x:534.55,y:447.4},0).wait(1).to({rotation:108.7522,x:534.7,y:446.05},0).wait(1).to({rotation:114.3771,x:534.95,y:444.7},0).wait(1).to({rotation:120.002,x:535.35,y:443.4},0).wait(1).to({rotation:122.1448,x:535.55,y:442.95},0).wait(1).to({rotation:124.2876,x:535.7,y:442.45},0).wait(1).to({rotation:126.4304,x:535.95,y:441.95},0).wait(1).to({rotation:128.5731,x:536.15,y:441.55},0).wait(1).to({rotation:130.7159,x:536.4,y:441.1},0).wait(1).to({rotation:132.8587,x:536.7,y:440.65},0).wait(1).to({rotation:135.0015,x:536.95,y:440.2},0).wait(1).to({rotation:137.1443,x:537.25,y:439.8},0).wait(1).to({rotation:139.2871,x:537.55,y:439.4},0).wait(1).to({rotation:141.4299,x:537.9,y:439},0).wait(1).to({rotation:143.5726,x:538.2,y:438.55},0).wait(1).to({rotation:145.7154,x:538.55,y:438.2},0).wait(1).to({rotation:147.8582,x:538.95,y:437.9},0).wait(1).to({rotation:150.001,x:539.3,y:437.5},0).wait(1).to({rotation:146.6678,x:538.75,y:438.05},0).wait(1).to({rotation:143.3346,x:538.15,y:438.65},0).wait(1).to({rotation:140.0013,x:537.6,y:439.2},0).wait(1).to({rotation:136.6681,x:537.15,y:439.85},0).wait(1).to({rotation:133.3349,x:536.7,y:440.55},0).wait(1).to({rotation:130.0017,x:536.3,y:441.25},0).wait(1).to({rotation:126.6684,x:535.9,y:441.95},0).wait(1).to({rotation:123.3352,x:535.65,y:442.65},0).wait(1).to({rotation:120.002,x:535.35,y:443.4},0).wait(1).to({rotation:117.502,x:535.15,y:444},0).wait(1).to({rotation:115.002,x:535,y:444.55},0).wait(1).to({rotation:112.502,x:534.85,y:445.15},0).wait(1).to({rotation:110.0019,x:534.7,y:445.7},0).wait(1).to({rotation:107.5019,y:446.35},0).wait(1).to({rotation:105.0019,x:534.65,y:446.9},0).wait(1).to({rotation:102.5019,x:534.6,y:447.55},0).wait(1).to({rotation:100.0019,x:534.55,y:448.15},0).wait(1).to({rotation:97.5019,x:534.6,y:448.75},0).wait(1).to({rotation:95.0018,y:449.3},0).wait(1).to({rotation:92.5018,x:534.7,y:449.95},0).wait(1).to({rotation:90.0018,x:534.8,y:450.5},0).wait(1).to({rotation:87.694,x:534.95,y:451.05},0).wait(1).to({rotation:85.3863,x:535.1,y:451.6},0).wait(1).to({rotation:83.0785,x:535.25,y:452.1},0).wait(1).to({rotation:80.7707,x:535.45,y:452.65},0).wait(1).to({rotation:78.463,x:535.65,y:453.15},0).wait(1).to({rotation:76.1552,x:535.85,y:453.65},0).wait(1).to({rotation:73.8474,x:536.05,y:454.15},0).wait(1).to({rotation:71.5396,x:536.35,y:454.65},0).wait(1).to({rotation:69.2319,x:536.6,y:455.1},0).wait(1).to({rotation:66.9241,x:536.95,y:455.6},0).wait(1).to({rotation:64.6163,x:537.2,y:456.05},0).wait(1).to({rotation:62.3086,x:537.6,y:456.45},0).wait(1).to({rotation:60.0008,x:537.95,y:456.9},0).wait(3).to({_off:true},1).wait(24).to({_off:false,rotation:0,x:547.15,y:518.4},0).to({_off:true},5).wait(392));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(150).to({_off:false},0).wait(1).to({regX:13.2,regY:11.7,rotation:-23.212,x:605.95,y:554.55},0).wait(1).to({rotation:-38.2114,x:609.25,y:554.8},0).wait(1).to({rotation:-53.2108,x:612.5,y:554.2},0).wait(1).to({rotation:-64.584,x:614.8,y:553.15},0).wait(1).to({rotation:-75.9572,x:616.9,y:551.7},0).wait(1).to({_off:true},1).wait(385));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(254).to({_off:false},0).wait(1).to({regY:13.5,rotation:-4.2856,x:615.65,y:547.6},0).wait(1).to({rotation:-8.5712,x:614.1,y:552.2},0).wait(1).to({rotation:-12.8568,x:612.6,y:556.75},0).wait(1).to({rotation:-17.1424,x:611.65,y:556.45},0).wait(1).to({rotation:-21.428,x:610.7,y:556.1},0).wait(1).to({rotation:-25.7136,x:609.7,y:555.75},0).wait(1).to({rotation:-29.9992,x:608.7,y:555.25},0).wait(2).to({_off:true},1).wait(278));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(264).to({_off:false},0).wait(1).to({regX:10.7,regY:14,rotation:14.9996,x:611.95,y:565.05},0).wait(1).to({rotation:29.9992,x:609,y:565},0).wait(1).to({_off:true},1).wait(274));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(272).to({_off:false},0).wait(1).to({regX:10.6,regY:13.9,rotation:24.9998,x:569.1,y:560.85},0).wait(1).to({rotation:49.9997,x:564.25,y:559.45},0).wait(1).to({rotation:74.9995,x:560.1,y:555.8},0).wait(1).to({rotation:54.9996,x:563.85,y:558.15},0).wait(1).to({rotation:34.9996,x:568.15,y:559.15},0).wait(1).to({rotation:14.9997,x:572.45,y:558.6},0).to({_off:true},1).wait(263));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(279).to({_off:false},0).wait(1).to({regX:11.7,regY:13.2,rotation:7.5001,x:575.8,y:558},0).wait(1).to({rotation:15.0001,x:573.6,y:558.35},0).wait(1).to({rotation:22.5002,x:571.3,y:558.6},0).wait(1).to({rotation:30.0003,x:569,y:558.75},0).wait(1).to({rotation:37.5003,x:566.6,y:558.7},0).wait(1).to({rotation:45.0004,x:564.15,y:558.6},0).wait(1).to({rotation:41.2507,x:568.55,y:560.1},0).wait(1).to({rotation:37.5011,x:572.95,y:561.6},0).wait(1).to({rotation:33.7515,x:577.3,y:563.1},0).wait(1).to({rotation:30.0018,x:581.65,y:564.55},0).wait(2).to({_off:true},1).wait(250));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(313).to({_off:false},0).wait(1).to({regY:14,rotation:3.749,x:580.8,y:563.4},0).wait(1).to({rotation:7.498,x:576.25,y:560.65},0).wait(1).to({rotation:11.247,x:571.8,y:557.75},0).wait(1).to({rotation:14.9961,x:569.8,y:557.5},0).wait(1).to({rotation:18.7451,x:567.75,y:557.25},0).wait(1).to({rotation:22.4941,x:565.75,y:556.95},0).wait(1).to({rotation:26.2431,x:563.7,y:556.55},0).wait(1).to({_off:true},1).wait(220));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(353).to({_off:false},0).wait(1).to({regX:13.9,regY:10.6,rotation:-1.6665,x:560.3,y:547.95},0).wait(1).to({rotation:-3.3331,x:563.7,y:549.55},0).wait(1).to({rotation:-4.9996,x:567.05,y:551.1},0).wait(1).to({rotation:-6.6662,x:570.5,y:552.7},0).wait(1).to({rotation:-8.3327,x:573.9,y:554.25},0).wait(1).to({rotation:-9.9993,x:577.3,y:555.85},0).wait(1).to({rotation:-11.6658,x:580.7,y:557.4},0).wait(1).to({rotation:-13.3324,x:584.15,y:558.9},0).wait(1).to({rotation:-14.9989,x:587.6,y:560.45},0).wait(1).to({rotation:-17.9987,x:590,y:561.75},0).wait(1).to({rotation:-20.9985,x:592.4,y:562.95},0).wait(1).to({rotation:-23.9983,x:594.85,y:564.25},0).wait(1).to({rotation:-26.9981,x:597.3,y:565.4},0).wait(1).to({rotation:-29.9979,x:599.8,y:566.6},0).wait(3).to({_off:true},1).wait(171));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(371).to({_off:false},0).wait(1).to({regX:10.9,regY:14,rotation:9.9997,x:615.6,y:571.25},0).wait(1).to({rotation:19.9995,x:612.6,y:570.8},0).wait(1).to({rotation:29.9992,x:609.75,y:569.8},0).wait(2).to({_off:true},1).wait(165));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_fingerRIGHT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fingerRIGHT
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996600").ss(1,1,1).p("AAPgaQgBAAgDgBQgEgCgGAAQgMACgJAIQgJAJAAALQAAAGABAGQACADACAEAAPgaQgCAAgDABQgOABgLAJQgKAJAAAQQAAAEABAGQACABABACQAIAIANAAQAMgBAJgJQAJgIAAgNQABgMgJgIQgDgEgEgCg");
	this.shape.setTransform(777.9451,517.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(1,1,1).p("AgrAWQACACAiA5QAYApAeAGQAKACANgDQAqgMAIgsQABgKABgIQADgigHgdQgJglghgjQgSgTgVgLQgLgGgLgEQgEgCgFgBQgRgEgOACAgZAGQAIgLAAgOQAAgQgKgMQgCgDgCgCQgHgGgHgEQgIgDgKAAQAAgBgPgMQgPgMgOAOQgLAMgDAeQAAAFgBAHQAAACAAADQAAAPAEANQAFARALAQQAWAaAPgHQAQgHAGgiAgZAGQgggCAOASQAGgEAGgFQADgEADgDgAhAhQQAAAGABAJ");
	this.shape_1.setTransform(781.9833,527.6714);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996600").s().p("AgXAVIgDgDIgBgKQAAgQAKgJQALgJAOgBIAFgBQAEACADAEQAJAIgBAMQAAANgJAIQgJAJgMABQgNAAgIgIg");
	this.shape_2.setTransform(778.1264,517.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AAvCAQgegGgYgpQgig5gCgCQAGgEAGgFIAGgHIgGAHQgGAFgGAEIgBgBIAAAAIgBgBIAAAAIAAgBQgJgNAXAAIAAAAIAAAAIAGAAIgGAAIAAAAIAAAAQgXAAAJANIAAABIAAAAIABABIAAAAIABABQgGAigQAHQgPAHgWgaQgLgQgFgRQgEgNAAgPIAAgFIABgMQADgeALgMQAOgOAPAMIAPANQAKAAAIADQAHAEAHAGIAEAFQAKAMAAAQQAAAOgIALQAIgLAAgOQAAgQgKgMIgEgFQgHgGgHgEQgIgDgKAAIgBgPIACADQAJAIANAAQAMgBAJgJQAJgIABgOQAAgMgIgIQgEgEgEgCQAOgCARAEIAJADQALAEALAGQAVALASATQAhAjAJAlQAHAdgDAiIgCASQgIAsgqAMIgOACIgJgBgAgrAWIAAAAg");
	this.shape_3.setTransform(781.9833,527.6714);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(1,1,1).p("AgrAWQACACAiA5QAYApAeAGQAKACANgDQAqgMAIgsQABgKABgIQADgigHgdQgJglghgjQgSgTgVgLQgLgGgLgEQgEgCgFgBQgRgEgOACAgZAGQAIgLAAgOQAAgQgKgMQgCgDgCgCQgHgGgHgEQgIgDgKAAQAAgBgPgMQgPgMgOAOQgLAMgDAeQAAAFgBAHQAAACAAADQAAAPAEANQAFARALAQQAWAaAPgHQAQgHAGgiQAGgEAGgFQADgEADgDQgggCAOASAhAhQQAAAGABAJ");
	this.shape_4.setTransform(781.9833,527.6714);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#996600").ss(1,1,1).p("AAPgaQgCAAgDABQgOABgLAJQgKAJAAAQQAAAEABAGAAPgaQgBAAgDgBQgEgCgGAAQgMACgJAIQgJAJAAALQAAAGABAGQACADACAEQACABABACQAIAIANAAQAMgBAJgJQAJgIAAgNQABgMgJgIQgDgEgEgCg");
	this.shape_5.setTransform(777.9451,517.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AAvCAQgegGgYgpQgig5gCgCQAGgEAGgFIAGgHIgEAAIgCAAIAAAAIAAAAQgXAAAJANIAAABIAAAAIABABIAAAAIABABQgGAigQAHQgPAHgWgaQgLgQgFgRQgEgNAAgPIAAgFIABgMQADgeALgMQAOgOAPAMIAPANQAKAAAIADQAHAEAHAGIAEAFQAKAMAAAQQAAAOgIALQAIgLAAgOQAAgQgKgMIgEgFQgHgGgHgEQgIgDgKAAIgBgPIACADQAJAIANAAQAMgBAJgJQAJgIABgOQAAgMgIgIQgEgEgEgCQAOgCARAEIAJADQALAEALAGQAVALASATQAhAjAJAlQAHAdgDAiIgCASQgIAsgqAMIgOACIgJgBgAgrAWIAAAAgAgsAVIAAAAIgBgBIAAAAIAAgBQgJgNAXAAIAAAAIAAAAIACAAIAEAAIgGAHQgGAFgGAEIgBgBg");
	this.shape_6.setTransform(781.9833,527.6714);

	this.instance = new lib.hand1();
	this.instance.setTransform(776.9,517.95,1,1,0,0,0,7.2,3.4);
	this.instance._off = true;

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFCC99").ss(1,1,1).p("AgrAWQACACAiA5QAYApAeAGQAKACANgDQAqgMAIgsQABgKABgIQADgigHgdQgJglghgjQgSgTgVgLQgLgGgLgEQgEgCgFgBQgRgEgOACAg/hBQAAgBgPgMQgPgMgOAOQgLAMgDAeQAAAFgBAHQAAACAAADQAAAPAEANQAFARALAQQAWAaAPgHQAQgHAGgiAhAhQQAAAGABAJAgZAGQAIgLAAgOQAAgQgKgMQgCgDgCgCQgHgGgHgEQgIgDgKAAAgZAGQgggCAOASQAGgEAGgFQADgEADgDg");
	this.shape_7.setTransform(769.4833,537.2714);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#996600").ss(1,1,1).p("AAPgaQgBgBgDAAQgEgCgGgBQgMACgJAJQgJAJAAALQAAAGABAGQACADACAEQACABABACQAIAHANAAQAMAAAJgJQAJgIAAgNQABgNgJgIQgDgEgEgBQgCAAgDAAQgOABgLAKQgKAJAAAPQAAAFABAG");
	this.shape_8.setTransform(765.4451,527.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFCC99").s().p("AAvCAQgegGgYgpQgig5gCgCQAGgEAGgFIAGgHIgGAHQgGAFgGAEIgBgBIAAAAIAAAAQgLgPAYAAIAAAAIAAAAIAGAAQAIgLAAgOQAAgQgKgMIgEgFQgHgGgHgEQgIgDgKAAQAKAAAIADQAHAEAHAGIAEAFQAKAMAAAQQAAAOgIALIgGAAIAAAAIAAAAQgYAAALAPIAAAAIAAAAIABABQgGAigQAHQgPAHgWgaQgLgQgFgRQgEgNAAgPIAAgFIABgMQADgeALgMQAOgOAPAMIAPANIgBgPIACADQAJAIANAAQAMgBAJgJQAJgIABgOQAAgMgIgIQgEgEgEgCQAOgCARAEIAJADQALAEALAGQAVALASATQAhAjAJAlQAHAdgDAiIgCASQgIAsgqAMIgOACIgJgBgAgrAWIAAAAg");
	this.shape_9.setTransform(769.4833,537.2714);

	this.instance_1 = new lib.arm3();
	this.instance_1.setTransform(752.05,536.75,1,1,0,0,0,16.1,3.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2,p:{x:778.1264,y:517.775}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2,p:{x:778.1264,y:517.775}},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},9).to({state:[{t:this.instance}]},53).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_2,p:{x:778.1264,y:517.775}},{t:this.shape_3},{t:this.shape_5},{t:this.shape_1}]},1).to({state:[{t:this.shape_2,p:{x:765.6264,y:527.375}},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},15).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},33).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},55).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[]},127).wait(159));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(62).to({_off:false},0).wait(1).to({regX:12.3,regY:13,rotation:-5.6249,x:782.9,y:527},0).wait(1).to({rotation:-11.2499,x:783.75,y:526.35},0).wait(1).to({rotation:-16.8748,x:784.5,y:525.65},0).wait(1).to({rotation:-22.4998,x:785.2,y:524.85},0).wait(1).to({rotation:-28.1247,x:785.9,y:523.95},0).wait(1).to({rotation:-33.7497,x:786.45,y:523.05},0).wait(1).to({rotation:-39.3746,x:786.9,y:522.1},0).wait(1).to({rotation:-44.9996,x:787.3,y:521.1},0).wait(1).to({rotation:-45.5783,y:521},0).wait(1).to({rotation:-46.1571,x:787.35,y:520.9},0).wait(1).to({rotation:-46.7358,y:520.8},0).wait(1).to({rotation:-47.3145,x:787.4,y:520.65},0).wait(1).to({rotation:-47.8933,y:520.55},0).wait(1).to({rotation:-48.472,x:787.45,y:520.45},0).wait(1).to({rotation:-49.0507,y:520.35},0).wait(1).to({rotation:-49.6295,y:520.25},0).wait(1).to({rotation:-50.2082,x:787.5,y:520.15},0).wait(1).to({rotation:-50.7869,x:787.55,y:520},0).wait(1).to({rotation:-51.3657,y:519.95},0).wait(1).to({rotation:-51.9444,x:787.6,y:519.8},0).wait(1).to({rotation:-47.479,x:787.4,y:520.7},0).wait(1).to({rotation:-43.0135,x:787.15,y:521.45},0).wait(1).to({rotation:-38.5481,x:786.85,y:522.25},0).wait(1).to({rotation:-34.0826,x:786.5,y:523},0).wait(1).to({rotation:-29.6172,x:786.05,y:523.75},0).wait(1).to({rotation:-25.1517,x:785.6,y:524.4},0).wait(1).to({rotation:-20.6863,x:785.05,y:525.1},0).wait(1).to({rotation:-16.2208,x:784.45,y:525.7},0).wait(1).to({rotation:-11.7554,x:783.85,y:526.3},0).wait(1).to({rotation:-6.1764,x:783,y:526.9},0).wait(1).to({rotation:-0.5974,x:782.1,y:527.45},0).wait(1).to({rotation:4.9816,x:781.1,y:527.9},0).wait(1).to({rotation:10.5606,x:780.1,y:528.3},0).wait(1).to({rotation:16.1396,x:779.1,y:528.55},0).wait(1).to({rotation:21.7187,x:778.1,y:528.75},0).wait(1).to({rotation:27.2977,x:777.05,y:528.8},0).wait(1).to({rotation:32.8767,x:775.95,y:528.75},0).wait(1).to({rotation:38.4557,x:774.9,y:528.65},0).wait(1).to({rotation:44.0347,x:773.85,y:528.4},0).wait(1).to({rotation:49.6137,x:772.85,y:528},0).wait(1).to({rotation:55.1927,x:771.9,y:527.55},0).wait(1).to({rotation:52.4655,x:772.4,y:527.8},0).wait(1).to({rotation:49.7383,x:772.85,y:528.05},0).wait(1).to({rotation:47.0111,x:773.35,y:528.2},0).wait(1).to({rotation:44.2839,x:773.8,y:528.35},0).wait(1).to({rotation:41.5567,x:774.35,y:528.5},0).wait(1).to({rotation:38.8296,x:774.85,y:528.6},0).wait(1).to({rotation:36.1024,x:775.35,y:528.7},0).wait(1).to({rotation:33.3752,x:775.85},0).wait(1).to({rotation:30.648,x:776.35,y:528.8},0).wait(1).to({rotation:27.9208,x:776.85},0).wait(1).to({rotation:25.1936,x:777.4},0).wait(5).to({_off:true},1).wait(419));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(140).to({_off:false},0).wait(1).to({regX:10.8,regY:13.7,rotation:-14.9999,x:749.5,y:547.65},0).wait(1).to({rotation:-29.9997,x:752.4,y:547.95},0).wait(1).to({rotation:-44.9996,x:755.3,y:547.45},0).wait(1).to({rotation:-59.9995,x:757.95,y:546.25},0).wait(1).to({rotation:-63.7493,x:758.6,y:545.85},0).wait(1).to({rotation:-67.499,x:759.15,y:545.4},0).wait(1).to({rotation:-71.2488,x:759.65,y:544.9},0).wait(1).to({rotation:-74.9986,x:760.25,y:544.4},0).wait(1).to({rotation:-37.4993,x:753.85,y:547.8},0).wait(1).to({rotation:0,x:746.75,y:546.65},0).wait(1).to({regX:16.1,regY:3.8,x:752.05,y:536.75},0).wait(34).to({regX:10.8,regY:13.7,x:751.65,y:546.65},0).wait(1).to({x:756.55},0).wait(1).to({x:761.5},0).wait(4).to({regX:16.1,regY:3.9,rotation:-59.4259,x:772.15,y:540.55},0).wait(55).to({x:762.15},0).wait(2).to({regX:13.2,regY:2.5,scaleX:0.9999,scaleY:0.9999,rotation:-59.4258,x:753,y:542.55},0).wait(1).to({regX:10.8,regY:13.7,scaleX:1,scaleY:1,rotation:-54.4259,x:760.75,y:550.95},0).wait(1).to({rotation:-49.4261,x:759.9,y:551.65},0).wait(1).to({rotation:-44.4262,x:759.1,y:552.25},0).wait(2).to({regX:16.1,regY:4,rotation:-14.426,x:753.2,y:542.7},0).to({_off:true},127).wait(159));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Drape = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Drape
	this.instance = new lib.drape();
	this.instance.setTransform(644.35,334.3,1.0497,0.9885,0,0,0,592.3,400.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:590.8,regY:416.4,x:642.7,y:335.3},0).wait(1).to({y:320.4},0).wait(1).to({y:305.4},0).wait(1).to({y:290.35},0).wait(1).to({y:275.2},0).wait(1).to({y:260},0).wait(1).to({y:244.7},0).wait(1).to({y:229.3},0).wait(1).to({y:213.9},0).wait(1).to({y:198.35},0).wait(1).to({y:182},0).wait(1).to({y:156.05},0).wait(1).to({y:129.95},0).wait(1).to({y:103.7},0).wait(1).to({y:77.35},0).wait(1).to({y:56.55},0).wait(1).to({y:36.6},0).wait(1).to({y:16.6},0).wait(1).to({y:-3.55},0).wait(1).to({y:-23.75},0).wait(1).to({y:-42.85},0).wait(1).to({y:-61.55},0).wait(1).to({y:-80.3},0).wait(1).to({y:-99.2},0).wait(1).to({y:-118.1},0).wait(1).to({y:-132.75},0).wait(1).to({y:-145.45},0).wait(1).to({y:-158.2},0).wait(1).to({y:-171},0).wait(1).to({y:-183.85},0).wait(1).to({y:-196.75},0).wait(1).to({y:-206.3},0).wait(1).to({y:-215.05},0).wait(1).to({y:-223.8},0).wait(1).to({y:-232.6},0).wait(1).to({y:-241.55},0).wait(1).to({y:-261.3},0).wait(1).to({y:-281.1},0).wait(1).to({y:-299.15},0).wait(1).to({y:-309},0).wait(1).to({y:-318.9},0).wait(1).to({y:-328.8},0).wait(1).to({y:-341.9},0).wait(1).to({y:-358.55},0).wait(1).to({y:-375.3},0).wait(1).to({y:-392.15},0).wait(1).to({y:-395.4},0).wait(2).to({regX:592.3,regY:401.6,x:644.35,y:-419.95},0).wait(572));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_clouds = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// clouds
	this.instance = new lib.clouds3();
	this.instance.setTransform(11.25,371.45,0.5018,0.5018,0.0436,0,0,381.9,557.3);
	this.instance.alpha = 0.4102;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(417).to({_off:false},0).wait(1).to({regX:11.6,regY:35.9,rotation:0.0437,x:-170.6,y:168.5,alpha:0.41},0).wait(1).to({x:-166.8,y:162.6},0).wait(1).to({x:-151.35,y:162.85},0).wait(1).to({x:-135.95,y:163.15},0).wait(1).to({x:-120.55,y:163.4},0).wait(1).to({x:-105.15,y:163.65},0).wait(1).to({x:-89.75,y:163.9},0).wait(1).to({x:-74.35,y:164.2},0).wait(1).to({x:-58.95,y:164.45},0).wait(1).to({x:-43.55,y:164.7},0).wait(1).to({x:-28.15,y:164.95},0).wait(1).to({x:-12.75,y:165.25},0).wait(1).to({x:2.65,y:165.5},0).wait(1).to({x:18,y:165.75},0).wait(1).to({x:33.4,y:166},0).wait(1).to({x:48.85,y:166.3},0).wait(1).to({x:64.25,y:166.55},0).wait(1).to({x:79.65,y:166.8},0).wait(1).to({x:95.05,y:167.05},0).wait(1).to({x:110.45,y:167.35},0).wait(1).to({x:125.85,y:167.6},0).wait(1).to({x:141.25,y:167.85},0).wait(1).to({x:156.65,y:168.1},0).wait(1).to({x:172.05,y:168.4},0).wait(1).to({x:187.45,y:168.65},0).wait(1).to({x:202.85,y:168.9},0).wait(1).to({x:218.25,y:169.15},0).wait(1).to({x:233.65,y:169.45},0).wait(1).to({x:238,y:169.7},0).wait(1).to({x:242.35,y:169.95},0).wait(1).to({x:246.7,y:170.2},0).wait(1).to({x:251.05,y:170.45},0).wait(1).to({x:255.4,y:170.7},0).wait(1).to({x:259.75,y:170.95},0).wait(1).to({x:264.1,y:171.2},0).wait(1).to({x:268.45,y:171.45},0).wait(1).to({x:272.75,y:171.7},0).wait(1).to({x:277.1,y:171.95},0).wait(1).to({x:281.45,y:172.2},0).wait(1).to({x:285.8,y:172.45},0).wait(1).to({x:290.15,y:172.7},0).wait(1).to({x:294.5,y:172.95},0).wait(1).to({x:298.85,y:173.2},0).wait(1).to({x:303.2,y:173.45},0).wait(1).to({x:307.5,y:173.7},0).wait(1).to({x:311.85,y:174},0).wait(1).to({x:316.2,y:174.25},0).wait(1).to({x:320.55,y:174.5},0).wait(1).to({x:324.9,y:174.75},0).wait(1).to({x:329.25,y:175},0).wait(1).to({x:333.6,y:175.25},0).wait(1).to({x:337.95,y:175.5},0).wait(1).to({x:342.25,y:175.75},0).wait(1).to({x:346.6,y:176},0).wait(1).to({x:350.95,y:176.25},0).wait(1).to({x:355.3,y:176.5},0).wait(1).to({x:359.65,y:176.75},0).wait(1).to({x:364,y:177},0).wait(1).to({x:368.35,y:177.25},0).wait(1).to({x:372.7,y:177.5},0).wait(1).to({x:377,y:177.75},0).wait(1).to({x:381.35,y:178},0).wait(1).to({x:385.7,y:178.25},0).wait(1).to({x:390.05,y:178.5},0).wait(1).to({x:394.4,y:178.75},0).wait(1).to({x:398.75,y:179},0).wait(1).to({x:403.1,y:179.25},0).wait(1).to({x:407.45,y:179.5},0).wait(1).to({x:411.75,y:179.75},0).wait(1).to({x:416.1,y:180.05},0).wait(1).to({x:420.45,y:180.3},0).wait(1).to({x:424.8,y:180.55},0).wait(1).to({x:429.15,y:180.8},0).wait(1).to({x:433.5,y:181.05},0).wait(1).to({x:437.85,y:181.3},0).wait(1).to({x:442.2,y:181.55},0).wait(1).to({x:446.5,y:181.8},0).wait(1).to({x:450.85,y:182.05},0).wait(1).to({x:455.2,y:182.3},0).wait(1).to({x:456.35,y:181.55},0).wait(1).to({x:457.45,y:180.8},0).wait(1).to({x:458.55,y:180.05},0).wait(1).to({x:459.7,y:179.25},0).wait(1).to({x:460.8,y:178.5},0).wait(1).to({x:461.9,y:177.75},0).wait(1).to({x:463,y:177},0).wait(1).to({x:464.15,y:176.25},0).wait(1).to({x:465.25,y:175.5},0).wait(1).to({x:466.35,y:174.75},0).wait(1).to({x:467.5,y:174},0).wait(1).to({x:468.6,y:173.25},0).wait(1).to({x:469.7,y:172.45},0).wait(1).to({x:470.85,y:171.7},0).wait(1).to({x:471.95,y:170.95},0).wait(1).to({x:473.05,y:170.2},0).wait(1).to({x:474.2,y:169.45},0).wait(1).to({x:475.3,y:168.7},0).wait(1).to({x:476.4,y:167.95},0).wait(1).to({x:477.55,y:167.2},0).wait(1).to({x:478.65,y:166.45},0).wait(1).to({x:479.75,y:165.65},0).wait(1).to({x:480.9,y:164.9},0).wait(1).to({x:482,y:164.15},0).wait(1).to({x:483.1,y:163.4},0).wait(1).to({x:484.2,y:162.65},0).wait(1).to({x:485.35,y:161.9},0).wait(1).to({x:486.45,y:161.15},0).wait(1).to({x:487.55,y:160.4},0).wait(1).to({x:488.7,y:159.65},0).wait(1).to({x:489.8,y:158.85},0).wait(1).to({x:490.9,y:158.1},0).wait(1).to({x:492.05,y:157.35},0).wait(1).to({x:493.15,y:156.6},0).wait(1).to({x:494.25,y:155.85},0).wait(1).to({x:495.4,y:155.1},0).wait(1).to({x:496.5,y:154.35},0).wait(1).to({x:497.6,y:153.6},0).wait(1).to({x:498.75,y:152.85},0).wait(1).to({x:499.85,y:152.05},0).wait(1).to({x:500.95,y:151.3},0).wait(1).to({x:502.1,y:150.55},0).wait(1).to({x:503.2,y:149.8},0).wait(1).to({x:504.3,y:149.05},0).wait(1).to({x:505.4,y:148.3},0).wait(1).to({x:506.55,y:147.55},0).wait(1).to({x:507.65,y:146.8},0).wait(1).to({x:508.75,y:146.05},0).wait(1).to({x:509.9,y:145.25},0).wait(1).to({x:511,y:144.5},0).wait(1).to({x:512.1,y:143.75},0).wait(1).to({x:513.25,y:143},0).wait(1).to({x:514.35,y:142.25},0).wait(1).to({x:515.45,y:141.5},0).wait(1).to({x:516.6,y:140.75},0).wait(1).to({x:517.7,y:140},0).wait(1).to({x:518.8,y:139.25},0).wait(1).to({x:519.95,y:138.45},0).wait(1).to({x:521.05,y:137.7},0).wait(1).to({x:522.15,y:136.95},0).wait(1).to({x:523.3,y:136.2},0).wait(1).to({x:524.4,y:135.45},0).wait(1).to({x:525.5,y:134.7},0).wait(1).to({x:526.6,y:133.95},0).wait(1).to({x:527.75,y:133.2},0).wait(1).to({x:528.85,y:132.45},0).wait(1).to({x:529.95,y:131.65},0).wait(1).to({x:531.1,y:130.9},0).wait(1).to({x:532.2,y:130.15},0).wait(1).to({x:533.3,y:129.4},0).wait(1).to({x:534.45,y:128.65},0).wait(1).to({x:535.55,y:127.9},0).wait(1).to({x:536.65,y:127.15},0).wait(1).to({x:537.8,y:126.4},0).wait(1).to({x:538.9,y:125.65},0).wait(1).to({x:540,y:124.85},0).wait(1).to({x:541.15,y:124.1},0).wait(1).to({x:542.25,y:123.35},0).wait(1).to({x:543.35,y:122.6},0).wait(1).to({x:544.5,y:121.85},0).wait(1).to({x:545.6,y:121.1},0).wait(1).to({x:546.7,y:120.35},0).wait(1).to({x:547.8,y:119.6},0).wait(1).to({x:548.95,y:118.85},0).wait(1).to({x:550.05,y:118.05},0).wait(1).to({x:551.15,y:117.3},0).wait(1).to({x:552.3,y:116.55},0).wait(1).to({x:553.4,y:115.8},0).wait(1).to({x:554.5,y:115.05},0).wait(1).to({x:555.65,y:114.3},0).wait(1).to({x:556.75,y:113.55},0).wait(1).to({x:557.85,y:112.8},0).wait(1).to({x:559,y:112.05},0).wait(1).to({x:560.1,y:111.25},0).wait(1).to({x:561.2,y:110.5},0).wait(1).to({x:562.35,y:109.75},0).wait(1).to({x:563.45,y:109},0).wait(1).to({x:564.55,y:108.25},0).wait(1).to({x:565.7,y:107.5},0).wait(1).to({x:566.8,y:106.75},0).wait(1).to({x:567.9,y:106},0).wait(1).to({x:569,y:105.25},0).wait(1).to({x:570.15,y:104.45},0).wait(1).to({x:571.25,y:103.7},0).wait(1).to({x:572.35,y:102.95},0).wait(1).to({x:573.5,y:102.2},0).wait(1).to({x:574.6,y:101.45},0).wait(1).to({x:575.7,y:100.7},0).wait(1).to({x:576.85,y:99.95},0).wait(1).to({x:577.95,y:99.2},0).wait(1).to({x:579.05,y:98.45},0).wait(1).to({x:580.2,y:97.65},0).wait(1).to({x:581.3,y:96.9},0).wait(1).to({x:582.4,y:96.15},0).wait(1).to({x:583.55,y:95.4},0).wait(1).to({x:584.65,y:94.65},0).wait(1).to({x:585.75,y:93.9},0).wait(1).to({x:586.9,y:93.15},0).wait(1).to({x:588,y:92.4},0).wait(1).to({x:589.1,y:91.65},0).wait(1).to({x:590.2,y:90.85},0).wait(1).to({x:591.35,y:90.1},0).wait(1).to({x:592.45,y:89.35},0).wait(1).to({x:593.55,y:88.6},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bottonStart = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bottonStart
	this.start = new lib.botton();
	this.start.name = "start";
	this.start.setTransform(132.25,104.8,0.7873,0.7873);
	new cjs.ButtonHelper(this.start, 0, 1, 2, false, new lib.botton(), 3);

	this.replay = new lib.bottonreplay();
	this.replay.name = "replay";
	this.replay.setTransform(833.75,271.6,0.1405,0.1405);
	new cjs.ButtonHelper(this.replay, 0, 1, 2, false, new lib.bottonreplay(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},3).to({state:[{t:this.replay}]},615).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_armR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// armR
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#996633").ss(4.7,1,1).p("AAYAAQAAAJgIAHQgGAHgKAAQgJAAgGgHQgIgHAAgJQAAgJAIgHQAGgHAJAAQAKAAAGAHQAIAHAAAJg");
	this.shape.setTransform(775.5,455.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfkGIAAAUIAAH7QAAATgJANQgIAMgMABQgBAAAAAAIgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAHgMAMgBIACAAQAAAAABAAQABAAAAAAQALABAIALIAAABQAHAKACAN");
	this.shape_1.setTransform(775.4,481.675);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#996633").s().p("AgUAcQgKgIgDgLQgEgQALgNQAHgJAMgDQALgDALAFIABAAIAAABQAHAKACANQgCgNgHgKIAAgBQAKAFAFALIADAIQABAGgBAEIAAABIAAACQgCAJgHAIIgDADQgKAIgMAAIAAAAQgLAAgJgHgAgbAFQAAAJAHAHQAHAHAJAAQAJAAAHgHQAHgHAAgJIAAAAQAAgJgHgHQgHgHgJAAQgJAAgHAHQgHAHAAAJIAAAAgAAZAYIAAgUgAgUAVQgHgHAAgJQAAgJAHgHQAHgHAJAAQAJAAAHAHQAHAHAAAJIAAAAQAAAJgHAHQgHAHgJAAQgJAAgHgHgAATAFIAAAAgAAQgeIAAAAg");
	this.shape_2.setTransform(775.9532,454.9953);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC99").s().p("AABE2IgBAAQgLAAgJgNQgKgNAAgTIABoRQAAgTAJgNQAIgMALgBIACAAIABAAIABAAQALABAIALQgIgLgLgBQAPABALAMQAJAKACANIgDgIQgFgLgKgFIgBAAQgLgFgLADQgMADgHAJQgLANAEARQADALAKAIQAKAHAKAAQAMAAAKgIIADgDIAAH7QAAATgJANQgIAMgMABQAMgBAIgMQAJgNAAgTIAAn7QAHgIACgJIAAgCIABIOQAAATgMANQgLAMgQABIgBAAgAgcEpQgMgNAAgTIABoRQAAgTALgNQALgNAQAAQgLABgIAMQgJANAAATIgBIRQAAATAKANQAJANALAAQgPAAgNgNgAAfjygAgBk1IAAAAg");
	this.shape_3.setTransform(775.375,481.675);

	this.instance = new lib._1();
	this.instance.setTransform(756.85,479.7,1,1,0,0,0,4.1,5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3,p:{x:775.375,y:481.675,rotation:0}},{t:this.shape_2,p:{x:775.9532,y:454.9953,rotation:0}},{t:this.shape_1,p:{x:775.4,y:481.675,rotation:0}},{t:this.shape,p:{x:775.5,y:455.45,rotation:0}}]}).to({state:[{t:this.shape_3,p:{x:762.875,y:497.075,rotation:0}},{t:this.shape_2,p:{x:763.4532,y:470.3953,rotation:0}},{t:this.shape_1,p:{x:762.9,y:497.075,rotation:0}},{t:this.shape,p:{x:763,y:470.85,rotation:0}}]},135).to({state:[{t:this.shape_3,p:{x:751.825,y:505.725,rotation:0}},{t:this.shape_2,p:{x:752.4032,y:479.0453,rotation:0}},{t:this.shape_1,p:{x:751.85,y:505.725,rotation:0}},{t:this.shape,p:{x:751.95,y:479.5,rotation:0}}]},5).to({state:[{t:this.instance}]},44).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_3,p:{x:763.2653,y:505.6925,rotation:-14.9992}},{t:this.shape_2,p:{x:756.919,y:479.7723,rotation:-14.9992}},{t:this.shape_1,p:{x:763.2895,y:505.6861,rotation:-14.9992}},{t:this.shape,p:{x:756.5989,y:480.3288,rotation:-14.9992}}]},1).to({state:[{t:this.shape_3,p:{x:759.8098,y:505.1352,rotation:-19.8072}},{t:this.shape_2,p:{x:751.3133,y:479.8384,rotation:-19.8072}},{t:this.shape_1,p:{x:759.8333,y:505.1268,rotation:-19.8072}},{t:this.shape,p:{x:751.041,y:480.4197,rotation:-19.8072}}]},52).to({state:[{t:this.shape_3,p:{x:754.8815,y:506.1347,rotation:-10.0861}},{t:this.shape_2,p:{x:750.7784,y:479.7665,rotation:-10.0861}},{t:this.shape_1,p:{x:754.9061,y:506.1303,rotation:-10.0861}},{t:this.shape,p:{x:750.4119,y:480.2936,rotation:-10.0861}}]},3).to({state:[{t:this.shape_3,p:{x:751.3087,y:506.3208,rotation:-3.1114}},{t:this.shape_2,p:{x:750.4379,y:479.6497,rotation:-3.1114}},{t:this.shape_1,p:{x:751.3337,y:506.3195,rotation:-3.1114}},{t:this.shape,p:{x:750.0101,y:480.1283,rotation:-3.1114}}]},2).to({state:[]},132).wait(159));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(184).to({_off:false},0).wait(1).to({regY:31,rotation:-3.1474,x:758.25,y:505.6},0).wait(1).to({rotation:-6.2948,x:759.7,y:505.5},0).wait(1).to({rotation:-9.4422,x:761.1,y:505.35},0).wait(3).to({_off:true},1).wait(348));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_armL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// armL
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFCC99").ss(12,1,1).p("ACPDKQgIAGgMgFQgMgFgJgMIj1lZQgGgJgCgKQAAgCAAgEQAAgMAHgGQAJgFALAEQAIADAFAGQAFAEADAGID1FYQAJAMABANQABAMgKAFg");
	this.shape.setTransform(567.6046,469.4198);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFCC99").ss(12,1,1).p("ADQCHQgFAJgNgBQgNgBgNgHIlkjlQgIgHgHgIQAAgCgCgDQgEgMAEgIQAHgIAMAAQAIAAAHADQAGACAGAEIFjDlQAMAIAFALQAGALgHAJg");
	this.shape_1.setTransform(561.2585,479.255);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFCC99").ss(12,1,1).p("ADsBMQgCAKgNADQgNADgOgEImTiBQgKgEgJgGQgBgDgCgCQgHgKACgJQAEgKAMgDQAHgCAIACQAGgBAHADIGTCBQANAFAJAJQAHAJgEAKg");
	this.shape_2.setTransform(577.3383,491.4643);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FFCC99").ss(12,1,1).p("AD2gaQADAKgLAHQgLAIgOACImlAvQgKAAgLgCQgCgBgDgCQgLgGgBgJQAAgLAJgIQAGgEAIgCQAFgDAIAAIGkgvQAOAAAMAFQAKAEAAAMg");
	this.shape_3.setTransform(578.1719,502.8727);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(12,1,1).p("Agaj1QAKgDAHALQAIALACAOIAvGlQAAAKgCALQgBACgCADQgGALgJABQgLAAgIgJQgEgGgCgIQgDgFAAgIIgvmkQAAgOAFgMQAEgKAMAAg");
	this.shape_4.setTransform(603.9227,519.0781);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFCC99").ss(12,1,1).p("AhZjmQAJgFAKAJQAKAIAGANICaGLQADAJABALQgBADgBADQgDAMgIADQgLADgKgHQgGgEgDgHQgEgEgDgIIiZmJQgFgOACgMQACgMALgDg");
	this.shape_5.setTransform(594.6313,518.1524);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFCC99").ss(12,1,1).p("AiRjGQAHgIAMAGQAMAFAJALID7FWQAFAIAEAKQAAADAAADQAAAMgHAGQgKAGgLgFQgHgCgFgGQgEgDgFgHIj6lUQgJgMgBgMQgBgMAKgFg");
	this.shape_6.setTransform(601.4707,516.1051);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FFCC99").ss(12,1,1).p("AjAiaQAFgJANADQANACAMAIIFKEJQAIAGAHAJQAAADABACQADANgFAHQgIAIgMgBQgHgBgHgFQgFgCgHgFIlJkHQgMgKgEgKQgEgMAIgIg");
	this.shape_7.setTransform(608.4527,510.6784);

	this.instance = new lib.pants2();
	this.instance.setTransform(591.1,497.4,1,1,0,0,0,2.5,2.9);
	this.instance._off = true;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FFCC99").ss(12,1,1).p("AgHj3QAJgCAGALQAHAMACANIANGoQABAKgDALQgCACgBADQgIAKgIABQgLgCgGgJQgFgGAAgIQgCgFAAgJIgPmlQAAgPAFgLQAGgKAMABg");
	this.shape_8.setTransform(612.1042,524.4519);

	this.instance_1 = new lib.arm15();
	this.instance_1.setTransform(609.05,499.65);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFCC99").ss(12,1,1).p("AA2jwQAKgBADANQAEANgCANIhbGeQgCAKgFAKQgCABgCAEQgKAHgJgBQgKgFgEgKQgDgHABgIQAAgGACgHIBZmdQAEgOAHgJQAJgJALAFg");
	this.shape_9.setTransform(579.7208,519.72);

	this.instance_2 = new lib.arm13();
	this.instance_2.setTransform(591.7,491.6,1,1,0,0,0,24.9,-3.7);
	this.instance_2._off = true;

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FFCC99").ss(12,1,1).p("AAVj2QAKgBAFAMQAFAMAAAOIgkGmQgBAKgEALQgBABgCAEQgIAIgJAAQgMgDgEgKQgFgGABgIQgBgGAAgHIAkmlQACgPAGgKQAGgKAMADg");
	this.shape_10.setTransform(584.2,521.8154);

	this.instance_3 = new lib.arm10();
	this.instance_3.setTransform(591.75,491.6,1,1,0,0,0,11.7,-5.5);
	this.instance_3._off = true;

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FFCC99").ss(12,1,1).p("ABHjrQALAAACANQACANgCAPIh5GUQgCAKgHAJQgCABgCAEQgLAGgIgCQgLgFgCgKQgEgHADgIQABgGABgHIB4mVQAFgOAJgIQAIgJAKAGg");
	this.shape_11.setTransform(579.5104,517.7285);

	this.instance_4 = new lib.arm7();
	this.instance_4.setTransform(588,493.85,1,1,0,0,0,17,0);
	this.instance_4._off = true;

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FFCC99").ss(12,1,1).p("Agfj0QAKgEAHALQAHALAEAPIA1GjQACAKgDAKQgBACgBAFQgHAKgIABQgNAAgFgIQgHgGAAgIQgCgFgCgIIg1mjQgBgPAEgLQAEgLAMABg");
	this.shape_12.setTransform(613.5094,529.3367);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},129).to({state:[{t:this.shape_1}]},6).to({state:[{t:this.shape_2}]},5).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_4,p:{x:603.9227,y:519.0781}}]},5).to({state:[{t:this.shape_4,p:{x:597.5727,y:518.1781}}]},26).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.instance}]},72).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.instance_1,p:{regX:0,regY:0,x:609.05,y:499.65}}]},5).to({state:[{t:this.instance_1,p:{regX:3.1,regY:24.8,x:600.35,y:523.55}}]},1).to({state:[{t:this.instance_1,p:{regX:3.1,regY:24.8,x:588.6,y:522.65}}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.instance_3}]},21).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.instance_4}]},31).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.shape_12}]},1).to({state:[]},9).wait(135));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(254).to({_off:false},0).wait(1).to({regX:19.9,regY:16.2,rotation:9.9997,x:608.75,y:513.5},0).wait(1).to({rotation:19.9995,x:608.55,y:515.8},0).wait(1).to({rotation:29.9992,x:608,y:517.6},0).wait(1).to({rotation:35.1103,x:608.3,y:518.25},0).wait(1).to({rotation:40.2215,x:608.55,y:518.75},0).wait(1).to({rotation:45.3327,x:608.75,y:519.1},0).wait(1).to({rotation:50.4438,x:608.85,y:519.25},0).wait(2).to({_off:true},1).wait(251));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(284).to({_off:false},0).wait(1).to({regX:9.7,regY:23.5,rotation:-2.9998,x:577.95,y:519.5},0).wait(1).to({rotation:-5.9996,x:579.4,y:520.2},0).wait(1).to({rotation:-8.9993,x:580.95,y:520.8},0).wait(1).to({rotation:-11.9991,x:582.5,y:521.35},0).wait(1).to({rotation:-14.9989,x:584.05,y:521.8},0).wait(2).to({_off:true},1).wait(223));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(313).to({_off:false},0).wait(1).to({regX:4.2,regY:24.7,rotation:3.3289,x:582.95,y:520.7},0).wait(1).to({rotation:6.6578,x:581.65,y:519.55},0).wait(1).to({rotation:9.9866,x:580.45,y:518.25},0).wait(1).to({rotation:11.3528,x:579.75,y:517.9},0).wait(1).to({rotation:12.7191,x:579.1,y:517.6},0).wait(1).to({rotation:14.0853,x:578.45,y:517.2},0).wait(1).to({rotation:15.4515,x:577.8,y:516.85},0).wait(1).to({_off:true},1).wait(193));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(353).to({_off:false},0).wait(1).to({regX:8.5,regY:23.9,rotation:-1.6665,x:581.7,y:517.95},0).wait(1).to({rotation:-3.3331,x:583.95,y:518.15},0).wait(1).to({rotation:-4.9996,x:586.1,y:518.35},0).wait(1).to({rotation:-6.6662,x:588.35,y:518.55},0).wait(1).to({rotation:-8.3327,x:590.55,y:518.7},0).wait(1).to({rotation:-9.9993,x:592.8,y:518.85},0).wait(1).to({rotation:-11.6658,x:595.05,y:518.95},0).wait(1).to({rotation:-13.3324,x:597.25,y:519.05},0).wait(1).to({rotation:-14.9989,x:599.55,y:519.1},0).wait(1).to({rotation:-16.54,x:601.3,y:520.25},0).wait(1).to({rotation:-18.081,x:603.05,y:521.35},0).wait(1).to({rotation:-19.6221,x:604.85,y:522.45},0).wait(1).to({rotation:-21.1631,x:606.65,y:523.55},0).wait(1).to({rotation:-22.7042,x:608.35,y:524.6},0).wait(3).to({_off:true},1).wait(144));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.punocchiosed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AgrA7QgPgKgJgQQgJgQAAgRQAKAXAVANQAUANAZABQAVABAOgIQAIgDACgGQABgFgEgJQgFgJgMgKQgJgIAAgFQAAgKANgFQAQgGADgCQAHgGgDgGQgDgGgLAAQgUACgUAJIgIAEQAOgPAQgJQATgMAOADQAJABAHAIQAHAHAAAJQABANgJALQgHAJgNAFQALALADAHQAHALgBAMQgCAPgOALQgKAIgSADQgLADgKAAQgZAAgVgOg");
	this.shape.setTransform(159.7537,147.3108);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	// Layer_1
	this.instance = new lib.close_blink();
	this.instance.setTransform(145.45,116.65,0.8378,0.8133,0,0,180,20.2,15);

	this.instance_1 = new lib.close_blink();
	this.instance_1.setTransform(184.05,120.95,0.8773,0.7909,10.7341,0,0,20.2,15.1);

	this.instance_2 = new lib.nose();
	this.instance_2.setTransform(163.55,132.3,1,1,-8.2483,0,0,1.5,1.7);

	this.instance_3 = new lib.hat();
	this.instance_3.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_4 = new lib.hair();
	this.instance_4.setTransform(154.4,73.95,1,1,0,0,0,83,45.8);

	this.instance_5 = new lib.Tshirt();
	this.instance_5.setTransform(112,160.8,1,1,0,0,0,106.5,129.3);

	this.instance_6 = new lib.face_clean();
	this.instance_6.setTransform(138.4,-1.3,1,1,0,0,180,66.5,-70.6);

	this.instance_7 = new lib.pents_only();
	this.instance_7.setTransform(54.3,281.05,1,1,8.1949,0,0,12.3,-12.4);

	this.instance_8 = new lib.CachedBmp_21();
	this.instance_8.setTransform(146.05,205.5,0.5,0.5);

	this.instance_9 = new lib.arm3();
	this.instance_9.setTransform(12.95,320.2,1,1,0,14.426,-165.574,16.1,4);

	this.instance_10 = new lib.legshoe();
	this.instance_10.setTransform(118.75,392.25,0.9999,0.9999,5.2167,0,0,14.1,-5);

	this.instance_11 = new lib.legshoe();
	this.instance_11.setTransform(53.6,402,0.9999,0.9999,0,-7.5043,172.4957,9.4,4.5);

	this.instance_12 = new lib.thigh();
	this.instance_12.setTransform(52.35,384.15,0.9999,0.9999,0,14.9746,-165.0254,13.2,19.6);

	this.instance_13 = new lib.CachedBmp_20();
	this.instance_13.setTransform(4.3,169.5,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_19();
	this.instance_14.setTransform(34.8,96.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(2));

	// Layer_2
	this.instance_15 = new lib.thigh();
	this.instance_15.setTransform(113.45,360.1,0.9999,0.9999,0,3.9973,-176.0027,16.1,-1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.3,0,236.2,501.2);


(lib.walk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// pentsL
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(12,1,1).p("ADPlgIl1gSIgoLTIF2ASg");
	this.shape.setTransform(34.9798,34.3744,1,1,24.5455);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AjOFhIAorTIF1ASIgnLTg");
	this.shape_1.setTransform(34.9798,34.3744,1,1,24.5455);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{rotation:24.5455,x:34.9798,y:34.3744}},{t:this.shape,p:{rotation:24.5455,x:34.9798,y:34.3744}}]}).to({state:[{t:this.shape_1,p:{rotation:-14.3914,x:54.1491,y:42.6185}},{t:this.shape,p:{rotation:-14.3914,x:54.1491,y:42.6185}}]},4).to({state:[{t:this.shape_1,p:{rotation:-4.1952,x:48.8929,y:42.3636}},{t:this.shape,p:{rotation:-4.1952,x:48.8929,y:42.3636}}]},5).to({state:[{t:this.shape_1,p:{rotation:-14.3914,x:54.1491,y:42.6185}},{t:this.shape,p:{rotation:-14.3914,x:54.1491,y:42.6185}}]},5).to({state:[{t:this.shape_1,p:{rotation:24.5455,x:34.9798,y:34.3744}},{t:this.shape,p:{rotation:24.5455,x:34.9798,y:34.3744}}]},5).wait(1));

	// pents
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3333CC").s().p("AolC4IAAlvIRLAAIAAFvg");
	this.shape_2.setTransform(80.5,2.575);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(20));

	// pentsR
	this.instance = new lib.Symbol3();
	this.instance.setTransform(113.55,0.8,1,1,-22.4778,0,0,19.6,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({regX:19.7,rotation:-12.5015,x:113.6,y:-1.6},0).wait(5).to({rotation:9.5282,x:116.7,y:5.2},0).wait(5).to({rotation:-12.5015,x:113.6,y:-1.6},0).wait(5).to({regX:19.6,rotation:-22.4778,x:113.55,y:0.8},0).wait(1));

	// shoeL
	this.instance_1 = new lib.Symbol10();
	this.instance_1.setTransform(-20.1,135.15,1,1,0,0,0,38.5,48.6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#996633").ss(4.1,1,1).p("AAAgTQAJAAAGAGQAFAGAAAHQAAAJgFAGQgGAGgJAAQgIAAgGgGQgFgGAAgJQAAgHAFgGQAGgGAIAA");
	this.shape_3.setTransform(73.9348,108.4834,0.9999,0.9999,63.5175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC99").ss(12,1,1).p("AhPlbIBOAAIABAAIBQAAIAAK3IifAAg");
	this.shape_4.setTransform(44.6923,123.2196,0.9999,0.9999,63.5175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#323232").s().p("AgOAOQgFgFAAgJQAAgIAFgFQAGgGAIgBIABAAQAIABAFAGQAHAFgBAIQABAJgHAFQgFAHgJAAQgHAAgHgHg");
	this.shape_5.setTransform(73.9348,108.4834,0.9999,0.9999,63.5175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AhPFcIAAq3IBOAAQgIAAgGAGQgGAGAAAIQAAAJAGAGQAGAGAIAAQAIAAAGgGQAGgGAAgJQAAgIgGgGQgGgGgHAAIBQAAIAAK3g");
	this.shape_6.setTransform(44.6923,123.2196,0.9999,0.9999,63.5175);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#77422C").s().p("ABkD6QgbAAgbgJQgagLgQgUIgHgGIgHgJQgNgPgQgaIgBgDQhDhvg9iKQgXg0gGgbIgBgHQgEgbAGgYQAAgEADgFIgBgDIACgDQBVEHBzB1QBYBYBoACQgJAHgNAIIgTAGQgaAKgeAAIgDgBg");
	this.shape_7.setTransform(5.8105,159.7513);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#813E0C").s().p("AgYC3Qhzh1hVkHQAEgVAOgRQAMgRAVgLQAVgKAXABQAVAAASAGQATAGACAFQAMACAHAFQAJAFAIAeQAqCBA6BoQA6BmAhg3QAgg3ARA3IACADQASA8gCAmQgDAogUAeQgNAUgVAPQhpgChXhYg");
	this.shape_8.setTransform(9.0649,154.4705);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#77422C").s().p("AB5BXQiBAEiXgRQg3gFgbgJIgHgCQgZgKgSgRQgDgDgDgEIgDgBIgCgDQEPA5CegqQB4giA2hYQACAMAAAPQgBAKgDAKQgGAcgQAbQgNAWgVATQgWARgaAFIgJADIgMACQgSAEggABIgDgBg");
	this.shape_9.setTransform(58.55,191.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#813E0C").s().p("AkdBqQgRgNgHgVQgJgTABgYQACgXAMgSQAKgTAPgNQAOgNAFABQAIgJAIgFQAJgFAdAJQCGAbB3ABQB2AAghg3Qgfg3A4AMQAAAAABAAQAAgBAAAAQABAAABABQAAAAABAAQA9ANAgAWQAhAUAQAiQAMAVACAZQg2BZh4AiQhEARhWAAQh3AAicghg");
	this.shape_10.setTransform(56.8643,183.3002);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#77422C").s().p("ABxCSIgKgBIgLgEQgSgGgbgPIgDgCQhwg/h7hYQgtgigTgUIgEgGQgRgWgHgXQgCgEAAgFIgCgDIAAgDQDOC5CdAsQB4AgBcgzQgFAMgHAMIgNAPQgTAWgcAQQgXANgcAGIgOABQgUAAgSgIg");
	this.shape_11.setTransform(-29.325,174.3704);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#813E0C").s().p("ABICvQidgsjOi5QgHgUAEgWQACgVANgUQANgTAUgKQASgLATgEQAUgEAEADQALgEAJAAQAKABAWAVQBlBbBmA9QBmA7AAg/QABhAAqAnIADACQAuApARAjQASAkgDAkQgBAZgLAWQg4AfhDAAQgqAAgvgMg");
	this.shape_12.setTransform(-28.9289,164.4956);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_5,p:{rotation:63.5175,x:73.9348,y:108.4834}},{t:this.shape_4,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_3,p:{rotation:63.5175,x:73.9348,y:108.4834}}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_6,p:{rotation:3.2571,x:47.2371,y:137.784}},{t:this.shape_5,p:{rotation:3.2571,x:48.9478,y:105.0835}},{t:this.shape_4,p:{rotation:3.2571,x:47.2371,y:137.784}},{t:this.shape_3,p:{rotation:3.2571,x:48.9478,y:105.0835}}]},5).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_5,p:{rotation:63.5175,x:73.9348,y:108.4834}},{t:this.shape_4,p:{rotation:63.5175,x:44.6923,y:123.2196}},{t:this.shape_3,p:{rotation:63.5175,x:73.9348,y:108.4834}}]},5).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_6,p:{rotation:33.5179,x:-13.4842,y:119.9482}},{t:this.shape_5,p:{rotation:33.5179,x:4.4728,y:92.5649}},{t:this.shape_4,p:{rotation:33.5179,x:-13.4842,y:119.9482}},{t:this.shape_3,p:{rotation:33.5179,x:4.4728,y:92.5649}}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:39.7,regY:47.4,x:-18.9,y:133.95},0).wait(2).to({_off:true},1).wait(16));

	// shoeR
	this.instance_2 = new lib.Symbol5();
	this.instance_2.setTransform(160.3,95.2,1,1,-24.758,0,0,19.8,5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(4).to({regX:19.9,rotation:1.909,x:142.95,y:102.15},0).wait(5).to({regY:4.9,scaleX:0.9999,scaleY:0.9999,rotation:102.614,x:95.2,y:99.2},0).wait(5).to({regY:5,scaleX:1,scaleY:1,rotation:1.909,x:142.95,y:102.15},0).wait(5).to({regX:19.8,rotation:-24.758,x:160.3,y:95.2},0).wait(1));

	// kneeR
	this.instance_3 = new lib.Symbol4();
	this.instance_3.setTransform(148.05,75.9,1,1,-29.4405,0,0,11,20.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(4).to({rotation:-14.4413,x:136,y:75.85},0).wait(5).to({scaleX:0.9999,scaleY:0.9999,rotation:15.5575,x:103.6},0).wait(5).to({scaleX:1,scaleY:1,rotation:-14.4413,x:136},0).wait(5).to({rotation:-29.4405,x:148.05,y:75.9},0).wait(1));

	// kneeL
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFCC99").ss(12,1,1).p("AAfDjIjQhSICTlzIDQBSg");
	this.shape_13.setTransform(8.8216,80.8423,0.9127,0.9999,0,46.0808,-133.9176);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFCC99").s().p("AiwCRICSlzIDPBSIiSFzg");
	this.shape_14.setTransform(8.8216,80.8423,0.9127,0.9999,0,46.0808,-133.9176);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}},{t:this.shape_13,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}}]}).to({state:[{t:this.shape_14,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}},{t:this.shape_13,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}}]},4).to({state:[{t:this.shape_14,p:{skewX:21.8854,skewY:-158.1129,x:50.3002,y:83.4422}},{t:this.shape_13,p:{skewX:21.8854,skewY:-158.1129,x:50.3002,y:83.4422}}]},5).to({state:[{t:this.shape_14,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}},{t:this.shape_13,p:{skewX:6.8865,skewY:-173.1118,x:61.7334,y:86.8304}}]},5).to({state:[{t:this.shape_14,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}},{t:this.shape_13,p:{skewX:46.0808,skewY:-133.9176,x:8.8216,y:80.8423}}]},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.6,-15.8,297.1,216.60000000000002);


(lib.legwalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.walk();
	this.instance.setTransform(148.6,118.55,1,1,0,0,0,90,82.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(1,1,1).p("AHqAhIAAhBIvTAAIAABB");
	this.shape.setTransform(141.475,3.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legwalk, new cjs.Rectangle(0,-1,297.1,226.5), null);


(lib.open_smail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.open_mouth();
	this.instance.setTransform(0,0.15,0.284,0.4041,-14.9965,0,0,69.8,25.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.open_smail, new cjs.Rectangle(-22.1,-15.1,44.2,30.4), null);


(lib.hairpinocchioboy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.hair();
	this.instance.setTransform(83,45.8,1,1,0,0,0,83,45.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("AAGhlQAHBsgUBf");
	this.shape.setTransform(137.911,78.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hairpinocchioboy, new cjs.Rectangle(0,0,166.1,91.6), null);


(lib.facewhitsmail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.sed();
	this.instance.setTransform(85.7,76.35,1.7623,2.041,-135.0003,0,0,4.8,3.7);

	this.instance_1 = new lib.face_clean();
	this.instance_1.setTransform(66.45,-70.6,1,1,0,0,180,66.5,-70.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.facewhitsmail, new cjs.Rectangle(0,0,141.3,103.7), null);


(lib.blink = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.open_eye();
	this.instance.setTransform(9.2,13.2,1,1,0,0,0,9.2,13.2);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFBD97").ss(1,1,1).p("AhLgOQBLA8BMg8");
	this.shape.setTransform(9.25,7.1813);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(0.1,1,1).p("ABMhnQADAGACAGQAMAdAAAjQAAA2gbAmQgbAngnAAQgmAAgbgnQgbgmAAg2QAAgjALgdQADgGADgG");
	this.shape_1.setTransform(9.25,16.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFBD97").ss(0.1,1,1).p("AhLAcQAFgJAFgJQAbglAmAAQAnAAAbAlQAFAJAFAJ");
	this.shape_2.setTransform(9.25,2.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AAAANIgDAAIgEgCQgEgCgCgFQgBgEABgDQABgEAEgCQAEgDAEAAIAAgBQAGACADACQAEADABAFQABAEgDADQgDAFgGACIgDABIAAgBg");
	this.shape_3.setTransform(6.5518,20.0083);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AhABBQgcgmAAg2QAAgjALgdIAGgMQBLA9BMg9IAFAMQAMAdAAAjQAAA2gbAmQgbAngnAAQglAAgbgngAgjAdQgDADgBAEQgCAEACAEQACAEADACIAEACIADABIAEgBQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgCgIgCIAAABIgBAAQgDAAgEACg");
	this.shape_4.setTransform(9.25,16.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFBD97").s().p("AhLANQAFgJAGgIQAbgnAlAAQAnAAAbAnQAFAIAFAJQgmAfgmAAQglAAgmgfg");
	this.shape_5.setTransform(9.25,4.3563);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FFBD97").ss(1,1,1).p("AhLgdQBKB2BNh2");
	this.shape_6.setTransform(9.25,8.6108);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhABBQgcgmAAg2QAAgjALgdIAGgMQBKB1BNh1IAFAMQAMAdAAAjQAAA2gbAmQgbAngnAAQglAAgbgngAgjAdQgDADgBAEQgCAEACAEQACAEADACIAEACIADABIAEgBQAGgBAEgFQACgEgBgFQgBgFgEgCQgCgCgIgCIAAABIgBAAQgDAAgEACg");
	this.shape_7.setTransform(9.25,16.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFBD97").s().p("AhLAAQAFgKAGgIQAbgnAlAAQAnAAAbAnQAFAIAFAKQgnA6glAAQgmAAglg6g");
	this.shape_8.setTransform(9.25,5.7858);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFBD97").ss(1,1,1).p("AhhgQQADACADACQBcA7Bhg9");
	this.shape_9.setTransform(9.25,12.6094);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(0.1,1,1).p("ABfhMQgFAIAAANQAAA3gbAmQgbAngmAAQgmAAgbgnQgbgmAAg3QAAgKABgJ");
	this.shape_10.setTransform(9.5,18.825);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhDAmQgbgmAAg3IABgTQBcA8Bgg+QgFAIAAANQAAA3gbAmQgbAnglAAQgnAAgbgngAglACQgEACgBAEQgBAEABAEQACAFAEACIADACIAEAAIADAAQAGgCAEgFQACgDgBgFQAAgFgEgDQgDgCgHgBIAAABIgBAAQgEAAgDACg");
	this.shape_11.setTransform(9.5,18.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFBD97").s().p("AhbAqIgGgEIAMgcIAFgKQAMgaAEgGQAbgmAlAAQAnAAAbAmQADAFALAaIARApQgxAfgwAAQgtAAgugdg");
	this.shape_12.setTransform(9.25,7.1344);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FFBD97").ss(1,1,1).p("AhhgmQADACADACQBbCTBiiV");
	this.shape_13.setTransform(9.25,14.8325);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhDAmQgbgmAAg3IABgTQBaCUBiiWQgFAIAAANQAAA3gbAmQgbAnglAAQgnAAgbgngAglACQgEACgBAEQgBAEABAEQACAFAEACIADACIAEAAIADAAQAGgCAEgFQACgDgBgFQAAgFgEgDQgDgCgHgBIAAABIgBAAQgEAAgDACg");
	this.shape_14.setTransform(9.5,18.825);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFBD97").s().p("AhbAUIgGgEIAMgbIAFgKQAMgcAEgFQAbgnAlAAQAnAAAbAnQADAFALAaIARApQgxBMgwAAQguAAgthKg");
	this.shape_15.setTransform(9.25,9.3575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FFBD97").ss(0.1,1,1).p("ABehHQgDAGAAAJQAAA3gbAmQgbAnglAAQgnAAgbgnQgbgmAAg3QAAgKABgJ");
	this.shape_16.setTransform(9.3625,18.925);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#FFBD97").ss(1,1,1).p("Ahhg2QADACADACQAZA7AaAaQAIAIAIAFQA4AjA/iCQABgDACgC");
	this.shape_17.setTransform(9.25,16.4929);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AAFAHIgDgBIgDgCQgDgCgCgDIgBgFQAHAHAIAFIgCABIgBAAg");
	this.shape_18.setTransform(5.9373,20.6952);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFBD97").s().p("AhABdQgcgmAAg3IABgSQAZA7AaAbQgagbgZg7IgGgEIAMgcIAFgKQAMgbAEgGQAbgnAlAAQAnAAAbAnQADAFALAaIARAqIgCAGIgBACIAAAAIgBACIAAAAQgwBhgtABIAAAAIAAAAQgMAAgMgHIAAAAQgIgFgIgIIABAEQACAFADABIAEADIADAAIADAAIAAAAQAMAHAMAAIAAAAIAAAAQAtgBAwhhIAAAAIABgCIAAAAIABgCQgCAGAAAIQAAA3gbAmQgbAngnAAQglAAgbgng");
	this.shape_19.setTransform(9.25,13.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},4).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_6}]},5).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_3},{t:this.shape_10},{t:this.shape_9}]},5).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},6).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},5).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},5).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},5).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_3},{t:this.shape_10},{t:this.shape_13}]},5).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_6}]},4).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape_6}]},5).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},5).to({state:[{t:this.instance}]},6).to({state:[{t:this.instance}]},8).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1,21.5,28.5);


(lib.Scene_1_head = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// head
	this.instance = new lib.face_clean();
	this.instance.setTransform(627.75,221.2,1,1,0,0,0,66.5,-70.6);

	this.instance_1 = new lib.open_smail();
	this.instance_1.setTransform(615.4,374.1,1.2459,1.2459);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance},{t:this.instance_1}]},85).to({state:[{t:this.instance}]},66).to({state:[{t:this.instance}]},16).to({state:[{t:this.instance}]},17).to({state:[]},196).wait(190));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(184).to({_off:true},196).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eyeR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeR
	this.instance = new lib.close_blink();
	this.instance.setTransform(621.75,337.25,0.9325,0.9325,0,0,0,20.5,15.1);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(621.45,337.35,0.8113,0.8113,0,0,0,9.3,13.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},74).to({state:[]},306).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_eyeL = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eyeL
	this.instance = new lib.close_blink();
	this.instance.setTransform(582.7,345,0.9325,0.9325,0,-14.9974,165.0026,15.7,13.8);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(582.9,344.4,0.8384,0.8384,-14.9974,0,0,9.4,13.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},74).to({state:[]},306).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.punocchionormal = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.blink();
	this.instance.setTransform(147,99.95,0.8113,0.8113,0,0,180,9.2,0);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(189.25,109.9,0.7819,0.7819,0,23.7045,-156.2955,10.6,0.8);

	this.instance_2 = new lib.nose();
	this.instance_2.setTransform(163.55,132.3,1,1,-8.2483,0,0,1.5,1.7);

	this.instance_3 = new lib.hat();
	this.instance_3.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_4 = new lib.hair();
	this.instance_4.setTransform(154.4,73.95,1,1,0,0,0,83,45.8);

	this.instance_5 = new lib.Tshirt();
	this.instance_5.setTransform(112,160.8,1,1,0,0,0,106.5,129.3);

	this.instance_6 = new lib.open_smail();
	this.instance_6.setTransform(150.75,151.6,1.2459,1.2459,0,0,180);

	this.instance_7 = new lib.face_clean();
	this.instance_7.setTransform(138.4,-1.3,1,1,0,0,180,66.5,-70.6);

	this.instance_8 = new lib.pents_only();
	this.instance_8.setTransform(54.3,281.05,1,1,8.1949,0,0,12.3,-12.4);

	this.instance_9 = new lib.CachedBmp_21();
	this.instance_9.setTransform(146.05,205.5,0.5,0.5);

	this.instance_10 = new lib.arm3();
	this.instance_10.setTransform(12.95,320.2,1,1,0,14.426,-165.574,16.1,4);

	this.instance_11 = new lib.legshoe();
	this.instance_11.setTransform(118.75,392.25,0.9999,0.9999,5.2167,0,0,14.1,-5);

	this.instance_12 = new lib.legshoe();
	this.instance_12.setTransform(53.6,402,0.9999,0.9999,0,-7.5043,172.4957,9.4,4.5);

	this.instance_13 = new lib.thigh();
	this.instance_13.setTransform(52.35,384.15,0.9999,0.9999,0,14.9746,-165.0254,13.2,19.6);

	this.instance_14 = new lib.CachedBmp_17();
	this.instance_14.setTransform(4.3,169.5,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_16();
	this.instance_15.setTransform(34.8,96.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(2));

	// Layer_2
	this.instance_16 = new lib.thigh();
	this.instance_16.setTransform(113.45,360.1,0.9999,0.9999,0,3.9973,-176.0027,16.1,-1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1.3,0,236.2,501.2);


(lib.punocchioinlove = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_101
	this.ikNode_27 = new lib.arm8();
	this.ikNode_27.name = "ikNode_27";
	this.ikNode_27.setTransform(14.75,250.65,1,1,158.7954,0,0,-0.1,61.6);

	this.timeline.addTween(cjs.Tween.get(this.ikNode_27).wait(32));

	// Armature_103
	this.ikNode_30 = new lib.arm3();
	this.ikNode_30.name = "ikNode_30";
	this.ikNode_30.setTransform(150.1,357.95,1,1,-14.9992,0,0,10.8,13.7);

	this.ikNode_29 = new lib.arm8();
	this.ikNode_29.name = "ikNode_29";
	this.ikNode_29.setTransform(156.1,279.95,1,1,165.0008,0,0,7.2,57.7);

	this.ikNode_24 = new lib.Tshirt();
	this.ikNode_24.name = "ikNode_24";
	this.ikNode_24.setTransform(101,161.9,1,1,0,0,0,95.5,130.4);

	this.ikNode_37 = new lib.arm7();
	this.ikNode_37.name = "ikNode_37";
	this.ikNode_37.setTransform(14.8,249.85,1.2308,1.0323,-8.2173,0,0,3.1,41.6);

	this.ikNode_28 = new lib._2();
	this.ikNode_28.name = "ikNode_28";
	this.ikNode_28.setTransform(12.7,321,1,1,44.9994,0,0,-0.7,0.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_28},{t:this.ikNode_37},{t:this.ikNode_24},{t:this.ikNode_29},{t:this.ikNode_30}]}).wait(32));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AC5BlQgQgBgOgIQgVgMgVgfQgQgXgFgPIAAAAQgHgXAKgSQADgIAHgFIAFgEQAKgHAMgBQAYgDAUAQQAHAFAEgBQADAAAGgGQANgNATgCQAUgDAPAJQAQAKAGASQAGATgIAQQgEAIgJALIgQARIgSAaQgLAQgLAGQgLAHgPAAIgDAAgAi9AzQgOgFgWgPQgggUgLgMQgWgXAFgaQACgOALgLQAKgKAOgEQAcgHAZAVIAHAGQAEACAEAAQAEgBAGgIQAMgOARgGQASgHARAEQASAEAMAQQALAQgCARQgCANgMAPIgUAXIgWAdQgNAQgOAEQgHADgHAAQgMAAgNgGg");
	this.shape.setTransform(167.6944,115.1547);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AC/B7QgQgBgOgIQgVgMgVgeQgJgNgFgKIgDgDQgZgZgGgZQgEgPADgPQACgQAKgLQASgTAdACQAYABAWASQAMAJALANIAHgGQAQgLATgFQAlgKAXATQASAOACAYQACATgNAWQgIAOgYAVQgOALgLAFIgKAPQgLAPgLAHQgLAGgOAAIgEAAgAitBNQgGABgHAAQgWgBgggcIgpgiQgUgPgIgNQgIgMgBgRQgEggAQgXQAJgMAOgGQAOgHAOACQAUABANARIABAAQANAGAQALQAMAJAKAKIAHgJQALgNAKgIIAQgKIAIgEIAHgFQAPgJARACQASACAMALQAMAMADARQACASgIAOQgDAGgGAHIgLALIgCADQgCAMgLAMIgUAZIgWAcQgNAQgOAFQgHACgHAAQgHAAgIgCg");
	this.shape_1.setTransform(167.0748,112.9368);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},10).to({state:[{t:this.shape}]},10).wait(12));

	// Layer_1
	this.instance = new lib.nose();
	this.instance.setTransform(163.05,132.8,1,1,-8.2483,0,0,1.5,1.7);

	this.ikNode_32 = new lib.hat();
	this.ikNode_32.name = "ikNode_32";
	this.ikNode_32.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_1 = new lib.hair();
	this.instance_1.setTransform(154.4,73.95,1,1,0,0,0,83,45.8);

	this.instance_2 = new lib.open_smail();
	this.instance_2.setTransform(150.75,151.6,1.2459,1.2459,0,0,180);

	this.ikNode_31 = new lib.face_clean();
	this.ikNode_31.name = "ikNode_31";
	this.ikNode_31.setTransform(138.2,-1.15,1,1,0,0,180,66.5,-70.6);

	this.instance_3 = new lib.pents_only();
	this.instance_3.setTransform(54.3,281.05,1,1,8.1949,0,0,12.3,-12.4);

	this.instance_4 = new lib.legshoe();
	this.instance_4.setTransform(118.75,392.25,0.9999,0.9999,5.2167,0,0,14.1,-5);

	this.instance_5 = new lib.legshoe();
	this.instance_5.setTransform(53.6,402,0.9999,0.9999,0,-7.5043,172.4957,9.4,4.5);

	this.instance_6 = new lib.thigh();
	this.instance_6.setTransform(52.35,384.15,0.9999,0.9999,0,14.9746,-165.0254,13.2,19.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(1,1,1).p("AAGhlQAHBsgUBf");
	this.shape_2.setTransform(209.311,106.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#3333CC").ss(1,1,1).p("AHqAhIAAhBIvTAAIAABB");
	this.shape_3.setTransform(84.325,267.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#3333CC").ss(12,1,1).p("AjFk3IAWJvIF1gQIgVpf");
	this.shape_4.setTransform(110.9,338.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3333CC").s().p("ABEh/IotAAIAAlvIPTAAIAAFvIgvAAIAVJfIl3APg");
	this.shape_5.setTransform(84.325,320.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC99").s().p("AgSA2QgjgKgRghQgLgVAHgSQAIgRAZgIQAdgJAeAJQAeAJASAZQAMAQgBAPQgBAMgJAKQgGAHgNAHQgUAKgUAAQgNAAgNgEg");
	this.shape_6.setTransform(144.753,111.8346);

	this.instance_7 = new lib.hat();
	this.instance_7.setTransform(425.95,79.2,1,1,0,0,0,362.9,79.2);

	this.ikNode_24_1 = new lib.Tshirt();
	this.ikNode_24_1.name = "ikNode_24_1";
	this.ikNode_24_1.setTransform(152.6,217.4,1,1,0,0,0,147.1,185.9);

	this.instance_8 = new lib.face_clean();
	this.instance_8.setTransform(138.4,-1.3,1,1,0,0,180,66.5,-70.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.ikNode_31},{t:this.instance_2},{t:this.instance_1},{t:this.ikNode_32},{t:this.instance}]}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_2},{t:this.shape_3},{t:this.shape_4},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_8},{t:this.instance_2},{t:this.ikNode_24_1},{t:this.instance_1},{t:this.instance_7},{t:this.instance}]},31).wait(1));

	// Layer_2
	this.instance_9 = new lib.thigh();
	this.instance_9.setTransform(113.45,360.1,0.9999,0.9999,0,3.9973,-176.0027,16.1,-1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(32));

	// Layer_5
	this.instance_10 = new lib.arm7();
	this.instance_10.setTransform(156.15,237.4,1.0894,1.0894,-21.7501,0,0,12.1,10.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(32));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.7,0,258.2,501.2);


(lib.PINOCCHIOmc = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Armature_23
	this.ikNode_2 = new lib.Tshirt();
	this.ikNode_2.name = "ikNode_2";
	this.ikNode_2.setTransform(195.8,160.8,1,1,0,0,0,106.5,129.3);

	this.ikNode_3 = new lib.legwalk();
	this.ikNode_3.name = "ikNode_3";
	this.ikNode_3.setTransform(184.05,288.05,1,1,0,0,0,157.3,23.9);

	this.ikNode_5 = new lib.handd3();
	this.ikNode_5.name = "ikNode_5";
	this.ikNode_5.setTransform(235.2,210.8,0.9999,0.9999,22.7084,0,0,0,0.4);

	this.ikNode_9 = new lib.handd();
	this.ikNode_9.name = "ikNode_9";
	this.ikNode_9.setTransform(118.7,183.15,0.9999,0.9999,-22.0769,0,0,53.6,12.8);

	this.ikNode_8 = new lib.arm();
	this.ikNode_8.name = "ikNode_8";
	this.ikNode_8.setTransform(87.95,247.4,0.9999,0.9999,-39.9681,0,0,31.3,2.5);

	this.ikNode_12 = new lib.fingers();
	this.ikNode_12.name = "ikNode_12";
	this.ikNode_12.setTransform(101.95,312.55,0.9999,0.9999,-68.4662,0,0,25.6,0.3);

	this.ikNode_14 = new lib.handd2();
	this.ikNode_14.name = "ikNode_14";
	this.ikNode_14.setTransform(236.9,278.9,0.9999,0.9999,22.5562,0,0,0.2,0.1);

	this.ikNode_16 = new lib.arm3();
	this.ikNode_16.name = "ikNode_16";
	this.ikNode_16.setTransform(255.9,332.6,0.9997,0.9997,0,-15.5674,164.4326,14.2,4.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_16,p:{regY:4.7,skewX:-15.5674,skewY:164.4326,x:255.9,y:332.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:22.5562,x:236.9,y:278.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9999,scaleY:0.9999,rotation:-68.4662,x:101.95,y:312.55,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.5,scaleX:0.9999,scaleY:0.9999,rotation:-39.9681,x:87.95,y:247.4}},{t:this.ikNode_9,p:{scaleX:0.9999,scaleY:0.9999,rotation:-22.0769,x:118.7,y:183.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:22.7084,x:235.2,y:210.8,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]}).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-20.2686,skewY:159.7314,x:266.05,y:328.4,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:12.4523,x:237.85,y:278.8,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-77.7667,x:112.2,y:309.4,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-49.2681,x:87.85,y:247.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0684,x:118.65,y:183.1,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:21.872,x:234.95,y:210.7,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-24.9698,skewY:155.0302,x:275.2,y:322.75,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:2.3502,x:238.75,y:278.85,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-87.0677,x:121.9,y:304.6,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-58.5688,x:87.85,y:247.5}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0589,x:118.6,y:183.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:21.0366,x:234.95,y:210.85,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-29.6713,skewY:150.3287,x:283.2,y:315.7,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-7.747,x:239.65,y:278.85,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-96.364,x:130.7,y:298.3,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9998,scaleY:0.9998,rotation:-67.868,x:87.75,y:247.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0507,x:118.6,y:183.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0.1,rotation:20.2007,x:234.95,y:210.95,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-34.3734,skewY:145.6266,x:289.9,y:307.4,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-17.8504,x:240.6,y:278.85,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-105.6642,x:138.4,y:290.7,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-77.1694,x:87.9,y:247.55}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0429,x:118.55,y:183.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:19.3654,x:234.75,y:211,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-39.0749,skewY:140.9251,x:294.95,y:298.3,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9998,scaleY:0.9998,rotation:-27.953,x:241.4,y:278.8,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-114.965,x:144.6,y:282,regY:0.2,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-86.4701,x:87.85,y:247.5}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.0343,x:118.6,y:183.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:18.5306,x:234.65,y:211.05,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-35.0981,skewY:144.9019,x:289.9,y:301.1,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9998,scaleY:0.9998,rotation:-23.9755,x:237.85,y:277.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-94.9265,x:135.65,y:289.35,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-76.62,x:85.65,y:245.7}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-20.2335,x:118.45,y:182.4,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:22.8299,x:236.15,y:209.85,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-31.1214,skewY:148.8786,x:284.55,y:303.3,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-19.998,x:234.3,y:276.5,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-74.8918,x:125.2,y:295.6,regY:0.3,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-66.7708,x:83.4,y:243.9}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.4327,x:118.1,y:181.65,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:27.1282,x:237.6,y:208.5,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-27.1439,skewY:152.8561,x:278.9,y:304.9,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-16.0214,x:230.65,y:274.65,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-54.8539,x:113.6,y:299.9,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-56.9224,x:81.2,y:241.95}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-16.6315,x:117.85,y:180.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:31.428,x:239.1,y:207.25,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-23.1685,skewY:156.8315,x:273.1,y:306.05,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-12.0441,x:227,y:272.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-34.8152,x:100.9,y:302.6,regY:0.2,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-47.0732,x:79.1,y:239.95}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.8301,x:117.75,y:180,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:35.7291,x:240.45,y:205.75,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-19.19,skewY:160.81,x:267.1,y:306.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-8.0674,x:223.35,y:269.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.776,x:87.95,y:303.45,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-37.2251,x:76.95,y:238}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.029,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:40.0263,x:241.75,y:204.3,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-9.927,skewY:170.073,x:258.7,y:314.2,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:1.1919,x:221.5,y:270.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-11.9283,x:84.7,y:303.9,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-34.3772,x:77.15,y:238}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.1241,x:117.45,y:179.25,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:40.5829,x:240.55,y:205.6,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-0.6638,skewY:179.3362,x:249.35,y:320.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:10.4552,x:219.65,y:271.95,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-9.0805,x:81.5,y:304.25,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-31.529,x:77.15,y:238.05}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.2193,x:117.45,y:179.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:41.1396,x:239.4,y:206.8,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:8.5969,skewY:-171.4031,x:239.25,y:325.8,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:19.72,x:217.75,y:272.95,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-6.2339,x:78.35,y:304.5,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-28.6816,x:77.2,y:238.2}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.3137,x:117.4,y:179.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:41.6953,x:238.1,y:208,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:17.8602,skewY:-162.1398,x:228.5,y:329.45,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:28.9836,x:215.75,y:273.95,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-3.3842,x:75.05,y:304.45,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-25.8337,x:77.35,y:238.2}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.4089,x:117.4,y:179.1,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:42.2519,x:236.8,y:209.1,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:27.1236,skewY:-152.8764,x:217.4,y:331.75,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:38.2469,x:213.8,y:274.9,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-0.536,x:71.9,y:304.3,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-22.9867,x:77.35,y:238.25}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.5041,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:42.8089,x:235.45,y:210.2,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:36.3887,skewY:-143.6113,x:206.2,y:332.4,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:47.5117,x:211.75,y:275.65,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:2.3056,x:68.65,y:304,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-20.1367,x:77.55,y:238.35}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.5979,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:43.3644,x:234.05,y:211.35,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.7,skewX:45.6525,skewY:-134.3475,x:195.25,y:331.5,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:56.7753,x:209.7,y:276.6,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:5.1547,x:65.5,y:303.5,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-17.2889,x:77.5,y:238.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.6939,x:117.4,y:179.15,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:43.921,x:232.55,y:212.35,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:54.9158,skewY:-125.0842,x:184.4,y:329.25,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:66.0398,x:207.65,y:277.25,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:8.0017,x:62.35,y:302.85,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-14.4403,x:77.65,y:238.4}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.7885,x:117.4,y:179.2,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:44.4769,x:231.15,y:213.35,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:64.1805,skewY:-115.8195,x:174.35,y:325.55,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.4,scaleX:0.9998,scaleY:0.9998,rotation:75.3025,x:205.65,y:278.1,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:10.8507,x:59.3,y:302.1,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-11.5922,x:77.7,y:238.45}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.8825,x:117.35,y:179.05,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:45.0334,x:229.75,y:214.3,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:46.326,skewY:-133.674,x:196.1,y:335.85,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:55.056,x:209,y:280.35,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-13.7624,x:69.95,y:304.55,regY:0.3,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-20.9276,x:78,y:238.8}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.0886,x:117.4,y:179.3,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:40.8544,x:228.3,y:215.05,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:28.4725,skewY:-151.5275,x:219.55,y:339,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9998,scaleY:0.9998,rotation:34.8069,x:212.4,y:282.4,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-38.3797,x:81.1,y:305.25,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-30.2622,x:78.35,y:239.05}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.2943,x:117.45,y:179.45,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:36.6765,x:227.05,y:215.9,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:10.6204,skewY:-169.3796,x:242.2,y:334.65,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:14.5601,x:216.05,y:284.1,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-62.9966,x:91.95,y:304.3,regY:0.3,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-39.5981,x:78.5,y:239.3}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.4992,x:117.45,y:179.6,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:32.4963,x:225.7,y:216.65,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-7.2292,skewY:172.7708,x:261.6,y:323.75,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-5.6832,x:219.6,y:285.25,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-87.6121,x:102.6,y:301.35,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-48.9327,x:78.75,y:239.6}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.7043,x:117.5,y:179.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:28.3168,x:224.3,y:217.4,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-25.0806,skewY:154.9194,x:275.95,y:307.6,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:-25.9312,x:223.1,y:286.1,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-112.2247,x:112.6,y:296.9,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-58.2688,x:79,y:239.85}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-14.9105,x:117.65,y:179.9,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:24.1383,x:223,y:217.95,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-42.9334,skewY:137.0666,x:283.65,y:288.45,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-46.1798,x:226.7,y:286.6,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-136.8423,x:121.55,y:291.1,regY:0.2,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-67.6028,x:79.35,y:240.1}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-15.116,x:117.65,y:180.05,regX:53.7}},{t:this.ikNode_5,p:{regX:0.1,rotation:19.9595,x:221.65,y:218.75,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-36.6401,skewY:143.3599,x:282.65,y:293.8,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.4,scaleX:0.9998,scaleY:0.9998,rotation:-40.8036,x:226.15,y:286.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-133.5115,x:118.9,y:295.25,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-63.3603,x:80.5,y:241.35}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-16.1168,x:117.65,y:180.6,regX:53.6}},{t:this.ikNode_5,p:{regX:0.1,rotation:20.5371,x:221.75,y:218.65,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-30.3461,skewY:149.6539,x:281.15,y:299.05,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-35.427,x:225.55,y:286.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-130.182,x:116,y:299.1,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-59.1184,x:81.65,y:242.6}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-17.1178,x:117.75,y:181.25,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:21.1147,x:221.75,y:218.55,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-24.0516,skewY:155.9484,x:279.2,y:304.15,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-30.0499,x:225,y:286.6,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-126.8508,x:113,y:302.5,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-54.8744,x:82.95,y:243.65}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.1186,x:118.05,y:181.7,regX:53.7}},{t:this.ikNode_5,p:{regX:0,rotation:21.6928,x:221.85,y:218.5,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-17.7568,skewY:162.2432,x:276.65,y:309.2,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:-24.674,x:224.3,y:286.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-123.5215,x:109.7,y:305.85,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-50.6325,x:84.05,y:244.85}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-19.1199,x:118.1,y:182.25,regX:53.6}},{t:this.ikNode_5,p:{regX:-0.1,rotation:22.2713,x:221.9,y:218.4,scaleX:0.9998,scaleY:0.9998}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-11.465,skewY:168.535,x:273.75,y:313.95,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-19.2977,x:223.8,y:286.5,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-120.1907,x:106.35,y:308.7,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-46.3883,x:85.3,y:246}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-20.1206,x:118.2,y:182.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:22.8468,x:222.1,y:218.4,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-5.1704,skewY:174.8296,x:270.35,y:318.5,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-13.9215,x:223.2,y:286.55,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-116.8611,x:102.95,y:311.15,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-42.1457,x:86.6,y:247.1}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-21.1212,x:118.35,y:183.4,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:23.425,x:222.2,y:218.35,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:1.1195,skewY:-178.8805,x:266.6,y:322.7,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-8.5456,x:222.65,y:286.35,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-113.5305,x:99.35,y:313.45,regY:0.2,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.5,scaleX:0.9997,scaleY:0.9997,rotation:-37.9036,x:87.7,y:248.15}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.1202,x:118.55,y:183.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:24.0025,x:222.3,y:218.25,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:66.1515,skewY:-113.8485,x:201.7,y:333.6,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:56.4811,x:215.9,y:278.6,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-38.5023,x:86.65,y:309.95,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-30.8082,x:83.05,y:243.95}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-18.4585,x:117.8,y:181.75,regX:53.6}},{t:this.ikNode_5,p:{regX:0.1,rotation:38.1573,x:232.45,y:212.45,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.7,skewX:34.6841,skewY:-145.3159,x:238.2,y:335.95,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:25.014,x:221.4,y:281.75,regY:0.2}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-64.4439,x:102.85,y:308.4,regY:0.2,regX:25.5}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-43.7842,x:84.75,y:244.85}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-19.9623,x:117.75,y:181.75,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:31.5096,x:230,y:214.05,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:3.2149,skewY:-176.7851,x:269.6,y:321.45,scaleX:0.9997,scaleY:0.9997}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9999,scaleY:0.9999,rotation:-6.449,x:226.9,y:283.55,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-90.3795,x:118.5,y:303.45,regY:0.3,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9997,scaleY:0.9997,rotation:-56.7608,x:86.45,y:245.7}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-21.4648,x:117.8,y:181.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:24.8622,x:227.6,y:215.5,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-28.2467,skewY:151.7533,x:288.45,y:294.55,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.4,scaleX:0.9999,scaleY:0.9999,rotation:-37.9168,x:232.4,y:284.6,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-116.3218,x:132.25,y:295.7,regY:0.2,regX:25.6}},{t:this.ikNode_8,p:{regX:31.2,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-69.7366,x:88.15,y:246.6}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-22.9669,x:117.9,y:181.8,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:18.2146,x:225.1,y:216.9,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).to({state:[{t:this.ikNode_16,p:{regY:4.8,skewX:-59.7139,skewY:120.2861,x:290.65,y:263.7,scaleX:0.9996,scaleY:0.9996}},{t:this.ikNode_14,p:{regX:0.3,scaleX:0.9998,scaleY:0.9998,rotation:-69.3845,x:237.6,y:284.6,regY:0.1}},{t:this.ikNode_12,p:{scaleX:0.9998,scaleY:0.9998,rotation:-142.2619,x:144,y:285.2,regY:0.4,regX:25.6}},{t:this.ikNode_8,p:{regX:31.3,regY:2.6,scaleX:0.9998,scaleY:0.9998,rotation:-82.7136,x:89.9,y:247.25}},{t:this.ikNode_9,p:{scaleX:0.9998,scaleY:0.9998,rotation:-24.4701,x:117.9,y:181.75,regX:53.6}},{t:this.ikNode_5,p:{regX:0,rotation:11.567,x:222.6,y:218.15,scaleX:0.9999,scaleY:0.9999}},{t:this.ikNode_3},{t:this.ikNode_2}]},1).wait(1));

	// Layer_1
	this.instance = new lib.blink();
	this.instance.setTransform(267.15,121.9,0.8383,0.8383,0,14.9959,-165.0041,9.2,13.3);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(228.6,114.85,0.8113,0.8113,0,0,180,9,13.3);

	this.instance_2 = new lib.nose();
	this.instance_2.setTransform(269.95,144.85,1,1,0,0,0,24.5,13.8);

	this.instance_3 = new lib.hat();
	this.instance_3.setTransform(509.85,79.2,1,1,0,0,0,362.9,79.2);

	this.instance_4 = new lib.hairpinocchioboy();
	this.instance_4.setTransform(238.3,73.95,1,1,0,0,0,83,45.8);

	this.ikNode_7 = new lib.facewhitsmail();
	this.ikNode_7.name = "ikNode_7";
	this.ikNode_7.setTransform(195.95,160.8,1,1,0,0,0,40.1,91.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ikNode_7},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(38));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(26.8,0,297.09999999999997,489.7);


(lib.opens_smail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.open_smail();
	this.instance.setTransform(62.5,82.3,1.2459,1.2459);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(34.9,63.4,55.199999999999996,38.00000000000001);


(lib.hair_girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#5D3300").ss(10,1,1).p("AEIhgIoPDB");
	this.shape.setTransform(27.225,94.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.instance = new lib.blink();
	this.instance.setTransform(35.5,62.85,0.7946,0.7946,-7.2492,0,0,9.4,2.1);

	this.instance_1 = new lib.blink();
	this.instance_1.setTransform(75.9,67.1,0.8162,0.8162,10.2398,0,0,9.2,7);

	this.instance_2 = new lib.CachedBmp_11();
	this.instance_2.setTransform(-7.65,-21,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_2
	this.instance_3 = new lib.face_clean();
	this.instance_3.setTransform(75.05,76.1,1,1,14.9992,0,0,62.4,51.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hair_girl, new cjs.Rectangle(-7.6,-21,181.5,264), null);


(lib.Scene_1_smail = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// smail
	this.instance = new lib.sed();
	this.instance.setTransform(612.4,370.05,1,1,0,0,0,5,3.7);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AABAiIgBAAIAAAAIAAAAIAAAAIgBAAIAAAAIgBAAIgBAAIAAAAIgBAAIgBAAIAAAAIgBAAIgBAAIgBAAIAAAAIgCAAIgBgBIAAABIgBgBIgBABIgBgBIAAAAIgBgBIgBABIgBgBIAAABIgCgBIgBAAIAAAAIgBAAIgBgBIgBAAIAAAAIAAAAIgCgBIgBABIgBgBIgCAAIgBAAIgBgBIgBAAIgBAAIgBgBIAAAAIgBAAIgBAAIgCgBIAAABIgBgBIgBAAIgEgCIgBABIgFgDIABAAIACgBIAAAAIABAAIAAAAIABAAIABAAIAAAAIABAAIAAAAIABAAIABAAIAAgBIABABIAAgBIAAAAIABAAIAAAAIABABIAAgBIABAAIABAAIACgBIAAAAIABAAIABAAIABAAIAAAAIAAAAIABgBIAAAAIABAAIAAgBIAAABIABAAIAAgBIACAAIAAAAIAAAAIABgBIAAAAIABAAIAAAAIABgBIABAAIAAAAIABgBIAAAAIABAAIAAAAIABAAIAAgBIABAAIABAAIAAAAIABgBIAAAAIABAAIAAAAIABAAIAAAAIABgBIABgBIAAABIAAgBIABAAIAAAAIABAAIAAgBIACAAIAAgBIABAAIABgBIAAgBIABAAIAAgBIABAAIAAAAIABgBIAAAAIABAAIAAgBIABAAIABAAIAAgBIABAAIAAAAIABgBIAAAAIABAAIAAgBIABAAIAAAAIABgBIABAAIABAAIAAAAIAAAAIAAAAIACgBIAAgBIABABIAAgBIABAAIAAgBIABAAIABgBIAAAAIAAgBIABAAIABgCIABgBIAAAAIABgBIABAAIABgBIAAAAIABAAIAAgBIABgBIAAAAIABAAIAAgBIABAAIAAAAIABgBIABAAIABgBIABAAIABAAIAAgBIABAAIABAAIAAgBIAAAAIAAgBIABAAIAAAAIABAAIAAgBIABAAIAAgBIABAAIABgBIABAAIAAAAIABgBIAAAAIAAgBIABAAIABAAIAAgBIABgBIAAAAIABgBIAAAAIABgBIABAAIAAgBIACgBIAAAAIABAAIAAgBIABgBIAAgBIABAAIAAAAIABgBIAAAAIAAABIAAAAIAAABIABAAIgBABIABAAIgBAAIAAACIABABIgBAAIABABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAABIAAABIAAAAIAAAAIAAABIAAABIAAAAIgBABIABABIgBABIAAACIAAAAIAAABIAAABIgBABIABABIgBABIAAABIgBACIAAABIgCACIAAABIgBACIAAABIgBABIAAABIAAABIgBACIAAABIgDAGIgBAAIAAABIgBAAIgBADIgBAAIgBAAIgBABIAAABIgBAAIAAAAIAAABIgBAAIgBABIgBAAIAAABIgBAAIgBABIAAAAIgBABIgBAAIAAABIgBgBIAAABIAAAAIgBABIAAAAIgBAAIAAABIgBgBIgCABIgBAAIAAABIgBAAIgBAAIAAAAIAAAAIgDAAIAAAAIAAABIgBgBIgBABIgBAAIAAgBIgBABIAAAAIAAAAIgCAAIAAAAIAAAAIgBAAIgBABIgBAAIgBgBIAAABIgBgBIAAABIgBAAg");
	this.shape.setTransform(611.2,369.425);

	this.instance_1 = new lib.Tween6("synched",0);
	this.instance_1.setTransform(610.9,365.5);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween7("synched",0);
	this.instance_2.setTransform(610.85,366.7);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween8("synched",0);
	this.instance_3.setTransform(610.75,366);

	this.instance_4 = new lib.opens_smail("synched",0);
	this.instance_4.setTransform(616.8,373.55,0.9999,0.9999,0,0,0,62.8,82.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},62).to({state:[]},23).to({state:[{t:this.instance_1}]},66).to({state:[{t:this.instance_2}]},16).to({state:[{t:this.instance_3}]},17).to({state:[{t:this.instance_1}]},12).to({state:[{t:this.instance_4}]},112).to({state:[]},72).wait(193));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(151).to({_off:false},0).to({_off:true,x:610.85,y:366.7},16).wait(29).to({_off:false,x:610.9,y:365.5},0).to({_off:true},112).wait(265));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(151).to({_off:false},16).to({_off:true,x:610.75,y:366},17).wait(389));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_simboles_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// simboles
	this.instance = new lib.PINOCCHIOmc();
	this.instance.setTransform(1238.65,475.05,1,1,0,0,0,438.4,244.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(442).to({_off:false},0).wait(1).to({regX:175.3,regY:250.3,x:999.8,y:481.15},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_simboles = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// simboles
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#3333CC").ss(1,1,1).p("AnpAhIAAhBIPTAAIAABB");
	this.shape.setTransform(681.825,489.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3333CC").s().p("AnpC4IAAlvIPTAAIAAFvg");
	this.shape_1.setTransform(681.825,511.675);

	this.instance = new lib.punocchionormal();
	this.instance.setTransform(793.85,463.7,1,1,0,0,0,212.6,250);
	this.instance._off = true;

	this.instance_1 = new lib.PINOCCHIOmc();
	this.instance_1.setTransform(1039.55,475.05,1,1,0,0,0,438.4,244.2);
	this.instance_1._off = true;

	this.instance_2 = new lib.punocchioinlove();
	this.instance_2.setTransform(983.8,462.7,1,1,0,0,0,396.2,250);

	this.instance_3 = new lib.punocchiosed();
	this.instance_3.setTransform(881.95,459,1,1,0,0,0,212.6,250);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},380).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},5).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance}]},17).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_3}]},1).wait(89));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(380).to({_off:false},0).to({_off:true},5).wait(87).to({_off:false,regX:396.2,x:984.25,y:462.65},0).to({_off:true},8).wait(17).to({_off:false,regX:212.6,x:800.2,y:459.4},0).wait(1).to({regX:118.3,regY:250.6,x:710.15,y:460},0).wait(1).to({x:714.4},0).wait(1).to({x:718.65},0).wait(1).to({x:722.9},0).wait(1).to({x:727.15},0).wait(1).to({x:731.4},0).wait(1).to({x:735.65},0).wait(1).to({x:739.9},0).wait(1).to({x:742},0).wait(1).to({x:744.15},0).wait(1).to({x:746.25},0).wait(1).to({x:748.4},0).wait(1).to({x:750.5},0).wait(1).to({x:752.65},0).wait(1).to({x:754.75},0).wait(1).to({x:756.9},0).wait(1).to({x:759.45},0).wait(1).to({x:762},0).wait(1).to({x:764.6},0).wait(1).to({x:767.15},0).wait(1).to({x:769.75},0).wait(1).to({x:772.3},0).wait(1).to({x:774.9},0).wait(1).to({x:776.4},0).wait(1).to({x:777.9},0).wait(1).to({x:779.4},0).wait(1).to({x:780.9},0).wait(1).to({x:782.4},0).wait(1).to({x:783.9},0).wait(1).to({x:785.4},0).wait(1).to({x:786.9},0).wait(3).to({_off:true},1).wait(89));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(385).to({_off:false},0).wait(1).to({regX:175.3,regY:250.3,x:782.9,y:481.15},0).wait(1).to({x:789.85},0).wait(1).to({x:797.2},0).wait(1).to({x:805},0).wait(1).to({x:813.25},0).wait(1).to({x:821.95},0).wait(1).to({x:831.05},0).wait(1).to({x:840.65},0).wait(1).to({x:855.9},0).wait(1).to({x:871.8},0).wait(1).to({x:888.4},0).wait(1).to({x:905.7},0).wait(1).to({x:923.65},0).wait(1).to({x:943.15},0).wait(1).to({x:967},0).wait(1).to({x:991.65},0).wait(1).to({x:1017.15},0).wait(1).to({x:1045.65},0).wait(1).to({x:1080.35},0).wait(1).to({x:1116.15},0).wait(1).to({x:1152.9},0).wait(1).to({x:1190.75},0).wait(1).to({x:1229.05},0).wait(1).to({x:1268.4},0).wait(1).to({x:1308.75},0).wait(1).to({x:1342.15},0).wait(1).to({x:1375.55},0).wait(1).to({x:1408.65},0).wait(3).to({regX:438.4,regY:244.2,x:53.8,y:476.1},0).wait(5).to({x:60.2,y:485.75},0).wait(1).to({regX:175.3,regY:250.3,x:-197.5,y:491.75},0).wait(1).to({x:-191.8,y:491.65},0).wait(1).to({x:-185.6,y:491.55},0).wait(1).to({x:-179.05,y:491.5},0).wait(1).to({x:-172.1,y:491.4},0).wait(1).to({x:-164.75,y:491.25},0).wait(1).to({x:-157,y:491.15},0).wait(1).to({x:-148.85,y:491.05},0).wait(1).to({x:-140.25,y:490.9},0).wait(1).to({x:-131.3,y:490.8},0).wait(1).to({x:-121.95,y:490.65},0).wait(1).to({x:-112.2,y:490.5},0).wait(1).to({x:-102.05,y:490.35},0).wait(1).to({x:-91.45,y:490.2},0).wait(1).to({x:-80.5,y:490.05},0).wait(1).to({x:-69.15,y:489.9},0).wait(1).to({x:-57.4,y:489.7},0).wait(1).to({x:-45.25,y:489.55},0).wait(1).to({x:-32.65,y:489.35},0).wait(1).to({x:-19.7,y:489.15},0).wait(1).to({x:-6.35,y:488.95},0).wait(1).to({x:7.4,y:488.75},0).wait(1).to({x:21.6,y:488.55},0).wait(1).to({x:36.15,y:488.35},0).wait(1).to({x:51.1,y:488.15},0).wait(1).to({x:66.5,y:487.9},0).wait(1).to({x:82.25,y:487.7},0).wait(1).to({x:98.4,y:487.45},0).wait(1).to({x:114.95,y:487.2},0).wait(1).to({x:131.95,y:486.95},0).wait(1).to({x:149.3,y:486.7},0).wait(1).to({x:167.05,y:486.45},0).wait(1).to({x:185.2,y:486.2},0).wait(1).to({x:203.75,y:485.9},0).wait(1).to({x:222.7,y:485.65},0).wait(1).to({x:242.1,y:485.35},0).wait(1).to({x:261.85,y:485.1},0).wait(1).to({x:282,y:484.8},0).wait(1).to({x:302.6,y:484.5},0).wait(1).to({x:323.55,y:484.2},0).wait(1).to({x:344.95,y:483.85},0).wait(1).to({x:366.7,y:483.55},0).wait(1).to({x:388.85,y:483.25},0).wait(1).to({x:411.45,y:482.9},0).wait(1).to({x:434.4,y:482.55},0).wait(1).to({x:457.8,y:482.25},0).wait(1).to({x:481.55,y:481.9},0).wait(1).to({x:505.7,y:481.55},0).wait(1).to({x:509.8,y:481.5},0).wait(1).to({_off:true},1).wait(149));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.PINOCCHIOgirl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_7
	this.instance = new lib.arm3();
	this.instance.setTransform(206,322.75,1,1,-89.9991,0,0,16.2,5.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_6
	this.instance_1 = new lib._2();
	this.instance_1.setTransform(43.65,322.5,1,1,89.9991,0,0,4.2,8.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_5
	this.instance_2 = new lib.arm8();
	this.instance_2.setTransform(196.85,258.1,1,1,150.0008,0,0,3.8,56.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_1
	this.instance_3 = new lib.hair_girl();
	this.instance_3.setTransform(99.15,137.55,1,1,3.7454,0,0,82.9,110.9);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFF66").ss(1,1,1).p("AJXjMQh0BdAkEmApWixQB9AKgXF0");
	this.shape.setTransform(120.275,193.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#0033FF").ss(1,1,1).p("AmdqSQAsKfh+KCAHLqmQgsLsBRJh");
	this.shape_1.setTransform(119.35,280.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFCC").ss(1,1,1).p("AtQAsIFsAAQADgiAIgeAIegrQARAjAMAyIEWAA");
	this.shape_2.setTransform(118.025,216.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FF3300").ss(1,1,1).p("AkpraQEJg3FFAkAFyrqIBFAAIBFAAQhFKgCXJvQg5Ajg5AbQntE/nylXQglgSglgUQCaqUhIplIBKgCIBKgD");
	this.shape_3.setTransform(121.35,286.8991);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFCC00").ss(1,1,1).p("AF3gJQAAARgPANQgHAGAMAJQgdgCgKAAQgIAAgdgBQAMgEgJgIQgOgNAAgRQAAgRAOgNQAFgFAGgDQAKgFANAAQADAAAEABIAQAEQAGADAFAFQAIAHAFAJQACAHAAAHgAkgAKQAAASgMAMQgJAKAIACIgVAAQgEABgFAAQgDAAgDAAQgBAAgaAAQAMgDgKgKQgMgMAAgSQAAgJADgGQADgIAGgHQANgMASAAQAQAAAMAKQABABACABQAMANAAARg");
	this.shape_4.setTransform(121.8,208.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFF99").ss(1,1,1).p("AHxjeQA4AgA2AoQFVhThxIsApOh6QAUgLATgKIBUgpQAIgEAHgDApNh6IgBAAQkEhTgMISApWh2QAEgCAEgCAlpjmQGriqFTCJQADACADAB");
	this.shape_5.setTransform(119.4313,188.4132);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFCC00").s().p("AlRA1IgbAAQAMgDgJgKQgNgMAAgSQAAgJADgGQADgIAHgHQAMgMASAAQARAAALAKIADACQANANAAARQAAASgNAMQgJAKAIACIgVAAIgJABIgGAAgAFGAiIglgBQAMgEgJgIQgOgNAAgRQAAgRAOgNQAFgFAHgDQAJgFANAAIAHABIARAEQAFADAGAFQAHAHAEAJQADAHAAAHQAAARgOANQgHAGALAJIgngCg");
	this.shape_6.setTransform(121.8,208.575);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0033FF").s().p("AhGAgQgHgDgBgHQAAgEACgEQACgFAEgCIgDgDQgFgDAAgCQgDgDAAgDQgBgEACgGQADgGAGgEQAGgDAJABQAHAAAIAEQAJAEAGAGIAEAEIABgDQAEgFAFgCQAFgCAFAAIABgBQAGAAAGAEIABAAQAGAEAEAGIACgBIAAAAQACgEAEgEQAGgIAHgDQAFgDAKAAQAIAAAEABQAIABADAFQADAGgFAIIgLAJQAKADADAGQACAGgDAEIgEAEQgDADgFADIgMABQgKgBgIgEQgKgEgFgHIgEAFQgGAIgKABQgFACgHgDIgFgCQgEgCgDgEIgCACQgEAGgJAFQgIAEgNABQgIAAgFgCg");
	this.shape_7.setTransform(125.8038,165.7438);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FF3300").s().p("AoDM9QBencgBnsQAAisgLitQALCtAACsQABHsheHcQglgSglgUQCbqVhJpkIBKgCIBKgDIAbAAIAFAAIAKgBIAVAAQEIg3FFAkIAmABIAnACIBFAAIBFAAQhFKfCXJwQg5Ajg5AbQg1mKABnGQAAj2APkHQgPEHAAD2QgBHGA1GKQjuCajuAAQkBAAkCiygAHcNVIAAAAgAl5oiIhWmIQAEgBgEgHQgDgGAXgRQAXgRAnANIBYGXIgFADQgMgKgRAAQgSAAgMAMQgHAHgDAIIgKAAgAFtpEQgGgFgFgDIgRgEIgGgBQgNAAgKAFIBVmZIABAAIgBgBIgBgBIAAAAIAAgBIgBAAIABgDIACgCIADgBIAAAAIAFABQAlgFASAQQAQAQgBAFQABAFgCAGIAAAAIAAABIheGNQgEgJgIgHg");
	this.shape_8.setTransform(121.35,262.6573);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFAA5").s().p("AteFFQAMoSEEBTIgIAEIAIgEIABAAIAmgVIBUgpIAPgHIAJgEIBVGHIALAAQgDAHAAAIQAAASAMANQAKAKgMACIhKADIhJADQADg6AAgyQAAkKhpgIQBpAIAAEKQAAAygDA6QgIAfgDAigAItFDQgMgzgRgjQgJhGAAg7QAAi7BYhHQhYBHAAC7QAAA7AJBGIhGAAIhFAAQgMgIAHgHQAPgMAAgSQAAgIgDgGIBemNIABAAIAAgBIACAAIADgBIABgBQA4AgA2AoQFVhThxIsgAkUDyQAMgNAAgSQAAgSgMgMIgDgDIAFgCIhXmWQGriqFTCJIACAFIAAABQACACADABIhVGYQgGADgFAEQgOANAAASQAAASAOAMQAJAIgMAEQlFgkkJA4QgIgDAJgJgAgHj+QgGAEgDAGQgCAGABAEQAAADADADQAAADAFADIADADQgEACgCAFQgCAEAAAEQABAHAHADQAFACAHAAQANgBAIgEQAJgFAEgGIACgCQADAEAEACIAFACQAHADAGgCQAKgBAGgIIAEgFQAFAHAKAEQAIAEAKABIAMgBQAFgDADgDIAEgEQADgEgCgGQgDgGgKgEIALgJQAFgIgDgGQgDgFgIgBQgEgBgIAAQgKAAgFADQgHADgGAIQgEAEgCAEIAAAAIgCABQgEgGgGgEIgBAAQgGgEgHAAIgBABQgFAAgFACQgFACgEAFIgBADIgEgEQgGgGgJgEQgIgEgHAAIgEAAQgGAAgEACg");
	this.shape_9.setTransform(119.4313,188.4132);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_3}]}).wait(1));

	// Layer_4
	this.instance_4 = new lib.arm8();
	this.instance_4.setTransform(53.15,255.45,1,1,160.6983,0,0,3.2,57.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_3
	this.instance_5 = new lib.arm7();
	this.instance_5.setTransform(55.35,212.7,1,1,-11.52,0,0,13.6,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_2
	this.instance_6 = new lib.arm7();
	this.instance_6.setTransform(185.1,214.95,1,1,-26.1662,0,0,11,1.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_11
	this.instance_7 = new lib.legshoegirlL();
	this.instance_7.setTransform(91.05,391,1,1,0,-7.784,172.216,14.5,6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_10
	this.instance_8 = new lib.legshoegirlR();
	this.instance_8.setTransform(152.6,388.45,1,1,2.2256,0,0,12.6,5.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_8
	this.instance_9 = new lib.thigh();
	this.instance_9.setTransform(85.65,343.1,1,1,-14.9992,0,0,13.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_9
	this.instance_10 = new lib.thigh();
	this.instance_10.setTransform(155.7,343.3,1,1,-8.0099,0,0,17.5,3.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PINOCCHIOgirl, new cjs.Rectangle(0.2,0.1,236.3,482), null);


(lib.PINOCCHIOgirlsed = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.instance = new lib.close_blink();
	this.instance.setTransform(55.15,95.4,0.9049,0.9049,0,-6.2126,173.7874,20.2,15);

	this.instance_1 = new lib.close_blink();
	this.instance_1.setTransform(95.3,91.2,0.9483,0.9483,7.7309,0,0,20.4,7.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC99").s().p("Ah/A/QgSgJgGgSQgGgUALgQQAMgSAXgCIAPgCQAGgCAHgFQBAgqBeACQAcABAQAGQAYAJAIATQAGANgEAPQgDAOgKAMQgQATgiALQghAKgzAAQglABgLABIgGABIAGgIIAIgMQAEgIgBgFQgBgFgEgEIgCgDIgIgIIgBAAIgBgBQgHgIACgGQABgIAKgDQAJgEAKACQAIACAGAGIAEAEQAFAIAFAOIgBgGIADAIQgBgSgGgOQgDgKgHgGQgGgHgJgEQgNgFgPAEQgUAFgIAQQgHAMAEAPQADAOALALQgJAMgDAJQgDAIABAHIAAACIgBAAIgLABQgTAAgMgHg");
	this.shape.setTransform(78.8438,122.6508);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0033").s().p("AgdBBQgJgGgEgJIgBgGIAAgDQgBgHADgIQADgIAJgMQgLgKgDgOQgEgRAHgMQAIgPAUgFQAOgEANAFQAJAEAGAGQAFAGAEAIQAFAMABAQIABAFQgFgOgGgIIgEgEQgHgIgKgDQgJgCgIAEQgKADgCAIQgCAIAKAKIABAAIABABIAHAIQAEAEAAAEQABAFgEAIIgHAMIgFAIIgBADQgBABAAABQAAAAAAABQgBAAAAABQAAAAABABIAEACQAHADANgCIAVgEQgLAMgJAGQgMAJgMABIgDAAQgJAAgHgFg");
	this.shape_1.setTransform(74.7417,125.2188);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Layer_1
	this.instance_2 = new lib.PINOCCHIOgirl();
	this.instance_2.setTransform(118.2,241,1,1,0,0,0,118.2,241);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.PINOCCHIOgirlsed, new cjs.Rectangle(0.2,0.1,236.3,482), null);


(lib.Scene_1_Girl = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Girl
	this.instance = new lib.PINOCCHIOgirl();
	this.instance.setTransform(985.85,474.35,1,1,0,0,0,118.2,241);

	this.replay = new lib.PINOCCHIOgirlsed();
	this.replay.name = "replay";
	this.replay.setTransform(986.5,475.2,1,1,0,0,0,118.2,241);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},416).to({state:[{t:this.replay}]},116).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.pincchio = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,3,532,618,620];
	this.streamSoundSymbolsList[0] = [{id:"SOUNDpinocchio_1",startFrame:0,endFrame:621,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("SOUNDpinocchio_1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,621,1);
		this.start = this.bottonStart.start;
		var self = this; 
		self.stop(); 
		
		self.start.addEventListener("click", startPlaying);
		function startPlaying()
		{
			self.gotoAndPlay(0);
		}
	}
	this.frame_3 = function() {
		this.start = undefined;
	}
	this.frame_532 = function() {
		this.replay = this.Girl.replay;
	}
	this.frame_618 = function() {
		this.replay = this.bottonStart.replay;
		var self = this; 
		self.stop(); 
		self.replay.addEventListener("click", playAgain);
		function playAgain()
		{
			self.gotoAndPlay(1); 
			}
	}
	this.frame_620 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3).call(this.frame_3).wait(529).call(this.frame_532).wait(86).call(this.frame_618).wait(2).call(this.frame_620).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(50).to({scaleX:0.9865,scaleY:0.9865,x:640.4575,y:360.8288},0).wait(1).to({scaleX:0.973,scaleY:0.973,x:640.915,y:361.6575},0).wait(1).to({scaleX:0.9595,scaleY:0.9595,x:641.3725,y:362.4863},0).wait(1).to({scaleX:0.946,scaleY:0.946,x:641.83,y:363.315},0).wait(1).to({scaleX:0.9325,scaleY:0.9325,x:642.2875,y:364.1438},0).wait(1).to({scaleX:0.919,scaleY:0.919,x:642.745,y:364.9725},0).wait(1).to({scaleX:0.9055,scaleY:0.9055,x:643.2025,y:365.8013},0).wait(1).to({scaleX:0.8921,scaleY:0.8921,x:643.66,y:366.63},0).wait(1).to({scaleX:0.8786,scaleY:0.8786,x:644.1175,y:367.4588},0).wait(1).to({scaleX:0.8651,scaleY:0.8651,x:644.575,y:368.2875},0).wait(1).to({scaleX:0.8516,scaleY:0.8516,x:645.0325,y:369.1163},0).wait(1).to({scaleX:0.8381,scaleY:0.8381,x:645.49,y:369.945},0).wait(1).to({scaleX:0.8246,scaleY:0.8246,x:645.9475,y:370.7738},0).wait(1).to({scaleX:0.8111,scaleY:0.8111,x:646.405,y:371.6025},0).wait(1).to({scaleX:0.7976,scaleY:0.7976,x:646.8625,y:372.4313},0).wait(1).to({scaleX:0.7841,scaleY:0.7841,x:647.32,y:373.26},0).wait(1).to({scaleX:0.7706,scaleY:0.7706,x:647.7775,y:374.0888},0).wait(1).to({scaleX:0.7571,scaleY:0.7571,x:648.235,y:374.9175},0).wait(1).to({scaleX:0.7436,scaleY:0.7436,x:648.6925,y:375.7462},0).wait(1).to({scaleX:0.7301,scaleY:0.7301,x:649.15,y:376.575},0).wait(1).to({scaleX:0.7166,scaleY:0.7166,x:649.6075,y:377.4038},0).wait(1).to({scaleX:0.7031,scaleY:0.7031,x:650.065,y:378.2325},0).wait(1).to({scaleX:0.6897,scaleY:0.6897,x:650.5225,y:379.0612},0).wait(1).to({scaleX:0.6762,scaleY:0.6762,x:650.98,y:379.89},0).wait(1).to({scaleX:0.6627,scaleY:0.6627,x:651.4375,y:380.7188},0).wait(1).to({scaleX:0.6492,scaleY:0.6492,x:651.895,y:381.5475},0).wait(1).to({scaleX:0.6357,scaleY:0.6357,x:652.3525,y:382.3763},0).wait(1).to({scaleX:0.6222,scaleY:0.6222,x:652.81,y:383.205},0).wait(1).to({scaleX:0.6087,scaleY:0.6087,x:653.2675,y:384.0338},0).wait(1).to({scaleX:0.5952,scaleY:0.5952,x:653.725,y:384.8625},0).wait(1).to({scaleX:0.5817,scaleY:0.5817,x:654.1825,y:385.6913},0).wait(1).to({scaleX:0.5682,scaleY:0.5682,x:654.64,y:386.52},0).wait(1).to({scaleX:0.5547,scaleY:0.5547,x:655.0975,y:387.3488},0).wait(1).to({scaleX:0.5412,scaleY:0.5412,x:655.555,y:388.1775},0).wait(1).to({scaleX:0.5277,scaleY:0.5277,x:656.0125,y:389.0063},0).wait(1).to({scaleX:0.5142,scaleY:0.5142,x:656.47,y:389.835},0).wait(1).to({scaleX:0.5007,scaleY:0.5007,x:656.9275,y:390.6638},0).wait(1).to({scaleX:0.4873,scaleY:0.4873,x:657.385,y:391.4925},0).wait(1).to({scaleX:0.4738,scaleY:0.4738,x:657.8425,y:392.3213},0).wait(1).to({scaleX:0.4603,scaleY:0.4603,x:658.3,y:393.15},0).wait(1).to({scaleX:0.4605,scaleY:0.4605,x:658.3118,y:393.2105},0).wait(1).to({scaleX:0.4606,scaleY:0.4606,x:658.3237,y:393.2711},0).wait(1).to({scaleX:0.4608,scaleY:0.4608,x:658.3355,y:393.3316},0).wait(1).to({scaleX:0.461,scaleY:0.461,x:658.3474,y:393.3921},0).wait(1).to({scaleX:0.4612,scaleY:0.4612,x:658.3592,y:393.4526},0).wait(1).to({scaleX:0.4614,scaleY:0.4614,x:658.3711,y:393.5132},0).wait(1).to({scaleX:0.4616,scaleY:0.4616,x:658.3829,y:393.5737},0).wait(1).to({scaleX:0.4618,scaleY:0.4618,x:658.3947,y:393.6342},0).wait(1).to({scaleX:0.462,scaleY:0.462,x:658.4066,y:393.6947},0).wait(1).to({scaleX:0.4622,scaleY:0.4622,x:658.4184,y:393.7553},0).wait(1).to({scaleX:0.4624,scaleY:0.4624,x:658.4303,y:393.8158},0).wait(1).to({scaleX:0.4625,scaleY:0.4625,x:658.4421,y:393.8763},0).wait(1).to({scaleX:0.4627,scaleY:0.4627,x:658.454,y:393.9368},0).wait(1).to({scaleX:0.4629,scaleY:0.4629,x:658.4658,y:393.9974},0).wait(1).to({scaleX:0.4631,scaleY:0.4631,x:658.4776,y:394.0579},0).wait(1).to({scaleX:0.4633,scaleY:0.4633,x:658.4895,y:394.1184},0).wait(1).to({scaleX:0.4635,scaleY:0.4635,x:658.5013,y:394.179},0).wait(1).to({scaleX:0.4637,scaleY:0.4637,x:658.5132,y:394.2395},0).wait(1).to({scaleX:0.4639,scaleY:0.4639,x:658.525,y:394.3},0).wait(1).to({scaleX:0.4641,scaleY:0.4641,x:658.5368,y:394.3605},0).wait(1).to({scaleX:0.4643,scaleY:0.4643,x:658.5487,y:394.4211},0).wait(1).to({scaleX:0.4644,scaleY:0.4644,x:658.5605,y:394.4816},0).wait(1).to({scaleX:0.4646,scaleY:0.4646,x:658.5724,y:394.5421},0).wait(1).to({scaleX:0.4648,scaleY:0.4648,x:658.5842,y:394.6026},0).wait(1).to({scaleX:0.465,scaleY:0.465,x:658.5961,y:394.6632},0).wait(1).to({scaleX:0.4652,scaleY:0.4652,x:658.6079,y:394.7237},0).wait(1).to({scaleX:0.4654,scaleY:0.4654,x:658.6197,y:394.7842},0).wait(1).to({scaleX:0.4656,scaleY:0.4656,x:658.6316,y:394.8447},0).wait(1).to({scaleX:0.4658,scaleY:0.4658,x:658.6434,y:394.9053},0).wait(1).to({scaleX:0.466,scaleY:0.466,x:658.6553,y:394.9658},0).wait(1).to({scaleX:0.4662,scaleY:0.4662,x:658.6671,y:395.0263},0).wait(1).to({scaleX:0.4663,scaleY:0.4663,x:658.679,y:395.0868},0).wait(1).to({scaleX:0.4665,scaleY:0.4665,x:658.6908,y:395.1474},0).wait(1).to({scaleX:0.4667,scaleY:0.4667,x:658.7026,y:395.2079},0).wait(1).to({scaleX:0.4669,scaleY:0.4669,x:658.7145,y:395.2684},0).wait(1).to({scaleX:0.4671,scaleY:0.4671,x:658.7263,y:395.329},0).wait(1).to({scaleX:0.4673,scaleY:0.4673,x:658.7382,y:395.3895},0).wait(1).to({scaleX:0.4675,scaleY:0.4675,x:658.75,y:395.45},0).wait(36).to({scaleX:0.5088,scaleY:0.5088,x:657.1286,y:393.8179},0).wait(1).to({scaleX:0.5501,scaleY:0.5501,x:655.5071,y:392.1857},0).wait(1).to({scaleX:0.5913,scaleY:0.5913,x:653.8857,y:390.5536},0).wait(1).to({scaleX:0.6326,scaleY:0.6326,x:652.2643,y:388.9214},0).wait(1).to({scaleX:0.6739,scaleY:0.6739,x:650.6429,y:387.2893},0).wait(1).to({scaleX:0.7152,scaleY:0.7152,x:649.0214,y:385.6571},0).wait(1).to({scaleX:0.7565,scaleY:0.7565,x:647.4,y:384.025},0).wait(1).to({scaleX:0.7978,scaleY:0.7978,x:645.7786,y:382.3929},0).wait(1).to({scaleX:0.839,scaleY:0.839,x:644.1571,y:380.7607},0).wait(1).to({scaleX:0.8803,scaleY:0.8803,x:642.5357,y:379.1286},0).wait(1).to({scaleX:0.9216,scaleY:0.9216,x:640.9143,y:377.4964},0).wait(1).to({scaleX:0.9629,scaleY:0.9629,x:639.2929,y:375.8643},0).wait(1).to({scaleX:1.0042,scaleY:1.0042,x:637.6714,y:374.2321},0).wait(1).to({scaleX:1.0455,scaleY:1.0455,x:636.05,y:372.6},0).wait(1).to({scaleX:1.0449,scaleY:1.0449,y:372.6132},0).wait(1).to({scaleX:1.0443,scaleY:1.0443,y:372.6263},0).wait(1).to({scaleX:1.0437,scaleY:1.0437,y:372.6395},0).wait(1).to({scaleX:1.0431,scaleY:1.0431,y:372.6526},0).wait(1).to({scaleX:1.0425,scaleY:1.0425,y:372.6658},0).wait(1).to({scaleX:1.0419,scaleY:1.0419,y:372.679},0).wait(1).to({scaleX:1.0414,scaleY:1.0414,y:372.6921},0).wait(1).to({scaleX:1.0408,scaleY:1.0408,y:372.7053},0).wait(1).to({scaleX:1.0402,scaleY:1.0402,y:372.7184},0).wait(1).to({scaleX:1.0396,scaleY:1.0396,y:372.7316},0).wait(1).to({scaleX:1.039,scaleY:1.039,y:372.7447},0).wait(1).to({scaleX:1.0384,scaleY:1.0384,y:372.7579},0).wait(1).to({scaleX:1.0378,scaleY:1.0378,y:372.7711},0).wait(1).to({scaleX:1.0372,scaleY:1.0372,y:372.7842},0).wait(1).to({scaleX:1.0367,scaleY:1.0367,y:372.7974},0).wait(1).to({scaleX:1.0361,scaleY:1.0361,y:372.8105},0).wait(1).to({scaleX:1.0355,scaleY:1.0355,y:372.8237},0).wait(1).to({scaleX:1.0349,scaleY:1.0349,y:372.8368},0).wait(1).to({scaleX:1.0343,scaleY:1.0343,y:372.85},0).wait(1).to({scaleX:1.0337,scaleY:1.0337,y:372.8632},0).wait(1).to({scaleX:1.0331,scaleY:1.0331,y:372.8763},0).wait(1).to({scaleX:1.0325,scaleY:1.0325,y:372.8895},0).wait(1).to({scaleX:1.032,scaleY:1.032,y:372.9026},0).wait(1).to({scaleX:1.0314,scaleY:1.0314,y:372.9158},0).wait(1).to({scaleX:1.0308,scaleY:1.0308,y:372.929},0).wait(1).to({scaleX:1.0302,scaleY:1.0302,y:372.9421},0).wait(1).to({scaleX:1.0296,scaleY:1.0296,y:372.9553},0).wait(1).to({scaleX:1.029,scaleY:1.029,y:372.9684},0).wait(1).to({scaleX:1.0284,scaleY:1.0284,y:372.9816},0).wait(1).to({scaleX:1.0278,scaleY:1.0278,y:372.9947},0).wait(1).to({scaleX:1.0273,scaleY:1.0273,y:373.0079},0).wait(1).to({scaleX:1.0267,scaleY:1.0267,y:373.0211},0).wait(1).to({scaleX:1.0261,scaleY:1.0261,y:373.0342},0).wait(1).to({scaleX:1.0255,scaleY:1.0255,y:373.0474},0).wait(1).to({scaleX:1.0249,scaleY:1.0249,y:373.0605},0).wait(1).to({scaleX:1.0243,scaleY:1.0243,y:373.0737},0).wait(1).to({scaleX:1.0237,scaleY:1.0237,y:373.0868},0).wait(1).to({scaleX:1.0232,scaleY:1.0232,y:373.1},0).wait(1).to({scaleX:1.0233,scaleY:1.0233,y:373.1232},0).wait(1).to({scaleX:1.0235,scaleY:1.0235,y:373.1464},0).wait(1).to({scaleX:1.0237,scaleY:1.0237,y:373.1696},0).wait(1).to({scaleX:1.0239,scaleY:1.0239,y:373.1929},0).wait(1).to({scaleX:1.024,scaleY:1.024,y:373.2161},0).wait(1).to({scaleX:1.0242,scaleY:1.0242,y:373.2393},0).wait(1).to({scaleX:1.0244,scaleY:1.0244,y:373.2625},0).wait(1).to({scaleX:1.0246,scaleY:1.0246,y:373.2857},0).wait(1).to({scaleX:1.0247,scaleY:1.0247,y:373.3089},0).wait(1).to({scaleX:1.0249,scaleY:1.0249,y:373.3321},0).wait(1).to({scaleX:1.0251,scaleY:1.0251,y:373.3554},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,y:373.3786},0).wait(1).to({scaleX:1.0254,scaleY:1.0254,y:373.4018},0).wait(1).to({scaleX:1.0256,scaleY:1.0256,y:373.425},0).wait(1).to({scaleX:1.0258,scaleY:1.0258,y:373.4482},0).wait(1).to({scaleX:1.026,scaleY:1.026,y:373.4714},0).wait(1).to({scaleX:1.0261,scaleY:1.0261,y:373.4946},0).wait(1).to({scaleX:1.0263,scaleY:1.0263,y:373.5179},0).wait(1).to({scaleX:1.0265,scaleY:1.0265,y:373.5411},0).wait(1).to({scaleX:1.0267,scaleY:1.0267,y:373.5643},0).wait(1).to({scaleX:1.0268,scaleY:1.0268,y:373.5875},0).wait(1).to({scaleX:1.027,scaleY:1.027,y:373.6107},0).wait(1).to({scaleX:1.0272,scaleY:1.0272,y:373.6339},0).wait(1).to({scaleX:1.0274,scaleY:1.0274,y:373.6571},0).wait(1).to({scaleX:1.0276,scaleY:1.0276,y:373.6804},0).wait(1).to({scaleX:1.0277,scaleY:1.0277,y:373.7036},0).wait(1).to({scaleX:1.0279,scaleY:1.0279,y:373.7268},0).wait(1).to({scaleX:1.0281,scaleY:1.0281,y:373.75},0).wait(209).to({regX:0.8,regY:0.3,x:636.1},0).wait(1).to({regX:0,regY:0,scaleX:1.0137,scaleY:1.0137,x:642.6401,y:374.6267},0).wait(1).to({scaleX:0.9993,scaleY:0.9993,x:649.9802,y:375.8035},0).wait(1).to({scaleX:0.9849,scaleY:0.9849,x:657.3203,y:376.9802},0).wait(1).to({scaleX:0.9705,scaleY:0.9705,x:664.6604,y:378.1569},0).wait(1).to({scaleX:0.9561,scaleY:0.9561,x:672.0005,y:379.3337},0).wait(1).to({scaleX:0.9417,scaleY:0.9417,x:679.3407,y:380.5104},0).wait(1).to({scaleX:0.9273,scaleY:0.9273,x:686.6808,y:381.6871},0).wait(1).to({scaleX:0.9129,scaleY:0.9129,x:694.0209,y:382.8639},0).wait(1).to({scaleX:0.8985,scaleY:0.8985,x:701.361,y:384.0406},0).wait(1).to({scaleX:0.8841,scaleY:0.8841,x:708.7011,y:385.2173},0).wait(1).to({scaleX:0.8697,scaleY:0.8697,x:716.0412,y:386.3941},0).wait(1).to({scaleX:0.8553,scaleY:0.8553,x:723.3813,y:387.5708},0).wait(1).to({scaleX:0.8409,scaleY:0.8409,x:730.7214,y:388.7475},0).wait(1).to({scaleX:0.8265,scaleY:0.8265,x:738.0615,y:389.9243},0).wait(1).to({scaleX:0.8121,scaleY:0.8121,x:745.4016,y:391.101},0).wait(1).to({scaleX:0.7977,scaleY:0.7977,x:752.7418,y:392.2777},0).wait(1).to({scaleX:0.7833,scaleY:0.7833,x:760.0819,y:393.4545},0).wait(1).to({scaleX:0.7689,scaleY:0.7689,x:767.422,y:394.6312},0).wait(1).to({scaleX:0.7545,scaleY:0.7545,x:774.7621,y:395.8079},0).wait(1).to({scaleX:0.7401,scaleY:0.7401,x:782.1022,y:396.9847},0).wait(1).to({scaleX:0.7257,scaleY:0.7257,x:789.4423,y:398.1614},0).wait(1).to({scaleX:0.7113,scaleY:0.7113,x:796.7824,y:399.3381},0).wait(1).to({scaleX:0.6969,scaleY:0.6969,x:804.1225,y:400.5149},0).wait(1).to({scaleX:0.6825,scaleY:0.6825,x:811.4626,y:401.6916},0).wait(1).to({scaleX:0.6681,scaleY:0.6681,x:818.8027,y:402.8683},0).wait(1).to({scaleX:0.6537,scaleY:0.6537,x:826.1429,y:404.0451},0).wait(1).to({scaleX:0.6393,scaleY:0.6393,x:833.483,y:405.2218},0).wait(1).to({scaleX:0.6249,scaleY:0.6249,x:840.8231,y:406.3985},0).wait(1).to({scaleX:0.6105,scaleY:0.6105,x:848.1632,y:407.5753},0).wait(1).to({scaleX:0.6079,scaleY:0.6079,x:848.7934,y:406.8478},0).wait(1).to({scaleX:0.6053,scaleY:0.6053,x:849.4236,y:406.1203},0).wait(1).to({scaleX:0.6027,scaleY:0.6027,x:850.0538,y:405.3928},0).wait(1).to({scaleX:0.6001,scaleY:0.6001,x:850.684,y:404.6653},0).wait(1).to({scaleX:0.5975,scaleY:0.5975,x:851.3142,y:403.9379},0).wait(1).to({scaleX:0.5949,scaleY:0.5949,x:851.9444,y:403.2104},0).wait(1).to({scaleX:0.5923,scaleY:0.5923,x:852.5746,y:402.4829},0).wait(1).to({scaleX:0.5897,scaleY:0.5897,x:853.2048,y:401.7554},0).wait(1).to({scaleX:0.5871,scaleY:0.5871,x:853.835,y:401.0279},0).wait(1).to({scaleX:0.5845,scaleY:0.5845,x:854.4653,y:400.3004},0).wait(1).to({scaleX:0.582,scaleY:0.582,x:855.0955,y:399.573},0).wait(1).to({scaleX:0.5794,scaleY:0.5794,x:855.7257,y:398.8455},0).wait(1).to({scaleX:0.5768,scaleY:0.5768,x:856.3559,y:398.118},0).wait(1).to({scaleX:0.5742,scaleY:0.5742,x:856.9861,y:397.3905},0).wait(1).to({scaleX:0.5716,scaleY:0.5716,x:857.6163,y:396.663},0).wait(1).to({scaleX:0.569,scaleY:0.569,x:858.2465,y:395.9356},0).wait(1).to({scaleX:0.5664,scaleY:0.5664,x:858.8767,y:395.2081},0).wait(1).to({scaleX:0.5638,scaleY:0.5638,x:859.5069,y:394.4806},0).wait(1).to({scaleX:0.5612,scaleY:0.5612,x:860.1371,y:393.7531},0).wait(1).to({scaleX:0.5586,scaleY:0.5586,x:860.7673,y:393.0256},0).wait(1).to({scaleX:0.556,scaleY:0.556,x:861.3975,y:392.2981},0).wait(1).to({scaleX:0.5534,scaleY:0.5534,x:862.0277,y:391.5707},0).wait(1).to({scaleX:0.5508,scaleY:0.5508,x:862.6579,y:390.8432},0).wait(1).to({scaleX:0.5441,scaleY:0.5441,x:863.2018,y:389.3938},0).wait(1).to({scaleX:0.5374,scaleY:0.5374,x:863.7458,y:387.9444},0).wait(1).to({scaleX:0.5308,scaleY:0.5308,x:864.2897,y:386.495},0).wait(1).to({scaleX:0.5241,scaleY:0.5241,x:864.8336,y:385.0456},0).wait(1).to({scaleX:0.5174,scaleY:0.5174,x:865.3775,y:383.5963},0).wait(1).to({scaleX:0.5107,scaleY:0.5107,x:865.9214,y:382.1469},0).wait(1).to({scaleX:0.504,scaleY:0.504,x:866.4653,y:380.6975},0).wait(1).to({scaleX:0.4973,scaleY:0.4973,x:867.0092,y:379.2481},0).wait(1).to({scaleX:0.4906,scaleY:0.4906,x:867.5531,y:377.7987},0).wait(1).to({scaleX:0.4839,scaleY:0.4839,x:868.097,y:376.3494},0).wait(1).to({scaleX:0.4772,scaleY:0.4772,x:868.6409,y:374.9},0).wait(1).to({scaleX:0.4705,scaleY:0.4705,x:869.1848,y:373.4506},0).wait(1).to({scaleX:0.4638,scaleY:0.4638,x:869.7287,y:372.0012},0).wait(1).to({scaleX:0.4571,scaleY:0.4571,x:870.2726,y:370.5518},0).wait(1).to({scaleX:0.4505,scaleY:0.4505,x:870.8165,y:369.1025},0).wait(1).to({scaleX:0.4438,scaleY:0.4438,x:871.3605,y:367.6531},0).wait(1).to({scaleX:0.4371,scaleY:0.4371,x:871.9044,y:366.2037},0).wait(1).to({scaleX:0.4304,scaleY:0.4304,x:872.4483,y:364.7543},0).wait(1).to({scaleX:0.4237,scaleY:0.4237,x:872.9922,y:363.3049},0).wait(1).to({scaleX:0.417,scaleY:0.417,x:873.5361,y:361.8555},0).wait(1).to({scaleX:0.4103,scaleY:0.4103,x:874.08,y:360.4062},0).wait(1).to({scaleX:0.4036,scaleY:0.4036,x:874.6239,y:358.9568},0).wait(1).to({scaleX:0.3969,scaleY:0.3969,x:875.1678,y:357.5074},0).wait(1).to({scaleX:0.3902,scaleY:0.3902,x:875.7117,y:356.058},0).wait(1).to({scaleX:0.3835,scaleY:0.3835,x:876.2556,y:354.6086},0).wait(1).to({scaleX:0.3769,scaleY:0.3769,x:876.7995,y:353.1593},0).wait(1).to({scaleX:0.3702,scaleY:0.3702,x:877.3434,y:351.7099},0).wait(1).to({scaleX:0.3635,scaleY:0.3635,x:877.8873,y:350.2605},0).wait(1).to({scaleX:0.3568,scaleY:0.3568,x:878.4313,y:348.8111},0).wait(1).to({scaleX:0.3501,scaleY:0.3501,x:878.9752,y:347.3617},0).wait(1).to({scaleX:0.3434,scaleY:0.3434,x:879.5191,y:345.9123},0).wait(1).to({scaleX:0.3367,scaleY:0.3367,x:880.063,y:344.463},0).wait(1).to({scaleX:0.33,scaleY:0.33,x:880.6069,y:343.0136},0).wait(1).to({scaleX:0.3233,scaleY:0.3233,x:881.1508,y:341.5642},0).wait(1).to({scaleX:0.3166,scaleY:0.3166,x:881.6947,y:340.1148},0).wait(1).to({scaleX:0.3099,scaleY:0.3099,x:882.2386,y:338.6654},0).wait(1).to({scaleX:0.3091,scaleY:0.3091,x:882.436,y:338.3624},0).wait(1).to({scaleX:0.3082,scaleY:0.3082,x:882.6334,y:338.0594},0).wait(1).to({scaleX:0.3074,scaleY:0.3074,x:882.8307,y:337.7564},0).wait(1).to({scaleX:0.3066,scaleY:0.3066,x:883.0281,y:337.4534},0).wait(1).to({scaleX:0.3057,scaleY:0.3057,x:883.2255,y:337.1504},0).wait(1).to({scaleX:0.3049,scaleY:0.3049,x:883.4228,y:336.8474},0).wait(1).to({scaleX:0.304,scaleY:0.304,x:883.6202,y:336.5444},0).wait(1).to({scaleX:0.3032,scaleY:0.3032,x:883.8176,y:336.2414},0).wait(1).to({scaleX:0.3023,scaleY:0.3023,x:884.015,y:335.9384},0).wait(1).to({scaleX:0.3015,scaleY:0.3015,x:884.2123,y:335.6354},0).wait(1).to({scaleX:0.3006,scaleY:0.3006,x:884.4097,y:335.3324},0).wait(1).to({scaleX:0.2998,scaleY:0.2998,x:884.6071,y:335.0294},0).wait(1).to({scaleX:0.2989,scaleY:0.2989,x:884.8045,y:334.7263},0).wait(1).to({scaleX:0.2981,scaleY:0.2981,x:885.0018,y:334.4233},0).wait(1).to({scaleX:0.2973,scaleY:0.2973,x:885.1992,y:334.1203},0).wait(1).to({scaleX:0.2964,scaleY:0.2964,x:885.3966,y:333.8173},0).wait(1).to({scaleX:0.2956,scaleY:0.2956,x:885.594,y:333.5143},0).wait(1).to({scaleX:0.2947,scaleY:0.2947,x:885.7913,y:333.2113},0).wait(1).to({scaleX:0.2939,scaleY:0.2939,x:885.9887,y:332.9083},0).wait(1).to({scaleX:0.293,scaleY:0.293,x:886.1861,y:332.6053},0).wait(1).to({scaleX:0.2922,scaleY:0.2922,x:886.3834,y:332.3023},0).wait(1).to({scaleX:0.2913,scaleY:0.2913,x:886.5808,y:331.9993},0).wait(1).to({scaleX:0.2905,scaleY:0.2905,x:886.7782,y:331.6963},0).wait(1).to({scaleX:0.2896,scaleY:0.2896,x:886.9756,y:331.3933},0).wait(1).to({scaleX:0.2888,scaleY:0.2888,x:887.1729,y:331.0903},0).wait(1).to({scaleX:0.288,scaleY:0.288,x:887.3703,y:330.7873},0).wait(1).to({scaleX:0.2871,scaleY:0.2871,x:887.5677,y:330.4842},0).wait(1).to({scaleX:0.2863,scaleY:0.2863,x:887.7651,y:330.1812},0).wait(1).to({scaleX:0.2854,scaleY:0.2854,x:887.9624,y:329.8782},0).wait(1).to({scaleX:0.2846,scaleY:0.2846,x:888.1598,y:329.5752},0).wait(1).to({scaleX:0.2837,scaleY:0.2837,x:888.3572,y:329.2722},0).wait(1).to({scaleX:0.2829,scaleY:0.2829,x:888.5545,y:328.9692},0).wait(1).to({scaleX:0.282,scaleY:0.282,x:888.7519,y:328.6662},0).wait(1).to({scaleX:0.2812,scaleY:0.2812,x:888.9493,y:328.3632},0).wait(1).to({scaleX:0.2803,scaleY:0.2803,x:889.1467,y:328.0602},0).wait(1).to({scaleX:0.2795,scaleY:0.2795,x:889.344,y:327.7572},0).wait(1).to({scaleX:0.2787,scaleY:0.2787,x:889.5414,y:327.4542},0).wait(1).to({scaleX:0.2778,scaleY:0.2778,x:889.7388,y:327.1512},0).wait(1).to({scaleX:0.277,scaleY:0.277,x:889.9362,y:326.8482},0).wait(1).to({scaleX:0.2761,scaleY:0.2761,x:890.1335,y:326.5452},0).wait(1).to({scaleX:0.2753,scaleY:0.2753,x:890.3309,y:326.2421},0).wait(1).to({scaleX:0.2744,scaleY:0.2744,x:890.5283,y:325.9391},0).wait(1).to({scaleX:0.2736,scaleY:0.2736,x:890.7257,y:325.6361},0).wait(1).to({scaleX:0.2727,scaleY:0.2727,x:890.923,y:325.3331},0).wait(1).to({scaleX:0.2719,scaleY:0.2719,x:891.1204,y:325.0301},0).wait(1).to({scaleX:0.271,scaleY:0.271,x:891.3178,y:324.7271},0).wait(1).to({x:891.381},0).wait(1).to({x:891.4442},0).wait(1).to({x:891.5075},0).wait(1).to({x:891.5707},0).wait(1).to({x:891.634},0).wait(1).to({x:891.6972},0).wait(1).to({x:891.7604},0).wait(1).to({x:891.8237},0).wait(1).to({x:891.8869},0).wait(1).to({x:891.9501},0).wait(1).to({x:892.0134},0).wait(1).to({x:892.0766},0).wait(1).to({x:892.1398},0).wait(1).to({x:892.2031},0).wait(1).to({x:892.2663},0).wait(1).to({x:892.3295},0).wait(1).to({x:892.3928},0).wait(1).to({x:892.456},0).wait(1).to({x:892.5192},0).wait(1).to({x:892.5825},0).wait(1).to({x:892.6457},0).wait(1).to({x:892.709},0).wait(1).to({x:892.7722},0).wait(1).to({x:892.8354},0).wait(1).to({x:892.8987},0).wait(1).to({x:892.9619},0).wait(1).to({x:893.0251},0).wait(1).to({x:893.0884},0).wait(1).to({x:893.1516},0).wait(1).to({x:893.2148},0).wait(1).to({x:893.2781},0).wait(1).to({x:893.3413},0).wait(1).to({x:893.4045},0).wait(1).to({x:893.4678},0).wait(2));

	// bottonStart_obj_
	this.bottonStart = new lib.Scene_1_bottonStart();
	this.bottonStart.name = "bottonStart";
	this.bottonStart.setTransform(714.6,477.9,1,1,0,0,0,714.6,477.9);
	this.bottonStart.depth = 0;
	this.bottonStart.isAttachedToCamera = 0
	this.bottonStart.isAttachedToMask = 0
	this.bottonStart.layerDepth = 0
	this.bottonStart.layerIndex = 0
	this.bottonStart.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.bottonStart).wait(618).to({regX:913.6,regY:356.7,scaleX:3.6897,scaleY:3.6897,x:714.75,y:478},0).wait(3));

	// clouds_obj_
	this.clouds = new lib.Scene_1_clouds();
	this.clouds.name = "clouds";
	this.clouds.depth = 0;
	this.clouds.isAttachedToCamera = 0
	this.clouds.isAttachedToMask = 0
	this.clouds.layerDepth = 0
	this.clouds.layerIndex = 1
	this.clouds.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.clouds).wait(417).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,y:-0.05},0).wait(1).to({regX:209.6,regY:135.5,scaleX:1,scaleY:1,x:231.45,y:131.9},0).wait(203));

	// Drape_obj_
	this.Drape = new lib.Scene_1_Drape();
	this.Drape.name = "Drape";
	this.Drape.setTransform(642.8,350.1,1,1,0,0,0,642.8,350.1);
	this.Drape.depth = 0;
	this.Drape.isAttachedToCamera = 0
	this.Drape.isAttachedToMask = 0
	this.Drape.layerDepth = 0
	this.Drape.layerIndex = 2
	this.Drape.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Drape).wait(1).to({regY:-27.6,y:-27.6},0).wait(48).to({regY:350.1,y:350.1},0).wait(572));

	// wire9_obj_
	this.wire9 = new lib.Scene_1_wire9();
	this.wire9.name = "wire9";
	this.wire9.setTransform(905.6,282.1,1,1,0,0,0,905.6,282.1);
	this.wire9.depth = 0;
	this.wire9.isAttachedToCamera = 0
	this.wire9.isAttachedToMask = 0
	this.wire9.layerDepth = 0
	this.wire9.layerIndex = 3
	this.wire9.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire9).wait(131).to({regX:783,regY:359.1,scaleX:2.1391,scaleY:2.1391,x:905.7,y:282.15},0).wait(40).to({regX:867.1,regY:315.3,scaleX:1.1918,scaleY:1.1918,y:282.05},0).wait(5).to({regX:913.9,regY:291.2,scaleX:0.9565,scaleY:0.9565,y:282.1},0).wait(1).to({regX:913.7,scaleX:0.9571,scaleY:0.9571,x:905.65,y:282},0).wait(1).to({regX:913.6,scaleX:0.9576,scaleY:0.9576,x:905.7},0).wait(1).to({regX:913.4,regY:291.3,scaleX:0.9581,scaleY:0.9581,y:282.05},0).wait(1).to({regX:913.2,regY:291.4,scaleX:0.9587,scaleY:0.9587,x:905.6},0).wait(1).to({regX:913.1,scaleX:0.9592,scaleY:0.9592,x:905.7,y:282},0).wait(1).to({regX:912.9,regY:291.5,scaleX:0.9597,scaleY:0.9597,x:905.65,y:282.05},0).wait(1).to({regX:912.8,scaleX:0.9603,scaleY:0.9603,x:905.7,y:282},0).wait(1).to({regX:912.6,regY:291.6,scaleX:0.9608,scaleY:0.9608,x:905.65,y:282.05},0).wait(1).to({regX:912.4,regY:291.7,scaleX:0.9614,scaleY:0.9614,y:282.1},0).wait(1).to({regX:912.3,regY:291.8,scaleX:0.9619,scaleY:0.9619},0).wait(1).to({regX:912.1,scaleX:0.9624,scaleY:0.9624},0).wait(1).to({regX:912,regY:291.9,scaleX:0.963,scaleY:0.963},0).wait(1).to({regX:911.8,scaleX:0.9635,scaleY:0.9635,y:282.05},0).wait(1).to({regX:911.6,scaleX:0.9641,scaleY:0.9641,x:905.6,y:282},0).wait(1).to({regX:911.5,regY:292.1,scaleX:0.9646,scaleY:0.9646,x:905.65,y:282.1},0).wait(1).to({regX:911.3,scaleX:0.9652,scaleY:0.9652,x:905.6,y:282.05},0).wait(1).to({regX:911.2,scaleX:0.9657,scaleY:0.9657,x:905.65,y:282.1},0).wait(1).to({regX:911,scaleX:0.9663,scaleY:0.9663,y:282.05},0).wait(1).to({regX:910.9,regY:292.2,scaleX:0.9668,scaleY:0.9668,y:282},0).wait(1).to({regX:910.7,regY:292.3,scaleX:0.9674,scaleY:0.9674,y:282.05},0).wait(1).to({regX:910.6,regY:292.4,scaleX:0.9679,scaleY:0.9679,x:905.7,y:282.1},0).wait(1).to({regX:910.4,scaleX:0.9685,scaleY:0.9685,x:905.65},0).wait(1).to({regX:910.3,scaleX:0.969,scaleY:0.969,y:282},0).wait(1).to({regX:910.1,regY:292.5,scaleX:0.9696,scaleY:0.9696,y:282.05},0).wait(1).to({regX:910,regY:292.6,scaleX:0.9701,scaleY:0.9701,x:905.7,y:282.1},0).wait(1).to({regX:909.8,scaleX:0.9707,scaleY:0.9707,y:282.05},0).wait(1).to({regX:909.6,regY:292.7,scaleX:0.9712,scaleY:0.9712,x:905.55,y:282.1},0).wait(1).to({regX:909.5,regY:292.8,scaleX:0.9718,scaleY:0.9718,x:905.7},0).wait(1).to({regX:909.4,scaleX:0.9724,scaleY:0.9724,y:282.05},0).wait(1).to({regX:909.1,regY:292.9,scaleX:0.9729,scaleY:0.9729,x:905.65,y:282.1},0).wait(1).to({regX:909,scaleX:0.9735,scaleY:0.9735,y:282.05},0).wait(1).to({regX:908.8,scaleX:0.974,scaleY:0.974,x:905.6,y:282},0).wait(1).to({regX:908.7,regY:293.1,scaleX:0.9746,scaleY:0.9746,x:905.65,y:282.1},0).wait(1).to({regX:908.6,scaleX:0.9751,scaleY:0.9751,x:905.7,y:282.05},0).wait(1).to({regX:908.4,regY:293.2,scaleX:0.9757,scaleY:0.9757,x:905.65},0).wait(1).to({regX:908.2,scaleX:0.9762,scaleY:0.9762,x:905.6,y:282.1},0).wait(1).to({regX:908.1,scaleX:0.9768,scaleY:0.9768,x:905.7,y:282},0).wait(1).to({regX:907.9,regY:293.4,scaleX:0.9774,scaleY:0.9774,x:905.65,y:282.1},0).wait(1).to({regX:908,scaleX:0.9772,scaleY:0.9772,x:905.7},0).wait(1).to({regY:293.3,scaleX:0.977,scaleY:0.977,x:905.65,y:282.05},0).wait(1).to({regX:908.1,regY:293.4,scaleX:0.9769,scaleY:0.9769,x:905.7,y:282.1},0).wait(1).to({scaleX:0.9767,scaleY:0.9767},0).wait(1).to({scaleX:0.9765,scaleY:0.9765,x:905.55,y:282.05},0).wait(1).to({regX:908.2,scaleX:0.9764,scaleY:0.9764,x:905.65,y:282.1},0).wait(1).to({scaleX:0.9762,scaleY:0.9762,x:905.6,y:282.05},0).wait(1).to({scaleX:0.976,scaleY:0.976,x:905.55},0).wait(1).to({regX:908.4,scaleX:0.9759,scaleY:0.9759,x:905.7},0).wait(1).to({scaleX:0.9757,scaleY:0.9757,x:905.65},0).wait(2).to({regX:908.5,scaleX:0.9754,scaleY:0.9754,x:905.7,y:282},0).wait(2).to({regX:908.6,scaleX:0.975,scaleY:0.975,x:905.65},0).wait(12).to({regX:909.1,regY:293.6,scaleX:0.973,scaleY:0.973,x:905.6,y:282.05},0).wait(1).to({scaleX:0.9729,scaleY:0.9729,y:282.1},0).wait(1).to({regX:909.2,scaleX:0.9727,scaleY:0.9727,x:905.65,y:282.05},0).wait(138).to({regX:889.2,regY:-22.2,scaleX:1,scaleY:1,x:885.7,y:-33.75},0).wait(35).to({regX:909.2,regY:293.6,scaleX:0.9727,scaleY:0.9727,x:905.65,y:282.05},0).wait(1).to({_off:true},204).wait(1));

	// wire8_obj_
	this.wire8 = new lib.Scene_1_wire8();
	this.wire8.name = "wire8";
	this.wire8.setTransform(845.6,233,1,1,0,0,0,845.6,233);
	this.wire8.depth = 0;
	this.wire8.isAttachedToCamera = 0
	this.wire8.isAttachedToMask = 0
	this.wire8.layerDepth = 0
	this.wire8.layerIndex = 4
	this.wire8.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire8).wait(131).to({regX:754.9,regY:336.1,scaleX:2.1391,scaleY:2.1391,y:232.95},0).wait(44).to({regX:844.2,regY:246.7,scaleX:0.9958,scaleY:0.9958,y:233.05},0).wait(1).to({regX:851.1,regY:239.9,scaleX:0.9565,scaleY:0.9565,y:233},0).wait(1).to({regX:851,regY:240,scaleX:0.9571,scaleY:0.9571,x:845.65},0).wait(1).to({regX:850.9,regY:240.1,scaleX:0.9576,scaleY:0.9576,y:233.05},0).wait(1).to({regX:850.7,scaleX:0.9581,scaleY:0.9581,x:845.6,y:233},0).wait(1).to({regX:850.6,regY:240.2,scaleX:0.9587,scaleY:0.9587,y:232.95},0).wait(1).to({regX:850.5,regY:240.3,scaleX:0.9592,scaleY:0.9592,x:845.65,y:233},0).wait(1).to({regX:850.4,regY:240.4,scaleX:0.9597,scaleY:0.9597},0).wait(1).to({regX:850.2,regY:240.5,scaleX:0.9603,scaleY:0.9603,x:845.6,y:233.05},0).wait(2).to({regX:850,regY:240.7,scaleX:0.9614,scaleY:0.9614,x:845.65},0).wait(2).to({regX:849.8,regY:240.8,scaleX:0.9624,scaleY:0.9624,x:845.7,y:233},0).wait(4).to({regX:849.3,regY:241.2,scaleX:0.9646,scaleY:0.9646,x:845.65},0).wait(18).to({regX:847.1,regY:242.7,scaleX:0.9746,scaleY:0.9746,x:845.6},0).wait(1).to({regX:847,regY:242.8,scaleX:0.9751,scaleY:0.9751},0).wait(2).to({regX:846.8,regY:242.9,scaleX:0.9762,scaleY:0.9762,x:845.7},0).wait(3).to({regX:846.6,regY:243.2,scaleX:0.9772,scaleY:0.9772,y:233.05},0).wait(5).to({regX:846.8,regY:243.1,scaleX:0.9764,scaleY:0.9764,y:233},0).wait(1).to({regY:243.2,scaleX:0.9762,scaleY:0.9762,x:845.65,y:233.05},0).wait(2).to({regX:846.9,regY:243.1,scaleX:0.9759,scaleY:0.9759,x:845.7,y:233},0).wait(2).to({regY:243.2,scaleX:0.9755,scaleY:0.9755,x:845.65,y:233.05},0).wait(3).to({regX:847.1,regY:243.1,scaleX:0.975,scaleY:0.975,x:845.7,y:232.95},0).wait(12).to({regX:847.5,regY:243.2,scaleX:0.973,scaleY:0.973,x:845.65,y:233.05},0).wait(1).to({scaleX:0.9729,scaleY:0.9729,x:845.7},0).wait(1).to({scaleX:0.9727,scaleY:0.9727,x:845.65,y:233},0).wait(138).to({regX:843.2,regY:-85.1,scaleX:1,scaleY:1,x:841.4,y:-95.25},0).wait(35).to({regX:847.5,regY:243.2,scaleX:0.9727,scaleY:0.9727,x:845.65,y:233},0).wait(1).to({_off:true},204).wait(1));

	// wire7_obj_
	this.wire7 = new lib.Scene_1_wire7();
	this.wire7.name = "wire7";
	this.wire7.setTransform(802.5,246.2,1,1,0,0,0,802.5,246.2);
	this.wire7.depth = 0;
	this.wire7.isAttachedToCamera = 0
	this.wire7.isAttachedToMask = 0
	this.wire7.layerDepth = 0
	this.wire7.layerIndex = 5
	this.wire7.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire7).wait(131).to({regX:734.8,regY:342.3,scaleX:2.1391,scaleY:2.1391,x:802.6},0).wait(54).to({regX:805.1,regY:254.5,scaleX:0.9614,scaleY:0.9614,x:802.5,y:246.3},0).wait(1).to({regY:254.6,scaleX:0.9619,scaleY:0.9619},0).wait(1).to({regX:805,scaleX:0.9624,scaleY:0.9624,x:802.55},0).wait(3).to({regX:804.6,regY:254.8,scaleX:0.9641,scaleY:0.9641,x:802.45,y:246.25},0).wait(1).to({regY:254.9,scaleX:0.9646,scaleY:0.9646,x:802.55},0).wait(1).to({regX:804.5,regY:255.1,scaleX:0.9652,scaleY:0.9652,y:246.3},0).wait(51).to({regX:803.1,regY:256.8,scaleX:0.9727,scaleY:0.9727,x:802.45,y:246.25},0).wait(137).to({regX:805.3,regY:-23.4,scaleX:1,scaleY:1,x:804.7,y:-33.95},0).wait(35).to({regX:803.1,regY:256.8,scaleX:0.9727,scaleY:0.9727,x:802.45,y:246.25},0).wait(1).to({_off:true},204).wait(1));

	// wire6_obj_
	this.wire6 = new lib.Scene_1_wire6();
	this.wire6.name = "wire6";
	this.wire6.setTransform(562.9,247.2,1,1,0,0,0,562.9,247.2);
	this.wire6.depth = 0;
	this.wire6.isAttachedToCamera = 0
	this.wire6.isAttachedToMask = 0
	this.wire6.layerDepth = 0
	this.wire6.layerIndex = 6
	this.wire6.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire6).wait(131).to({regX:622.8,regY:342.8,scaleX:2.1391,scaleY:2.1391,x:563,y:247.3},0).wait(32).to({regX:617.9,regY:336.4,scaleX:1.9656,scaleY:1.9656,x:562.95,y:247.2},0).wait(2).to({regX:608.3,regY:323.9,scaleX:1.6911,scaleY:1.6911,x:562.9,y:247.25},0).wait(1).to({regX:603.5,regY:317.6,scaleX:1.5807,scaleY:1.5807},0).wait(1).to({regX:598.6,regY:311.2,scaleX:1.4839,scaleY:1.4839,x:562.8,y:247.2},0).wait(24).to({regX:556.1,regY:255.9,scaleX:0.9646,scaleY:0.9646,x:562.85},0).wait(1).to({regX:556.2,regY:256,scaleX:0.9652,scaleY:0.9652,x:562.9},0).wait(57).to({regX:556.8,regY:257.8,scaleX:0.9727,scaleY:0.9727},0).wait(131).to({regX:487.4,regY:-47.2,scaleX:1,scaleY:1,x:493.45,y:-57.75},0).wait(35).to({regX:556.8,regY:257.8,scaleX:0.9727,scaleY:0.9727,x:562.9,y:247.2},0).wait(1).to({_off:true},204).wait(1));

	// wire5_obj_
	this.wire5 = new lib.Scene_1_wire5();
	this.wire5.name = "wire5";
	this.wire5.setTransform(778.7,204.2,1,1,0,0,0,778.7,204.2);
	this.wire5.depth = 0;
	this.wire5.isAttachedToCamera = 0
	this.wire5.isAttachedToMask = 0
	this.wire5.layerDepth = 0
	this.wire5.layerIndex = 7
	this.wire5.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire5).wait(131).to({regX:723.6,regY:322.7,scaleX:2.1391,scaleY:2.1391,x:778.65,y:204.3},0).wait(54).to({regX:780.4,regY:210.7,scaleX:0.9614,scaleY:0.9614,x:778.75,y:204.2},0).wait(2).to({regX:780.2,regY:210.8,scaleX:0.9624,scaleY:0.9624,x:778.7,y:204.15},0).wait(3).to({regX:780,regY:211.2,scaleX:0.9641,scaleY:0.9641,x:778.75,y:204.2},0).wait(1).to({regX:779.9,scaleX:0.9646,scaleY:0.9646,x:778.7,y:204.1},0).wait(2).to({regX:779.7,regY:211.4,scaleX:0.9657,scaleY:0.9657,y:204.15},0).wait(47).to({regX:778.6,regY:213.5,scaleX:0.973,scaleY:0.973,x:778.65},0).wait(1).to({scaleX:0.9729,scaleY:0.9729},0).wait(6).to({regY:213.6,scaleX:0.9727,scaleY:0.9727,y:204.2},0).wait(133).to({regX:776.3,regY:-46.8,scaleX:1,scaleY:1,x:776.3,y:-56.15},0).wait(35).to({regX:778.6,regY:213.6,scaleX:0.9727,scaleY:0.9727,x:778.65,y:204.2},0).wait(1).to({_off:true},204).wait(1));

	// wire4_obj_
	this.wire4 = new lib.Scene_1_wire4();
	this.wire4.name = "wire4";
	this.wire4.setTransform(626,107.5,1,1,0,0,0,626,107.5);
	this.wire4.depth = 0;
	this.wire4.isAttachedToCamera = 0
	this.wire4.isAttachedToMask = 0
	this.wire4.layerDepth = 0
	this.wire4.layerIndex = 8
	this.wire4.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire4).wait(131).to({regX:652.2,regY:277.5,scaleX:2.1391,scaleY:2.1391,x:625.9,y:107.6},0).wait(248).to({regX:621.6,regY:114.2,scaleX:0.9727,scaleY:0.9727,y:107.55},0).wait(1).to({regX:620.2,regY:-39.8,scaleX:1,scaleY:1,x:624.5,y:-46.45},0).wait(35).to({regX:621.6,regY:114.2,scaleX:0.9727,scaleY:0.9727,x:625.9,y:107.55},0).wait(1).to({_off:true},204).wait(1));

	// wire3_obj_
	this.wire3 = new lib.Scene_1_wire3();
	this.wire3.name = "wire3";
	this.wire3.setTransform(583.1,220.6,1,1,0,0,0,583.1,220.6);
	this.wire3.depth = 0;
	this.wire3.isAttachedToCamera = 0
	this.wire3.isAttachedToMask = 0
	this.wire3.layerDepth = 0
	this.wire3.layerIndex = 9
	this.wire3.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire3).wait(131).to({regX:632.2,regY:330.3,scaleX:2.1391,scaleY:2.1391,x:583.15,y:220.55},0).wait(45).to({regX:576.7,regY:226.8,scaleX:0.9565,scaleY:0.9565,y:220.5},0).wait(2).to({regX:576.8,regY:227.1,scaleX:0.9576,scaleY:0.9576,x:583.2,y:220.6},0).wait(1).to({scaleX:0.9581,scaleY:0.9581,y:220.55},0).wait(1).to({regX:576.9,regY:227.2,scaleX:0.9587,scaleY:0.9587,y:220.5},0).wait(75).to({regX:577.6,regY:230.4,scaleX:0.9727,scaleY:0.9727,x:583.1,y:220.55},0).wait(125).to({regX:540.7,regY:-32.9,scaleX:1,scaleY:1,x:546.2,y:-42.7},0).wait(35).to({regX:577.6,regY:230.4,scaleX:0.9727,scaleY:0.9727,x:583.1,y:220.55},0).wait(1).to({_off:true},204).wait(1));

	// wire2_obj_
	this.wire2 = new lib.Scene_1_wire2();
	this.wire2.name = "wire2";
	this.wire2.setTransform(539.9,198,1,1,0,0,0,539.9,198);
	this.wire2.depth = 0;
	this.wire2.isAttachedToCamera = 0
	this.wire2.isAttachedToMask = 0
	this.wire2.layerDepth = 0
	this.wire2.layerIndex = 10
	this.wire2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire2).wait(131).to({regX:612,regY:319.8,scaleX:2.1391,scaleY:2.1391,y:198.1},0).wait(45).to({regX:531.5,regY:203.2,scaleX:0.9565,scaleY:0.9565,x:539.95,y:197.9},0).wait(2).to({regX:531.6,regY:203.5,scaleX:0.9576,scaleY:0.9576,x:539.9,y:198},0).wait(1).to({scaleX:0.9581,scaleY:0.9581,y:197.95},0).wait(1).to({regX:531.8,regY:203.7,scaleX:0.9587,scaleY:0.9587,x:539.95,y:198},0).wait(2).to({regY:203.8,scaleX:0.9597,scaleY:0.9597,x:539.9,y:197.9},0).wait(7).to({regX:532.2,regY:204.6,scaleX:0.9635,scaleY:0.9635,y:197.95},0).wait(3).to({regX:532.4,regY:205,scaleX:0.9652,scaleY:0.9652},0).wait(63).to({regX:533.1,regY:207.2,scaleX:0.9727,scaleY:0.9727,x:539.85,y:198},0).wait(125).to({regX:492.8,regY:-37.8,scaleX:1,scaleY:1,x:499.5,y:-47},0).wait(35).to({regX:533.1,regY:207.2,scaleX:0.9727,scaleY:0.9727,x:539.85,y:198},0).wait(1).to({_off:true},204).wait(1));

	// wire1_obj_
	this.wire1 = new lib.Scene_1_wire1();
	this.wire1.name = "wire1";
	this.wire1.setTransform(480.2,273.6,1,1,0,0,0,480.2,273.6);
	this.wire1.depth = 0;
	this.wire1.isAttachedToCamera = 0
	this.wire1.isAttachedToMask = 0
	this.wire1.layerDepth = 0
	this.wire1.layerIndex = 11
	this.wire1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.wire1).wait(131).to({regX:584.1,regY:355.1,scaleX:2.1391,scaleY:2.1391,x:480.25},0).wait(32).to({regX:575.8,regY:349.8,scaleX:1.9656,scaleY:1.9656,x:480.2,y:273.55},0).wait(8).to({regX:510.2,regY:308.2,scaleX:1.1918,scaleY:1.1918,x:480.3},0).wait(126).to({regX:471.9,regY:284.9,scaleX:0.9727,scaleY:0.9727},0).wait(84).to({regX:457.2,regY:-32.5,scaleX:1,scaleY:1,x:465.6,y:-43.8},0).wait(34).to({regX:471.9,regY:284.9,scaleX:0.9727,scaleY:0.9727,x:480.3,y:273.55},0).wait(1).to({_off:true},204).wait(1));

	// eyeL_obj_
	this.eyeL = new lib.Scene_1_eyeL();
	this.eyeL.name = "eyeL";
	this.eyeL.setTransform(579,347.1,1,1,0,0,0,579,347.1);
	this.eyeL.depth = 0;
	this.eyeL.isAttachedToCamera = 0
	this.eyeL.isAttachedToMask = 0
	this.eyeL.layerDepth = 0
	this.eyeL.layerIndex = 12
	this.eyeL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eyeL).wait(74).to({regX:611,regY:372.2,scaleX:1.5091,scaleY:1.5091,x:579.05,y:347.15},0).wait(306).to({regX:573.3,regY:360.5,scaleX:0.9727,scaleY:0.9727,x:578.95,y:347.1},0).to({_off:true},1).wait(240));

	// eyeR_obj_
	this.eyeR = new lib.Scene_1_eyeR();
	this.eyeR.name = "eyeR";
	this.eyeR.setTransform(621.4,337.1,1,1,0,0,0,621.4,337.1);
	this.eyeR.depth = 0;
	this.eyeR.isAttachedToCamera = 0
	this.eyeR.isAttachedToMask = 0
	this.eyeR.layerDepth = 0
	this.eyeR.layerIndex = 13
	this.eyeR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.eyeR).wait(74).to({regX:639.1,regY:365.5,scaleX:1.5091,scaleY:1.5091,x:621.45,y:337.05},0).wait(306).to({regX:617,regY:350.2,scaleX:0.9727,scaleY:0.9727,y:337.1},0).wait(5).to({_off:true},185).wait(51));

	// nose_obj_
	this.nose = new lib.Scene_1_nose();
	this.nose.name = "nose";
	this.nose.setTransform(580.1,367.3,1,1,0,0,0,580.1,367.3);
	this.nose.depth = 0;
	this.nose.isAttachedToCamera = 0
	this.nose.isAttachedToMask = 0
	this.nose.layerDepth = 0
	this.nose.layerIndex = 14
	this.nose.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.nose).wait(380).to({regX:574.5,regY:381.2,scaleX:0.9727,scaleY:0.9727,y:367.25},0).wait(5).to({_off:true},185).wait(51));

	// hat_obj_
	this.hat = new lib.Scene_1_hat();
	this.hat.name = "hat";
	this.hat.setTransform(621.1,264.4,1,1,0,0,0,621.1,264.4);
	this.hat.depth = 0;
	this.hat.isAttachedToCamera = 0
	this.hat.isAttachedToMask = 0
	this.hat.layerDepth = 0
	this.hat.layerIndex = 15
	this.hat.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hat).wait(90).to({regX:649.6,regY:349.2,scaleX:2.1718,scaleY:2.1718,x:621.05,y:264.45},0).wait(290).to({regX:616.6,regY:275.4,scaleX:0.9727,scaleY:0.9727,y:264.35},0).wait(5).to({_off:true},185).wait(51));

	// hair_obj_
	this.hair = new lib.Scene_1_hair();
	this.hair.name = "hair";
	this.hair.setTransform(611.7,296.4,1,1,0,0,0,611.7,296.4);
	this.hair.depth = 0;
	this.hair.isAttachedToCamera = 0
	this.hair.isAttachedToMask = 0
	this.hair.layerDepth = 0
	this.hair.layerIndex = 16
	this.hair.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.hair).wait(380).to({regX:607,regY:308.4,scaleX:0.9727,scaleY:0.9727,y:296.45},0).wait(5).to({_off:true},185).wait(51));

	// shirt_obj_
	this.shirt = new lib.Scene_1_shirt();
	this.shirt.name = "shirt";
	this.shirt.setTransform(654.1,383.4,1,1,0,0,0,654.1,383.4);
	this.shirt.depth = 0;
	this.shirt.isAttachedToCamera = 0
	this.shirt.isAttachedToMask = 0
	this.shirt.layerDepth = 0
	this.shirt.layerIndex = 17
	this.shirt.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.shirt).wait(135).to({regX:665.4,regY:406.4,scaleX:2.1391,scaleY:2.1391,x:654.15,y:383.3},0).wait(245).to({regX:650.6,regY:397.8,scaleX:0.9727,scaleY:0.9727,y:383.4},0).wait(5).to({_off:true},185).wait(51));

	// smail_obj_
	this.smail = new lib.Scene_1_smail();
	this.smail.name = "smail";
	this.smail.setTransform(612.4,370.1,1,1,0,0,0,612.4,370.1);
	this.smail.depth = 0;
	this.smail.isAttachedToCamera = 0
	this.smail.isAttachedToMask = 0
	this.smail.layerDepth = 0
	this.smail.layerIndex = 18
	this.smail.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.smail).wait(62).to({regX:623.1,regY:379,scaleX:1.2127,scaleY:1.2127,x:612.35,y:370},0).wait(23).to({regX:642.2,regY:395,scaleX:1.9446,scaleY:1.9446,x:612.3,y:370.05},0).wait(66).to({regX:645.9,regY:400.2,scaleX:2.1391,scaleY:2.1391,x:612.45},0).to({regX:632,regY:394,scaleX:1.4839,scaleY:1.4839,x:612.4},16).to({regX:607.4,regY:383.2,scaleX:0.9608,scaleY:0.9608},17).wait(12).to({regX:607.5,scaleX:0.9674,scaleY:0.9674,x:612.35,y:370},0).wait(112).to({regX:607.6,regY:384.1,scaleX:0.9727,scaleY:0.9727,x:612.3,y:370.05},0).wait(77).to({_off:true},188).wait(48));

	// head_obj_
	this.head = new lib.Scene_1_head();
	this.head.name = "head";
	this.head.setTransform(623.6,308.3,1,1,0,0,0,623.6,308.3);
	this.head.depth = 0;
	this.head.isAttachedToCamera = 0
	this.head.isAttachedToMask = 0
	this.head.layerDepth = 0
	this.head.layerIndex = 19
	this.head.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.head).wait(85).to({regX:648,regY:363.2,scaleX:1.9446,scaleY:1.9446,x:623.55,y:308.25},0).wait(66).to({regX:651.1,regY:371.3,scaleX:2.1391,scaleY:2.1391},0).to({regX:639.5,regY:352.4,scaleX:1.4839,scaleY:1.4839,x:623.5,y:308.35},16).to({regX:619,regY:318.9,scaleX:0.9608,scaleY:0.9608,x:623.55,y:308.25},17).wait(196).to({regX:619.1,regY:320.6,scaleX:0.9727,scaleY:0.9727,x:623.5,y:308.3},0).wait(36).to({_off:true},154).wait(51));

	// Girl_obj_
	this.Girl = new lib.Scene_1_Girl();
	this.Girl.name = "Girl";
	this.Girl.depth = 0;
	this.Girl.isAttachedToCamera = 0
	this.Girl.isAttachedToMask = 0
	this.Girl.layerDepth = 0
	this.Girl.layerIndex = 20
	this.Girl.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Girl).wait(416).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,y:-0.05},0).wait(116).to({regX:650.1,regY:220.3,scaleX:2.8031,scaleY:2.8031,x:0.2,y:-0.15},0).wait(89));

	// simboles_obj_
	this.simboles = new lib.Scene_1_simboles();
	this.simboles.name = "simboles";
	this.simboles.setTransform(681.8,508.1,1,1,0,0,0,681.8,508.1);
	this.simboles.depth = 0;
	this.simboles.isAttachedToCamera = 0
	this.simboles.isAttachedToMask = 0
	this.simboles.layerDepth = 0
	this.simboles.layerIndex = 21
	this.simboles.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.simboles).wait(380).to({regX:679.1,regY:526,scaleX:0.9727,scaleY:0.9727,x:681.85},0).wait(6).to({regX:599.7,regY:475.6,scaleX:1,scaleY:1,x:602.45,y:457.7},0).wait(30).to({regX:679.1,regY:526,scaleX:0.9727,scaleY:0.9727,x:681.85,y:508.1},0).wait(6).to({regX:599.7,regY:475.6,scaleX:1,scaleY:1,x:602.45,y:457.7},0).wait(50).to({regX:819.8,regY:505.6,scaleX:1.378,scaleY:1.378,x:681.85,y:508.2},0).wait(8).to({regX:873.6,regY:497.9,scaleX:1.6381,scaleY:1.6381,x:681.7,y:508},0).wait(17).to({regX:882.5,regY:479,scaleX:1.7656,scaleY:1.7656,x:681.8,y:508.05},0).wait(1).to({regX:599.7,regY:475.6,scaleX:1,scaleY:1,x:399.05,y:504.65},0).wait(34).to({regX:893.2,regY:401.6,scaleX:2.8031,scaleY:2.8031,x:681.6,y:508.05},0).wait(89));

	// pantsL_obj_
	this.pantsL = new lib.Scene_1_pantsL();
	this.pantsL.name = "pantsL";
	this.pantsL.setTransform(568.7,564.5,1,1,0,0,0,568.7,564.5);
	this.pantsL.depth = 0;
	this.pantsL.isAttachedToCamera = 0
	this.pantsL.isAttachedToMask = 0
	this.pantsL.layerDepth = 0
	this.pantsL.layerIndex = 22
	this.pantsL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.pantsL).wait(128).to({regX:625.5,regY:491.1,scaleX:2.1391,scaleY:2.1391,x:568.8},0).wait(1).to({regX:579.6,regY:594.8,scaleX:1,scaleY:1,x:522.85,y:668.15},0).wait(34).to({regX:620.8,regY:497.8,scaleX:1.9656,scaleY:1.9656,x:568.65,y:564.45},0).wait(3).to({regX:607.1,regY:518.2,scaleX:1.5807,scaleY:1.5807,x:568.6,y:564.35},0).wait(131).to({regX:562.8,regY:584,scaleX:0.9727,scaleY:0.9727,x:568.75,y:564.5},0).wait(1).to({regX:579.6,regY:594.8,scaleX:1,scaleY:1,x:585.5,y:575.35},0).wait(24).to({regX:562.8,regY:584,scaleX:0.9727,scaleY:0.9727,x:568.75,y:564.5},0).wait(33).to({regX:579.6,regY:594.8,scaleX:1,scaleY:1,x:585.5,y:575.35},0).wait(12).to({regX:562.8,regY:584,scaleX:0.9727,scaleY:0.9727,x:568.75,y:564.5},0).wait(18).to({_off:true},130).wait(106));

	// pantsR_obj_
	this.pantsR = new lib.Scene_1_pantsR();
	this.pantsR.name = "pantsR";
	this.pantsR.setTransform(800.4,573.4,1,1,0,0,0,800.4,573.4);
	this.pantsR.depth = 0;
	this.pantsR.isAttachedToCamera = 0
	this.pantsR.isAttachedToMask = 0
	this.pantsR.layerDepth = 0
	this.pantsR.layerIndex = 23
	this.pantsR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.pantsR).wait(129).to({regX:733.8,regY:495.2,scaleX:2.1391,scaleY:2.1391,x:800.45,y:573.25},0).wait(1).to({regX:791.1,regY:596.9,scaleX:1,scaleY:1,x:857.7,y:675},0).wait(33).to({regX:738.6,regY:502.3,scaleX:1.9656,scaleY:1.9656,x:800.2,y:573.3},0).wait(12).to({regX:798.8,regY:588.5,scaleX:0.9958,scaleY:0.9958,x:800.4,y:573.4},0).wait(1).to({regX:791.1,regY:596.9,scaleX:1,scaleY:1,x:792.65,y:581.85},0).wait(13).to({regX:802.5,regY:594.2,scaleX:0.9635,scaleY:0.9635,x:800.35,y:573.35},0).wait(51).to({regX:800.9,regY:593,scaleX:0.973,scaleY:0.973,y:573.4},0).wait(1).to({regX:791.1,regY:596.9,scaleX:1,scaleY:1,x:790.55,y:577.35},0).wait(18).to({regX:801,regY:593.1,scaleX:0.9727,scaleY:0.9727,x:800.4,y:573.35},0).wait(126).to({_off:true},130).wait(106));

	// handL_obj_
	this.handL = new lib.Scene_1_handL();
	this.handL.name = "handL";
	this.handL.setTransform(599,462.2,1,1,0,0,0,599,462.2);
	this.handL.depth = 0;
	this.handL.isAttachedToCamera = 0
	this.handL.isAttachedToMask = 0
	this.handL.layerDepth = 0
	this.handL.layerIndex = 24
	this.handL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.handL).wait(130).to({regX:639.6,regY:443.3,scaleX:2.1391,scaleY:2.1391,x:598.95,y:462.25},0).wait(46).to({regX:593.2,regY:479.6,scaleX:0.9565,scaleY:0.9565,y:462.3},0).wait(2).to({regY:479.4,scaleX:0.9576,scaleY:0.9576,x:598.9,y:462.2},0).wait(76).to({regX:593.9,regY:478.9,scaleX:0.9727,scaleY:0.9727,x:599,y:462.25},0).wait(1).to({regX:605.6,regY:467.3,scaleX:1,scaleY:1,x:610.65,y:450.7},0).wait(9).to({regX:593.9,regY:478.9,scaleX:0.9727,scaleY:0.9727,x:599,y:462.25},0).wait(6).to({regX:605.6,regY:467.3,scaleX:1,scaleY:1,x:610.65,y:450.7},0).wait(1).to({regX:593.9,regY:478.9,scaleX:0.9727,scaleY:0.9727,x:599,y:462.25},0).wait(83).to({regX:605.6,regY:467.3,scaleX:1,scaleY:1,x:610.65,y:450.7},0).wait(17).to({regX:593.9,regY:478.9,scaleX:0.9727,scaleY:0.9727,x:599,y:462.25},0).wait(14).to({_off:true},154).wait(82));

	// fingerRIGHT_obj_
	this.fingerRIGHT = new lib.Scene_1_fingerRIGHT();
	this.fingerRIGHT.name = "fingerRIGHT";
	this.fingerRIGHT.setTransform(782,527.5,1,1,0,0,0,782,527.5);
	this.fingerRIGHT.depth = 0;
	this.fingerRIGHT.isAttachedToCamera = 0
	this.fingerRIGHT.isAttachedToMask = 0
	this.fingerRIGHT.layerDepth = 0
	this.fingerRIGHT.layerIndex = 25
	this.fingerRIGHT.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fingerRIGHT).wait(62).to({regX:763,regY:508.9,scaleX:1.2127,scaleY:1.2127,y:527.55},0).wait(1).to({regX:770.5,regY:535.9,scaleX:1,scaleY:1,x:789.45,y:554.55},0).wait(57).to({regX:724.9,regY:473.1,scaleX:2.1453,scaleY:2.1453,x:782.1,y:527.5},0).wait(15).to({regX:725.1,regY:473.8,scaleX:2.1391,scaleY:2.1391,x:781.85},0).wait(6).to({regX:770.5,regY:535.9,scaleX:1,scaleY:1,x:827.3,y:589.6},0).wait(10).to({regX:725.1,regY:473.8,scaleX:2.1391,scaleY:2.1391,x:781.85,y:527.5},0).wait(33).to({regX:783.9,regY:547.1,scaleX:0.9608,scaleY:0.9608,x:782},0).wait(1).to({regX:770.5,regY:535.9,scaleX:1,scaleY:1,x:768.6,y:516.35},0).wait(6).to({regX:783.2,regY:546.6,scaleX:0.9646,scaleY:0.9646,x:781.9,y:527.6},0).wait(55).to({regX:782,regY:546,scaleX:0.9727,scaleY:0.9727,x:781.95,y:527.55},0).wait(3).to({regX:770.5,regY:535.9,scaleX:1,scaleY:1,x:770.45,y:517.45},0).wait(4).to({regX:782,regY:546,scaleX:0.9727,scaleY:0.9727,x:781.95,y:527.55},0).wait(132).to({_off:true},154).wait(82));

	// kneeL_obj_
	this.kneeL = new lib.Scene_1_kneeL();
	this.kneeL.name = "kneeL";
	this.kneeL.depth = 0;
	this.kneeL.isAttachedToCamera = 0
	this.kneeL.isAttachedToMask = 0
	this.kneeL.layerDepth = 0
	this.kneeL.layerIndex = 26
	this.kneeL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.kneeL).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(1).to({regX:560.3,regY:625,scaleX:1,scaleY:1,x:228.85,y:414.4},0).wait(6).to({regX:135.2,regY:95.2,scaleX:1.2535,scaleY:1.2535,x:0,y:0.05},0).wait(127).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,y:-0.05},0).wait(1).to({regX:560.3,regY:625,scaleX:1,scaleY:1,x:582.15,y:621.4},0).wait(24).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(1).to({regX:560.3,regY:625,scaleX:1,scaleY:1,x:582.15,y:621.4},0).wait(12).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(1).to({regX:560.3,regY:625,scaleX:1,scaleY:1,x:582.15,y:621.4},0).wait(15).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(4).to({regX:560.3,regY:625,scaleX:1,scaleY:1,x:582.15,y:621.4},0).wait(16).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(14).to({_off:true},154).wait(82));

	// kneeR_obj_
	this.kneeR = new lib.Scene_1_kneeR();
	this.kneeR.name = "kneeR";
	this.kneeR.depth = 0;
	this.kneeR.isAttachedToCamera = 0
	this.kneeR.isAttachedToMask = 0
	this.kneeR.layerDepth = 0
	this.kneeR.layerIndex = 27
	this.kneeR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.kneeR).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(12).to({regX:-4.9,regY:12.7,scaleX:0.9958,scaleY:0.9958,x:0,y:0},0).wait(1).to({regX:773.6,regY:646,scaleX:1,scaleY:1,x:778.5,y:633.3},0).wait(33).to({regX:-20.6,regY:3.6,scaleX:0.9746,scaleY:0.9746,x:-0.05,y:-0.05},0).wait(2).to({regX:-19.9,regY:4.1,scaleX:0.9757,scaleY:0.9757,y:0},0).wait(1).to({regX:773.6,regY:646,scaleX:1,scaleY:1,x:793.4,y:641.95},0).wait(16).to({regX:-20.2,regY:4.2,scaleX:0.975,scaleY:0.975,x:0.05,y:0.05},0).wait(12).to({regX:-21.7,regY:3.7,scaleX:0.973,scaleY:0.973,x:-0.05,y:0},0).wait(1).to({regX:773.6,regY:646,scaleX:1,scaleY:1,x:795.2,y:642.35},0).wait(15).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(129).to({_off:true},151).wait(85));

	// thighL_obj_
	this.thighL = new lib.Scene_1_thighL();
	this.thighL.name = "thighL";
	this.thighL.depth = 0;
	this.thighL.isAttachedToCamera = 0
	this.thighL.isAttachedToMask = 0
	this.thighL.layerDepth = 0
	this.thighL.layerIndex = 28
	this.thighL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.thighL).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(1).to({regX:607.3,regY:582.7,scaleX:1,scaleY:1,x:275.85,y:372.1},0).wait(6).to({regX:135.2,regY:95.2,scaleX:1.2535,scaleY:1.2535,x:0,y:0.05},0).wait(127).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,y:-0.05},0).wait(1).to({regX:607.3,regY:582.7,scaleX:1,scaleY:1,x:629.15,y:579.1},0).wait(24).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(33).to({regX:607.3,regY:582.7,scaleX:1,scaleY:1,x:629.15,y:579.1},0).wait(16).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(14).to({_off:true},154).wait(82));

	// thighR_obj_
	this.thighR = new lib.Scene_1_thighR();
	this.thighR.name = "thighR";
	this.thighR.depth = 0;
	this.thighR.isAttachedToCamera = 0
	this.thighR.isAttachedToMask = 0
	this.thighR.layerDepth = 0
	this.thighR.layerIndex = 29
	this.thighR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.thighR).wait(163).to({regX:331.5,regY:210.7,scaleX:1.9656,scaleY:1.9656,x:0.05,y:0.15},0).wait(12).to({regX:-4.9,regY:12.7,scaleX:0.9958,scaleY:0.9958,x:0,y:0},0).wait(1).to({regX:742.6,regY:594.7,scaleX:1,scaleY:1,x:747.5,y:582},0).wait(13).to({regX:-28.2,regY:-0.8,scaleX:0.9635,scaleY:0.9635,x:-0.05,y:0.05},0).wait(51).to({regX:-21.7,regY:3.7,scaleX:0.973,scaleY:0.973,y:0},0).wait(1).to({regX:742.6,regY:594.7,scaleX:1,scaleY:1,x:764.2,y:591.05},0).wait(18).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,x:0,y:-0.05},0).wait(126).to({_off:true},158).wait(78));

	// armR_obj_
	this.armR = new lib.Scene_1_armR();
	this.armR.name = "armR";
	this.armR.setTransform(775.4,481.7,1,1,0,0,0,775.4,481.7);
	this.armR.depth = 0;
	this.armR.isAttachedToCamera = 0
	this.armR.isAttachedToMask = 0
	this.armR.layerDepth = 0
	this.armR.layerIndex = 30
	this.armR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.armR).wait(135).to({regX:722.1,regY:452.4,scaleX:2.1391,scaleY:2.1391,x:775.45},0).wait(49).to({regX:777.1,regY:499.4,scaleX:0.9608,scaleY:0.9608},0).wait(1).to({regX:761.6,regY:494.4,scaleX:1,scaleY:1,x:760,y:476.7},0).wait(6).to({regX:776.5,regY:498.9,scaleX:0.9646,scaleY:0.9646,x:775.45,y:481.6},0).wait(52).to({regX:775.3,regY:498.8,scaleX:0.9727,scaleY:0.9727,x:775.4,y:481.65},0).wait(142).to({_off:true},154).wait(82));

	// handR_obj_
	this.handR = new lib.Scene_1_handR();
	this.handR.name = "handR";
	this.handR.setTransform(754.1,428.1,1,1,0,0,0,754.1,428.1);
	this.handR.depth = 0;
	this.handR.isAttachedToCamera = 0
	this.handR.isAttachedToMask = 0
	this.handR.layerDepth = 0
	this.handR.layerIndex = 31
	this.handR.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.handR).wait(50).to({regX:753,regY:427.9,scaleX:1.0137,scaleY:1.0137,y:428},0).wait(85).to({regX:712.1,regY:427.3,scaleX:2.1391,scaleY:2.1391,x:754.05,y:428.05},0).wait(49).to({regX:754.9,regY:443.6,scaleX:0.9608,scaleY:0.9608,x:754.15},0).wait(1).to({regX:745.8,regY:435.3,scaleX:1,scaleY:1,x:745.05,y:419.8},0).wait(6).to({regX:754.4,regY:443.4,scaleX:0.9646,scaleY:0.9646,x:754.1,y:428.05},0).wait(52).to({regX:753.4,regY:443.7,scaleX:0.9727,scaleY:0.9727},0).wait(142).to({_off:true},154).wait(82));

	// fingersLEFT_obj_
	this.fingersLEFT = new lib.Scene_1_fingersLEFT();
	this.fingersLEFT.name = "fingersLEFT";
	this.fingersLEFT.setTransform(540.1,449.7,1,1,0,0,0,540.1,449.7);
	this.fingersLEFT.depth = 0;
	this.fingersLEFT.isAttachedToCamera = 0
	this.fingersLEFT.isAttachedToMask = 0
	this.fingersLEFT.layerDepth = 0
	this.fingersLEFT.layerIndex = 32
	this.fingersLEFT.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fingersLEFT).wait(61).to({regX:561.8,regY:445.1,scaleX:1.1932,scaleY:1.1932,x:540.2,y:449.75},0).wait(1).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:557.2,y:508.2},0).wait(59).to({regX:612.1,regY:436.9,scaleX:2.1443,scaleY:2.1443,x:540.2,y:449.7},0).wait(14).to({regY:437.4,scaleX:2.1391,scaleY:2.1391,x:540.15,y:449.65},0).wait(16).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:506.85,y:515.85},0).wait(6).to({regX:612.1,regY:437.4,scaleX:2.1391,scaleY:2.1391,x:540.15,y:449.65},0).wait(19).to({regX:531.7,regY:466.4,scaleX:0.9565,scaleY:0.9565,x:540.1},0).wait(1).to({regX:531.8,scaleX:0.9571,scaleY:0.9571,x:540.15},0).wait(1).to({regX:531.9,regY:466.3,scaleX:0.9576,scaleY:0.9576,x:540.2,y:449.7},0).wait(2).to({regX:532,regY:466.2,scaleX:0.9587,scaleY:0.9587,x:540.15,y:449.6},0).wait(2).to({scaleX:0.9597,scaleY:0.9597,x:540.1,y:449.75},0).wait(2).to({regX:532.2,regY:466.1,scaleX:0.9608,scaleY:0.9608,x:540.15,y:449.7},0).wait(1).to({scaleX:0.9614,scaleY:0.9614,y:449.75},0).wait(1).to({regX:532.3,scaleX:0.9619,scaleY:0.9619,x:540.1},0).wait(2).to({regX:532.5,regY:465.9,scaleX:0.963,scaleY:0.963,x:540.2,y:449.65},0).wait(66).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(1).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(9).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(1).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(3).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(2).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(2).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(1).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(6).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(1).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(12).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(22).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(8).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(32).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(17).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(1).to({regX:578.8,regY:503.6,scaleX:1,scaleY:1,x:585.5,y:487.35},0).wait(5).to({regX:533.4,regY:466,scaleX:0.9727,scaleY:0.9727,x:540.15,y:449.7},0).wait(8).to({_off:true},157).wait(79));

	// armL_obj_
	this.armL = new lib.Scene_1_armL();
	this.armL.name = "armL";
	this.armL.setTransform(567.6,469.4,1,1,0,0,0,567.6,469.4);
	this.armL.depth = 0;
	this.armL.isAttachedToCamera = 0
	this.armL.isAttachedToMask = 0
	this.armL.layerDepth = 0
	this.armL.layerIndex = 33
	this.armL.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.armL).wait(129).to({regX:625,regY:446.7,scaleX:2.1391,scaleY:2.1391,x:567.75,y:469.55},0).wait(47).to({regX:560.4,regY:487.1,scaleX:0.9565,scaleY:0.9565,x:567.55,y:469.45},0).wait(2).to({regX:560.5,regY:486.9,scaleX:0.9576,scaleY:0.9576,x:567.6,y:469.4},0).wait(2).to({regX:560.6,regY:486.8,scaleX:0.9587,scaleY:0.9587,x:567.55,y:469.35},0).wait(2).to({regY:486.7,scaleX:0.9597,scaleY:0.9597,y:469.4},0).wait(72).to({regX:561.6,regY:486.2,scaleX:0.9727,scaleY:0.9727,y:469.35},0).wait(1).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:594.35,y:484.6},0).wait(9).to({regX:561.6,regY:486.2,scaleX:0.9727,scaleY:0.9727,x:567.55,y:469.35},0).wait(6).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:594.35,y:484.6},0).wait(2).to({regX:561.6,regY:486.2,scaleX:0.9727,scaleY:0.9727,x:567.55,y:469.35},0).wait(13).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:594.35,y:484.6},0).wait(7).to({regX:561.6,regY:486.2,scaleX:0.9727,scaleY:0.9727,x:567.55,y:469.35},0).wait(22).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:594.35,y:484.6},0).wait(8).to({regX:561.6,regY:486.2,scaleX:0.9727,scaleY:0.9727,x:567.55,y:469.35},0).wait(32).to({regX:588.4,regY:501.4,scaleX:1,scaleY:1,x:594.35,y:484.6},0).wait(17).to({regX:561.6,regY:486.2,scaleX:0.9727,scaleY:0.9727,x:567.55,y:469.35},0).wait(14).to({_off:true},130).wait(106));

	// spotlight_obj_
	this.spotlight = new lib.Scene_1_spotlight();
	this.spotlight.name = "spotlight";
	this.spotlight.setTransform(872,405.2,1,1,0,0,0,872,405.2);
	this.spotlight.depth = 0;
	this.spotlight.isAttachedToCamera = 0
	this.spotlight.isAttachedToMask = 0
	this.spotlight.layerDepth = 0
	this.spotlight.layerIndex = 34
	this.spotlight.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.spotlight).wait(135).to({regX:767.2,regY:416.7,scaleX:2.1391,scaleY:2.1391,x:871.9,y:405.35},0).wait(49).to({regX:877.6,regY:419.9,scaleX:0.9608,scaleY:0.9608,x:872.05,y:405.3},0).to({_off:true},232).wait(205));

	// Theater_obj_
	this.Theater = new lib.Scene_1_Theater();
	this.Theater.name = "Theater";
	this.Theater.setTransform(633.7,320.2,1,1,0,0,0,633.7,320.2);
	this.Theater.depth = 0;
	this.Theater.isAttachedToCamera = 0
	this.Theater.isAttachedToMask = 0
	this.Theater.layerDepth = 0
	this.Theater.layerIndex = 35
	this.Theater.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Theater).wait(416).to({regX:629.6,regY:332.9,scaleX:0.9727,scaleY:0.9727,y:320.25},0).wait(205));

	// simboles_obj_
	this.simboles_1 = new lib.Scene_1_simboles_1();
	this.simboles_1.name = "simboles_1";
	this.simboles_1.depth = 0;
	this.simboles_1.isAttachedToCamera = 0
	this.simboles_1.isAttachedToMask = 0
	this.simboles_1.layerDepth = 0
	this.simboles_1.layerIndex = 36
	this.simboles_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.simboles_1).wait(442).to({regX:-21.9,regY:3.6,scaleX:0.9727,scaleY:0.9727,y:-0.05},0).wait(1).to({regX:987.7,regY:481.2,scaleX:1,scaleY:1,x:1009.55,y:477.6},0).to({_off:true},1).wait(177));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-203,-440,1795.6,1573.8);
// library properties:
lib.properties = {
	id: 'B95836BBD65BC34C954EB318E557F9E8',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#666666",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_23.png?1618933514840", id:"CachedBmp_23"},
		{src:"images/CachedBmp_10.png?1618933514840", id:"CachedBmp_10"},
		{src:"images/CachedBmp_9.png?1618933514840", id:"CachedBmp_9"},
		{src:"images/CachedBmp_6.png?1618933514840", id:"CachedBmp_6"},
		{src:"images/CachedBmp_5.png?1618933514840", id:"CachedBmp_5"},
		{src:"images/CachedBmp_4.png?1618933514840", id:"CachedBmp_4"},
		{src:"images/CachedBmp_3.png?1618933514840", id:"CachedBmp_3"},
		{src:"images/CachedBmp_2.png?1618933514840", id:"CachedBmp_2"},
		{src:"images/CachedBmp_1.png?1618933514840", id:"CachedBmp_1"},
		{src:"images/pincchio_atlas_1.png?1618933514137", id:"pincchio_atlas_1"},
		{src:"images/pincchio_atlas_2.png?1618933514137", id:"pincchio_atlas_2"},
		{src:"sounds/SOUNDpinocchio_1.mp3?1618933514840", id:"SOUNDpinocchio_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B95836BBD65BC34C954EB318E557F9E8'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;