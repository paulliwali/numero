// Generated by CoffeeScript 1.8.0
$(function() {
  return FastClick.attach(document.body);
});

$(function() {
  var blockSize, condition, dice, diceElement, diceSize, game, grid, winningConditions;
  game = new Game();
  winningConditions = new WinningConditions();
  condition = winningConditions.addCondition(5, 0, 2);
  game.setWinningConditions(condition);
  console.log(game);
  blockSize = new Size(5, 5, UNIT_BLOCK);
  grid = new Grid(blockSize);
  grid.createGrid();
  diceSize = new Size("25", "25", UNIT_PIXEL);
  dice = new Dice(diceSize);
  diceElement = dice.createDice();
  return $("body").keyup(function(e) {
    switch (e.keyCode) {
      case 68:
        return dice.moveRight();
      case 83:
        return dice.moveDown();
      case 65:
        return dice.moveLeft();
      case 87:
        return dice.moveUp();
    }
  });
});
