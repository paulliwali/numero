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

class Game
    constructor: () ->
        console.log "New Game created."

class window.Grid 
    # PROPERTIES
    @size = null
    @blockArray = null


    # METHODS
    constructor: (@size) ->
        if (@size is null)
            console.log "CANNOT CREATE GRID. MISSING SIZE OBJECT."
            return

        @blockArray = [
            []
        ]
        console.log "New Grid created: (#{@size.height},#{@size.width})"

    # Creates a Grid of @size.height x @size.width
    # Stores the grid in @blockArray 
    createGrid: () =>
        # Create Grid in Pixels
        if @size.unit is UNIT_PIXEL
            grid = $("<div>")
            grid.width( @size.getWidthWithUnit() )
            grid.height( @size.getWidthWithUnit() )
            ELEMENT_BOARD_CONTAINER.append(grid)    
        # Create grid in Blocks
        else if @size.unit is UNIT_BLOCK
            console.log "Creating A #{@size.width} by #{@size.height} grid of Blocks."
            for widthBlock in [0...@size.width]
                row = $("<div class='block-row'>") 
                # Instantiate a new array for each row
                @blockArray[widthBlock] = []
                for heightBlock in [0...@size.height]
                    # Create new block
                    block = new Block(
                        new Size(BLOCK_DEFAULT_WIDTH_PIXEL,BLOCK_DEFAULT_HEIGHT_PIXEL,UNIT_PIXEL)
                    )
                    # Create the HTML block
                    blockElement = block.createBlock()   
                    blockElement.text("[#{widthBlock},#{heightBlock}]")
                    # Add the block to the Page
                    row.append(blockElement)
                    # assign the block to the grid array
                    @blockArray[widthBlock][heightBlock] = block
                ELEMENT_BOARD_CONTAINER.append(row)

    getGrid: () =>
        return @blockArray
    getBlockElement: (x,y) =>
        return @blockArray[x][y]

    getGridHeight: () ->
        return @size.height

    getGridWidth: () ->
        return @size.width


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


class Dice extends Block
    # INHERITED PROPERTIES
    # @size

    # PROPERTIES
    @bottomPosition = null
    @gridIndex_X = null
    @gridIndex_Y = null
    @orientation = null
    @htmlElement =null
    # METHODS
    constructor: (size) ->
        super(size)
        @orientation = new Orientation
        console.log "New Dice created"

    createDice: () =>
        console.log "CREATING DICE"
        @assignHTMLElement(@createBlock())
        faceUp = @getFaceUp()
        @htmlElement.text(faceUp)

        @moveToGrid(
            randomNum(
                window.grid.getGridWidth(),0
                )
            ,
            randomNum(
                window.grid.getGridHeight(),0
                )
            )

        return @htmlElement

    moveToGrid: (gridIndexX,gridIndexY)=>
        console.log gridIndexX
        console.log gridIndexY
        window.grid.getBlockElement(
            gridIndexX, gridIndexY
            ).getBlockElement().append(@htmlElement)

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

    moveUp: () =>
        # Change orientation
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.down
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.up = oldFaceUp
        @orientation.down = 7 - @orientation.up

        # Change grid index
        @gridIndex_Y = @gridIndex_Y + 1
        console.log "Dice moved up"
        console.log "New orientation is:"
        console.log "FACEUP: #{@faceup}"
        console.log "BOTTOM: #{@bottom}"
        console.log "LEFT: #{@left}"
        console.log "RIGHT: #{@right}"
        console.log "UP: #{@up}"
        console.log "DOWN: #{@down}"
        @moveToGrid(@gridIndex_X,@gridIndex_Y)

    moveDown: () => 
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.up
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.down = oldFaceUp
        @orientation.up = 7 - @orientation.down

        # Change grid index
        @gridIndex_Y = @gridIndex_Y - 1
        console.log "Dice moved down"
        console.log "New orientation is:"
        console.log "FACEUP: #{@faceup}"
        console.log "BOTTOM: #{@bottom}"
        console.log "LEFT: #{@left}"
        console.log "RIGHT: #{@right}"
        console.log "UP: #{@up}"
        console.log "DOWN: #{@down}"
        @moveToGrid(@gridIndex_X,@gridIndex_Y)

    moveLeft: () =>
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
        console.log "FACEUP: #{@faceup}"
        console.log "BOTTOM: #{@bottom}"
        console.log "LEFT: #{@left}"
        console.log "RIGHT: #{@right}"
        console.log "UP: #{@up}"
        console.log "DOWN: #{@down}"
        @moveToGrid(@gridIndex_X,@gridIndex_Y)

    moveRight: () =>
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
        console.log "FACEUP: #{@faceup}"
        console.log "BOTTOM: #{@bottom}"
        console.log "LEFT: #{@left}"
        console.log "RIGHT: #{@right}"
        console.log "UP: #{@up}"
        console.log "DOWN: #{@down}"
        @moveToGrid(@gridIndex_X,@gridIndex_Y)


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
    # PROPERTIES
    # METHODS
    constructor: (@name) ->
        if @name is null or @name is ""
            console.log "MISSING PLAYER NAME"
            return
        console.log "New Player created: #{@name}"

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



















# Game class?