const audioFiles = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3', 'audio4.mp3'];
const audios = {};
let currentButtonId = null; // Memorizza l'ID del bottone corrente
const timerEl = document.getElementById('timer');
const progressEl = document.getElementById('progress');
const buttonAudioMap = {
  btn1: 'audio1.mp3',
  btn2: 'audio2.mp3'
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
  // Se è stato cliccato un nuovo audio, metti in pausa il precedente
  console.log('1');
  console.log('Nessun file audio trovato in riproduzione o in pausa');
  if (currentButtonId && currentButtonId !== buttonId) {
    console.log('1.1');
    const prevFile = Object.keys(audios).find(key => !audios[key].paused);
    if (prevFile) {
      console.log('1.2');
      audios[prevFile].pause();
      audios[prevFile].currentTime = 0;
      document.getElementById(currentButtonId).classList.remove('playing');
    }

    // 🔄 Reset bottone "Riprendi" → torna a "Pausa" quando si cambia audio
    pauseBtn.textContent = 'Pausa';
  }

  const audio = audios[file];
  const btn = document.getElementById(buttonId);

  if (audio.paused) {
    console.log('2');
    audio.currentTime = 0;
    audio.play();
    btn.classList.add('playing');
    currentButtonId = buttonId; // Aggiorna l'ID del bottone corrente
    pauseBtn.textContent = 'Pausa'; // Se l'audio inizia, il bottone pausa è "Pausa"
  } else {
    console.log('2.2');
    audio.pause();
    btn.classList.remove('playing');
    currentButtonId = null;

    // 🔄 Se stai stoppando lo stesso audio, aggiorna il bottone di pausa
    pauseBtn.textContent = 'Riprendi';
  }
}

// Utility per formattare mm:ss
function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Gestione del bottone di pausa
const pauseBtn = document.getElementById('pauseBtn');

pauseBtn.addEventListener('click', () => {
  console.log('Pause button clicked');

  if (!currentButtonId) {
    console.log('Nessun audio attivo (currentButtonId è nullo o undefined)');
    return;
  }

  // Ottieni il file audio associato al currentButtonId
  const file = buttonAudioMap[currentButtonId];
  const audio = audios[file];
  const btn = document.getElementById(currentButtonId);

  if (!audio) {
    console.log('Audio non trovato per currentButtonId:', currentButtonId);
    return;
  }

  if (audio.paused) {
    console.log(`Audio "${file}" è in pausa. Avvio la riproduzione.`);
    audio.play();
    btn.classList.add('playing');
    pauseBtn.textContent = 'Pausa'; // Cambia testo
  } else {
    console.log(`Audio "${file}" è in riproduzione. Lo metto in pausa.`);
    audio.pause();
    btn.classList.remove('playing');
    pauseBtn.textContent = 'Riprendi'; // Cambia testo
  }
});
