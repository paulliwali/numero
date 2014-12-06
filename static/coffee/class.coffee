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

class Grid 
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
                    block = new Block(
                        new Size(BLOCK_DEFAULT_WIDTH_PIXEL,BLOCK_DEFAULT_HEIGHT_PIXEL,UNIT_PIXEL)
                    )
                    blockElement = block.createBlock()   
                    blockElement.text("[#{widthBlock},#{heightBlock}]")
                    row.append(blockElement)
                    @blockArray[widthBlock][heightBlock] = block
                ELEMENT_BOARD_CONTAINER.append(row)

        getGrid: () =>
            console.log @blockArray



class Block
    # PROPERTIES
    @size = null

    # METHODS
    constructor: (@size) ->
        console.log "New Block Created: (#{@size.height},#{@size.width})"
    createBlock: () =>
        if @size.unit is UNIT_PIXEL
            block = $("<div class='block'>")
            block.width( @size.getWidthWithUnit() )
            block.height( @size.getWidthWithUnit() )
            return block

class Dice extends Block
    # INHERITED PROPERTIES
    # @size

    # PROPERTIES
    @bottomPosition = null
    @gridIndex_X = null
    @gridIndex_Y = null
    @orientation = null
    # METHODS
    constructor: (size) ->
        super(size)
        @orientation = new Orientation
        console.log "New Dice created"

    getSize: =>
        console.log @size

    moveUp = () =>
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.down
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.up = oldFaceUp
        @orientation.down = 7 - @orientation.up

    moveDown = () => 
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.up
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.down = oldFaceUp
        @orientation.up = 7 - @orientation.down

    moveLeft = () =>
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.right
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.left = oldFaceUp
        @orientation.right = 7 - oldFaceUp

    moveRight = () =>
        oldFaceUp = @orientation.faceup
        @orientation.faceup = @orientation.left
        @orientation.bottom = 7 - @orientation.faceup
        @orientation.right = oldFaceUp
        @orientation.left = 7 - oldFaceUp

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
    @y= null

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
            console.log "MISSING FACEUP" unless @faceup
            console.log "MISSING BOTTOM" unless @bottom
            console.log "MISSING DOWN" unless @down
            console.log "MISSING UP" unless @up
            console.log "MISSING LEFT" unless @left
            console.log "MISSING RIGHT" unless @right
        
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