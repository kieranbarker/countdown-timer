;(function() {

  "use strict";

  //
  // Variables
  //

  // Get the #app element from the DOM
  var app = document.querySelector("#app");

  // Store duration to a variable
  var duration = 120;

  // The state/data object
  var data = {
    timer: duration,
    paused: true,
    done: false
  };

  // A placeholder for the countdown interval
  var countdown;


  //
  // Functions
  //

  /**
   * Get the template markup
   * @return {String} The HTML string
   */
  function template() {
    // Get the number of minutes remaining
    var minutes = Math.floor(data.timer / 60);

    // Get the number of seconds remaining
    var seconds = data.timer % 60;

    // A placeholder for the HTML string to return
    var string;

    // Add the timer to the string
    string = "<p>" + minutes + ":" + seconds.toString().padStart(2, "0") + "</p>";

    // Add the start/stop button to the string
    string +=
      "<p class='di'>" +
        "<button class='ma1 f3' type='button'" + (data.done ? " disabled" : "") + ">" +
          (data.paused ? "Start" : "Pause") +
        "</button>" +
      "</p>";

    // Add the start button to the string
    string += "<p class='di'><button class='ma1 f3' type='button'>Reset</button></p>";

    // Return the HTML string
    return string;
  }

  /**
   * Render the UI
   */
  function render() {
    // If there are no updates to the UI, do nothing
    if (app.innerHTML === template()) return;

    // Update the UI
    app.innerHTML = template();
  }

  /**
   * Update the timer
   */
  function update() {
    // Get the new timer value
    var time = data.timer - 1;

    // If the timer hits 0, set as done
    var done = time === 0 ? true : false;

    // Update data
    data.timer = time;
    data.done = done;

    // Render new UI
    render();

    // If the timer is done, stop it from running
    if (done) {
      window.clearInterval(countdown);
    }
  }

  /**
   * Start the timer
   */
  function start(event) {
    // Bail if the start button wasn't clicked
    if (event.target.textContent !== "Start") return;

    // Play the timer
    data.paused = false;

    // Update the timer every second
    countdown = window.setInterval(update, 1000);

    // Render the new UI
    render();
  }

  /**
   * Pause the timer
   */
  function pause(event) {
    // Bail if the pause button wasn't clicked
    if (event.target.textContent !== "Pause") return;

    // Pause the timer
    data.paused = true;

    // Clear the countdown interval
    window.clearInterval(countdown);

    // Render the new UI
    render();
  }

  /**
   * Reset the timer
   */
  function reset(event) {
    // Bail if the restart button wasn't clicked
    if (event.target.textContent !== "Reset") return;

    // Reset the data
    data.timer = duration;
    data.paused = true;
    data.done = false;

    // Run an initial render
    render();

    // Clear the countdown interval
    window.clearInterval(countdown);
  }


  //
  // Init
  //

  // Do an initial render on page load
  render();

  // Handle start, stop, and reset on click
  app.addEventListener("click", function(event) {
    start(event);
    pause(event);
    reset(event);
  }, false);

})();
