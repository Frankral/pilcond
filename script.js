// changing vars
let nomP1 = "Bobo";
let nomP2 = "John";
let type = "normal"; // normal or speed
let maxScore = 11;

class Timer
{
    constructor(heure, min, sec){
        this.heure = heure;
        this.min = min;
        this.sec = sec;
    }

    add_sec(){
        this.sec += 1;
        if(this.sec >= 60){
            this.min += 1;
            this.sec = 0;
        }
        if(this.min >= 60){
            this.heure += 1;
            this.min = 0;
        }
    }

    show(element){
        let heure = this.heure.toString().padStart(2, '0');
        let min = this.min.toString().padStart(2, '0');
        let sec = this.sec.toString().padStart(2, '0');
        element.innerHTML = heure + ":" + min + ":" + sec;
    }
    
}

class Score{

    constructor(score, set, max, type){
        this.score = score;
        this.set = set;
        this.max = max;
        this.type = type;
    }

    add(scoreAdv){
        if(this.type == "normal"){
            this.add_norm(scoreAdv);
        } 
        else if(this.type == "speed") {
            this.add_speed(scoreAdv);
        }
    }

    add_norm(scoreAdv){
        this.score += 1;
        if(this.score >= this.max-1 && this.score === scoreAdv.score){
            this.max++;
            scoreAdv.max++;
        }

        if(this.score >= this.max){
            this.set += 1
            scoreAdv.score = 0;
            this.score = 0;
            this.max = 11;
            scoreAdv.max = 11;
        }
        
    }

    add_speed(scoreAdv){
        this.score += 1;
        if(this.score >= this.max){
            this.set += 1
            scoreAdv.score = 0;
            this.score = 0;
        }
        
    }

    show(elementset, elementscore){
        elementset.innerHTML = this.set;
        elementscore.innerHTML = this.score;
    }

}

let serve1 = document.getElementById("serve1");
let serve2 = document.getElementById("serve2");
let serve = 0;

function serve_process(){
    serve++;
    if(serve%4 == 0 || serve%4 == 1){
        serve1.classList.remove("hidden");
        serve2.classList.add("hidden");
    } else{
        serve1.classList.add("hidden");
        serve2.classList.remove("hidden");
    }
}

let name = document.getElementsByClassName("nom");
let score = document.getElementsByClassName("score");
let set = document.getElementsByClassName("set")
let time = document.getElementById("timer");


let score1 = new Score(0, 0, maxScore, type);
let score2 = new Score(0, 0, maxScore, type);

name[0].innerHTML = nomP1;
name[1].innerHTML = nomP2;

let timer = new Timer(00, 00, 00);

timer.show(time);

setInterval(()=>{
    timer.add_sec();
    timer.show(time);
}, 1000);

score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);

document.addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight"){
        score2.add(score1);
    }
    if(event.key == "ArrowLeft"){
        score1.add(score2);
    }
    serve_process();
    score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);
});

let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

player1.addEventListener("click", ()=>{
    score1.add(score2);
    serve_process();
    score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);
});

player2.addEventListener("click", ()=>{
    score2.add(score1);
    serve_process();
    score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);
});