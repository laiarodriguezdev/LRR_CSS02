const songs = [
    {
        title: "While Your Lips Are Still Red",
        artist: "Nightwish",
        duration: "4:21",
        image: "path/to/image1.jpg",
        audio: "./music/Nightwish.mp3"
    },
    {
        title: "End of me",
        artist: "Apocalyptica",
        duration: "3:29",
        image: "path/to/image2.jpg",
        audio: "./music/Apocalyptica.mp3"
    },
    {
        title: "Down With Sickness",
        artist: "Violet Orlandi",
        duration: "2:55",
        image: "path/to/image3.jpg",
        audio: "./music/DownWithSickness.mp3"
    }
];

let titleSong = document.getElementById("title");
let artistSong = document.getElementById("artist");
let timeSong = document.getElementById("time");




/* SECTION SEGUIMENT VOLUM */
/* *************************************** */
var slider = document.getElementById("sliderIpod");
var output = document.getElementById("volumValue");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}