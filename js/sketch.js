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
  
  text('Freq:' + _freq, 20, 400);
  text('Res:' + _res, 20, 100);

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
	magnetism = Math.round(parseInt(reading.magnitude));
}

function readLight(reading){
	luminosity = constrain(Math.round(parseInt(reading.intensity)), 100, 4000);
}
