;(function() {

  "use strict";

  //
  // Variables
  //

  var interval;
  var data = 60;

  var app = document.querySelector("#app");
  var restart = document.querySelector("#restart");


  //
  // Functions
  //

  function template() {
    // Reduce the second count while the timer is running
    if (data > 0) return --data;

    // Enable the restart button and stop the timer
    restart.disabled = false;
    clearInterval(interval);

    // Return zero since the timer has stopped
    return 0;
  }

  function render() {
    app.textContent = template();
  }

  function start() {
    // Reset the second count
    data = 60;

    // Set the initial state of the DOM
    restart.disabled = true;
    app.textContent = data;

    // Start the countdown
    interval = setInterval(render, 1000);
  }


  //
  // Init
  //

  start();

  document.body.addEventListener("click", function(event) {
    if (event.target.id === "restart") start();
  });

})();
