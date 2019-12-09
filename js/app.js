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
    if (data > 0) return --data;

    restart.disabled = false;
    clearInterval(interval);

    return 0;
  }

  function render() {
    app.textContent = template();
  }

  function start() {
    data = 60;
    restart.disabled = true;
    app.textContent = data;
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
