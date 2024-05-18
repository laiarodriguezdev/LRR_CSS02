/* SECTION SEGUIMENT CAMPS CANÇÓ */
/* *************************************** */
let titleSong = document.getElementById("title");
let artistSong = document.getElementById("artist");
let timeSong = document.getElementById("time");

let imgSong = document.getElementById("imgSong");
let audioElement = document.getElementById("audio");

/* SECTION CAMPS PREVIOUS, NEXT, PLAY//PAUSE */
/* *************************************** */
let previousSong = document.getElementById("previousSong");
let play = document.getElementById("playSong");
let nextSong = document.getElementById("nextSong");

/* SECTION CAMPS VOLUM CONTROLS */
/* *************************************** */
let volumOff = document.getElementById("volumOff");
let volumUp = document.getElementById("volumUp");

/* SECTION VOLUM SLIDER */
/* *************************************** */
var slider = document.getElementById("sliderIpod");
var output = document.getElementById("volumValue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  updateVolume();
}

/* CANÇONS */
/* *************************************** */
let songsArray = [];
let currentSongIndex = 0;
let isPlaying = false;

async function fetchSongs() {
  try {
      const response = await fetch("../json/songs.json");
      if (!response.ok) {
          throw new Error('No carrega correctament el JSON');
      }
      const data = await response.json();
      songsArray = data.songs;
      audioElement.volume = 0.5;
      loadSong(currentSongIndex);
  } catch (error) {
      console.error('Error al carregar el JSON: ', error);
  }
}

function loadSong(index) {
  const song = songsArray[index];
  titleSong.textContent = song.title;
  artistSong.textContent = song.artist;
  imgSong.src = song.image;
  audioElement.src = song.audio;
  audioElement.volume = slider.value / 100;
  // MIRAR AIXO DE NAN. ¿PERQUE NO AGAFA EL SONG.DURATION O AUDIOELEMENT.DURATION?
  timeSong.textContent = "0:00 - " + song.duration; 
}

function playPauseSong() {
  if (isPlaying) {
    audioElement.pause();
    imgSong.classList.remove('rotating');
    play.src = './icons/play.png';
  } else {
    audioElement.play();
    imgSong.classList.add('rotating');
    play.src = './icons/pause.png';
  }
  isPlaying = !isPlaying;
}

function nextSongFunc() {
  audioElement.pause();
  play.src = './icons/play.png';
  isPlaying = false;
  currentSongIndex = (currentSongIndex + 1) % songsArray.length;
  loadSong(currentSongIndex);
}

function prevSongFunc() {
  audioElement.pause();
  play.src = './icons/play.png';
  isPlaying = false;
  currentSongIndex = (currentSongIndex - 1 + songsArray.length) % songsArray.length;
  loadSong(currentSongIndex);
}

function updateVolume() {
  audioElement.volume = slider.value / 100;
  output.innerHTML = slider.value;
}

function updateTime(){
  let currentTime = audioElement.currentTime;
  let duration = audioElement.duration;

  let currentMinutes = Math.floor(currentTime / 60);
  let currentSeconds = Math.floor(currentTime % 60);

  let durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  time.textContent = currentMinutes + ":" + (currentSeconds < 10 ? '0' : '') + currentSeconds +
                      " - " +
                      durationMinutes + ":" + (durationSeconds < 10 ? '0' : '') + durationSeconds;

  if (currentTime >= duration || currentTime == duration) {
    imgSong.classList.remove('rotating');
  }
}


audioElement.addEventListener('ended', nextSongFunc);
nextSong.addEventListener('click', nextSongFunc);
previousSong.addEventListener('click', prevSongFunc);
play.addEventListener('click', playPauseSong);
audioElement.addEventListener('timeupdate', updateTime);


fetchSongs();
