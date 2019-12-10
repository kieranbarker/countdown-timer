;(function() {

  "use strict";

  //
  // Variables
  //

  // Get the #app element from the DOM
  var app = document.querySelector("#app");

  // Store duration to a variable
  var duration = 10;

  // The state/data object
  var data = {
  	timer: duration,
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
    // If the timer is done, show a different UI
    if (data.done) {
      return "⏰ <p><button id='restart'>Restart Timer</button></p>";
    }

    // Return the value of data.timer
    return data.timer;
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
   * Start the timer
   */
  function start() {
    // Reset the data
    data.timer = duration;
    data.done = false;

    // Run an initial render
    render();

    // Update the timer every second
    countdown = window.setInterval(function() {
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
    }, 1000);
  }


  //
  // Init
  //

  // Start the timer on page load
  start();

  // When the restart button is clicked, restart the timer
  document.body.addEventListener("click", function(event) {
    if (event.target.id === "restart") {
      start();
    }
  }, false);

})();
