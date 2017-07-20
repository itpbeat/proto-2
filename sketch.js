var metronome;
var refButton, recButton;
var beats = [];
var noBeats = 4;
var hold = false;
var refSounds = [];
var reference;
var soundNames = ["Boots", "Tools", "Kale", "Shoes"];

var programState = 0;
var recorded = false;

var allRecorded = false;
var totalCounts = 0;
function preload() {

}

function setup() {
  //createCanvas(200, 200);
  select("#counts").hide();
  metronome = loadSound("assets/metronome.wav", loaded);
  refSounds[0] = loadSound("assets/boots.wav", loaded);
  refSounds[1] = loadSound("assets/tools.wav", loaded);
  refSounds[2] = loadSound("assets/kale.wav", loaded);
  refSounds[3] = loadSound("assets/shoes.wav", loaded);

  reference = refSounds[0];

  refButton = select("#ref-button");
  recButton = select("#button-record");
  acceptButton = select("#button-accept")
  rejectButton = select("#button-reject")

  recButton.mousePressed(togglePlaying);
  recButton.mouseReleased(toggleStop);
  refButton.mousePressed(function() {
    reference.play();
  });
  acceptButton.mousePressed(changeRecording);
  rejectButton.mousePressed(retryRecording);

  mic = new p5.AudioIn(); // prompts user to enable their browser mic
  mic.start(); // create a sound recorder
  recorder = new p5.SoundRecorder(); // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  for (var i = 0; i < noBeats; i++) {
    beats[i] = new p5.SoundFile();
  }
}

function initialSetup() {

}

function loaded() {
  console.log("loaded");
}

function changeRecording() {
  select("#record-image").elt.src="assets/rec.svg";
  circlecountoff.fillGrey();
  recorded = false;
  selectAll(".beat-button")[programState].removeClass("beat-button--deactivate");
  select("#button-reject").elt.disabled = true;
  select("#button-accept").elt.disabled = true;
  select("#button-reject").addClass("record__button--disabled");
  select("#button-accept").addClass("record__button--disabled");

  if(programState<3) {
    programState++;
    select("#sound-name").html(soundNames[programState]);
    reference = refSounds[programState];
  }
  else if(programState=3) {
    allRecorded = true;
    triggerPlayMode();
  }
}

function retryRecording() {
  select("#record-image").elt.src="assets/rec.svg";
  circlecountoff.fillGrey();
  recorded = false;
  beats[programState] = new p5.SoundFile();
  select("#button-reject").elt.disabled = true;
  select("#button-accept").elt.disabled = true;
  select("#button-reject").addClass("record__button--disabled");
  select("#button-accept").addClass("record__button--disabled");
}

function togglePlaying() {
  console.log("you called me");
  if(recorded == false) {
    if (!metronome.isPlaying()) {
      hold = true;
      metronome.play();
      metronome.setVolume(0.3);

      setTimeout(function() {
        if (hold === true) {
          recorder.record(beats[programState]);
          console.log("recording")
        } else {

          console.log("you released too early");

        }
      }, 2000);
    }
  }
  if(recorded == true) {
    beats[programState].play();
  }

}

function toggleStop() {
  if(recorded == false) {
    hold = false;
    console.log("lifted");
    // if (!metronome.isPlaying()) {

      recorder.stop();
      console.log("stop recording");
      recorded = true;
      select("#record-image").elt.src="assets/play.svg";

      //once the recording is complete, enable the accept and reject button
      select("#button-reject").elt.disabled = false;
      select("#button-accept").elt.disabled = false;
      select("#button-reject").removeClass("record__button--disabled");
      select("#button-accept").removeClass("record__button--disabled");
    // } else {
      // metronome.stop();
    // }
  }
}

function keyPressed() { // this function is used to play the sounds
  if (keyCode == 66 && beats[0]) { //press B to play the first sound
    beats[0].play();
    if(allRecorded) {
      totalCounts ++;
      select("#count-no").html(totalCounts);
    }
    //console.log(beats[0].playing);
  }
  else if (keyCode == 84 && beats[1]) { //press T to play the second sound
    beats[1].play();
    if(allRecorded) {
      totalCounts ++;
      select("#count-no").html(totalCounts);
    }
    //console.log(beats[0].playing);
  }
  else if (keyCode == 75 && beats[2]) { //press K to play the third sound
    beats[2].play();
    if(allRecorded) {
      totalCounts ++;
      select("#count-no").html(totalCounts);
    }
    //console.log(beats[0].playing);
  }
  else if (keyCode == 83 && beats[3]) { //press S to play the fourth sound
    beats[3].play();
    if(allRecorded) {
      totalCounts ++;
      select("#count-no").html(totalCounts);
    }
    //console.log(beats[0].playing);
  }
}

function triggerPlayMode() {
  select("#heading").html("Time to freestyle with your words");
  select("#controls").hide();
  select("#counts").show();
}
