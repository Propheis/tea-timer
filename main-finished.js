// This is our timer.
var timer;

// We'll use this to keep track of how much time is left over
var timeRemaining;

//
// Functions
//

function initializeTimer() {

  // Find the selected option in the tea type select box
  var teaType = $("#tea-type option:selected");

  // Get the data attribute information from the selected tea type
  var numMinutes = teaType.data('minutes');
  var numSeconds = teaType.data('seconds');

  // Set the display accordingly
  $("#minutes").text(numMinutes);
  $("#seconds").text(numSeconds);
}

function startTimer() {
  // Disable the start button
  $("#start").attr('disabled', 'disabled');
  // Enable the stop button
  $("#stop").removeAttr("disabled");

  // Fetch the number of minutes & seconds
  var numMinutes = $("#minutes").text();
  var numSeconds = $("#seconds").text();

  // Set the timeRemaining variable
  // moment() is a part of the MomentJS library for dealing with time
  timeRemaining = moment.duration({
    minutes: numMinutes,
    seconds: numSeconds
  });

  // Initialize the timer to run the timerTickedHandler function once per 1000 milliseconds (1 sec)
  timer = window.setInterval(timerTickedHandler, 1000);
}

function stopTimer() {
  // Stop the timer from ticking
  window.clearInterval(timer);
  timer = null;

  // Re-Enable the start button
  $("#start").removeAttr('disabled');
  // Disable the stop button
  $("#stop").attr("disabled", "disabled");

  // Reset the display
  initializeTimer();
}

function timerTickedHandler() {
  // Subtract a second from the remaining time
  timeRemaining.subtract(1, 's');

  var mins = timeRemaining.get('minutes');
  var secs = timeRemaining.get('seconds');

  // Update the display on the page
  $("#minutes").text( formatTime(mins) );
  $("#seconds").text( formatTime(secs) );

  // Check if the timer has reached zero
  if (timeRemaining.asSeconds() === 0) {
    stopTimer();
    // Let the user know that the timer is done
    timerEndedHandler();
  }
}

function timerEndedHandler() {
  // Re-Enable the start button
  $("#start").removeAttr('disabled');
  // Disable the stop button
  $("#stop").attr("disabled", "disabled");

  // Re-Initilize the timer
  initializeTimer();

  // Play a sound
  playChime();

  // Shake the timer display
  $(".timer").effect( 'shake' );
}

// Adds a zero to the time if it's a single digit
function formatTime(time) {
  if (time < 10)
    return "0" + time;
  else
    return time;
}

function playChime() {
  var chime = new Audio("chime.mp3");
  chime.play();
}

// Entry Point for the Program

$(document).ready(function(){
  $("#start")   .click(startTimer);
  $("#stop")    .click(stopTimer);
  $("#tea-type").change(initializeTimer);
});
