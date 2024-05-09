// User authentication and signup
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && username === userData.usernameEmail && password === userData.password) {
        window.location.href = 'genre.html'; // Redirect to genre selection page
    } else {
        alert("Invalid credentials!");
    }
}

function signup() {
    const usernameEmail = document.getElementById('usernameEmail').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!usernameEmail || !password || !confirmPassword) {
        alert('Please fill in all fields');
    } else if (password !== confirmPassword) {
        alert('Passwords do not match');
    } else {
        localStorage.setItem('user', JSON.stringify({ usernameEmail, password })); // Store user data in local storage
        alert('Signup successful. You can now log in.');
        window.location.href = 'login.html'; // Redirect to login page
    }
}

// Genre selection and quiz handling
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;
let questions = [];

const questionBank = {
    "Science": [
        { question: "What is the chemical symbol for the element oxygen?", options: ["O", "Ox", "Om", "Op"], answer: "O" },
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Earth", "Venus"], answer: "Mars" }
    ],
    "Mathematics": [
        { question: "What is the square root of 144?", options: ["12", "14", "16", "18"], answer: "12" },
        { question: "What is 15% of 200?", options: ["30", "25", "50", "20"], answer: "30" }
    ],
    "History": [
        { question: "Who discovered America?", options: ["Christopher Columbus", "Leif Erikson", "Marco Polo", "Amerigo Vespucci"], answer: "Christopher Columbus" },
        { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1923"], answer: "1912" }
    ],
    "Geography": [
        { question: "What is the longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Amazon" },
        { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" }
    ]
};

function selectGenre(genre) {
    localStorage.setItem('selectedGenre', genre); // Save selected genre
    window.location.href = 'quiz.html'; // Redirect to quiz page
}

function loadQuestions() {
    const genre = localStorage.getItem('selectedGenre');
    questions = questionBank[genre];
    totalQuestions = questions.length;
    currentQuestionIndex = 0;
    score = 0;
    if (questions) {
        displayQuestion();
        startTimer(3, document.getElementById('time'));
    } else {
        alert("No questions found for this genre.");
    }
  
}

window.addEventListener("load", loadQuestions);

// function setupTimer() {
//     var display = document.querySelector('#time'),
//     timer = new CountDownTimer(10);

// timer.onTick(format).onTick(restart).start();

// function restart() {
//   if (this.expired()) {
//     setTimeout(function() { timer.start(); }, 1000);
//   }
// }

// function format(minutes, seconds) {
//   minutes = minutes < 10 ? "0" + minutes : minutes;
//   seconds = seconds < 10 ? "0" + seconds : seconds;
//   display.textContent = minutes + ':' + seconds;
// }
// }




function startTimer(duration, display) {
    var timer = duration;
   
    var intervalId = setInterval(function () {
        var seconds = timer;

        var displayMinutes = Math.floor(seconds / 60);
        var displaySeconds = seconds % 60;

        displayMinutes = displayMinutes < 10 ? "0" + displayMinutes : displayMinutes;
        displaySeconds = displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;

        display.textContent = displayMinutes + ":" + displaySeconds;

        if (--timer < 0) {
            
            clearInterval(intervalId);
            alert("Time's up!");
            window.location.href = 'score.html';

        }
    }, 1000);
}

function displayQuestion() {
    
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionTitle = document.getElementById('questionTitle');
        const optionsContainer = document.getElementById('optionsContainer');

        questionTitle.textContent = `Q${currentQuestionIndex + 1}: ${question.question}`;
        optionsContainer.innerHTML = ''; // Clear previous options

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, question.answer);
            optionsContainer.appendChild(button);
        });
        

    } else {
        localStorage.setItem('finalScore', score);
        localStorage.setItem('totalQuestions', totalQuestions);
        window.location.href = 'score.html';
    }
  
    currentQuestionIndex++;
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 1;
    }
    alert(selected === correct ? "Correct!" : "Incorrect!");
    displayQuestion();
    currentQuestionIndex++;
}

function displayScore() {
    const finalScore = localStorage.getItem('finalScore') === null ? 0 : parseInt(localStorage.getItem('finalScore'));
    const totalQuestions = localStorage.getItem('totalQuestions');
    document.getElementById('finalScore').textContent = `You scored ${finalScore} out of ${totalQuestions}`;

}
