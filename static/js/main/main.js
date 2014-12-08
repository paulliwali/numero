// Generated by CoffeeScript 1.7.1
(function() {
  var BLOCK_DEFAULT_HEIGHT_PIXEL, BLOCK_DEFAULT_WIDTH_PIXEL, BOARD_SIZE_LARGE, BOARD_SIZE_MEDIUM, BOARD_SIZE_RANDOM, BOARD_SIZE_SMALL, Block, CLASS_ACTIVE, CLASS_BLOCK_WINNING_CONDITION, CLASS_GRID_BORDER, CLASS_GRID_BORDER_BOTTOM, CLASS_GRID_BORDER_LEFT, CLASS_GRID_BORDER_RIGHT, CLASS_GRID_BORDER_TOP, CLASS_PLAYER_SCORE, Condition, DICE_FACE_ALL, Dice, ELEMENT_BOARD_CONTAINER, ELEMENT_CONDITIONS_CONTAINER, ELEMENT_GAME_CONTAINER, ELEMENT_GAME_OPTIONS_BOARD_SIZE, ELEMENT_GAME_OPTIONS_CONTAINER, ELEMENT_GAME_OPTIONS_NUM_PLAYERS, Game, Grid, Orientation, Player, Size, UNIT_BLOCK, UNIT_PIXEL, URL_FOR_DICE, URL_FOR_DICE_1, URL_FOR_DICE_2, URL_FOR_DICE_3, URL_FOR_DICE_4, URL_FOR_DICE_5, URL_FOR_DICE_6, URL_FOR_SPRITES, WinningConditions, addConditionInViewableBox, randomNum, randomise, showError, showGameWin, showMessage, sleep, startGameMessage,
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
      var blockSize, player1, player2, sizeX, sizeY, winningConditions;
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
      Game.prototype.setWinningConditions(winningConditions);
      player1 = window.player1 != null ? window.player1.name : null;
      return player2 = window.player2 != null ? window.player2.name : null;
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
      dice.orientation.assignHTMLElement($(".player-one .layout-container"));
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
        dice2.getHTMLElement().css("background", URL_FOR_DICE + "-2" + ("/Dice-" + (dice2.getFaceUp()) + ".png)"));
        dice2.orientation.assignHTMLElement($(".player-two .layout-container"));
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
            return this.dice.moveRight();
          case 83:
            return this.dice.moveDown();
          case 65:
            return this.dice.moveLeft();
          case 87:
            return this.dice.moveUp();
        }
      } else if (this.id === 2) {
        switch (e.keyCode) {
          case 39:
            return this.dice.moveRight();
          case 40:
            return this.dice.moveDown();
          case 37:
            return this.dice.moveLeft();
          case 38:
            return this.dice.moveUp();
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

    Dice.animation = null;

    Dice.direction = null;

    function Dice() {
      this.getAnimationLock = __bind(this.getAnimationLock, this);
      this.setAnimationUnlock = __bind(this.setAnimationUnlock, this);
      this.setAnimationLock = __bind(this.setAnimationLock, this);
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
      this.bindAnimation = __bind(this.bindAnimation, this);
      this.createDice = __bind(this.createDice, this);
      this.size = new Size("25", "25", UNIT_PIXEL);
      this.animationLock = false;
      this.gridIndex_X = randomNum(Grid.prototype.getGridWidth(), 0);
      this.gridIndex_Y = randomNum(Grid.prototype.getGridHeight(), 0);
      this.orientation = new Orientation;
      this.createDice();
    }

    Dice.prototype.createDice = function() {
      var alreadyWon;
      if (this.isGameWonSetup()) {
        alreadyWon = true;
      }
      this.assignHTMLElement(this.createBlock());
      this.htmlElement.addClass("block-dice");
      if (alreadyWon) {
        this.reset();
        this.constructor();
      }
      Grid.prototype.setLocked(this.gridIndex_X, this.gridIndex_Y);
      this.moveToGrid();
      this.bindAnimation(this);
      this.orientation.updateDiceLayout();
      return this.htmlElement;
    };

    Dice.prototype.bindAnimation = function(Dice) {
      return this.getHTMLElement().on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e) {
        Dice.getHTMLElement().removeClass().addClass("block-dice block");
        Dice.moveToGrid();
        return Dice.setAnimationUnlock();
      });
    };

    Dice.prototype.moveToGrid = function() {
      var faceUp;
      faceUp = this.getFaceUp();
      if (this.getPlayer() != null) {
        this.htmlElement.css("background", URL_FOR_DICE + ("-" + (this.getPlayer().getID())) + ("/Dice-" + faceUp + ".png)"));
      } else {
        this.htmlElement.css("background", URL_FOR_DICE + "-1" + ("/Dice-" + faceUp + ".png)"));
      }
      this.orientation.updateDiceLayout();
      Grid.prototype.getBlockElement(this.gridIndex_X, this.gridIndex_Y).getHTMLElement().append(this.htmlElement);
      return this.isGameWon();
    };

    Dice.prototype.reset = function() {
      if (this.htmlElement !== null) {
        this.htmlElement.unbind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd");
        this.htmlElement.remove();
      }
      this.bottomPosition = null;
      this.gridIndex_X = null;
      this.gridIndex_Y = null;
      this.orientation = null;
      this.htmlElement = null;
      return this.animation = null;
    };

    Dice.prototype.isGameWon = function() {
      var faceUp, winningConditions;
      faceUp = this.getFaceUp();
      winningConditions = Game.prototype.getWinningConditions();
      if (winningConditions.checkConditions(faceUp, this.gridIndex_X, this.gridIndex_Y)) {
        return this.getPlayer().addPoint();
      }
    };

    Dice.prototype.isGameWonSetup = function() {
      var faceUp, winningConditions;
      faceUp = this.getFaceUp();
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
      if (this.getAnimationLock()) {
        console.log("Animation lock already held");
        return;
      }
      this.setAnimationLock();
      if (this.gridIndex_Y - 1 < 0) {
        console.log("Dice moving out of bounds");
        this.setAnimationUnlock();
      } else if (Grid.prototype.isLocked(this.gridIndex_X, this.gridIndex_Y - 1)) {
        console.log("Space blocked");
        this.setAnimationUnlock();
      } else {
        this.direction = "up";
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
        return this.animateDice(oldFaceUp, this.orientation.faceup, "up");
      }
    };

    Dice.prototype.moveDown = function() {
      var CurrentX, CurrentY, NextX, NextY, oldFaceUp;
      if (this.getAnimationLock()) {
        console.log("Animation lock already held");
        return;
      }
      this.setAnimationLock();
      if (this.gridIndex_Y + 1 >= Grid.prototype.getGridHeight()) {
        console.log("Dice moving out of bounds");
      } else if (Grid.prototype.isLocked(this.gridIndex_X, this.gridIndex_Y + 1)) {
        console.log("Space blocked");
        this.setAnimationUnlock();
      } else if (!this.getAnimationLock()) {
        console.log("Not holding animation lock");
        this.setAnimationUnlock();
      } else {
        this.direction = "down";
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
        return this.animateDice(oldFaceUp, this.orientation.faceup, "down");
      }
    };

    Dice.prototype.moveLeft = function() {
      var CurrentX, CurrentY, NextX, NextY, oldFaceUp;
      if (this.getAnimationLock()) {
        console.log("Animation lock already held");
        return;
      }
      this.setAnimationLock();
      if (this.gridIndex_X - 1 < 0) {
        console.log("Dice moving out of bounds");
        this.setAnimationUnlock();
      } else if (Grid.prototype.isLocked(this.gridIndex_X - 1, this.gridIndex_Y)) {
        console.log("Space blocked");
        this.setAnimationUnlock();
      } else {
        this.direction = "left";
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
        return this.animateDice(oldFaceUp, this.orientation.faceup, "left");
      }
    };

    Dice.prototype.moveRight = function() {
      var CurrentX, CurrentY, NextX, NextY, oldFaceUp;
      if (this.getAnimationLock()) {
        console.log("Animation lock already held");
        return;
      }
      this.setAnimationLock();
      if (this.gridIndex_X + 1 >= Grid.prototype.getGridWidth()) {
        console.log("Dice moving out of bounds");
        this.setAnimationUnlock();
      } else if (Grid.prototype.isLocked(this.gridIndex_X + 1, this.gridIndex_Y)) {
        console.log("Space blocked");
        this.setAnimationUnlock();
      } else {
        this.direction = "right";
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
        return this.animateDice(oldFaceUp, this.orientation.faceup, "right");
      }
    };

    Dice.prototype.animateDice = function(currentFaceup, nextFaceup, direction) {
      var finalAnimation;
      return finalAnimation = this.rotateAnimation(currentFaceup, nextFaceup, direction);
    };

    Dice.prototype.rotateAnimation = function(currentFaceup, nextFaceup, direction) {
      switch (direction) {
        case "up":
          this.htmlElement.addClass("rotate90");
          break;
        case "down":
          this.htmlElement.addClass("rotate270");
          break;
        case "left":
          this.htmlElement.addClass("rotate0");
          break;
        case "right":
          this.htmlElement.addClass("rotate180");
      }
      return this.htmlElement.addClass("rollDice" + currentFaceup + "To" + nextFaceup + "-v" + (this.getPlayer().id) + " " + direction);
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

    Orientation.htmlElement = null;

    function Orientation(faceup, bottom, down, up, left, right) {
      this.faceup = faceup;
      this.bottom = bottom;
      this.down = down;
      this.up = up;
      this.left = left;
      this.right = right;
      this.reset = __bind(this.reset, this);
      this.updateDiceLayout = __bind(this.updateDiceLayout, this);
      this.getHTMLElement = __bind(this.getHTMLElement, this);
      this.assignHTMLElement = __bind(this.assignHTMLElement, this);
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
    }

    Orientation.prototype.assignHTMLElement = function(element) {
      return this.htmlElement = element;
    };

    Orientation.prototype.getHTMLElement = function() {
      return this.htmlElement;
    };

    Orientation.prototype.updateDiceLayout = function() {
      if (this.htmlElement != null) {
        this.htmlElement.find(".dice-face").removeClass(DICE_FACE_ALL);
        this.htmlElement.find(".front-face").addClass("face-" + this.down);
        this.htmlElement.find(".left-face").addClass("face-" + this.right);
        this.htmlElement.find(".current-face").addClass("face-" + this.faceup).addClass("active-face");
        this.htmlElement.find(".right-face").addClass("face-" + this.left);
        return this.htmlElement.find(".back-face").addClass("face-" + this.up);
      }
    };

    Orientation.prototype.reset = function() {
      this.htmlElement = null;
      this.faceup = null;
      this.bottom = null;
      this.down = null;
      this.up = null;
      this.left = null;
      return this.right = null;
    };

    return Orientation;

  })();

  ELEMENT_GAME_CONTAINER = $(".game-container");

  ELEMENT_BOARD_CONTAINER = $(".board-container");

  ELEMENT_CONDITIONS_CONTAINER = $(".winning-conditions");

  ELEMENT_GAME_OPTIONS_CONTAINER = $("#gameOptions");

  ELEMENT_GAME_OPTIONS_NUM_PLAYERS = $("#gameOptions .number-players");

  ELEMENT_GAME_OPTIONS_BOARD_SIZE = $("#gameOptions .board-size");

  UNIT_PIXEL = "px";

  UNIT_BLOCK = "block";

  BLOCK_DEFAULT_WIDTH_PIXEL = "110";

  BLOCK_DEFAULT_HEIGHT_PIXEL = "110";

  CLASS_ACTIVE = "active";

  CLASS_BLOCK_WINNING_CONDITION = "winning-condition-block";

  CLASS_GRID_BORDER = "grid-border";

  CLASS_GRID_BORDER_TOP = "grid-border grid-border-top";

  CLASS_GRID_BORDER_BOTTOM = "grid-border grid-border-bottom";

  CLASS_GRID_BORDER_LEFT = "grid-border grid-border-left";

  CLASS_GRID_BORDER_RIGHT = "grid-border grid-border-right";

  CLASS_PLAYER_SCORE = "score";

  BOARD_SIZE_SMALL = "small";

  BOARD_SIZE_MEDIUM = "medium";

  BOARD_SIZE_LARGE = "large";

  BOARD_SIZE_RANDOM = "random";

  URL_FOR_SPRITES = "url(static/icons/Sprite/";

  URL_FOR_DICE = URL_FOR_SPRITES + "/Dice-face";

  URL_FOR_DICE_1 = "" + URL_FOR_SPRITES + "/Dice-face-1/Dice-1.png)";

  URL_FOR_DICE_2 = "" + URL_FOR_SPRITES + "/Dice-face-1/Dice-2.png)";

  URL_FOR_DICE_3 = "" + URL_FOR_SPRITES + "/Dice-face-1/Dice-3.png)";

  URL_FOR_DICE_4 = "" + URL_FOR_SPRITES + "/Dice-face-1/Dice-4.png)";

  URL_FOR_DICE_5 = "" + URL_FOR_SPRITES + "/Dice-face-1/Dice-5.png)";

  URL_FOR_DICE_6 = "" + URL_FOR_SPRITES + "/Dice-face-1/Dice-6.png)";

  DICE_FACE_ALL = "face-1  face-2 face-3 face-4 face-5 face-6 active-face";

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
        return Game.prototype.addNewPlayers("PlayerA", "PlayerB");
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

  $(function() {
    FastClick.attach(document.body);
    $(document).keydown(function(e) {
      var ar, key;
      ar = new Array(33, 34, 35, 36, 37, 38, 39, 40);
      key = e.which;
      if ($.inArray(key, ar) > -1) {
        e.preventDefault();
        return false;
      }
      return true;
    });
    $(".go-to-game").click(function(e) {
      e.preventDefault();
      return startGameMessage();
    });
    $("#gameOptions .number-players button").click(function() {
      ELEMENT_GAME_OPTIONS_NUM_PLAYERS.find("." + CLASS_ACTIVE).removeClass(CLASS_ACTIVE);
      return $(this).addClass(CLASS_ACTIVE);
    });
    $("#gameOptions .board-size button").click(function() {
      ELEMENT_GAME_OPTIONS_BOARD_SIZE.find("." + CLASS_ACTIVE).removeClass(CLASS_ACTIVE);
      return $(this).addClass(CLASS_ACTIVE);
    });
    return $(".start-game").click(function() {
      var boardSize, numberPlayers;
      boardSize = $(".board-size .active").val() === "" ? "small" : $(".board-size .active").val();
      numberPlayers = $(".number-players .active").val() === "" ? "1" : $(".number-players .active").val();
      $("#gameOptions").modal("hide");
      Game.prototype.boardSize = boardSize;
      Game.prototype.numberOfPlayers = parseInt(numberPlayers);
      Game.prototype.newGame();
      Game.prototype.addNewPlayers("Player 1", "Player 2");
      $(".scores").show();
      return $(".dice-layout").show();
    });
  });

  window.odometerOptions = {
    auto: false,
    selector: ".score",
    format: "(,ddd)",
    duration: 2000,
    theme: "default",
    animation: "count"
  };

}).call(this);
