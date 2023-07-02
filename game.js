var btnColors = ["red", "blue", "green", "yellow"];
var currentPattern = [];
var k = "value";
var kp = false; // any key pressed
// alert("Do you accept to play sounds?");

var New = "";
var audio ={};
var clicks = 0;
var c = false;
var block = false;
var lastRec = 0;
// var totClicks = 0; use currentPattern length
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// check cookies

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// if (typeof(getCookie("record")) === "string") {var record = getCookie("record")} else {var record = 0}

if (!(getCookie("record")==="")) {lastRec = Number(getCookie("record"));console.log("ghg");} else {document.cookie="record=0; expires=Thu, 01 Jan 2170 00:00:00 UTC;";console.log("OK");lastRec = Number(getCookie("record"));}


$(".recordlabel").text("Record: "+String(lastRec)+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Current Progress: "+ String(currentPattern.length));



$("#startbtn").click(async function () {
    if (kp) {return}
    $("#startbtn").slideUp();
    await sleep(600);
    $("#startbtn").trigger({type: 'keypress', which: 13, keyCode: 13});
})

for (var a = 0; a < 4; a++) {
    console.log(a);
    audio[btnColors[a]] = new Audio();
    audio[btnColors[a]].src = "sounds/"+btnColors[a]+".mp3";
    audio["wrong"] = new Audio(src = "sounds/wrong.mp3");
    // eval("var "+k+a+" = "+btnColors[a]+";");
    // console.log(eval("value"+a));

    $("#"+btnColors[a]).on("click", function () {
        if (!kp) {return}
        // var preaudio = new Audio(audio[String(this.id)]);
        preaudio = new Audio("sounds/"+this.id+".mp3");
        preaudio.play();
        if (c) {$("#"+String(this.id)).fadeOut(100).fadeIn(100); console.log("cheats"); return} else if (this.id === currentPattern[clicks] && !(clicks === currentPattern.length-1)) {
            $("#"+String(this.id)).fadeOut(100).fadeIn(100);
            console.log("correct"); clicks++;
        } else if (clicks === currentPattern.length-1 && (this.id === currentPattern[clicks])) {
            $("#"+String(this.id)).fadeOut(100).fadeIn(100);
            clicks++; randomNextSequence(); clicks = 0;
        } else {
            wrongGuess();
        }
    })};

function wrongGuess () {
    // if (currentPattern.length-1 > getCookie("record")) {
    //     document.cookie = "record="+(currentPattern.length-1)+";";
    // }
    $(".recordlabel").text(New+"Record: "+Number(getCookie("record"))+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Current Progress: "+ String(currentPattern.length-1));
    lastRec = getCookie("record");
    audio["wrong"].play();
    $(".btn").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    currentPattern=[];
    clicks = 0;
    
    New = "";
    kp = false;
    $("h1").text("Press a key to restart");
    $("#startbtn").slideDown();
}

function randomNextSequence () {
    $(".recordlabel").text("Record: "+String(lastRec)+"\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 Current Progress: "+ String(currentPattern.length));
    console.log(currentPattern);
    if (currentPattern.length > Number(getCookie("record"))) {document.cookie = "record="+currentPattern.length+";expires=Thu, 01 Jan 2970 00:00:00 UTC;";New = "New ";}

    num = Math.floor(Math.random()*4);
    console.log(eval(num));
    currentPattern.push(btnColors[num]);
    console.log(currentPattern);
    if (kp) {setTimeout(playPattern, 1000);};
}

async function playPattern () {
    kp = false;
    block = true;
    $("h1").html("<em>Watch carefully</em>");
    for (let i = 0; i < currentPattern.length; i++) {
        await sleep(1000)
        console.log(currentPattern);
        $("#"+currentPattern[i]).fadeOut(100).fadeIn(100);
        audio[currentPattern[i]].play();
    }
    await sleep(400)
    $("h1").html("<em>Take a guess</em>");
    kp = true;
    block = false;
}

// playPattern();

$(document).keypress(function(e) {
    // if(e.which == 13) {
    //   // enter pressed
    // }

    if (!kp && !block) {
        console.log(e.key);
        if (e.key === "e") {kp = true; c = true; return;}
        randomNextSequence();
        playPattern();
        kp = true;
        
    };

  });
