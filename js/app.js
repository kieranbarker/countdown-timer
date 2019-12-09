;(function() {

  "use strict";

  //
  // Variables
  //

  var interval;
  var data = 10;

  var app = document.querySelector("#app");
  var restart = document.querySelector("#restart");


  //
  // Functions
  //

  function template() {
    if (data > 0) {
      return --data;
    }
  }

  function render() {
    if (data > 0) {
      app.textContent = template();
    } else {
      restart.disabled = false;
      clearInterval(interval);
    }
  }

  function start() {
    data = 10;
    restart.disabled = true;
    app.textContent = data;
    interval = setInterval(render, 1000);
  }


  //
  // Init
  //

  start();

  document.body.addEventListener("click", function(event) {
    if (event.target.id === "restart") {
      start();
    }
  });

})();
