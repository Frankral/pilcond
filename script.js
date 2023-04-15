// changing vars
let nomP1 = "Jean1";
let nomP2 = "Jean2";
let type = "normal"; // normal or speed
let maxScore = 11;
let set_player = 1;

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

class Game{
    constructor(tie, set_player){
        this.tie = tie;
        this.set_player = set_player;
    }
}

class Score{

    constructor(score, set, max, type){
        this.score = score;
        this.set = set;
        this.max = max;
        this.true_max = max;
        this.type = type;
    }

    add(scoreAdv, game, player){
        if(this.type == "normal"){
            this.add_norm(scoreAdv, game, player);
        } 
        else if(this.type == "speed") {
            this.add_speed(scoreAdv, player);
        }
    }

    add_norm(scoreAdv, game, player){
        this.score += 1;
        if(this.score >= this.max-1 && this.score === scoreAdv.score){
            this.max++;
            scoreAdv.max++;
            game.tie = true;
        }

        if(this.score >= this.max){
            scoreAdv.last_max = this.max;
            this.last_max = this.max;
            this.set += 1
            scoreAdv.score = 0;
            this.score = 0;
            this.max = this.true_max;
            scoreAdv.max = this.true_max;
            game.tie = false;
            game.set_player = player;
        }
        
    }

    add_speed(scoreAdv, game, player){
        this.score += 1;
        if(this.score >= this.max){
            this.set += 1
            scoreAdv.score = 0;
            this.score = 0;
            game.set_player = player;
        }
        
    }

    show(elementset, elementscore){
        elementset.innerHTML = this.set;
        elementscore.innerHTML = this.score;
    }

}

let game = new Game(false, set_player);
let serve1 = document.getElementById("serve1");
let serve2 = document.getElementById("serve2");
let p1_serve = 0;
let p2_serve = 1;
let serve = 0;
let last_score = [[0,0,0,0, false, set_player]];

function serve_process(){
    if(game.set_player == 1){
        p1_serve = 0;
        p2_serve = 1;
    } else if(game.set_player == 2){
        p1_serve = 1;
        p2_serve = 0;
    }
    serve = score1.score + score2.score;
    if(game.tie){
        serve_process_tie();
    } else{
        if(serve%2==0 && (serve/2)%2 == p1_serve){
            serve1.classList.remove("hidden");
            serve2.classList.add("hidden");
        } else if(serve%2==0 && (serve/2)%2 == p2_serve){
            serve1.classList.add("hidden");
            serve2.classList.remove("hidden");
        }    
    }
    
}

function serve_process_tie(){
    if(serve%2 == 0){
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

let timerInterv = setInterval(()=>{
    timer.add_sec();
    timer.show(time);
}, 1000);

score1.show(set[0], score[0]);
score2.show(set[1], score[1]);

document.addEventListener("keydown", (event) => {
    if(event.key == "ArrowRight"){
        score2.add(score1, game, 1);
    }
    if(event.key == "ArrowLeft"){
        score1.add(score2, game, 2);
    }
    last_score.push([score1.set, score1.score, score2.set, score2.score, game.tie, game.set_player]);
    serve_process();
    score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);
});

let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

player1.addEventListener("click", ()=>{
    score1.add(score2, game, 2);
    serve_process();
    score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);
    last_score.push([score1.set, score1.score, score2.set, score2.score, game.tie, game.set_player]);
});

player2.addEventListener("click", ()=>{
    score2.add(score1, game, 1);
    serve_process();
    score1.show(set[0], score[0]);
    score2.show(set[1], score[1]);
    last_score.push([score1.set, score1.score, score2.set, score2.score, game.tie, game.set_player]);
});


// jquery
$(document).ready(function(){
    let current_win = "#name-win";
    function reduce(func){
        $( current_win ).hide("drop", {direction: "left"}, func);
        clearInterval(timerInterv);
    }

    function show_score() {
        current_win = "#score-win";
        $("#icon").hide("drop", {direction: "left"}, function(){
            $( "#score-win" ).show("drop", {direction: "left"});
        });
        timerInterv = setInterval(()=>{
            timer.add_sec();
            timer.show(time);
        }, 1000);
    }

    function show_name(){
        current_win = "#name-win";
        $("#icon").hide("drop", {direction: "left"}, function(){
            $( "#name-win" ).show("drop", {direction: "left"});
        });
        timerInterv = setInterval(()=>{
            timer.add_sec();
            timer.show(time);
        }, 1000);
    }

    $(".reduce").click(()=>{
        reduce($("#icon").show("drop", {direction: "left"}));
    });

    $("#score").click(show_score);

    $("#name").click(show_name);

    $("#nameAccept").click(()=>{
        reduce(show_score);
        if($("#Jean1").val() != "") nomP1 = $("#Jean1").val();
        if($("#Jean2").val() != "") nomP2 = $("#Jean2").val();
        $("#Jean1").val("");
        $("#Jean2").val("");
        name[0].innerHTML = nomP1;
        name[1].innerHTML = nomP2;
        score1 = new Score(0, 0, maxScore, type);
        score2 = new Score(0, 0, maxScore, type);
        serve = 0;
        timer = new Timer(0, 0, 0);
        score1.show(set[0], score[0]);
        score2.show(set[1], score[1]);
        timer.show(time);
    });

    $("#undo-btn").click(()=>{
        score1.set = last_score[last_score.length - 2][0];
        score1.score = last_score[last_score.length - 2][1];
        score2.set = last_score[last_score.length - 2][2];
        score2.score = last_score[last_score.length - 2][3];
        game.tie = last_score[last_score.length - 2][4];
        game.set_player = last_score[last_score.length - 2][5];
        score1.show(set[0], score[0]);
        score2.show(set[1], score[1]);
        serve_process();
        last_score.pop();  
        
    })

  });