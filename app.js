let gameSeq=[];
let userSeq=[];
let Score=[];
let highScore=0;
let btns=['yellow','red','purple','green'];
let started=false;
let level=0;



let h2=document.querySelector('h2');
document.addEventListener('keypress',function(event){
    if(started==false){
        console.log('game is started');
        started=true;
        
    levelUp();
    }
    
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove('flash');
    },200);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randomIdx];
    let randbtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    gameFlash(randbtn);
}

let allBtns=document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function checkAnswer(idx){
    

    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length===gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        Score.push(level);        
        highestScore();
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> & Highest Score is <b>${highScore}</b> <br> Press any key to start again`;
        
        let body=document.querySelector('body');
        body.classList.add('endFlash');
        setTimeout(function(){
            body.classList.remove('endFlash'); 
        },100)
        reset();
    }
}

function highestScore(){
    for(let i=0;i<Score.length;i++){
        if(highScore<Score[i]){
            highScore=Score[i];
        }
    }
}
function btnPress(){
    let btn=this;
    gameFlash(btn);

    let userColor=btn.getAttribute('id');    
    userSeq.push(userColor);
    checkAnswer(userSeq.length-1);

}
function reset(){
    started=false;
    level=0;
    userSeq=[];
    gameSeq=[];
}