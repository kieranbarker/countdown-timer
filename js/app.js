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
   * Reactively update the data object
   * @param {Object} object The updated data object
   */
  function setData(object) {
    // Update the data object
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        data[key] = object[key];
      }
    }

    // Render the new UI
    render();
  }

  /**
   * Create an immutable copy of the data object
   * @return {Object} An immutable copy of the data object
   */
  function getData() {
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Get the template markup
   * @return {String} The HTML string
   */
  function template() {
    // Get the number of minutes remaining
    var minutes = Math.floor(data.timer / 60);

    // Get the number of seconds remaining
    var seconds = data.timer % 60;

    // The HTML string to return
    var string =
      "<p>" + minutes + ":" + seconds.toString().padStart(2, "0") + "</p>" +
      "<p class='di'>" +
        "<button class='ma1 f3' type='button'" + (data.done ? " disabled" : "") + ">" +
          (data.paused ? "Start" : "Pause") +
        "</button>" +
      "</p>" +
      "<p class='di'><button class='ma1 f3' type='button'>Reset</button></p>";

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
    // Get an immutable copy of the data object
    var dataCopy = getData();

    // Update immutable copy
    dataCopy.timer -= 1;
    dataCopy.done = dataCopy.timer === 0 ? true : false;

    // Update data and render new UI
    setData(dataCopy);

    // If the timer is done, stop it from running
    if (data.done) {
      window.clearInterval(countdown);
    }
  }

  /**
   * Start or stop the timer
   * @param {Boolean} start Whether to start (true) or stop (false) the timer
   */
  function startStop(start) {
    // Get an immutable copy of the data object
    var dataCopy = getData();

    // Update immutable copy
    dataCopy.paused = start ? false : true;

    // Update data and render new UI
    setData(dataCopy);

    // Start or stop the countdown interval
    if (start) {
      countdown = window.setInterval(update, 1000);
    } else {
      window.clearInterval(countdown);
    }
  }

  /**
   * Reset the timer
   */
  function reset() {
    // Get an immutable copy of the data object
    var dataCopy = getData();

    // Update immutable copy
    dataCopy.timer = duration;
    dataCopy.paused = true;
    dataCopy.done = false;

    // Update data and render new UI
    setData(dataCopy);

    // Clear the countdown interval
    window.clearInterval(countdown);
  }

  /**
   * Handle click events inside the app
   */
  function handleClicks(event) {
    // Start the timer when the user clicks the "Start" button
    if (event.target.textContent === "Start") {
      startStop(true);
      return;
    }

    // Stop the timer when the user clicks the "Pause" button
    if (event.target.textContent === "Pause") {
      startStop(false);
      return;
    }

    // Reset the timer when the user clicks the "Reset" button
    if (event.target.textContent === "Reset") {
      reset(event);
      return;
    }
  }


  //
  // Init
  //

  // Do an initial render on page load
  render();

  // Handle start, stop, and reset on click
  app.addEventListener("click", handleClicks, false);

})();
