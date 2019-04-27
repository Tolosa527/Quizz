const btn = document.getElementById('button');
btn.addEventListener('click',nextItem);

const score = document.getElementById('score');
var correctScore = 0;
var incorrectScore = 0;
const outputButtons = document.getElementById('buttons');
const messageOk = ["Great!!","Fantiastic","Excelent!!", "Good job"];
const messageError = ["You lose", "So bad", "I´m Sorry"];
 
//callback de btn
function nextItem(){
    vaciar();
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
            outputButtons.innerHTML += `<div><button class="btn-select">${button}</button></div>`;
        });
    }else{
        outputButtons.innerHTML += `<div><button class="btn-select">True</button></div>`;
        outputButtons.innerHTML += `<div><button class="btn-select">False</button></div>`;
    }
    var btnResponse = document.getElementsByClassName("btn-select");
    var l = btnResponse.length;
    var arrayBtn = [];
    for (var i = 0; i < l; i++) {
        arrayBtn.push(btnResponse[i]);
    }
    arrayBtn.forEach(function (element){
        element.addEventListener('click', function (){
            if(correctAnswer === element.innerHTML){
                correctScore++;
                var response = true;
                showModal(response);
                getScore();

            }else{
                incorrectScore++;
                var response = false;
                showModal(response);
                getScore();
            }
        });
    });
}
function vaciar(){
    output.innerHTML = '';
    outputButtons.innerHTML='';

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
function showModal(response){
    var modal = document.getElementById("myModal");
    var modalContent = document.getElementById("modal-content");
    modal.style.display = "block";
    if(response == true){
        modalContent.style.backgroundImage = "url('image/correct.jpg')";
        modalContent.innerHTML = `<h2 class ="messageResponse">${getResponseMessage(messageOk)}</h2>`; 
        
    }else{
         modalContent.style.backgroundImage = "url('image/incorrect.jpg')";
         modalContent.innerHTML = `<h2 class = "messageResponse">${getResponseMessage(messageError)}</h2>`; 
    }
    setTimeout(function() {
        modal.style.display = "none";
    }, 3000);
}  
function getResponseMessage(array){
    return array[Math.floor(Math.random()*array.length)];
}
function getScore(){
    score.innerHTML = `<h3 class="scoreTitle">${correctScore} - ${incorrectScore}</h3>`
}
