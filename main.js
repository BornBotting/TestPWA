const audioFiles = ['audio1.mp3','audio2.mp3','audio3.mp3','audio4.mp3'];
const audios = {};
audioFiles.forEach(file => audios[file] = new Audio(file));

function playAudio(file) {
  const a = audios[file];
  a.currentTime = 0;
  a.play();
}
