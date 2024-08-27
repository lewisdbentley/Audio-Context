let audioContext;

function startLoop(audioBuffer, pan=0, rate=1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();
  
  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 2.98;
  sourceNode.loopEnd = 3.80;
  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;

  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);

  sourceNode.start(0, 2.98);
}

document.querySelector('button').addEventListener('click', () => {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    console.log("Clicked button!");
    // Now you can start using the audioContext
    fetch('itsgonnarain.mp3')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        startLoop(audioBuffer, -1);
        startLoop(audioBuffer, 1, 1.002);
      })
      .catch(e => console.error(e));
});