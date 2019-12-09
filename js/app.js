;(function() {

  "use strict";

  //
  // Variables
  //

  var interval;

  var data = 10;

  var app = document.querySelector("#app");


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
      clearInterval(interval);
      start();
    }
  }

  function start() {
    data = 10;
    app.textContent = data;
    interval = setInterval(render, 1000);
  }


  //
  // Init
  //

  start();

})();
