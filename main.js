const audioFiles = ['audio1.mp3','audio2.mp3','audio3.mp3','audio4.mp3'];
const audios = {};
let currentButtonId = null;
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');
const buttonAudioMap = {
  btn1: 'audio1.mp3',
  btn2: 'audio2.mp3',
  btn3: 'audio3.mp3',
  btn4: 'audio4.mp3'
};

Object.entries(buttonAudioMap).forEach(([buttonId, audioFile]) => {
  const btn = document.getElementById(buttonId);
  btn.addEventListener('click', () => playAudio(audioFile, buttonId));
});


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
  window.playAudio = playAudio;
  // Stop del precedente
  if (currentButtonId && currentButtonId !== buttonId) {
    const prevFile = Object.keys(audios).find(key => !audios[key].paused);
    if (prevFile) {
      audios[prevFile].pause();
      audios[prevFile].currentTime = 0;
      document.getElementById(currentButtonId).classList.remove('playing');
    }

    // 🔄 Reset bottone "Riprendi" → torna a "Pausa"
    pauseBtn.textContent = 'Pausa';
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

    // 🔄 Se stai stoppando lo stesso audio, aggiorna il bottone
    pauseBtn.textContent = 'Riprendi';
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

// Utility per formattare mm:ss
function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
}
// RIGA 62 circa: controllo pausa dedicato
const pauseBtn = document.getElementById('pauseBtn');

pauseBtn.addEventListener('click', () => {
  console.log('Pause button clicked');

  if (!currentButtonId) {
    console.log('Nessun audio attivo (currentButtonId è nullo o undefined)');
    return;
  }

  // Trova il file in riproduzione o in pausa
  const playingFile = Object.keys(audios)
    .find(key => audios[key].currentTime > 0);

  if (!playingFile) {
    console.log('Nessun file audio trovato in riproduzione o in pausa');
    return;
  }

  console.log('Audio attivo trovato:', playingFile);

  const audio = audios[playingFile];
  const btn = document.getElementById(currentButtonId);

  if (audio.paused) {
    console.log(`Audio "${playingFile}" è in pausa. Avvio la riproduzione.`);
    audio.play();
    btn.classList.add('playing');
    pauseBtn.textContent = 'Pausa'; // Torna a "Pausa" quando riprende
  } else {
    console.log(`Audio "${playingFile}" è in riproduzione. Lo metto in pausa.`);
    audio.pause();
    btn.classList.remove('playing');
    pauseBtn.textContent = 'Riprendi'; // Cambia a "Riprendi" quando si mette in pausa
  }
});



