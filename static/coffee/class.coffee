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
        console.log "New Dice created"

    getSize: =>
        console.log @size

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
    constructor: () ->
        console.log "New Orientation Created"

# Game class?