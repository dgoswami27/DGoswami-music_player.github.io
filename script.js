console.log("welcome to Dushyant's Music");

let songIndex = 0;
let audioElement = new Audio('Music/1.m4a');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif'); 
let masterSongName = document.getElementById('masterSongName'); 
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Love Me Like You Do", fieldPath: "Music/1.m4a", coverPath: "Cover/Cover1.jpg"},
    {songName: "Alan Walker - Faded", fieldPath: "Music/2.m4a", coverPath: "Cover/Cover2.jpg"},
    {songName: "See You Again ft.Furious 7 Soundtrack", fieldPath: "Music/3.m4a", coverPath: "Cover/Cover3.jpg"},
    {songName: "Alan Walker, Sabrina Carpenter & Farruko On My Way", fieldPath: "Music/4.m4a", coverPath: "Cover/Cover4.jpg"},
    {songName: "Alan Walker & Ava Max - Alone Pt II", fieldPath: "Music/5.m4a", coverPath: "Cover/Cover5.jpg"},
    {songName: "Alan Walker - Alone", fieldPath: "Music/6.m4a", coverPath: "Cover/Cover6.jpg"},
    {songName: "Billie Eilish, Khalid - lovely", fieldPath: "Music/7.m4a", coverPath: "Cover/Cover7.jpg"},
    {songName: "Coldplay - Hymn For The Weekend", fieldPath: "Music/8.m4a", coverPath: "Cover/Cover8.jpg"},
    {songName: "Enemy (from the series Arcane League of Legends)", fieldPath: "Music/9.m4a", coverPath: "Cover/Cover9.jpg"},
    {songName: "Let Me Love You", fieldPath: "Music/10.m4a", coverPath: "Cover/Cover10.jpg"},
    {songName: "One Direction - Night Changes", fieldPath: "Music/11.m4a", coverPath: "Cover/Cover11.jpg"},
    {songName: "Perfect", fieldPath: "Music/12.m4a", coverPath: "Cover/Cover11.jpg"}
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

audioElement.addEventListener('ended', ()=>{
    songIndex += 1;
    audioElement.src = `Music/${songIndex+1}.m4a`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.currentTime != 0 && audioElement.paused && songIndex == parseInt(e.target.id)){
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else if((audioElement.paused || audioElement.currentTime <= 0) || (audioElement.play && songIndex != parseInt(e.target.id))){
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');

            audioElement.src = `Music/${songIndex+1}.m4a`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName;

            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');

            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
        }
    })
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `Music/${songIndex+1}.m4a`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 11){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Music/${songIndex+1}.m4a`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
})
