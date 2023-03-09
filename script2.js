console.log("welcome to Dushyant's Hindi-Music");

let songIndex = 0;
let audioElement = new Audio('Hindi-Music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif'); 
let masterSongName = document.getElementById('masterSongName'); 
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Raanjhana Ve", fieldPath: "Hindi-Music/1.mp3", coverPath: "Hindi-Cover/Cover1.jfif"},
    {songName: "Mann Mera", fieldPath: "Hindi-Music/2.mp3", coverPath: "Hindi-Cover/Cover2.jfif"},
    {songName: "Maiyaa Mainu", fieldPath: "Hindi-Music/3.mp3", coverPath: "Hindi-Cover/Cover3.jfif"},
    {songName: "Luka Chuppi - Duniyaa : Kartik Aaryan, Kriti Sanon", fieldPath: "Hindi-Music/4.mp3", coverPath: "Hindi-Cover/Cover4.jfif"},
    {songName: "Khair Mangda - A Flying Jatt", fieldPath: "Hindi-Music/5.mp3", coverPath: "Hindi-Cover/Cover5.jfif"},
    {songName: "Kabir Singh - Kaise Hua", fieldPath: "Hindi-Music/6.mp3", coverPath: "Hindi-Cover/Cover6.jfif"},
    {songName: "Chitta - Shiddat", fieldPath: "Hindi-Music/7.mp3", coverPath: "Hindi-Cover/Cover7.jfif"},
    {songName: "Channa_Ve", fieldPath: "Hindi-Music/8.mp3", coverPath: "Hindi-Cover/Cover8.jfif"},
    {songName: "Bulleya - Ae Dil Hain Muskil", fieldPath: "Hindi-Music/9.mp3", coverPath: "Hindi-Cover/Cover9.jfif"},
    {songName: "Barbaadiyan - Shiddat", fieldPath: "Hindi-Music/10.mp3", coverPath: "Hindi-Cover/Cover10.jfif"},
    {songName: "Apna Bana Le - Bhediya", fieldPath: "Hindi-Music/11.mp3", coverPath: "Hindi-Cover/Cover11.jfif"}
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
    audioElement.src = `Hindi-Music/${songIndex+1}.mp3`;
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

            audioElement.src = `Hindi-Music/${songIndex+1}.mp3`;
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
    audioElement.src = `Hindi-Music/${songIndex+1}.mp3`;
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
    if(songIndex >= 10){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `Hindi-Music/${songIndex+1}.mp3`;
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
