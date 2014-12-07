// Generated by CoffeeScript 1.8.0
$(function() {
  return FastClick.attach(document.body);
});

$(function() {
  var blockSize, dice, diceSize, grid;
  setTimeout((function() {
    return startGameMessage();
  }), 200);
  blockSize = new Size(4, 4, UNIT_BLOCK);
  grid = new Grid(blockSize);
  $("body").keyup(function(e) {
    switch (e.keyCode) {
      case 68:
        return Game.prototype.dice.moveRight();
      case 83:
        return Game.prototype.dice.moveDown();
      case 65:
        return Game.prototype.dice.moveLeft();
      case 87:
        return Game.prototype.dice.moveUp();
    }
  });
  diceSize = new Size("25", "25", UNIT_PIXEL);
  dice = new Dice(diceSize);
  $("#gameOptions .number-players button").click(function() {
    ELEMENT_GAME_OPTIONS_NUM_PLAYERS.find("." + CLASS_ACTIVE).removeClass(CLASS_ACTIVE);
    return $(this).addClass(CLASS_ACTIVE);
  });
  $("#gameOptions .board-size button").click(function() {
    ELEMENT_GAME_OPTIONS_BOARD_SIZE.find("." + CLASS_ACTIVE).removeClass(CLASS_ACTIVE);
    return $(this).addClass(CLASS_ACTIVE);
  });
  return $(".start-game").click(function() {
    var boardSize, numberPlayers, sizeX, sizeY, winningConditions;
    boardSize = $(".board-size .active").val();
    numberPlayers = $(".number-players .active").val();
    $("#gameOptions").modal("hide");
    if (Game.prototype.isActiveGame === true) {
      Game.prototype.resetGame();
    }
    Game.prototype.isActiveGame = true;
    Game.prototype.boardSize = boardSize;
    if (boardSize === BOARD_SIZE_MEDIUM) {
      blockSize = new Size(4, 4, UNIT_BLOCK);
    } else if (boardSize === BOARD_SIZE_SMALL) {
      blockSize = new Size(3, 3, UNIT_BLOCK);
    } else if (boardSize === BOARD_SIZE_LARGE) {
      blockSize = new Size(5, 5, UNIT_BLOCK);
    } else {
      sizeX = randomNum(6, 3);
      sizeY = randomNum(6, 3);
      blockSize = new Size(sizeX, sizeY, UNIT_BLOCK);
    }
    Game.prototype.boardSize = blockSize;
    Grid.prototype.createGridStarter(blockSize);
    winningConditions = new WinningConditions();
    winningConditions.addCondition();
    Game.prototype.setWinningConditions(winningConditions);
    diceSize = new Size("25", "25", UNIT_PIXEL);
    dice = new Dice(diceSize);
    Game.prototype.dice = dice;
    console.log(Game.prototype);
    return console.log(Grid.prototype);
  });
});
