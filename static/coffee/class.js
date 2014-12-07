// Generated by CoffeeScript 1.8.0
var Block, Condition, Dice, Game, Grid, Orientation, Player, Size, WinningConditions,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Game = (function() {
  function Game() {
    this.addNewPlayers = __bind(this.addNewPlayers, this);
    this.addPlayer = __bind(this.addPlayer, this);
    this.getWinningConditions = __bind(this.getWinningConditions, this);
    this.setWinningConditions = __bind(this.setWinningConditions, this);
    this.newGame = __bind(this.newGame, this);
  }

  Game.prototype.players = [];

  Game.prototype.grid = null;

  Game.prototype.winningConditions = null;

  Game.prototype.isActiveGame = false;

  Game.prototype.numberOfPlayers = 0;

  Game.prototype.newGame = function() {
    var blockSize, sizeX, sizeY, winningConditions;
    if (Game.prototype.isActiveGame === true) {
      $("body").unbind("keyup");
      Game.prototype.resetGame();
    }
    Game.prototype.isActiveGame = true;
    if (Game.prototype.boardSize === BOARD_SIZE_MEDIUM) {
      blockSize = new Size(4, 4, UNIT_BLOCK);
    } else if (Game.prototype.boardSize === BOARD_SIZE_SMALL) {
      blockSize = new Size(3, 3, UNIT_BLOCK);
    } else if (Game.prototype.boardSize === BOARD_SIZE_LARGE) {
      blockSize = new Size(5, 5, UNIT_BLOCK);
    } else {
      sizeX = randomNum(6, 3);
      sizeY = randomNum(6, 3);
      blockSize = new Size(sizeX, sizeY, UNIT_BLOCK);
    }
    Game.prototype.blockSize = blockSize;
    if (Game.prototype.players === null) {
      Game.prototype.players = [];
    }
    Grid.prototype.createGridStarter(Game.prototype.blockSize);
    winningConditions = new WinningConditions();
    winningConditions.addCondition();
    return Game.prototype.setWinningConditions(winningConditions);
  };

  Game.prototype.setWinningConditions = function(win) {
    return Game.prototype.winningConditions = win;
  };

  Game.prototype.getWinningConditions = function() {
    return Game.prototype.winningConditions;
  };

  Game.prototype.addPlayer = function(player) {
    return Game.prototype.players.push(player);
  };

  Game.prototype.addNewPlayers = function(name1, name2) {
    var dice, dice2;
    if (name2 == null) {
      name2 = "";
    }
    if (window.player1 == null) {
      window.player1 = new Player(name1);
    }
    dice = new Dice();
    player1.setDice(dice);
    if (__indexOf.call(Game.prototype.players, player1) < 0) {
      Game.prototype.addPlayer(player1);
    }
    if (Game.prototype.numberOfPlayers === 2) {
      if (window.player2 == null) {
        window.player2 = new Player(name2);
      }
      dice2 = new Dice();
      player2.setDice(dice2);
      if (__indexOf.call(Game.prototype.players, player2) < 0) {
        Game.prototype.addPlayer(player2);
      }
      $(".player-two").show();
    }
    return $("body").on("keyup", function(e) {
      player1.bindControls(e);
      if (Game.prototype.numberOfPlayers === 2) {
        return player2.bindControls(e);
      }
    });
  };

  Game.prototype.resetGame = function() {
    console.log("RESETTING GAME");
    if (Game.prototype.grid !== null) {
      Game.prototype.grid.reset();
    }
    if (Game.prototype.winningConditions !== null) {
      Game.prototype.winningConditions.reset();
    }
    if (Game.prototype.blockSize !== null) {
      Game.prototype.blockSize.reset();
    }
    Game.prototype.boardSize = null;
    Game.prototype.isActiveGame = false;
    Game.prototype.boardSize = null;
    Game.prototype.winningConditions = null;
    return Game.prototype.grid = null;
  };

  return Game;

})();

WinningConditions = (function() {
  WinningConditions.conditions = null;

  function WinningConditions() {
    this.reset = __bind(this.reset, this);
    this.checkConditionsSetup = __bind(this.checkConditionsSetup, this);
    this.checkConditions = __bind(this.checkConditions, this);
    this.addCondition = __bind(this.addCondition, this);
    this.conditions = [];
  }

  WinningConditions.prototype.addCondition = function() {
    var condition;
    condition = new Condition();
    this.conditions.push(condition);
    return condition;
  };

  WinningConditions.prototype.checkConditions = function(number, x, y) {
    var condition, player, _i, _j, _len, _len1, _ref, _ref1;
    _ref = this.conditions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      condition = _ref[_i];
      if (!condition.checkIfSatisfied(number, x, y)) {
        return false;
      }
    }
    showGameWin();
    _ref1 = Game.prototype.players;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      player = _ref1[_j];
      player.unbindControls();
    }
    return true;
  };

  WinningConditions.prototype.checkConditionsSetup = function(number, x, y) {
    var condition, _i, _len, _ref;
    _ref = this.conditions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      condition = _ref[_i];
      if (!condition.checkIfSatisfied(number, x, y)) {
        return false;
      }
    }
    return true;
  };

  WinningConditions.prototype.reset = function() {
    var condition, _i, _len, _ref;
    _ref = this.conditions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      condition = _ref[_i];
      condition.reset();
    }
    return this.conditions = null;
  };

  return WinningConditions;

})();

Condition = (function() {
  Condition.number = null;

  Condition.blockPositionY = null;

  Condition.blockPositionX = null;

  Condition.isMet = false;

  Condition.htmlElement = null;

  function Condition() {
    this.reset = __bind(this.reset, this);
    this.getHTMLElement = __bind(this.getHTMLElement, this);
    this.assignHTMLElement = __bind(this.assignHTMLElement, this);
    this.createHTMLElement = __bind(this.createHTMLElement, this);
    this.checkIfSatisfied = __bind(this.checkIfSatisfied, this);
    this.number = randomNum(6, 1);
    this.blockPositionX = randomNum(Grid.prototype.getGridWidth(), 0);
    this.blockPositionY = randomNum(Grid.prototype.getGridHeight(), 0);
    console.log("A condition has been made for " + this.number + " at [" + this.blockPositionX + "," + this.blockPositionY + "] ");
    Grid.prototype.getBlockElement(this.blockPositionX, this.blockPositionY).getHTMLElement().addClass(CLASS_BLOCK_WINNING_CONDITION);
    this.createHTMLElement();
    addConditionInViewableBox(this.htmlElement);
  }

  Condition.prototype.checkIfSatisfied = function(number, x, y) {
    if (number === this.number && this.blockPositionX === x && this.blockPositionY === y) {
      this.isMet = true;
      return true;
    } else {
      return false;
    }
  };

  Condition.prototype.createHTMLElement = function() {
    var div, number, xPos, yPos;
    div = $("<div>");
    xPos = $("<div class='col-xs-4'>").text("Grid X: " + this.blockPositionX);
    yPos = $("<div class='col-xs-4'>").text("Grid Y: " + this.blockPositionY);
    number = $("<div class='col-xs-4'>").text("Face Up Number: " + this.number);
    div.append(xPos).append(yPos).append(number);
    this.htmlElement = div;
    return div;
  };

  Condition.prototype.assignHTMLElement = function(element) {
    return this.htmlElement = element;
  };

  Condition.prototype.getHTMLElement = function() {
    return this.htmlElement;
  };

  Condition.prototype.reset = function() {
    this.htmlElement.remove();
    this.number = null;
    this.blockPositionY = null;
    this.blockPositionX = null;
    this.isMet = false;
    return this.htmlElement = null;
  };

  return Condition;

})();

Player = (function() {
  var playerNumber;

  Player.score = null;

  Player.name = null;

  Player.dice = null;

  playerNumber = 0;

  Player.id = 0;

  Player.htmlElement = null;

  function Player(name) {
    this.name = name;
    this.unbindControls = __bind(this.unbindControls, this);
    this.bindControls = __bind(this.bindControls, this);
    this.reset = __bind(this.reset, this);
    this.getDice = __bind(this.getDice, this);
    this.getID = __bind(this.getID, this);
    this.setDice = __bind(this.setDice, this);
    this.getName = __bind(this.getName, this);
    this.getHTMLElement = __bind(this.getHTMLElement, this);
    this.assignHTMLElement = __bind(this.assignHTMLElement, this);
    this.addPoint = __bind(this.addPoint, this);
    this.getScore = __bind(this.getScore, this);
    this.score = 0;
    if (this.name === null || this.name === "") {
      console.log("MISSING PLAYER NAME");
      return;
    }
    this.id = ++playerNumber;
    this.assignHTMLElement($(".player-score:nth-child(" + this.id + ")"));
    this.htmlElement.find(".player-name").text(this.name);
    console.log("New Player created: " + this.name + " ID: " + this.id);
  }

  Player.prototype.getScore = function() {
    return this.score;
  };

  Player.prototype.addPoint = function() {
    this.score++;
    return this.htmlElement.find("." + CLASS_PLAYER_SCORE).text("" + this.score);
  };

  Player.prototype.assignHTMLElement = function(element) {
    return this.htmlElement = element;
  };

  Player.prototype.getHTMLElement = function() {
    return this.htmlElement;
  };

  Player.prototype.getName = function() {
    return this.name;
  };

  Player.prototype.setDice = function(dice) {
    return this.dice = dice;
  };

  Player.prototype.getID = function() {
    return this.id;
  };

  Player.prototype.getDice = function() {
    return this.dice;
  };

  Player.prototype.reset = function() {
    this.dice.reset();
    return this.dice = null;
  };

  Player.prototype.bindControls = function(e) {
    if (this.id === 1) {
      switch (e.keyCode) {
        case 68:
          this.dice.setAnimationLock();
          this.dice.moveRight();
          return this.dice.setAnimationUnlock();
        case 83:
          this.dice.setAnimationLock();
          this.dice.moveDown();
          return this.dice.setAnimationUnlock();
        case 65:
          this.dice.setAnimationLock();
          this.dice.moveLeft();
          return this.dice.setAnimationUnlock();
        case 87:
          this.dice.setAnimationLock();
          this.dice.moveUp();
          return this.dice.setAnimationUnlock();
      }
    } else if (this.id === 2) {
      switch (e.keyCode) {
        case 39:
          this.dice.setAnimationLock();
          this.dice.moveRight();
          return this.dice.setAnimationUnlock();
        case 40:
          this.dice.setAnimationLock();
          this.dice.moveDown();
          return this.dice.setAnimationUnlock();
        case 37:
          this.dice.setAnimationLock();
          this.dice.moveLeft();
          return this.dice.setAnimationUnlock();
        case 38:
          this.dice.setAnimationLock();
          this.dice.moveUp();
          return this.dice.setAnimationUnlock();
      }
    }
  };

  Player.prototype.unbindControls = function() {
    return $("body").unbind("keyup");
  };

  return Player;

})();

Grid = (function() {
  var blockArray, size;

  function Grid() {
    this.isObstacle = __bind(this.isObstacle, this);
    this.unsetLocked = __bind(this.unsetLocked, this);
    this.setLocked = __bind(this.setLocked, this);
    this.isLocked = __bind(this.isLocked, this);
    this.getBlockElement = __bind(this.getBlockElement, this);
    this.getGrid = __bind(this.getGrid, this);
    this.createGrid = __bind(this.createGrid, this);
    this.reset = __bind(this.reset, this);
  }

  size = null;

  blockArray = null;

  Grid.prototype.createGridStarter = function(size) {
    if (size === null) {
      console.log("CANNOT CREATE GRID. MISSING SIZE OBJECT.");
      return;
    }
    Grid.prototype.size = size;
    Grid.prototype.blockArray = [[]];
    console.log("New Grid created: (" + Grid.prototype.size.height + "," + Grid.prototype.size.width + ")");
    this.createGrid();
    return Game.prototype.grid = this;
  };

  Grid.prototype.reset = function() {
    var block, blockRow, _i, _j, _len, _len1, _ref;
    Grid.prototype.size.reset();
    Grid.prototype.size = null;
    _ref = Grid.prototype.blockArray;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      blockRow = _ref[_i];
      for (_j = 0, _len1 = blockRow.length; _j < _len1; _j++) {
        block = blockRow[_j];
        block.reset();
        block = null;
      }
      blockRow = null;
    }
    return Grid.prototype.blockArray = null;
  };

  Grid.prototype.createGrid = function() {
    var block, blockElement, grid, heightBlock, row, widthBlock, _i, _j, _ref, _ref1, _results;
    if (Grid.prototype.size.unit === UNIT_PIXEL) {
      grid = $("<div>");
      grid.width(Grid.prototype.size.getWidthWithUnit());
      grid.height(Grid.prototype.size.getWidthWithUnit());
      return ELEMENT_BOARD_CONTAINER.append(grid);
    } else if (Grid.prototype.size.unit === UNIT_BLOCK) {
      console.log("Creating A " + Grid.prototype.size.width + " by " + Grid.prototype.size.height + " grid of Blocks.");
      _results = [];
      for (heightBlock = _i = 0, _ref = Grid.prototype.size.height; 0 <= _ref ? _i < _ref : _i > _ref; heightBlock = 0 <= _ref ? ++_i : --_i) {
        row = $("<div class='block-row'>");
        Grid.prototype.blockArray[heightBlock] = [];
        for (widthBlock = _j = 0, _ref1 = Grid.prototype.size.width; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; widthBlock = 0 <= _ref1 ? ++_j : --_j) {
          block = new Block(new Size(BLOCK_DEFAULT_WIDTH_PIXEL, BLOCK_DEFAULT_HEIGHT_PIXEL, UNIT_PIXEL));
          blockElement = block.createBlock();
          blockElement.text("[" + widthBlock + "," + heightBlock + "]");
          if (heightBlock === 0) {
            blockElement.addClass(CLASS_GRID_BORDER_TOP);
          }
          if (heightBlock === Grid.prototype.size.height - 1) {
            blockElement.addClass(CLASS_GRID_BORDER_BOTTOM);
          }
          if (widthBlock === 0) {
            blockElement.addClass(CLASS_GRID_BORDER_LEFT);
          }
          if (widthBlock === Grid.prototype.size.width - 1) {
            blockElement.addClass(CLASS_GRID_BORDER_RIGHT);
          }
          row.append(blockElement);
          Grid.prototype.blockArray[heightBlock][widthBlock] = block;
        }
        _results.push(ELEMENT_BOARD_CONTAINER.append(row));
      }
      return _results;
    }
  };

  Grid.prototype.getGrid = function() {
    return Grid.prototype.blockArray;
  };

  Grid.prototype.getBlockElement = function(y, x) {
    return Grid.prototype.blockArray[x][y];
  };

  Grid.prototype.getGridHeight = function() {
    return Grid.prototype.size.height;
  };

  Grid.prototype.getGridWidth = function() {
    return Grid.prototype.size.width;
  };

  Grid.prototype.isLocked = function(y, x) {
    return Grid.prototype.blockArray[x][y].locked;
  };

  Grid.prototype.setLocked = function(y, x) {
    Grid.prototype.blockArray[x][y].locked = true;
    return console.log("LOCKING " + y + " " + x);
  };

  Grid.prototype.unsetLocked = function(y, x) {
    Grid.prototype.blockArray[x][y].locked = false;
    return console.log("UNLOCKING " + x + " " + y);
  };

  Grid.prototype.isObstacle = function() {
    return Grid.prototype.blockArray[x][y].isObstacle;
  };

  return Grid;

})();

Block = (function() {
  Block.size = null;

  Block.htmlElement = null;

  Block.locked = null;

  Block.isObstacle = null;

  function Block(size) {
    this.size = size;
    this.reset = __bind(this.reset, this);
    this.createBlock = __bind(this.createBlock, this);
    this.getHTMLElement = __bind(this.getHTMLElement, this);
    this.assignHTMLElement = __bind(this.assignHTMLElement, this);
  }

  Block.prototype.assignHTMLElement = function(block) {
    return this.htmlElement = block;
  };

  Block.prototype.getHTMLElement = function() {
    return this.htmlElement;
  };

  Block.prototype.createBlock = function() {
    var block;
    if (this.size.unit === UNIT_PIXEL) {
      block = $("<div class='block'>");
      block.width(this.size.getWidthWithUnit());
      block.height(this.size.getWidthWithUnit());
      this.assignHTMLElement(block);
      this.locked = false;
      this.isObstacle = false;
      return block;
    }
  };

  Block.prototype.reset = function() {
    this.size.reset();
    this.size = null;
    this.htmlElement.remove();
    return this.htmlElement = null;
  };

  return Block;

})();

Size = (function() {
  Size.height = null;

  Size.width = null;

  Size.unit = null;

  function Size(height, width, unit) {
    this.height = height;
    this.width = width;
    this.unit = unit;
    this.reset = __bind(this.reset, this);
    this.getHeightWithUnit = __bind(this.getHeightWithUnit, this);
    this.getWidthWithUnit = __bind(this.getWidthWithUnit, this);
    if ((this.height == null) || (this.width == null)) {
      if (this.height == null) {
        console.log("MISSING HEIGHT OBJECT");
      }
      if (this.width == null) {
        console.log("MISSING WIDTH OBJECT");
      }
      return;
    }
  }

  Size.prototype.getWidthWithUnit = function() {
    return this.width + this.unit;
  };

  Size.prototype.getHeightWithUnit = function() {
    return this.height + this.unit;
  };

  Size.prototype.reset = function() {
    this.height = null;
    this.width = null;
    return this.unit = null;
  };

  return Size;

})();

Dice = (function(_super) {
  var getDown, getLeft, getRight, getUp;

  __extends(Dice, _super);

  Dice.bottomPosition = null;

  Dice.gridIndex_X = null;

  Dice.gridIndex_Y = null;

  Dice.orientation = null;

  Dice.htmlElement = null;

  Dice.animationLock = null;

  function Dice() {
    this.getAnimationLock = __bind(this.getAnimationLock, this);
    this.setAnimationUnlock = __bind(this.setAnimationUnlock, this);
    this.setAnimationLock = __bind(this.setAnimationLock, this);
    this.getToLeftAnimation = __bind(this.getToLeftAnimation, this);
    this.rotateAnimation = __bind(this.rotateAnimation, this);
    this.animateDice = __bind(this.animateDice, this);
    this.moveRight = __bind(this.moveRight, this);
    this.moveLeft = __bind(this.moveLeft, this);
    this.moveDown = __bind(this.moveDown, this);
    this.moveUp = __bind(this.moveUp, this);
    this.getFaceUp = __bind(this.getFaceUp, this);
    this.getSize = __bind(this.getSize, this);
    this.getHTMLElement = __bind(this.getHTMLElement, this);
    this.assignHTMLElement = __bind(this.assignHTMLElement, this);
    this.createBlock = __bind(this.createBlock, this);
    this.getPlayer = __bind(this.getPlayer, this);
    this.isGameWonSetup = __bind(this.isGameWonSetup, this);
    this.isGameWon = __bind(this.isGameWon, this);
    this.reset = __bind(this.reset, this);
    this.moveToGrid = __bind(this.moveToGrid, this);
    this.createDice = __bind(this.createDice, this);
    this.size = new Size("25", "25", UNIT_PIXEL);
    this.animationLock = false;
    this.gridIndex_X = randomNum(Grid.prototype.getGridWidth(), 0);
    this.gridIndex_Y = randomNum(Grid.prototype.getGridHeight(), 0);
    this.orientation = new Orientation;
    this.createDice();
    console.log("New Dice created");
  }

  Dice.prototype.createDice = function() {
    var alreadyWon;
    if (this.isGameWonSetup()) {
      alreadyWon = true;
    }
    this.assignHTMLElement(this.createBlock());
    if (alreadyWon) {
      this.reset();
      this.constructor();
    }
    Grid.prototype.setLocked(this.gridIndex_X, this.gridIndex_Y);
    this.moveToGrid();
    console.log(this.gridIndex_X, this.gridIndex_Y);
    return this.htmlElement;
  };

  Dice.prototype.moveToGrid = function() {
    var faceUp;
    faceUp = this.getFaceUp();
    this.htmlElement.text(faceUp);
    Grid.prototype.getBlockElement(this.gridIndex_X, this.gridIndex_Y).getHTMLElement().append(this.htmlElement);
    return this.isGameWon();
  };

  Dice.prototype.reset = function() {
    if (this.htmlElement !== null) {
      this.htmlElement.remove();
    }
    this.bottomPosition = null;
    this.gridIndex_X = null;
    this.gridIndex_Y = null;
    this.orientation = null;
    return this.htmlElement = null;
  };

  Dice.prototype.isGameWon = function() {
    var faceUp, winningConditions;
    faceUp = this.getFaceUp();
    console.log(faceUp);
    winningConditions = Game.prototype.getWinningConditions();
    if (winningConditions.checkConditions(faceUp, this.gridIndex_X, this.gridIndex_Y)) {
      return this.getPlayer().addPoint();
    }
  };

  Dice.prototype.isGameWonSetup = function() {
    var faceUp, winningConditions;
    faceUp = this.getFaceUp();
    console.log("Checking if already won. FACEUP: " + faceUp);
    winningConditions = Game.prototype.getWinningConditions();
    return winningConditions.checkConditionsSetup(faceUp, this.gridIndex_X, this.gridIndex_Y);
  };

  Dice.prototype.getPlayer = function() {
    var player, _i, _len, _ref;
    _ref = Game.prototype.players;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      player = _ref[_i];
      if (player.getDice() === this) {
        return player;
      }
    }
  };

  Dice.prototype.createBlock = function() {
    return Dice.__super__.createBlock.call(this);
  };

  Dice.prototype.assignHTMLElement = function(element) {
    return this.htmlElement = element;
  };

  Dice.prototype.getHTMLElement = function() {
    return this.htmlElement;
  };

  Dice.prototype.getSize = function() {
    return console.log(this.size);
  };

  Dice.prototype.getFaceUp = function() {
    return this.orientation.faceup;
  };

  getUp = function() {
    return Dice.orientation.up;
  };

  getDown = function() {
    return Dice.orientation.down;
  };

  getLeft = function() {
    return Dice.orientation.left;
  };

  getRight = function() {
    return Dice.orientation.right;
  };

  Dice.prototype.moveUp = function() {
    var CurrentX, CurrentY, NextX, NextY, oldFaceUp;
    if (this.gridIndex_Y - 1 < 0) {
      console.log("Dice moving out of bounds");
    } else if (Grid.prototype.isLocked(this.gridIndex_X, this.gridIndex_Y - 1)) {
      console.log("Space blocked");
    } else if (this.getAnimationLock()) {
      return console.log("Animation lock in place");
    } else {
      CurrentY = this.gridIndex_Y;
      CurrentX = this.gridIndex_X;
      NextY = this.gridIndex_Y - 1;
      NextX = this.gridIndex_X;
      Grid.prototype.setLocked(NextX, NextY);
      Grid.prototype.unsetLocked(CurrentX, CurrentY);
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.down;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.up = oldFaceUp;
      this.orientation.down = 7 - this.orientation.up;
      this.gridIndex_Y = this.gridIndex_Y - 1;
      this.animateDice(oldFaceUp, this.orientation.faceup, "UP");
      console.log("Dice moved up");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.orientation.faceup);
      console.log("BOTTOM: " + this.orientation.bottom);
      console.log("LEFT: " + this.orientation.left);
      console.log("RIGHT: " + this.orientation.right);
      console.log("UP: " + this.orientation.up);
      console.log("DOWN: " + this.orientation.down);
      console.log(this.gridIndex_X, this.gridIndex_Y);
      return this.moveToGrid();
    }
  };

  Dice.prototype.moveDown = function() {
    var CurrentX, CurrentY, NextX, NextY, oldFaceUp;
    if (this.gridIndex_Y + 1 >= Grid.prototype.getGridHeight()) {
      console.log("Dice moving out of bounds");
    } else if (Grid.prototype.isLocked(this.gridIndex_X, this.gridIndex_Y + 1)) {
      console.log("Space blocked");
    } else if (this.getAnimationLock()) {
      return console.log("Animation lock in place");
    } else {
      CurrentY = this.gridIndex_Y;
      CurrentX = this.gridIndex_X;
      NextY = this.gridIndex_Y + 1;
      NextX = this.gridIndex_X;
      Grid.prototype.setLocked(NextX, NextY);
      Grid.prototype.unsetLocked(CurrentX, CurrentY);
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.up;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.down = oldFaceUp;
      this.orientation.up = 7 - this.orientation.down;
      this.gridIndex_Y = this.gridIndex_Y + 1;
      this.animateDice(oldFaceUp, this.orientation.faceup, "DOWN");
      console.log("Dice moved down");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.orientation.faceup);
      console.log("BOTTOM: " + this.orientation.bottom);
      console.log("LEFT: " + this.orientation.left);
      console.log("RIGHT: " + this.orientation.right);
      console.log("UP: " + this.orientation.up);
      console.log("DOWN: " + this.orientation.down);
      console.log(this.gridIndex_X, this.gridIndex_Y);
      return this.moveToGrid();
    }
  };

  Dice.prototype.moveLeft = function() {
    var CurrentX, CurrentY, NextX, NextY, oldFaceUp;
    if (this.gridIndex_X - 1 < 0) {
      console.log("Dice moving out of bounds");
    } else if (Grid.prototype.isLocked(this.gridIndex_X - 1, this.gridIndex_Y)) {
      console.log("Space blocked");
    } else {
      CurrentY = this.gridIndex_Y;
      CurrentX = this.gridIndex_X;
      NextY = this.gridIndex_Y;
      NextX = this.gridIndex_X - 1;
      Grid.prototype.setLocked(NextX, NextY);
      Grid.prototype.unsetLocked(CurrentX, CurrentY);
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.right;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.left = oldFaceUp;
      this.orientation.right = 7 - oldFaceUp;
      this.gridIndex_X = this.gridIndex_X - 1;
      this.animateDice(oldFaceUp, this.orientation.faceup, "LEFT");
      console.log("Dice moved left");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.orientation.faceup);
      console.log("BOTTOM: " + this.orientation.bottom);
      console.log("LEFT: " + this.orientation.left);
      console.log("RIGHT: " + this.orientation.right);
      console.log("UP: " + this.orientation.up);
      console.log("DOWN: " + this.orientation.down);
      console.log(this.gridIndex_X, this.gridIndex_Y);
      return this.moveToGrid();
    }
  };

  Dice.prototype.moveRight = function() {
    var CurrentX, CurrentY, NextX, NextY, oldFaceUp;
    if (this.gridIndex_X + 1 >= Grid.prototype.getGridWidth()) {
      console.log("Dice moving out of bounds");
    } else if (Grid.prototype.isLocked(this.gridIndex_X + 1, this.gridIndex_Y)) {
      console.log("Space blocked");
    } else {
      CurrentY = this.gridIndex_Y;
      CurrentX = this.gridIndex_X;
      NextY = this.gridIndex_Y;
      NextX = this.gridIndex_X + 1;
      Grid.prototype.setLocked(NextX, NextY);
      Grid.prototype.unsetLocked(CurrentX, CurrentY);
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.left;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.right = oldFaceUp;
      this.orientation.left = 7 - oldFaceUp;
      this.gridIndex_X = this.gridIndex_X + 1;
      this.animateDice(oldFaceUp, this.orientation.faceup, "RIGHT");
      console.log("Dice moved right");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.orientation.faceup);
      console.log("BOTTOM: " + this.orientation.bottom);
      console.log("LEFT: " + this.orientation.left);
      console.log("RIGHT: " + this.orientation.right);
      console.log("UP: " + this.orientation.up);
      console.log("DOWN: " + this.orientation.down);
      console.log(this.gridIndex_X, this.gridIndex_Y);
      return this.moveToGrid();
    }
  };

  Dice.prototype.animateDice = function(currentFaceup, nextFaceup, direction) {
    var animation, finalAnimation;
    animation = getToLeftAnimation(currentFaceup, nextFaceup);
    return finalAnimation = rotateAnimation(animation, direction);
  };

  Dice.prototype.rotateAnimation = function(animation, direction) {
    switch (direction) {
      case up:
        return console.log("Rotate 90 degrees clockwise");
      case down:
        return console.log("Rotate 270 degrees clockwise");
      case left:
        return console.log("Rotate 0 degrees clockwise");
      case right:
        return console.log("Rotate 180 degrees");
    }
  };

  Dice.prototype.getToLeftAnimation = function(currentFaceup, nextFaceup) {
    switch (currentFaceup) {
      case 1:
        switch (nextFaceup) {
          case 2:
            return console.log("Returning animation going to the left");
          case 3:
            return console.log("Returning animation going to the left");
          case 4:
            return console.log("Returning animation going to the left");
          case 5:
            return console.log("Returning animation going to the left");
        }
        break;
      case 2:
        switch (nextFaceup) {
          case 1:
            return console.log("Returning animation going to the left");
          case 3:
            return console.log("Returning animation going to the left");
          case 4:
            return console.log("Returning animation going to the left");
          case 6:
            return console.log("Returning animation going to the left");
        }
        break;
      case 3:
        switch (nextFaceup) {
          case 1:
            return console.log("Returning animation going to the left");
          case 2:
            return console.log("Returning animation going to the left");
          case 5:
            return console.log("Returning animation going to the left");
          case 6:
            return console.log("Returning animation going to the left");
        }
        break;
      case 4:
        switch (nextFaceup) {
          case 1:
            return console.log("Returning animation going to the left");
          case 2:
            return console.log("Returning animation going to the left");
          case 5:
            return console.log("Returning animation going to the left");
          case 6:
            return console.log("Returning animation going to the left");
        }
        break;
      case 5:
        switch (nextFaceup) {
          case 1:
            return console.log("Returning animation going to the left");
          case 3:
            return console.log("Returning animation going to the left");
          case 4:
            return console.log("Returning animation going to the left");
          case 6:
            return console.log("Returning animation going to the left");
        }
        break;
      case 6:
        switch (nextFaceup) {
          case 2:
            return console.log("Returning animation going to the left");
          case 3:
            return console.log("Returning animation going to the left");
          case 4:
            return console.log("Returning animation going to the left");
          case 5:
            return console.log("Returning animation going to the left");
        }
    }
  };

  Dice.prototype.setAnimationLock = function() {
    return this.animationLock = true;
  };

  Dice.prototype.setAnimationUnlock = function() {
    return this.animationLock = false;
  };

  Dice.prototype.getAnimationLock = function() {
    return this.animationLock;
  };

  return Dice;

})(Block);

Orientation = (function() {
  Orientation.faceup = null;

  Orientation.bottom = null;

  Orientation.down = null;

  Orientation.up = null;

  Orientation.left = null;

  Orientation.right = null;

  function Orientation(faceup, bottom, down, up, left, right) {
    this.faceup = faceup;
    this.bottom = bottom;
    this.down = down;
    this.up = up;
    this.left = left;
    this.right = right;
    this.reset = __bind(this.reset, this);
    if (this.faceup === null || this.bottom === null || this.down === null || this.up === null || this.left === null || this.right === null) {
      if (this.faceup == null) {
        console.log("MISSING FACEUP");
      }
      if (this.bottom == null) {
        console.log("MISSING BOTTOM");
      }
      if (this.down == null) {
        console.log("MISSING DOWN");
      }
      if (this.up == null) {
        console.log("MISSING UP");
      }
      if (this.left == null) {
        console.log("MISSING LEFT");
      }
      if (this.right == null) {
        console.log("MISSING RIGHT");
      }
    }
    this.faceup = randomNum(6, 1);
    this.bottom = 7 - this.faceup;
    this.left = randomNum(6, 1);
    while (this.left === this.faceup || this.left === this.bottom) {
      this.left = randomNum(6, 1);
    }
    this.right = 7 - this.left;
    this.up = randomNum(6, 1);
    while (this.up === this.faceup || this.up === this.bottom || this.up === this.left || this.up === this.right) {
      this.up = randomNum(6, 1);
    }
    this.down = 7 - this.up;
    console.log("New Orientation Created");
    console.log("FACEUP: " + this.faceup);
    console.log("BOTTOM: " + this.bottom);
    console.log("LEFT: " + this.left);
    console.log("RIGHT: " + this.right);
    console.log("UP: " + this.up);
    console.log("DOWN: " + this.down);
  }

  Orientation.prototype.reset = function() {
    this.faceup = null;
    this.bottom = null;
    this.down = null;
    this.up = null;
    this.left = null;
    return this.right = null;
  };

  return Orientation;

})();
