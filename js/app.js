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

    // Add the reset button to the string
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
    // Get an immutable copy of the data object
    var dataCopy = getData();

    // Get the new timer value
    var time = dataCopy.timer - 1;

    // If the timer hits 0, set as done
    var done = time === 0 ? true : false;

    // Update immutable copy
    dataCopy.timer = time;
    dataCopy.done = done;

    // Update data and render new UI
    setData(dataCopy);

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

    // Get an immutable copy of the data object
    var dataCopy = getData();

    // Update immutable copy
    dataCopy.paused = false;

    // Update data and render new UI
    setData(dataCopy);

    // Update the timer every second
    countdown = window.setInterval(update, 1000);
  }

  /**
   * Pause the timer
   */
  function pause(event) {
    // Bail if the pause button wasn't clicked
    if (event.target.textContent !== "Pause") return;

    // Get an immutable copy of the data object
    var dataCopy = getData();

    // Update immutable copy
    dataCopy.paused = true;

    // Update data and render new UI
    setData(dataCopy);

    // Clear the countdown interval
    window.clearInterval(countdown);
  }

  /**
   * Reset the timer
   */
  function reset(event) {
    // Bail if the reset button wasn't clicked
    if (event.target.textContent !== "Reset") return;

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
