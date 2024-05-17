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
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: usernameEmail, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Signup successful. You can now log in.');
                window.location.href = '/';
            } else {
                alert('Signup failed: ' + data.message);
            }
        });
    }
}


function selectGenre(genre) {
    localStorage.setItem('selectedGenre', genre); // Save selected genre
            // Send AJAX request to Flask server
            fetch('/api_to_mongo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ genre: genre })
            })
            .then(response => {
                if (response.ok) {
                    console.log('API call successful');
                } else {
                    console.error('API call failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });    
}
function updateQuestion(index) {
    // Get the current question from the questions array
    var currentQuestion = questions[index];
    
    // Combine correct and incorrect answers
    var allAnswers = currentQuestion.incorrect_answers.concat([currentQuestion.correct_answer]);
    
    // Shuffle the combined array
    shuffleArray(allAnswers);
    
    // Display the question title
    document.getElementById("questionTitle").innerText = currentQuestion.question;
    
    // Clear previous options
    var optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    
    // Display options as buttons
    allAnswers.forEach(function(option) {
        var button = document.createElement("button");
        button.classList.add("option-btn");
        button.innerText = option;
        button.addEventListener("click", function() {
            checkAnswer(option, currentQuestion.correct_answer);
        });
        optionsContainer.appendChild(button);
    });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedAnswer, correctAnswer) {
    var buttons = document.getElementsByClassName("option-btn");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        button.disabled = true; // Disable further clicks on all buttons
        if (button.innerText === selectedAnswer) {
            if (selectedAnswer === correctAnswer) {
                ScoreTracker++;
                button.classList.add("correct-answer");
            } else {
                button.classList.add("incorrect-answer");
            }
        }
    }
    // Delay moving to the next question
    setTimeout(function() {
        moveNext();
    }, 500); // Adjust the delay time as needed
}

// Function to move to the next question
function moveNext() {
    currentIndex++;
    if (currentIndex < questions.length) {
        updateQuestion(currentIndex);
    } else {
        sendScoreToServer(ScoreTracker);
        window.location.href = '/score';
    }
}
// Function to send the score to the server
function sendScoreToServer(score) {
    fetch('/score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: score })
    })
    .then(response => {
        if (response.ok) {
            console.log('Score sent successfully');
        } else {
            console.error('Failed to send score');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
// Function to shuffle an array (Fisher-Yates shuffle algorithm)
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var currentIndex = 0;
var ScoreTracker=0;

if (window.location.pathname.includes('/quiz')) {
    // Execute this code when the URL contains '/quiz'
    updateQuestion(currentIndex);

    // Add event listener to the next button
    document.getElementById("nextButton").addEventListener("click", function() {
        currentIndex++;
        if (currentIndex < questions.length) {
            updateQuestion(currentIndex);
        } else {
            window.location.href = '/score';;
        }
    });
}