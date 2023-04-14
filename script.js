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

    constructor(score, set){
        this.score = score;
        this.set = set;
    }

    add(scoreAdv){
        this.score += 1;
        if(this.score >= 11){
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

let name = document.getElementsByClassName("nom");
let score = document.getElementsByClassName("score");
let set = document.getElementsByClassName("set")
let time = document.getElementById("timer");

let nomP1 = "Bobo";
let nomP2 = "John";

let score1 = new Score(0, 0);
let score2 = new Score(0, 0);

let serve1 = document.getElementById("serve1");
let serve2 = document.getElementById("serve2");
let serve = 0;

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
    serve++;
    if(serve%4 == 0 || serve%4 == 1){
        serve1.classList.remove("hidden");
        serve2.classList.add("hidden");
    } else{
        serve1.classList.add("hidden");
        serve2.classList.remove("hidden");
    }
    score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);
});
