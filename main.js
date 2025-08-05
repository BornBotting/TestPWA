const audioFiles = ['audio1.mp3','audio2.mp3','audio3.mp3','audio4.mp3'];
const audios = {};
let currentButtonId = null;

audioFiles.forEach(file => {
  const audio = new Audio(file);
  audio.addEventListener('ended', () => {
    if (currentButtonId) {
      document.getElementById(currentButtonId).classList.remove('playing');
      currentButtonId = null;
    }
  });
  audios[file] = audio;
});

function playAudio(file, buttonId) {
  // Se un altro audio è in riproduzione, lo resettiamo
  if (currentButtonId && currentButtonId !== buttonId) {
    const prevFile = Object.keys(audios).find(key => !audios[key].paused);
    if (prevFile) {
      audios[prevFile].pause();
      audios[prevFile].currentTime = 0;
      document.getElementById(currentButtonId).classList.remove('playing');
    }
  }

  const audio = audios[file];
  const btn = document.getElementById(buttonId);

  if (audio.paused) {
    audio.currentTime = 0;
    audio.play();
    btn.classList.add('playing');
    currentButtonId = buttonId;
  } else {
    audio.pause();
    btn.classList.remove('playing');
    currentButtonId = null;
  }
}
