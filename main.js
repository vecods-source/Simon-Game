const audioMap = {
    "blue" : "sounds/blue.mp3",
    "green" : "sounds/green.mp3",
    "red" : "sounds/red.mp3",
    "yellow" : "sounds/yellow.mp3",
    "wrong" : "sounds/wrong.mp3"
};

const colorsMap = {
    "blue" : 3,
    "green" : 0,
    "red" : 1,
    "yellow" : 2,
};


let UserList = [];
let correct = [];
let levelCtr = 0;
let clickCtr = 0;

$(document).click(function(event){
    if(correct.length === 0)
        return;
    let classname = event.target.className.split(" ")[1];
    playCubeSound(classname);
    debugger;
    animateCube("."+classname);
    UserList.push(colorsMap[classname]); //check win and add after number of clicks = to the length of the sequence;
    console.log("user list: "+UserList);
    checkWin();

});


function checkWin(){
    let checkSimilarty = false;
    for (let i = 0; i < UserList.length; i++) {
        if (correct[i] !== UserList[i]) {
            checkSimilarty = true;
            break; 
        }
    }

    if (!checkSimilarty){
        if(correct.length == UserList.length){
            $("h1").text("Level "+levelCtr);
            UserList.length = 0;
            levelCtr++;
            let rr = Math.random()*4;
            rr = Math.floor(rr);
            StartGame(rr); 
        }
    }
    else{
        levelCtr = 0;
        $("h1").text("Game Over, press any key to restart");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").css("background-color","red");
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "#011F3F";
        }, 2000);
        correct.length = 0;
        UserList.length = 0;
    }

}

$(document).keydown(function(){
    if (correct.length !== 0)
        return;
    document.querySelector("h1").innerText = "Level -1";
    let rr = Math.random()*4;
    rr = Math.floor(rr);
    StartGame(rr);
    // console.log(correct);
    // console.log(UserList);
})


function StartGame(rand){
    setTimeout(() => {
        animateCube($(".btn")[rand]);
    }, 300);
    playCubeSound($(".btn")[rand].className.split(" ")[1]);
    correct.push(rand);
    console.log("correct list: "+correct);
}

function animateCube(classnames){
    
    $(classnames).fadeIn(200).fadeOut(200).fadeIn(200);
}

function playCubeSound(classnames){
    var audio = new Audio(audioMap[classnames]);
    audio.play();
}
