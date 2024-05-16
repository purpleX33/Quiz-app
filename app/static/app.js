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



function startTimer(duration) {
    var timer = document.getElementById('timer');
    var startTime = Date.now();
    var endTime = startTime + duration * 6000;  // duration in minutes
    var timerInterval = setInterval(function() {
        var remaining = endTime - Date.now();
        var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        timer.textContent = seconds + " seconds ";

        if (remaining < 1000) {
            clearInterval(timerInterval);
            timer.textContent = 'no time left!';
            displaySessionExpiredWarning();
            setTimeout(function() {
                window.location.href = 'quiz.html'; // Redirect to the index.html page
            }, 5000); // Redirect after 5 seconds to give the user time to read the message
        }
    }, 1000);
}

 // Display session expired warning
 function displaySessionExpiredWarning() {
    var warning = document.getElementById('warning');
    if (!warning) {
        warning = document.createElement('p');
        warning.id = 'warning';
        document.body.appendChild(warning);
    }
    warning.textContent = 'You will be directed to the next question';
}

    // Function to update the question and options based on the current index
    function updateQuestion(index) {
        // Get the current question from the questions array
        var currentQuestion = questions[index];
        
        // Display the question title
        document.getElementById("questionTitle").innerText = currentQuestion.question;
        
        // Clear previous options
        var optionsContainer = document.getElementById("optionsContainer");
        optionsContainer.innerHTML = "";
        
        // Display options as buttons
        currentQuestion.options.forEach(function(option) {
            var button = document.createElement("button");
            button.classList.add("option-btn");
            button.innerText = option;
            optionsContainer.appendChild(button);
        });
    }
    window.addEventListener("load", function() {
        var currentIndex = 0;
        updateQuestion(currentIndex);
    
        document.getElementById("nextButton").addEventListener("click", function() {
            currentIndex++;
            if (currentIndex < questions.length) {
                updateQuestion(currentIndex);
            } else {
                alert("End of quiz. Thank you!");
            }
        });
    });