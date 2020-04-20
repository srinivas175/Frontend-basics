var myImg = document.getElementsByClassName('dice');
const btn = document.getElementById("click")
var score = document.getElementById('score');
const max =6;
const min =0;

btn.addEventListener("click",getRandomDice);

function getRandomDice() {
    btn.disabled = true;
    for (let index = 0; index < myImg.length; index++) {
        myImg[index].setAttribute("class","dice roll");
    }
    setTimeout(changeDice, 1100);
    setTimeout(() => {
            for (let index = 0; index < myImg.length; index++) {
            myImg[index].setAttribute("class","dice");
            btn.disabled = false;
        }
    }, 1200);
    
}

function changeDice() {
    var randVal= Math.floor(Math.random()*(min,max))+min;
    for (let index = 0; index < myImg.length; index++) {
        if(index === randVal){
            myImg[randVal].style.zIndex= max;
            
        }else{
            myImg[index].style.zIndex = Math.floor(Math.random()*(min,max))+min;
        }
    }
    score.getElementsByTagName('span')[0].innerHTML=randVal+1;
    // console.log(score.getElementsByTagName('span')[0]);
}


