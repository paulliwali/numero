// Generated by CoffeeScript 1.7.1
(function() {
  var Block, Dice, Game, Grid, Orientation, Player, Position, Size, randomNum, randomise,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Game = (function() {
    function Game() {
      console.log("New Game created.");
    }

    return Game;

  })();

  Grid = (function() {
    Grid.size = null;

    function Grid(size) {
      this.size = size;
      if (this.size === null) {
        console.log("CANNOT CREATE GRID. MISSING SIZE OBJECT.");
        return;
      }
      console.log("New Grid created: (" + this.size.height + "," + this.size.width + ")");
    }

    return Grid;

  })();

  Block = (function() {
    Block.size = null;

    function Block(size) {
      this.size = size;
      console.log("New Block Created: (" + this.size.height + "," + this.size.width + ")");
    }

    return Block;

  })();

  Dice = (function(_super) {
    var moveDown, moveLeft, moveRight, moveUp;

    __extends(Dice, _super);

    Dice.bottomPosition = null;

    Dice.gridIndex_X = null;

    Dice.gridIndex_Y = null;

    Dice.orientation = null;

    function Dice(size) {
      this.getSize = __bind(this.getSize, this);
      Dice.__super__.constructor.call(this, size);
      this.orientation = new Orientation;
      console.log("New Dice created");
    }

    Dice.prototype.getSize = function() {
      return console.log(this.size);
    };

    moveUp = function() {
      var oldFaceUp;
      oldFaceUp = Dice.orientation.faceup;
      Dice.orientation.faceup = Dice.orientation.down;
      Dice.orientation.bottom = 7 - Dice.orientation.faceup;
      Dice.orientation.up = oldFaceUp;
      return Dice.orientation.down = 7 - Dice.orientation.up;
    };

    moveDown = function() {
      var oldFaceUp;
      oldFaceUp = Dice.orientation.faceup;
      Dice.orientation.faceup = Dice.orientation.up;
      Dice.orientation.bottom = 7 - Dice.orientation.faceup;
      Dice.orientation.down = oldFaceUp;
      return Dice.orientation.up = 7 - Dice.orientation.down;
    };

    moveLeft = function() {
      var oldFaceUp;
      oldFaceUp = Dice.orientation.faceup;
      Dice.orientation.faceup = Dice.orientation.right;
      Dice.orientation.bottom = 7 - Dice.orientation.faceup;
      Dice.orientation.left = oldFaceUp;
      return Dice.orientation.right = 7 - oldFaceUp;
    };

    moveRight = function() {
      var oldFaceUp;
      oldFaceUp = Dice.orientation.faceup;
      Dice.orientation.faceup = Dice.orientation.left;
      Dice.orientation.bottom = 7 - Dice.orientation.faceup;
      Dice.orientation.right = oldFaceUp;
      return Dice.orientation.left = 7 - oldFaceUp;
    };

    return Dice;

  })(Block);

  Size = (function() {
    Size.height = null;

    Size.width = null;

    function Size(height, width) {
      this.height = height;
      this.width = width;
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
        if (!this.faceup) {
          console.log("MISSING FACEUP");
        }
        if (!this.bottom) {
          console.log("MISSING BOTTOM");
        }
        if (!this.down) {
          console.log("MISSING DOWN");
        }
        if (!this.up) {
          console.log("MISSING UP");
        }
        if (!this.left) {
          console.log("MISSING LEFT");
        }
        if (!this.right) {
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
    var block, dice, grid, player, size;
    size = new Size(100, 100);
    block = new Block(size);
    dice = new Dice(size);
    player = new Player("Tom");
    grid = new Grid(size);
    return dice.getSize();
  });

}).call(this);
