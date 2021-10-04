var questions = [        //questions array+answer array
    {
        question: 'What is "Bok Choy"',  
        choices: ['A sweet tea served in India', 'A sticky rice dessert', 'A very hot pepper', 'A type of green vegetable'],
        correctAnswer: 3 //correct answer identifier
    },
    {
        question: 'In France, what is a champignon?',
        choices: ['Cabbage', 'Strawberry', 'Pumpkin', 'Mushroom'],
        correctAnswer: 3 //correct answer identifier
    },
    {
        question: 'What is the main ingredient in pepperoni?',
        choices: ['Cheese', 'Meat', 'Pepper', 'Pasta'],
        correctAnswer: 1 //correct answer identifier
    },
    {
        question: 'From which country does the dish "enchilada" originate?',
        choices: ['Argentina', 'Korea', 'Mexico', 'New Zealand'],
        correctAnswer: 2 //correct answer identifier
    },
    {
        question: 'What does the word "dolce" on a bottle of Italian wine mean?',
        choices: ['Sweet', 'Dry', 'Vintage', 'Sour'],
        correctAnswer: 0 //correct answer identifier
    }
];

var currentQuestion = 0; //variable to indicate which question the user is on
var correctAnswers = 0; //variable to indicate how many correct answers
var quizOver = false; //quiz status is not over when initialized

window.addEventListener('DOMContentLoaded', function(e){  //displays questions and configures DOM elements when initialized
    displayCurrentQuestion();

    var quizMessage = document.querySelector('.quizMessage'); //displays the quizMessage if conditions allow

        quizMessage.style.display = 'none';

    document.querySelector('.nextButton').addEventListener('click', function(){
        
        if(!quizOver){
            var radioBtnsChecked = document.querySelector('input[type=radio]:checked');

            if (radioBtnsChecked === null){  //if user presses nextButton without an answer, quizMessage is shown
                quizMessage.innerText = 'Please select an answer';
                quizMessage.style.display = 'block';
            } else { 
                console.log(radioBtnsChecked.value);
                quizMessage.style.display = 'none';  //quiz message is not shown if user chooses an answer and clicks button
                if (parseInt(radioBtnsChecked.value) === questions[currentQuestion].correctAnswer){
                    correctAnswers++;   //if answer is correct, +1 is added to correctAnswers
                }

                currentQuestion++; //+1 is added to currentQuestion

                if (currentQuestion < questions.length){  //runs displayCurrentQuestion()
                    displayCurrentQuestion();
                } else { //displays score when finished
                    displayScore();
                    document.querySelector('.nextButton').innerText = 'Play Again?'; //reset button
                    quizOver = true; 
                 }
                }   
        } else {
            quizOver = false;
            document.querySelector('.nextButton').innerText = 'Next Question';
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });
});

function displayCurrentQuestion(){
    console.log('In display current Questions');

    var question = questions[currentQuestion].question;
    var questionClass = document.querySelector('.quizContainer > .question');
    var choiceList = document.querySelector('.quizContainer > .choiceList');
    var numChoices = questions[currentQuestion].choices.length;

    //Set the questionClass text to the current question
    questionClass.innerText = question;

    //Remove all current <li> elements
    choiceList.innerHTML = '';

    var choice; //choice of answers listed
    for (i = 0; i < numChoices; i++){
        choice = questions[currentQuestion].choices[i];
        var li = document.createElement('li');
            li.innerHTML = '<li><input type="radio" value="' + i + '" name="dynradio" />' + choice + '</li>'
        choiceList.appendChild(li);

    }
}

function resetQuiz(){
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore(){
    document.querySelector('.quizContainer > .result').innerText = 'You scored: ' + correctAnswers + ' out of ' + questions.length;
    document.querySelector('.quizContainer > .result').style.display = 'block';
}

function hideScore(){
    document.querySelector('.result').style.display = 'none';
}
//https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event