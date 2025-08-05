const audioFiles = ['audio1.mp3','audio2.mp3','audio3.mp3','audio4.mp3'];
const audios = {};
let currentButtonId = null;
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');

audioFiles.forEach(file => {
  const audio = new Audio(file);
  
  // Aggiorna timer e barra ad ogni frame
  audio.addEventListener('timeupdate', () => {
    const cur = formatTime(audio.currentTime);
    const dur = formatTime(audio.duration || 0);
    timerEl.textContent = `${cur} / ${dur}`;
    progressEl.value = audio.currentTime / audio.duration;
  });
  
  // Reset visivo a fine riproduzione
  audio.addEventListener('ended', () => {
    if (currentButtonId) {
      document.getElementById(currentButtonId).classList.remove('playing');
      currentButtonId = null;
    }
  });
  
  audios[file] = audio;
});

function playAudio(file, buttonId) {
  // Stop del precedente
  if (currentButtonId && currentButtonId !== buttonId) {
    const prevFile = Object.keys(audios).find(key => !audios[key].paused);
    if (prevFile) {
      audios[prevFile].pause();
      audios[prevFile].currentTime = 0;
      document.getElementById(currentButtonId).classList.remove('playing');
    }
  }
  
// RIGA 40 circa: controllo pausa dedicato
const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
  if (currentButtonId) {
    const playingFile = Object.keys(audios)
      .find(key => !audios[key].paused);
    if (playingFile) {
      audios[playingFile].pause();
      document.getElementById(currentButtonId)
              .classList.remove('playing');
      currentButtonId = null;
    }
  }
});

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

// Utility per formattare mm:ss
function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}
