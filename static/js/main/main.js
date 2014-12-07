// Generated by CoffeeScript 1.7.1
(function() {
  var BLOCK_DEFAULT_HEIGHT_PIXEL, BLOCK_DEFAULT_WIDTH_PIXEL, BOARD_SIZE_LARGE, BOARD_SIZE_MEDIUM, BOARD_SIZE_RANDOM, BOARD_SIZE_SMALL, Block, CLASS_ACTIVE, Condition, Dice, ELEMENT_BOARD_CONTAINER, ELEMENT_CONDITIONS_CONTAINER, ELEMENT_GAME_CONTAINER, ELEMENT_GAME_OPTIONS_BOARD_SIZE, ELEMENT_GAME_OPTIONS_CONTAINER, ELEMENT_GAME_OPTIONS_NUM_PLAYERS, Game, Grid, Orientation, Player, Position, Size, UNIT_BLOCK, UNIT_PIXEL, WinningConditions, addConditionInViewableBox, randomNum, randomise, showError, showGameWin, showMessage, startGameMessage,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Grid = (function() {
    var blockArray, size;

    function Grid() {
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

    return Grid;

  })();

  Block = (function() {
    Block.size = null;

    Block.htmlElement = null;

    function Block(size) {
      this.size = size;
      this.reset = __bind(this.reset, this);
      this.createBlock = __bind(this.createBlock, this);
      this.getBlockElement = __bind(this.getBlockElement, this);
      this.assignHTMLElement = __bind(this.assignHTMLElement, this);
    }

    Block.prototype.assignHTMLElement = function(block) {
      return this.htmlElement = block;
    };

    Block.prototype.getBlockElement = function() {
      return this.htmlElement;
    };

    Block.prototype.createBlock = function() {
      var block;
      if (this.size.unit === UNIT_PIXEL) {
        block = $("<div class='block'>");
        block.width(this.size.getWidthWithUnit());
        block.height(this.size.getWidthWithUnit());
        this.assignHTMLElement(block);
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

  Dice = (function(_super) {
    var getDown, getLeft, getRight, getUp;

    __extends(Dice, _super);

    Dice.bottomPosition = null;

    Dice.gridIndex_X = null;

    Dice.gridIndex_Y = null;

    Dice.orientation = null;

    Dice.htmlElement = null;

    function Dice() {
      this.moveRight = __bind(this.moveRight, this);
      this.moveLeft = __bind(this.moveLeft, this);
      this.moveDown = __bind(this.moveDown, this);
      this.moveUp = __bind(this.moveUp, this);
      this.getFaceUp = __bind(this.getFaceUp, this);
      this.getSize = __bind(this.getSize, this);
      this.getHTMLElement = __bind(this.getHTMLElement, this);
      this.assignHTMLElement = __bind(this.assignHTMLElement, this);
      this.createBlock = __bind(this.createBlock, this);
      this.isGameWon = __bind(this.isGameWon, this);
      this.reset = __bind(this.reset, this);
      this.moveToGrid = __bind(this.moveToGrid, this);
      this.createDice = __bind(this.createDice, this);
      var diceSize;
      diceSize = new Size("25", "25", UNIT_PIXEL);
      this.gridIndex_X = randomNum(Grid.prototype.getGridWidth(), 0);
      this.gridIndex_Y = randomNum(Grid.prototype.getGridHeight(), 0);
      this.orientation = new Orientation;
      this.createDice();
      console.log("New Dice created");
    }

    Dice.prototype.createDice = function() {
      this.assignHTMLElement(this.createBlock());
      this.moveToGrid();
      console.log(this.gridIndex_X, this.gridIndex_Y);
      return this.htmlElement;
    };

    Dice.prototype.moveToGrid = function() {
      var faceUp;
      faceUp = this.getFaceUp();
      this.htmlElement.text(faceUp);
      Grid.prototype.getBlockElement(this.gridIndex_X, this.gridIndex_Y).getBlockElement().append(this.htmlElement);
      return this.isGameWon();
    };

    Dice.prototype.reset = function() {
      this.htmlElement.remove();
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
      return winningConditions.checkConditions(faceUp, this.gridIndex_X, this.gridIndex_Y);
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
      var oldFaceUp, outOfBounds;
      if (this.gridIndex_Y - 1 < 0) {
        outOfBounds = true;
      }
      if (outOfBounds) {
        console.log("Dice is moving out of bounds");
      }
      if (outOfBounds) {
        return;
      }
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.down;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.up = oldFaceUp;
      this.orientation.down = 7 - this.orientation.up;
      this.gridIndex_Y = this.gridIndex_Y - 1;
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
    };

    Dice.prototype.moveDown = function() {
      var oldFaceUp, outOfBounds;
      if (this.gridIndex_Y + 1 >= Grid.prototype.getGridHeight()) {
        outOfBounds = true;
      }
      if (outOfBounds) {
        console.log("Dice is moving out of bounds");
      }
      if (outOfBounds) {
        return;
      }
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.up;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.down = oldFaceUp;
      this.orientation.up = 7 - this.orientation.down;
      this.gridIndex_Y = this.gridIndex_Y + 1;
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
    };

    Dice.prototype.moveLeft = function() {
      var oldFaceUp, outOfBounds;
      if (this.gridIndex_X - 1 < 0) {
        outOfBounds = true;
      }
      if (outOfBounds) {
        console.log("Dice is moving out of bounds");
      }
      if (outOfBounds) {
        return;
      }
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.right;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.left = oldFaceUp;
      this.orientation.right = 7 - oldFaceUp;
      this.gridIndex_X = this.gridIndex_X - 1;
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
    };

    Dice.prototype.moveRight = function() {
      var oldFaceUp, outOfBounds;
      if (this.gridIndex_X + 1 >= Grid.prototype.getGridWidth()) {
        outOfBounds = true;
      }
      if (outOfBounds) {
        console.log("Dice is moving out of bounds");
      }
      if (outOfBounds) {
        return;
      }
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.left;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.right = oldFaceUp;
      this.orientation.left = 7 - oldFaceUp;
      this.gridIndex_X = this.gridIndex_X + 1;
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
    };

    return Dice;

  })(Block);

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
      console.log("New Size created: (" + this.height + "," + this.width + ")");
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

  Position = (function() {
    Position.x = null;

    Position.y = null;

    function Position(x, y) {
      this.x = x;
      this.y = y;
      if (this.x === null || this.y === null) {
        if (this.x == null) {
          console.log("MISSING X VARIABLE");
        }
        if (this.y == null) {
          console.log("MISSING Y VARIABLE");
        }
        return;
      }
      console.log("New Position created: (" + this.x + "," + this.y + ")");
    }

    return Position;

  })();

  Player = (function() {
    Player.score = 0;

    Player.name = null;

    Player.dice = null;

    function Player(name) {
      this.name = name;
      this.setDice = __bind(this.setDice, this);
      this.getName = __bind(this.getName, this);
      this.addPoint = __bind(this.addPoint, this);
      this.getScore = __bind(this.getScore, this);
      if (this.name === null || this.name === "") {
        console.log("MISSING PLAYER NAME");
        return;
      }
      console.log("New Player created: " + this.name);
    }

    Player.prototype.getScore = function() {
      return this.score;
    };

    Player.prototype.addPoint = function() {
      return this.score = this.score + 1;
    };

    Player.prototype.getName = function() {
      return this.name;
    };

    Player.prototype.setDice = function(dice) {
      return this.dice = dice;
    };

    return Player;

  })();

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

  WinningConditions = (function() {
    WinningConditions.conditions = null;

    function WinningConditions() {
      this.reset = __bind(this.reset, this);
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
      var condition, _i, _len, _ref;
      _ref = this.conditions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        condition = _ref[_i];
        if (!condition.checkIfSatisfied(number, x, y)) {
          return false;
        }
      }
      return showGameWin();
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

  Game = (function() {
    var dice, grid, players, winningConditions;

    function Game() {
      this.getWinningConditions = __bind(this.getWinningConditions, this);
      this.setWinningConditions = __bind(this.setWinningConditions, this);
    }

    dice = null;

    players = null;

    grid = null;

    winningConditions = null;

    Game.prototype.setWinningConditions = function(win) {
      return Game.prototype.winningConditions = win;
    };

    Game.prototype.getWinningConditions = function() {
      return Game.prototype.winningConditions;
    };

    Game.prototype.resetGame = function() {
      console.log("RESETTING GAME");
      Game.prototype.dice.reset();
      Game.prototype.grid.reset();
      Game.prototype.winningConditions.reset();
      Game.prototype.boardSize.reset();
      Game.prototype.isActiveGame = false;
      Game.prototype.boardSize = null;
      Game.prototype.winningConditions = null;
      Game.prototype.grid = null;
      Game.prototype.players = null;
      return Game.prototype.dice = null;
    };

    return Game;

  })();

  ELEMENT_GAME_CONTAINER = $(".game-container");

  ELEMENT_BOARD_CONTAINER = $(".board-container");

  ELEMENT_CONDITIONS_CONTAINER = $(".winning-conditions");

  ELEMENT_GAME_OPTIONS_CONTAINER = $("#gameOptions");

  ELEMENT_GAME_OPTIONS_NUM_PLAYERS = $("#gameOptions .number-players");

  ELEMENT_GAME_OPTIONS_BOARD_SIZE = $("#gameOptions .board-size");

  UNIT_PIXEL = "px";

  UNIT_BLOCK = "block";

  BLOCK_DEFAULT_WIDTH_PIXEL = "100";

  BLOCK_DEFAULT_HEIGHT_PIXEL = "100";

  CLASS_ACTIVE = "active";

  BOARD_SIZE_SMALL = "small";

  BOARD_SIZE_MEDIUM = "medium";

  BOARD_SIZE_LARGE = "large";

  BOARD_SIZE_RANDOM = "random";

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

  showGameWin = function() {
    return swal({
      title: "You've Won!",
      type: "success"
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
        return $("#gameOptions").modal("show");
      }
    });
  };

  addConditionInViewableBox = function(condition) {
    return ELEMENT_CONDITIONS_CONTAINER.append(condition);
  };

  $(function() {
    return FastClick.attach(document.body);
  });

  $(function() {
    setTimeout((function() {
      return startGameMessage();
    }), 200);
    $("#gameOptions .number-players button").click(function() {
      ELEMENT_GAME_OPTIONS_NUM_PLAYERS.find("." + CLASS_ACTIVE).removeClass(CLASS_ACTIVE);
      return $(this).addClass(CLASS_ACTIVE);
    });
    $("#gameOptions .board-size button").click(function() {
      ELEMENT_GAME_OPTIONS_BOARD_SIZE.find("." + CLASS_ACTIVE).removeClass(CLASS_ACTIVE);
      return $(this).addClass(CLASS_ACTIVE);
    });
    return $(".start-game").click(function() {
      var blockSize, boardSize, dice, numberPlayers, sizeX, sizeY, winningConditions;
      boardSize = $(".board-size .active").val();
      numberPlayers = $(".number-players .active").val();
      $("#gameOptions").modal("hide");
      if (Game.prototype.isActiveGame === true) {
        $("body").unbind("keyup");
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
      window.player1 = new Player("Pua");
      dice = new Dice();
      player1.setDice(dice);
      Game.prototype.dice = dice;
      console.log(Game.prototype);
      console.log(Grid.prototype);
      console.log(player1);
      return $("body").keyup(function(e) {
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
    });
  });

}).call(this);
