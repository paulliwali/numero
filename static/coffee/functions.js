// Generated by CoffeeScript 1.8.0
var addConditionInViewableBox, randomNum, randomise, showError, showGameWin, showMessage, sleep, startGameMessage;

randomNum = function(max, min) {
  if (min == null) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

randomise = function() {
  var randomNumAlt;
  randomNum = this._randomNum(10);
  return randomNumAlt = this._randomNum(10, 5);
};

sleep = function(ms) {
  var start, _results;
  start = new Date().getTime();
  _results = [];
  while (new Date().getTime() - start < ms) {
    continue;
  }
  return _results;
};

showGameWin = function() {
  return swal({
    title: "You've Won!",
    text: "Do you want to play again?",
    type: "success",
    showCancelButton: true,
    confirmButtonColor: "#5CB85C",
    confirmButtonText: "Play Again!",
    cancelButtonText: "No More QQ",
    closeOnConfirm: true,
    closeOnCancel: false
  }, function(isConfirm) {
    if (isConfirm) {
      Game.prototype.newGame();
      return Game.prototype.addNewPlayers("Pua", "Brian");
    } else {
      swal({
        title: "You mean you want to play again?!",
        text: "Let's play!",
        timer: 2000
      });
      Game.prototype.newGame();
      return Game.prototype.addNewPlayers(window.player1.name);
    }
  });
};

showMessage = function(message) {
  return swal({
    title: "Yes!",
    text: message,
    type: "success"
  });
};

showError = function(error) {
  return swal({
    title: "Oops!",
    text: error,
    type: "failure"
  });
};

$.fn.goto = function() {
  $("html, body").animate({
    scrollTop: $(this).offset().top + "px"
  }, "slow");
  this;
};

startGameMessage = function() {
  return swal({
    title: "Numero!",
    text: "Do you wanna play?",
    type: "info",
    showCancelButton: true,
    confirmButtonColor: "#5CB85C",
    confirmButtonText: "Let's Play!",
    cancelButtonText: "I don't want to play QQ",
    closeOnConfirm: true,
    closeOnCancel: false
  }, function(isConfirm) {
    if (isConfirm) {
      $("#game").goto();
      return $("#gameOptions").modal("show");
    }
  });
};

addConditionInViewableBox = function(condition) {
  return ELEMENT_CONDITIONS_CONTAINER.append(condition);
};
