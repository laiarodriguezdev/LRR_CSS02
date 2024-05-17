/* CANÇONS */
/* *************************************** */
let songsArray = [];

async function fetchSongs() {
    try {
        const response = await fetch("../json/songs.json");
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo songs.json');
        }
        const data = await response.json();
        
        data.forEach(song => {
            songsArray.push({
                title: song.title,
                artist: song.artist,
                duration: song.duration,
                image: song.image,
                audio: song.audio
            });
        });
        
        console.log(songsArray);
    } catch (error) {
        console.error('Error al cargar songs.json:', error);
    }
}

fetchSongs();

/* SECTION SEGUIMENT CAMPS CANÇÓ */
/* *************************************** */

let titleSong = document.getElementById("title");
let artistSong = document.getElementById("artist");
let timeSong = document.getElementById("time");




/* SECTION CAMPS AUDIO CONTROLS */
/* *************************************** */


/* SECTION AUDIO VOLUM */
/* *************************************** */
var slider = document.getElementById("sliderIpod");
var output = document.getElementById("volumValue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}