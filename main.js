var btn = document.getElementById('button');
btn.addEventListener('click',nextItem);
var score = document.getElementById('score');
var correctScore = 0;
var incorrectScore = 0;


//callback de btn
function nextItem(){
    var url = 'https://opentdb.com/api.php?amount=1';
    requestAJAX(url, function(data){
        // Data
        var difficulty = data.results[0].difficulty;
        var category = data.results[0].category;
        var correctAnswer = data.results[0].correct_answer;
        var incorrectAnswers = data.results[0].incorrect_answers;
        var question = data.results[0].question;
        var type = data.results[0].type;

        var output = document.getElementById('output');
        output.innerHTML =`<div><h1 class="question">${question}</h1></div>`;
        setButtons(incorrectAnswers,correctAnswer,type,output);
    });
}

//request -----> get
function requestAJAX(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        if(xhr.readyState == 4 && xhr.status == 200){
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET',url,true);
    xhr.send();
}

//print button
function setButtons(incorrectAnswers, correctAnswer,type,output){

    if(type != 'boolean'){
        let buttons = randomButtons(incorrectAnswers, correctAnswer);
        buttons.forEach(function (button){
            output.innerHTML += `<button class="btn-info" data-toggle="modal" data-target="#myModal">${button}</button>`;
        });
    }else{
        output.innerHTML += `<button class="btn-info" data-toggle="modal">True</button>`;
        output.innerHTML += `<button class="btn-info" data-toggle="modal">False</button>`;
    }
    var btnResponse = document.getElementsByClassName("btn-info");
    var l = btnResponse.length;
    var arrayBtn = [];
    for (var i = 0; i < l; i++) {
        arrayBtn.push(btnResponse[i]);
    }
    arrayBtn.forEach(function (element){
        element.addEventListener('click', function (){
            if(correctAnswer === element.innerHTML){
                correctResponse();
            }else{
                incorrectResponse();
            }
        });
    });
}

//shuffle for the response buttons
function randomButtons(incorrectAnswers,correctAnswer){
    const buttons=[];
    incorrectAnswers.forEach(function (element){
        buttons.push(element);
    });
    buttons.push(correctAnswer);
    shuffle(buttons);
    return buttons;
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
function correctResponse(){
    let path = "image/correct.jpg";
    correctScore++;
    $("#content").css(
        "background-image": `${path}`,
        "background-size": "50%",
        "width" : "300px",
        "background-size": "auto",
        "background-repeat": "no-repeat"
    );
    $("#content").append(`<h1>GENIAL!!!!<h1>`);
}
function incorrectResponse(){
    let path = "image/incorrect.jpg";
    incorrectScore++;
    $("#content").css(
       "background-image": `${path}`,
       "background-size": "50%",
       "width" : "300px",
       "background-size": "auto",
       "background-repeat": "no-repeat"

    );
    $("#content").append(`<h1>SIGUE INTENTANDO!!!!<h1>`);
}
