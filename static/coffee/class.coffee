# =====================
# CLASSES
# ====================

class Grid 
    constructor: (@size) ->
        if (@size is null)
            console.log "MISSING SIZE OBJECT"
            return

        console.log "New Grid created: (#{@size.height},#{@size.width})"

class Block
    constructor: () ->
        console.log "New Block Created"

class Dice 
    constructor: () ->
        console.log "New Dice created"

class Size
    constructor: (@height,@width) ->
        if not @height? or not @width?
            console.log "MISSING HEIGHT OBJECT" unless @height?
            console.log "MISSING WIDTH OBJECT" unless @width?
            return
        console.log "New Size created: (#{@height},#{@width})"

class Position
    constructor: (@x,@y) ->
        if @x is null  or @y is null
            console.log "MISSING X VARIABLE" unless @x?
            console.log "MISSING Y VARIABLE" unless @y?
            return
        console.log "New Position created: (#{@x},#{@y})"

class Player
    constructor: (@name) ->
        if @name is null or @name is ""
            console.log "MISSING PLAYER NAME"
            return
        console.log "New Player created: {#{@name}"

# Game class?