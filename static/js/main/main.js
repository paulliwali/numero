// Generated by CoffeeScript 1.7.1
(function() {
  var BLOCK_DEFAULT_HEIGHT_PIXEL, BLOCK_DEFAULT_WIDTH_PIXEL, Block, Dice, ELEMENT_BOARD_CONTAINER, ELEMENT_GAME_CONTAINER, Game, Orientation, Player, Position, Size, UNIT_BLOCK, UNIT_PIXEL, randomNum, randomise,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Game = (function() {
    function Game() {
      console.log("New Game created.");
    }

    return Game;

  })();

  window.Grid = (function() {
    Grid.size = null;

    Grid.blockArray = null;

    function Grid(size) {
      this.size = size;
      this.getBlockElement = __bind(this.getBlockElement, this);
      this.getGrid = __bind(this.getGrid, this);
      this.createGrid = __bind(this.createGrid, this);
      if (this.size === null) {
        console.log("CANNOT CREATE GRID. MISSING SIZE OBJECT.");
        return;
      }
      this.blockArray = [[]];
      console.log("New Grid created: (" + this.size.height + "," + this.size.width + ")");
    }

    Grid.prototype.createGrid = function() {
      var block, blockElement, grid, heightBlock, row, widthBlock, _i, _j, _ref, _ref1, _results;
      if (this.size.unit === UNIT_PIXEL) {
        grid = $("<div>");
        grid.width(this.size.getWidthWithUnit());
        grid.height(this.size.getWidthWithUnit());
        return ELEMENT_BOARD_CONTAINER.append(grid);
      } else if (this.size.unit === UNIT_BLOCK) {
        console.log("Creating A " + this.size.width + " by " + this.size.height + " grid of Blocks.");
        _results = [];
        for (widthBlock = _i = 0, _ref = this.size.width; 0 <= _ref ? _i < _ref : _i > _ref; widthBlock = 0 <= _ref ? ++_i : --_i) {
          row = $("<div class='block-row'>");
          this.blockArray[widthBlock] = [];
          for (heightBlock = _j = 0, _ref1 = this.size.height; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; heightBlock = 0 <= _ref1 ? ++_j : --_j) {
            block = new Block(new Size(BLOCK_DEFAULT_WIDTH_PIXEL, BLOCK_DEFAULT_HEIGHT_PIXEL, UNIT_PIXEL));
            blockElement = block.createBlock();
            blockElement.text("[" + widthBlock + "," + heightBlock + "]");
            row.append(blockElement);
            this.blockArray[widthBlock][heightBlock] = block;
          }
          _results.push(ELEMENT_BOARD_CONTAINER.append(row));
        }
        return _results;
      }
    };

    Grid.prototype.getGrid = function() {
      return this.blockArray;
    };

    Grid.prototype.getBlockElement = function(x, y) {
      return this.blockArray[x][y];
    };

    Grid.prototype.getGridHeight = function() {
      return this.size.height;
    };

    Grid.prototype.getGridWidth = function() {
      return this.size.width;
    };

    return Grid;

  })();

  Block = (function() {
    Block.size = null;

    Block.htmlElement = null;

    function Block(size) {
      this.size = size;
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

    return Block;

  })();

  Dice = (function(_super) {
    __extends(Dice, _super);

    Dice.bottomPosition = null;

    Dice.gridIndex_X = null;

    Dice.gridIndex_Y = null;

    Dice.orientation = null;

    Dice.htmlElement = null;

    function Dice(size) {
      this.moveRight = __bind(this.moveRight, this);
      this.moveLeft = __bind(this.moveLeft, this);
      this.moveDown = __bind(this.moveDown, this);
      this.moveUp = __bind(this.moveUp, this);
      this.getFaceUp = __bind(this.getFaceUp, this);
      this.getSize = __bind(this.getSize, this);
      this.getHTMLElement = __bind(this.getHTMLElement, this);
      this.assignHTMLElement = __bind(this.assignHTMLElement, this);
      this.createBlock = __bind(this.createBlock, this);
      this.moveToGrid = __bind(this.moveToGrid, this);
      this.createDice = __bind(this.createDice, this);
      Dice.__super__.constructor.call(this, size);
      this.orientation = new Orientation;
      console.log("New Dice created");
    }

    Dice.prototype.createDice = function() {
      var faceUp;
      console.log("CREATING DICE");
      this.assignHTMLElement(this.createBlock());
      faceUp = this.getFaceUp();
      this.htmlElement.text(faceUp);
      this.moveToGrid(randomNum(window.grid.getGridWidth(), 0), randomNum(window.grid.getGridHeight(), 0));
      return this.htmlElement;
    };

    Dice.prototype.moveToGrid = function(gridIndexX, gridIndexY) {
      console.log(gridIndexX);
      console.log(gridIndexY);
      return window.grid.getBlockElement(gridIndexX, gridIndexY).getBlockElement().append(this.htmlElement);
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

    Dice.prototype.moveUp = function() {
      var oldFaceUp;
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.down;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.up = oldFaceUp;
      this.orientation.down = 7 - this.orientation.up;
      this.gridIndex_Y = this.gridIndex_Y + 1;
      console.log("Dice moved up");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.faceup);
      console.log("BOTTOM: " + this.bottom);
      console.log("LEFT: " + this.left);
      console.log("RIGHT: " + this.right);
      console.log("UP: " + this.up);
      console.log("DOWN: " + this.down);
      return this.moveToGrid(this.gridIndex_X, this.gridIndex_Y);
    };

    Dice.prototype.moveDown = function() {
      var oldFaceUp;
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.up;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.down = oldFaceUp;
      this.orientation.up = 7 - this.orientation.down;
      this.gridIndex_Y = this.gridIndex_Y - 1;
      console.log("Dice moved down");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.faceup);
      console.log("BOTTOM: " + this.bottom);
      console.log("LEFT: " + this.left);
      console.log("RIGHT: " + this.right);
      console.log("UP: " + this.up);
      console.log("DOWN: " + this.down);
      return this.moveToGrid(this.gridIndex_X, this.gridIndex_Y);
    };

    Dice.prototype.moveLeft = function() {
      var oldFaceUp;
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.right;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.left = oldFaceUp;
      this.orientation.right = 7 - oldFaceUp;
      this.gridIndex_X = this.gridIndex_X - 1;
      console.log("Dice moved left");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.faceup);
      console.log("BOTTOM: " + this.bottom);
      console.log("LEFT: " + this.left);
      console.log("RIGHT: " + this.right);
      console.log("UP: " + this.up);
      console.log("DOWN: " + this.down);
      return this.moveToGrid(this.gridIndex_X, this.gridIndex_Y);
    };

    Dice.prototype.moveRight = function() {
      var oldFaceUp;
      oldFaceUp = this.orientation.faceup;
      this.orientation.faceup = this.orientation.left;
      this.orientation.bottom = 7 - this.orientation.faceup;
      this.orientation.right = oldFaceUp;
      this.orientation.left = 7 - oldFaceUp;
      this.gridIndex_X = this.gridIndex_X + 1;
      console.log("Dice moved right");
      console.log("New orientation is:");
      console.log("FACEUP: " + this.faceup);
      console.log("BOTTOM: " + this.bottom);
      console.log("LEFT: " + this.left);
      console.log("RIGHT: " + this.right);
      console.log("UP: " + this.up);
      console.log("DOWN: " + this.down);
      return this.moveToGrid(this.gridIndex_X, this.gridIndex_Y);
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
    function Player(name) {
      this.name = name;
      if (this.name === null || this.name === "") {
        console.log("MISSING PLAYER NAME");
        return;
      }
      console.log("New Player created: " + this.name);
    }

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

    return Orientation;

  })();

  ELEMENT_GAME_CONTAINER = $(".game-container");

  ELEMENT_BOARD_CONTAINER = $(".board-container");

  UNIT_PIXEL = "px";

  UNIT_BLOCK = "block";

  BLOCK_DEFAULT_WIDTH_PIXEL = "100";

  BLOCK_DEFAULT_HEIGHT_PIXEL = "100";

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

  $(function() {
    return FastClick.attach(document.body);
  });

  $(function() {
    var blockSize, dice, diceElement, diceSize;
    blockSize = new Size(5, 7, UNIT_BLOCK);
    window.grid = new Grid(blockSize);
    grid.createGrid();
    diceSize = new Size("25", "25", UNIT_PIXEL);
    dice = new Dice(diceSize);
    diceElement = dice.createDice();
    return dice.moveLeft();
  });

}).call(this);
