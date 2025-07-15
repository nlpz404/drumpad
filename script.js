var gainKick = new Tone.Gain(20).toDestination();
var gainSnare = new Tone.Gain(5).toDestination();
var gainHiHat = new Tone.Gain(0.5).toDestination();

var filtKick = new Tone.Filter(100, 'lowpass').connect(gainKick);
var filtSnare = new Tone.Filter (1000,'bandpass').connect(gainSnare);
var filtHiHat = new Tone.Filter (8000, 'bandpass').connect(gainHiHat);

var Kick = new Tone.NoiseSynth().connect(filtKick);
var Snare = new Tone.NoiseSynth().connect(filtSnare);
var HiHat = new Tone.NoiseSynth().connect(filtHiHat);



function playKick() {
Kick.triggerAttackRelease()
}
function playSnare() {
Snare.triggerAttackRelease()
}
function playHiHat(){
HiHat.triggerAttackRelease();
}



var btnSnare = document.getElementById('Snare')
var btnHiHat = document.getElementById('HiHat')
var btnKick = document.getElementById('Kick')

//Acciones teclado

document.addEventListener('keydown',keydown);
function keydown(e) {
	 switch(e.code){
    case 'KeyQ': playSnare(), btnSnare.style.opacity = 0.7; break;
		case 'KeyP': playHiHat(), btnHiHat.style.opacity = 0.7;break;
		case 'Space': playKick(), btnKick.style.opacity = 0.7;break;
}
}

document.addEventListener('keyup',keyup);
function keyup(e) {
	 switch(e.code){
    case 'KeyQ': btnSnare.style.opacity = 1; break;
		case 'KeyP': btnHiHat.style.opacity = 1; break;
		case 'Space': btnKick.style.opacity = 1; break;
}
}


//Acciones Mouse

btnSnare.addEventListener('mousedown', function () {
  playSnare();
  btnSnare.style.opacity = 0.7
});
btnHiHat.addEventListener('mousedown', function () {
  playHiHat();
  btnHiHat.style.opacity = 0.7
});
btnKick.addEventListener('mousedown', function () {
  playKick();
  btnKick.style.opacity = 0.7
});



btnSnare.addEventListener('mouseup', function () {
  btnSnare.style.opacity = 1
});
btnHiHat.addEventListener('mouseup', function () {
  btnHiHat.style.opacity = 1
});
btnKick.addEventListener('mouseup', function () {
  btnKick.style.opacity = 1
});


//Acciones touch

btnSnare.addEventListener('touchstart', function () {
  event.preventDefault();
  playSnare();
  btnSnare.style.opacity = 0.7
});
btnHiHat.addEventListener('touchstart', function () {
  event.preventDefault();
  playHiHat();
  btnHiHat.style.opacity = 0.7
});
btnKick.addEventListener('touchstart', function () {
  event.preventDefault();
  playKick();
  btnKick.style.opacity = 0.7
});


btnSnare.addEventListener('touchend', function () {
  btnSnare.style.opacity = 1
});
btnHiHat.addEventListener('touchend', function () {
  btnHiHat.style.opacity = 1
});
btnKick.addEventListener('touchend', function () {
  btnKick.style.opacity = 1
});


//STEP SEQ:

var index = 0;

function repeat() {
  var step = index % 8;

  var hihatInputs = document.querySelector(
    `.stepHiHat input:nth-child(${step + 1})`
  );
  var snareInputs = document.querySelector(
    `.stepSnare input:nth-child(${step + 1})`
  );
  var kickInputs = document.querySelector(
    `.stepKick input:nth-child(${step + 1})`
  );

  if (hihatInputs.checked) {
    playHiHat();
  }
  if (snareInputs.checked) {
    playSnare();
  }
  if (kickInputs.checked) {
    playKick();
  }
  
  index++;  
}

Tone.Transport.scheduleRepeat(repeat, "8n");


//Controles de sequencer

var btnPlay = document.getElementById('stepStart');
btnPlay.addEventListener("click", function () {
    index = 0;
    Tone.Transport.start();
});

var btnStop = document.getElementById('stepStop');
btnStop.addEventListener("click", function () {
    Tone.Transport.stop();
});


var bpmInput = document.getElementById("sliderBpm")
var bpmOutput = document.getElementById("valBpm");
bpmOutput.innerHTML = bpmInput.value;
Tone.Transport.bpm.value = bpmInput.value;

bpmInput.oninput = function() {
  bpmOutput.innerHTML = this.value;
  Tone.Transport.bpm.value = this.value;
}
