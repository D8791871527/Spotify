console.log("helohgsjagjeyg")
let name;
let audio=document.createElement("audio")

// async function main(){
//     let a =await fetch("./songs/")
//     let response = await a.text();
//     // console.log(response)
//     let div=document.createElement("div")
//     div.innerHTML=response;
//     let songs=[];
//     let divs=div.getElementsByTagName("a");
//     Array.from(divs).forEach(e => {
//         songs.push(e);
//     });
//     console.log(songs)
// }
// main()
function playMusic(name) {
    document.querySelector(".abovebar").innerHTML=name;
    audio.src=`./songs/${name}`
    // console.log(`./songs/${name}`)
    audio.play()
}
function convertSecondsToMMSS(seconds) {
    // Ensure seconds is a positive number
    seconds = Math.abs(seconds);
  
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    // Format the result as "mm:ss"
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  
    return formattedTime;
  }

async function main() {
    
    let a = await fetch("http://127.0.0.1:5500/songs")
    let response = await a.text();
    // console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let songs = [];
    let song = div.getElementsByTagName("a")
    // console.log(song)
    Array.from(song).forEach(e => {
        if (e.href.includes(".mp3")) {
            songs.push(e.href)
        }
    })
    // console.log(song)
    let currentsong;
    // show all the songs in the playlist
    let sl = document.getElementsByClassName("songList")[0].getElementsByTagName("ul")[0];

    // console.log(sl)
    songs.forEach(e => {
        let n = e.split("/");
        sl.innerHTML = sl.innerHTML
            + `
    <li> <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${e.split("/songs/")[1]}</div>
                                <div>Song Artist</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img  class="invert" src="smallplay.svg" alt="">
                            </div>
                        </li>
        `
    })

    Array.from(sl.getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",async(item)=>{
            let name=e.getElementsByClassName("info")[0].querySelector("div").innerHTML
            await playMusic(name);

            // console.log(name)
        })
    })


    // attach an event listener to each song
    let ul=document.querySelector(".songList").getElementsByTagName("li");
    Array.from(ul).forEach(e => {
        e.addEventListener("click", async element=>{
            let n= e.querySelector(".info").getElementsByTagName("div")[0].innerHTML;
            await playMusic(n)

            let play=document.querySelector("#play");
            play.src="./img/pause.svg"


        })

    })



    let play=document.querySelector("#play");
    // play.src="./img/pause.svg"
    play.addEventListener("click",(e)=>{
        // console.log(play.src)
        document.querySelector(".songtime").innerHTML="track"
        if(audio.paused){
            play.src="./img/pause.svg"
            audio.play()
        }
        else{   
            play.src="./img/play.svg"
            audio.pause();
        // console.log("Played")
        }
    })


    document.querySelector('#next').addEventListener("click",()=>{
        let play=document.querySelector("#play");
        play.src="./img/pause.svg"
        let n;
        if("http://127.0.0.1:5500/spotify.html"== audio.src){
            let fuln=songs[0]
            n=fuln.split("/").slice(-1);
            let idx=songs.indexOf(fuln);
        }
        else{
            let fuln=audio.src;
            let idx=songs.indexOf(fuln);
            idx=(idx+songs.length+1)%songs.length
            n=songs[idx].split("/").slice(-1);
        }console.log(n)
        playMusic(n[0])
    })


    document.querySelector('#previous').addEventListener("click",()=>{
        let play=document.querySelector("#play");
        play.src="./img/pause.svg"
        let n;
        if("http://127.0.0.1:5500/spotify.html"== audio.src){
            let fuln=songs[0]
            n=fuln.split("/").slice(-1);
            let idx=songs.indexOf(fuln);
        }
        else{
            let fuln=audio.src;
            let idx=songs.indexOf(fuln);
            idx=(idx+songs.length-1)%songs.length
            n=songs[idx].split("/").slice(-1);
        }console.log(n)
        // console.log(typeof n)
        playMusic(n[0])
    })


    audio.addEventListener("timeupdate",()=>{
        let cir=document.querySelector(".circle");
        // console.log(audio.currentTime)
        cir.style.left=`${((audio.currentTime/audio.duration)*100)}%`;
        document.querySelector(".songtime").innerHTML=`${convertSecondsToMMSS(audio.currentTime)}--${convertSecondsToMMSS(audio.duration)}`+`<input id="volcontrol" class="volseek" type="range" name="volume">`
    })


    let seekBar = document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let newTime = (e.offsetX/e.target.getBoundingClientRect().width)*(audio.duration);
        audio.currentTime=Math.floor(newTime);
    })


    // add an Event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0"
    })

    // add an Event listener for close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="120%"
    })

    document.querySelector('#volcontrol').addEventListener("change",(e)=>{
        let v=parseInt(e.target.value)/100;
        audio.volume=v;
    })

}

main()
