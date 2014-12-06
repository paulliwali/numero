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

    # METHODS
    constructor: (@size) ->
        if (@size is null)
            console.log "MISSING SIZE OBJECT"
            return

        console.log "New Grid created: (#{@size.height},#{@size.width})"

class Block
    # PROPERTIES
    @size = null

    # METHODS
    constructor: (@size) ->
        console.log "New Block Created: (#{@size.height},#{@size.width})"

class Dice extends Block
    # PROPERTIES
    @size = null
    @bottomPosition = null
    @gridIndex_X = null
    @gridIndex_Y = null
    @orientation = null
    # METHODS
    constructor: (@size) ->
        super(@size)
        console.log "New Dice created"

class Size
    # PROPERTIES
    @height = null
    @width = null

    # METHODS
    constructor: (@height,@width) ->
        if not @height? or not @width?
            console.log "MISSING HEIGHT OBJECT" unless @height?
            console.log "MISSING WIDTH OBJECT" unless @width?
            return
        console.log "New Size created: (#{@height},#{@width})"

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