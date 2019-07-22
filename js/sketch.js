var song;

magnetism = 0;

function preload() {
  song = loadSound('assets/ahhh.mp3');
}

function setup() {
	createCanvas(1000, 560);
  	song.loop();
  	song.disconnect();
    
    filter = new p5.LowPass();
    song.connect(filter);
    
    initPlugs();
}

function draw() {
  background(30);

  var freq = map(magnetism, 70, 3900, 80, 2200);
  filter.freq(freq);
  
  filter.res(25);
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
	        readLight(reading);
	    }, 
	    function error(message){
	    	alert('error ' + message);
	    }
    );
}

function readLight(reading){
	magnetism = parseInt(reading.magnitude);
}
