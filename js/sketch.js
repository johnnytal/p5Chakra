var song;

magnetism = 0;
luminosity = 0;

function preload() {
	song = loadSound('assets/ahhh.mp3');
}

function setup() {
	createCanvas(700, 400);
  	song.loop();
  	song.disconnect();
    
    filter = new p5.LowPass();
    song.connect(filter);
    
    initPlugs();
}

function draw() {
  background(210);
  
  textSize(48);
  
  _freq = luminosity;
  _res = magnetism / 5;
  
  text('Freq:' + _freq, 20, 100);
  text('Res:' + _res, 20, 300);

  filter.freq(_freq);
  filter.res(_res);
}

function initPlugs(){
	setTimeout(function(){
        try{
            window.plugins.insomnia.keepAwake();
        } catch(e){}
        try{
            StatusBar.hide;
        } catch(e){}
    }, 1000); 
    
	cordova.plugins.magnetometer.watchReadings(
		function success(reading){
	        readMagnet(reading);
	    }, 
	    function error(message){
	    	alert('error ' + message);
	    }
    );
    
    window.plugin.lightsensor.watchReadings(
		function success(reading){
	        readLight(reading);
	    }, 
	    function error(message){
	    	alert('error ' + message);
	    }
    );
}

function readMagnet(reading){
	magnetism = constrain(Math.round(parseInt(reading.magnitude)), 75, 4000);
}

function readLight(reading){
	luminosity = constrain(Math.round(parseInt(reading.intensity)), 100, 4000);
}

function handleFile(_what, fileObj) {
	song.stop();
	
	var fileReader  = new FileReader;
	
	fileReader.readAsArrayBuffer(fileObj[0]);
	
	url = URL.createObjectURL(fileObj[0]); 
	
	if (_what.id == 'audio_file_light'){
		newSfx.src = url;
	}
	
	fileReader.onload = function(){
	    var arrayBuffer = this.result;
		song = loadSound(url, playSong);
	};
}

function playSong(){
	song.loop();
	
  	song.disconnect();
    
    filter = new p5.LowPass();
    song.connect(filter);  
}
