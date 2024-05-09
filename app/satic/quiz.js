// JavaScript code for the timer
window.onload = function () {
    var timer = document.getElementById('timer');
    var timeLeft = 60; // Set the initial time in seconds
    
    // Update the timer every second
    var countdown = setInterval(function() {
        timer.innerHTML = 'Time Left: ' + timeLeft + ' seconds';
        timeLeft--;
        
        // Check if time has run out
        if (timeLeft < 0) {
            clearInterval(countdown);
            timer.innerHTML = 'Time\'s up!';
            // Optionally, you can submit the form or handle the time-up event here
        }
    }, 1000);
};
