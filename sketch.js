// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/jEwAMgcCgOA

var song;
var amp;
var button;
var mic;
var volhistory = [];
var fullhistory = [];
var song_volhistory = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function reload_page(){
	location.reload();
}
function preload() {
  song = loadSound('test.mp4');
}

function setup() {
  sleep(10000);
  createCanvas(800, 500);
  button = createButton('Pause');
  restart_button = createButton('Restart')
  button.mousePressed(toggleSong);
  restart_button.mousePressed(reload_page);
  song.play();
  amp = new p5.Amplitude();
  amp.setInput(song);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  
  background(0);
  var song_vol = amp.getLevel();
  var vol = mic.getLevel()*10;
  volhistory.push(vol);
  song_volhistory.push(song_vol);
  fullhistory.push(vol);
  stroke(255);
  noFill();
  push();

  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height*0.5, 0);
    //line(i,250,i, y);
	var z = map(song_volhistory[i],0,1,height*0.5,0);
	
	vertex(i, y);
	vertex(i,z);	
  }
  endShape();
  stroke(255, 0, 0);
  stroke(255,255,255);
    line(0,250,1300,250);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {  
   var y = map(volhistory[i], 0, 1, height*0.5, 0);
   line(i,250,i, y);
//	var z = map(song_volhistory[i],0,1,height*0.5,0);
	
	
	vertex(i,y+100);	
  }
  endShape();
  if(volhistory.length>width-50){
	  volhistory.splice(0,1)
	  song_volhistory.splice(0,1)
  }
  
  //pop();
  

  stroke(255, 0, 0);
  line(volhistory.length, 0, volhistory.length, height);
  stroke(255,255,255);
  line(100,250,1300,250);
  //ellipse(100, 100, 200, vol * 200);

}
