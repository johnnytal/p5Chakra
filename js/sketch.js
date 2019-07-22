var song;

magnetism = 0;

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
  text('Magnetism:\n' + magnetism, 20, 100);
  
  //var freq = map(magnetism, 70, 3900, 80, 2200);
  filter.freq(magnetism);
  
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
	magnetism = Math.round(parseInt(reading.magnitude));
}
