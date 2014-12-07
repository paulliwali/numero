# =====================
# CLASSES
# ---------------
# 
# @VARIABLES = instance Variables
# VARIABLES = Class Wide Variables
# 
# Access Instance Variables using class.variable
# 
# ====================

class Grid 
    # PROPERTIES
    size = null
    blockArray = null


    # METHODS
    createGridStarter: (size) ->
        if (size is null)
            console.log "CANNOT CREATE GRID. MISSING SIZE OBJECT."
            return
        Grid::size = size

        Grid::blockArray = [
            []
        ]
        console.log "New Grid created: (#{Grid::size.height},#{Grid::size.width})"
        @createGrid()
        Game::grid = this

    reset: =>
        Grid::size.reset()
        Grid::size = null
        for blockRow in Grid::blockArray
            for block in blockRow
                block.reset()
                block = null
            blockRow = null
        Grid::blockArray = null
    # Creates a Grid of @size.height x @size.width
    # Stores the grid in @blockArray 
    createGrid: () =>
        # Create Grid in Pixels
        if Grid::size.unit is UNIT_PIXEL
            grid = $("<div>")
            grid.width( Grid::size.getWidthWithUnit() )
            grid.height( Grid::size.getWidthWithUnit() )
            ELEMENT_BOARD_CONTAINER.append(grid)    
        # Create grid in Blocks
        else if Grid::size.unit is UNIT_BLOCK
            console.log "Creating A #{Grid::size.width} by #{Grid::size.height} grid of Blocks."
            for heightBlock in [0...Grid::size.height]
                row = $("<div class='block-row'>") 
                # Instantiate a new array for each row
                Grid::blockArray[heightBlock] = []
                for widthBlock in [0...Grid::size.width]
                    # Create new block
                    block = new Block(
                        new Size(BLOCK_DEFAULT_WIDTH_PIXEL,BLOCK_DEFAULT_HEIGHT_PIXEL,UNIT_PIXEL)
                    )
                    # Create the HTML block
                    blockElement = block.createBlock()   
                    blockElement.text("[#{widthBlock},#{heightBlock}]")
                    if heightBlock is 0 or heightBlock is Grid::size.height - 1
                        blockElement.addClass(CLASS_GRID_BORDER)
                    else if widthBlock is 0 or widthBlock is Grid::size.width - 1
                        blockElement.addClass(CLASS_GRID_BORDER)
                    # Add the block to the Page
                    row.append(blockElement)
                    # assign the block to the grid array
                    Grid::blockArray[heightBlock][widthBlock] = block
                ELEMENT_BOARD_CONTAINER.append(row)

    getGrid: () =>
        return Grid::blockArray
    # SHOULD EXPLAIN WHY THIS IS BACKWARDS
    getBlockElement: (y,x) =>
        return Grid::blockArray[x][y]

    getGridHeight: () ->
        return Grid::size.height

    getGridWidth: () ->
        return Grid::size.width


class Block
    # PROPERTIES
    @size = null
    @htmlElement = null
    # METHODS
    constructor: (@size) ->
        # console.log "New Block Created: (#{@size.height},#{@size.width})"
    assignHTMLElement: (block) =>
        @htmlElement = block
    getBlockElement: =>
        return @htmlElement
    createBlock: () =>
        if @size.unit is UNIT_PIXEL
            block = $("<div class='block'>")
            block.width( @size.getWidthWithUnit() )
            block.height( @size.getWidthWithUnit() )
            @assignHTMLElement(block)
            return block
    reset: =>
        @size.reset()
        @size = null
        @htmlElement.remove()
        @htmlElement = null


class Dice extends Block
    # INHERITED PROPERTIES
    # @size

    # PROPERTIES
    @bottomPosition = null
    @gridIndex_X = null
    @gridIndex_Y = null
    @orientation = null
    @htmlElement = null
    # METHODS
    constructor: () ->
        @size = new Size("25","25",UNIT_PIXEL)
        
        @gridIndex_X = randomNum(Grid::getGridWidth(),0)
        @gridIndex_Y = randomNum(Grid::getGridHeight(),0)  
        @orientation = new Orientation
        @createDice()
        console.log "New Dice created"
        
    createDice: () =>
        alreadyWon = true if @isGameWonSetup()

        if alreadyWon
            @reset()
            @constructor()

        @assignHTMLElement(@createBlock())
        @moveToGrid()
        console.log @gridIndex_X,@gridIndex_Y
        return @htmlElement

    moveToGrid: () =>
        faceUp = @getFaceUp()
        @htmlElement.text(faceUp)

        Grid::getBlockElement(
            @gridIndex_X, @gridIndex_Y
            ).getBlockElement().append(@htmlElement)
        @isGameWon()

    reset: =>
        @htmlElement.remove()
        @bottomPosition = null
        @gridIndex_X = null
        @gridIndex_Y = null
        @orientation = null
        @htmlElement = null

    isGameWon: =>
        faceUp = @getFaceUp()
        console.log faceUp
        winningConditions = Game::getWinningConditions()
        winningConditions.checkConditions(faceUp,@gridIndex_X,@gridIndex_Y)

    isGameWonSetup: =>
        faceUp = @getFaceUp()
        console.log "Checking if already won. FACEUP: #{faceUp}"
        winningConditions = Game::getWinningConditions()
        winningConditions.checkConditionsSetup(faceUp,@gridIndex_X,@gridIndex_Y)

    createBlock: =>
        super()

    assignHTMLElement: (element) =>
        @htmlElement = element

    getHTMLElement: =>
        return @htmlElement

    getSize: =>
        console.log @size

    getFaceUp: () => 
        return @orientation.faceup

    getUp = () => 
        return @orientation.up

    getDown = () => 
        return @orientation.down

    getLeft = () => 
        return @orientation.left

    getRight = () => 
        return @orientation.right
        
    moveUp: () =>
        # Error checking
        outOfBounds = true if @gridIndex_Y - 1 < 0 
        console.log "Dice is moving out of bounds" if outOfBounds
        return if outOfBounds

        # Change orientation
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.down
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.up = oldFaceUp
        @orientation.down = 7 - @orientation.up

        # Change grid index
        @gridIndex_Y = @gridIndex_Y - 1

        console.log "Dice moved up"
        console.log "New orientation is:"
        console.log "FACEUP: #{@orientation.faceup}"
        console.log "BOTTOM: #{@orientation.bottom}"
        console.log "LEFT: #{@orientation.left}"
        console.log "RIGHT: #{@orientation.right}"
        console.log "UP: #{@orientation.up}"
        console.log "DOWN: #{@orientation.down}"
        console.log @gridIndex_X,@gridIndex_Y
        @moveToGrid()

    moveDown: () => 
        # Error checking
        outOfBounds = true if @gridIndex_Y + 1 >= Grid::getGridHeight()
        console.log "Dice is moving out of bounds" if outOfBounds
        return if outOfBounds

        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.up
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.down = oldFaceUp
        @orientation.up = 7 - @orientation.down

        # Change grid index
        @gridIndex_Y = @gridIndex_Y + 1
        console.log "Dice moved down"
        console.log "New orientation is:"
        console.log "FACEUP: #{@orientation.faceup}"
        console.log "BOTTOM: #{@orientation.bottom}"
        console.log "LEFT: #{@orientation.left}"
        console.log "RIGHT: #{@orientation.right}"
        console.log "UP: #{@orientation.up}"
        console.log "DOWN: #{@orientation.down}"
        console.log @gridIndex_X,@gridIndex_Y
        @moveToGrid()

    moveLeft: () =>
        # Error checking
        outOfBounds = true if @gridIndex_X - 1 < 0 
        console.log "Dice is moving out of bounds" if outOfBounds
        return if outOfBounds

        # Change orientation
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.right
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.left = oldFaceUp
        @orientation.right = 7 - oldFaceUp

        # Change grid index
        @gridIndex_X = @gridIndex_X - 1
        console.log "Dice moved left"
        console.log "New orientation is:"
        console.log "FACEUP: #{@orientation.faceup}"
        console.log "BOTTOM: #{@orientation.bottom}"
        console.log "LEFT: #{@orientation.left}"
        console.log "RIGHT: #{@orientation.right}"
        console.log "UP: #{@orientation.up}"
        console.log "DOWN: #{@orientation.down}"
        console.log @gridIndex_X,@gridIndex_Y
        @moveToGrid()

    moveRight: () =>
        # Error checking
        outOfBounds = true if @gridIndex_X + 1 >= Grid::getGridWidth()
        console.log "Dice is moving out of bounds" if outOfBounds
        return if outOfBounds

        # Change orientation
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.left
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.right = oldFaceUp
        @orientation.left = 7 - oldFaceUp

        # Change grid index
        @gridIndex_X = @gridIndex_X + 1
        console.log "Dice moved right"
        console.log "New orientation is:"
        console.log "FACEUP: #{@orientation.faceup}"
        console.log "BOTTOM: #{@orientation.bottom}"
        console.log "LEFT: #{@orientation.left}"
        console.log "RIGHT: #{@orientation.right}"
        console.log "UP: #{@orientation.up}"
        console.log "DOWN: #{@orientation.down}"
        console.log @gridIndex_X,@gridIndex_Y
        @moveToGrid()


class Size
    # PROPERTIES
    @height = null
    @width = null
    @unit = null

    # METHODS
    constructor: (@height,@width,@unit) ->
        if not @height? or not @width?
            console.log "MISSING HEIGHT OBJECT" unless @height?
            console.log "MISSING WIDTH OBJECT" unless @width?
            return
        console.log "New Size created: (#{@height},#{@width})"

    getWidthWithUnit: =>
        return @width + @unit
    getHeightWithUnit: =>
        return @height + @unit

    reset: =>
        @height = null
        @width = null
        @unit = null

class Position
    # PROPERTIES
    @x = null
    @y = null

    # METHODS
    constructor: (@x,@y) ->
        if @x is null  or @y is null
            console.log "MISSING X VARIABLE" unless @x?
            console.log "MISSING Y VARIABLE" unless @y?
            return
        console.log "New Position created: (#{@x},#{@y})"

class Player
    @score = 0
    @name = null
    @dice = null
    # PROPERTIES
    # METHODS
    constructor: (@name) ->
        if @name is null or @name is ""
            console.log "MISSING PLAYER NAME"
            return
        console.log "New Player created: #{@name}"

    getScore: =>
        return @score

    addPoint: =>
        @score = @score + 1

    getName: =>
        return @name

    setDice: (dice) =>
        @dice = dice


class Orientation
    # PROPERTIES
    @faceup = null
    @bottom = null
    @down = null
    @up = null
    @left = null
    @right = null

    # METHODS
    constructor: (@faceup,@bottom,@down,@up,@left,@right) ->
        if @faceup is null or @bottom is null or @down is null or @up is null or @left is null or @right is null
            console.log "MISSING FACEUP" unless @faceup?
            console.log "MISSING BOTTOM" unless @bottom?
            console.log "MISSING DOWN" unless @down?
            console.log "MISSING UP" unless @up?
            console.log "MISSING LEFT" unless @left?
            console.log "MISSING RIGHT" unless @right?
        
        @faceup = randomNum(6,1)
        @bottom = 7 - @faceup

        @left = randomNum(6,1)
        while @left == @faceup or @left == @bottom
            @left = randomNum(6,1)
        
        @right = 7 - @left

        @up = randomNum(6,1)
        while @up == @faceup or @up == @bottom or @up == @left or @up == @right
            @up = randomNum(6,1)
        
        @down = 7 - @up

        console.log "New Orientation Created"
        console.log "FACEUP: #{@faceup}"
        console.log "BOTTOM: #{@bottom}"
        console.log "LEFT: #{@left}"
        console.log "RIGHT: #{@right}"
        console.log "UP: #{@up}"
        console.log "DOWN: #{@down}"

    reset: =>
        @faceup = null
        @bottom = null
        @down = null
        @up = null
        @left = null
        @right = null

class WinningConditions
    @conditions = null
    constructor: () ->
        @conditions = []

    addCondition: () =>
        condition = new Condition()
        @conditions.push(condition)
        return condition

    checkConditions: (number,x,y) =>
        for condition in @conditions
            if not condition.checkIfSatisfied(number,x,y)
                return false
        # all conditions met
        showGameWin()

    checkConditionsSetup: (number,x,y) =>
        for condition in @conditions
            if not condition.checkIfSatisfied(number,x,y)
                return false
        return true

    reset: () =>
        for condition in @conditions
            condition.reset()
        @conditions = null

class Condition
    @number = null
    @blockPositionY = null
    @blockPositionX = null
    @isMet = false
    @htmlElement = null
    constructor: () ->
        @number = randomNum(6,1)

        @blockPositionX = randomNum(Grid::getGridWidth(),0)
        @blockPositionY = randomNum(Grid::getGridHeight(),0)
        console.log "A condition has been made for #{@number} at [#{@blockPositionX},#{@blockPositionY}] "
        @createHTMLElement()
        addConditionInViewableBox(@htmlElement)


    checkIfSatisfied: (number,x,y) =>
        if number == @number and @blockPositionX == x  and @blockPositionY == y
            @isMet = true
            return true
        else
            return false

    createHTMLElement: =>
        div = $("<div>")
        xPos = $("<div class='col-xs-4'>").text("Grid X: " + @blockPositionX)
        yPos =$("<div class='col-xs-4'>").text("Grid Y: " + @blockPositionY)
        number = $("<div class='col-xs-4'>").text("Face Up Number: " + @number)
        div.append(xPos).append(yPos).append(number)


        @htmlElement = div
        return div

    assignHTMLElement: (element) =>
        @htmlElement = element

    getHTMLElement: =>
        return @htmlElement

    reset: =>
        @htmlElement.remove()
        @number = null
        @blockPositionY = null
        @blockPositionX = null
        @isMet = false
        @htmlElement = null

class Game
    dice = null
    players = null
    grid = null
    winningConditions = null

    setWinningConditions: (win) =>
        Game::winningConditions = win

    getWinningConditions: () =>
        return Game::winningConditions

    resetGame: ->
        console.log "RESETTING GAME"
        Game::dice.reset()
        Game::grid.reset()
        Game::winningConditions.reset()
        Game::boardSize.reset()


        Game::isActiveGame = false
        Game::boardSize = null
        Game::winningConditions = null
        Game::grid = null
        Game::players = null
        Game::dice = null
