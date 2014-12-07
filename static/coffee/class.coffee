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

# ================= GAME START ====================
class Game
    Game::players = []
    Game::grid = null
    Game::winningConditions = null
    Game::isActiveGame = false
    Game::numberOfPlayers = 0
    newGame: =>
        if Game::isActiveGame is true
            $("body").unbind("keyup")
            Game::resetGame()
        Game::isActiveGame = true

        if Game::boardSize is BOARD_SIZE_MEDIUM
            blockSize = new Size(4,4,UNIT_BLOCK)
        else if Game::boardSize is BOARD_SIZE_SMALL
            blockSize = new Size(3,3,UNIT_BLOCK)
        else if Game::boardSize is BOARD_SIZE_LARGE
            blockSize = new Size(5,5,UNIT_BLOCK)
        else
            sizeX = randomNum(6,3)
            sizeY = randomNum(6,3)
            blockSize = new Size(sizeX,sizeY,UNIT_BLOCK)
        Game::blockSize = blockSize
        if Game::players is null
            Game::players = []
        Grid::createGridStarter(Game::blockSize)

        # Set the victory conditions
        winningConditions = new WinningConditions()
        winningConditions.addCondition()

        Game::setWinningConditions(winningConditions)

    setWinningConditions: (win) =>
        Game::winningConditions = win

    getWinningConditions: () =>
        return Game::winningConditions

    addPlayer: (player) =>
        Game::players.push(player)

    addNewPlayers: (name1,name2 = "") =>
        if not window.player1?
            window.player1 = new Player(name1)
        dice = new Dice()
        player1.setDice(dice)
        if player1 not in Game::players
            Game::addPlayer(player1)


        if Game::numberOfPlayers == 2
            if not window.player2?
                window.player2 = new Player(name2)
            dice2 = new Dice()
            player2.setDice(dice2)
            if player2 not in Game::players
                Game::addPlayer(player2)
            $(".player-two").show()

        $("body").on "keyup", (e) ->
            player1.bindControls(e)
            if Game::numberOfPlayers == 2
                player2.bindControls(e)


    resetGame: ->
        console.log "RESETTING GAME"
        if Game::grid isnt null
            Game::grid.reset()
        if Game::winningConditions isnt null
            Game::winningConditions.reset()
        if Game::blockSize isnt null
            Game::blockSize.reset()
        # if Game::players isnt null
        #     for player in Game::players
        #         player.reset()
        #         player = null

        Game::boardSize = null
        Game::isActiveGame = false
        Game::boardSize = null
        Game::winningConditions = null
        Game::grid = null
        # Game::players = null

# ================== END GAME ============================

# ================== START WINNING CONDITIONS =================
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
        for player in Game::players
            player.unbindControls()
        return true

    checkConditionsSetup: (number,x,y) =>
        for condition in @conditions
            if not condition.checkIfSatisfied(number,x,y)
                return false
        return true

    reset: () =>
        for condition in @conditions
            condition.reset()
        @conditions = null

# =================== END WINNING CONDITIONS =====================
# =================== START CONDITIONS ==========================

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
        Grid::getBlockElement(@blockPositionX,@blockPositionY).getHTMLElement().addClass(CLASS_BLOCK_WINNING_CONDITION)
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

#=================== END CONDITIONS ====================
# =================== START PLAYER ========================

class Player
    @score = null
    @name = null
    @dice = null
    playerNumber = 0
    @id = 0
    @htmlElement = null
    # PROPERTIES
    # METHODS
    constructor: (@name) ->
        @score = 0
        if @name is null or @name is ""
            console.log "MISSING PLAYER NAME"
            return
        @id = ++playerNumber
        @assignHTMLElement($(".player-score:nth-child(#{@id})"))
        @htmlElement.find(".player-name").text(@name)
        console.log "New Player created: #{@name} ID: #{@id}"
    getScore: =>
        return @score

    addPoint: =>
        @score++
        @htmlElement.find("."+CLASS_PLAYER_SCORE).text("#{@score}")

    assignHTMLElement: (element)=>
        @htmlElement = element

    getHTMLElement: =>
        return @htmlElement

    getName: =>
        return @name

    setDice: (dice) =>
        @dice = dice

    getID: =>
        return @id

    getDice: =>
        return @dice

    reset: =>
        @dice.reset()
        @dice = null

    bindControls: (e)=>
        if @id == 1
            switch e.keyCode
                when 68
                    @dice.setAnimationLock() 
                    @dice.moveRight()
                    @dice.setAnimationUnlock()
                when 83
                    @dice.setAnimationLock() 
                    @dice.moveDown()
                    @dice.setAnimationUnlock()
                when 65
                    @dice.setAnimationLock() 
                    @dice.moveLeft()
                    @dice.setAnimationUnlock()
                when 87
                    @dice.setAnimationLock() 
                    @dice.moveUp()
                    @dice.setAnimationUnlock()
        else if @id == 2
            switch e.keyCode
                when 39
                    @dice.setAnimationLock() 
                    @dice.moveRight()
                    @dice.setAnimationUnlock()
                when 40
                    @dice.setAnimationLock() 
                    @dice.moveDown()
                    @dice.setAnimationUnlock()
                when 37
                    @dice.setAnimationLock() 
                    @dice.moveLeft()
                    @dice.setAnimationUnlock()
                when 38
                    @dice.setAnimationLock() 
                    @dice.moveUp()
                    @dice.setAnimationUnlock()
    unbindControls: =>
        $("body").unbind("keyup")
# ==================== END PLAYER =============================

# =================== START GRID ===============
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

                    # add special Border classes for the borders
                    if heightBlock is 0
                        blockElement.addClass(CLASS_GRID_BORDER_TOP)
                    if heightBlock is Grid::size.height - 1 
                        blockElement.addClass(CLASS_GRID_BORDER_BOTTOM)
                    if widthBlock is 0
                        blockElement.addClass(CLASS_GRID_BORDER_LEFT)
                    if widthBlock is Grid::size.width  - 1
                        blockElement.addClass(CLASS_GRID_BORDER_RIGHT)
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

    isLocked: (y,x) =>
        return Grid::blockArray[x][y].locked

    setLocked: (y,x) =>
        Grid::blockArray[x][y].locked = true
        console.log "LOCKING #{y} #{x}"

    unsetLocked: (y,x) =>
        Grid::blockArray[x][y].locked = false
        console.log "UNLOCKING #{x} #{y}"

    isObstacle: =>
        return Grid::blockArray[x][y].isObstacle


# ====================== END GRID ===========================

# ====================== START BLOCK =========================
class Block
    # PROPERTIES
    @size = null
    @htmlElement = null
    @locked = null
    @isObstacle = null
    # METHODS
    constructor: (@size) ->
        # console.log "New Block Created: (#{@size.height},#{@size.width})"
    assignHTMLElement: (block) =>
        @htmlElement = block
    getHTMLElement: =>
        return @htmlElement
    createBlock: () =>
        if @size.unit is UNIT_PIXEL
            block = $("<div class='block'>")
            block.width( @size.getWidthWithUnit() )
            block.height( @size.getWidthWithUnit() )
            @assignHTMLElement(block)
            @locked = false
            @isObstacle = false
            return block
    reset: =>
        @size.reset()
        @size = null
        @htmlElement.remove()
        @htmlElement = null
# ====================== END BLOCK ==========================
# =================== START SIZE =======================
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
        # console.log "New Size created: (#{@height},#{@width})"

    getWidthWithUnit: =>
        return @width + @unit
    getHeightWithUnit: =>
        return @height + @unit

    reset: =>
        @height = null
        @width = null
        @unit = null
# ========================= END SIZE =================

# ====================== START DICE ==========================
class Dice extends Block
    # INHERITED PROPERTIES
    # @size

    # PROPERTIES
    @bottomPosition = null
    @gridIndex_X = null
    @gridIndex_Y = null
    @orientation = null
    @htmlElement = null
    @animationLock = null
    # METHODS
    constructor: () ->
        @size = new Size("25","25",UNIT_PIXEL)
        @animationLock = false
        @gridIndex_X = randomNum(Grid::getGridWidth(),0)
        @gridIndex_Y = randomNum(Grid::getGridHeight(),0)  
        @orientation = new Orientation
        @createDice()
        console.log "New Dice created"
        
    createDice: () =>
        alreadyWon = true if @isGameWonSetup()

        @assignHTMLElement(@createBlock())

        if alreadyWon
            @reset()
            @constructor()

        Grid::setLocked(@gridIndex_X, @gridIndex_Y)

        @moveToGrid()
        console.log @gridIndex_X,@gridIndex_Y
        return @htmlElement

    moveToGrid: () =>
        faceUp = @getFaceUp()
        @htmlElement.text(faceUp)

        Grid::getBlockElement(
            @gridIndex_X, @gridIndex_Y
            ).getHTMLElement().append(@htmlElement)
        @isGameWon()

    reset: =>
        if @htmlElement isnt null
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
        if winningConditions.checkConditions(faceUp,@gridIndex_X,@gridIndex_Y)
            @getPlayer().addPoint()

    isGameWonSetup: =>
        faceUp = @getFaceUp()
        console.log "Checking if already won. FACEUP: #{faceUp}"
        winningConditions = Game::getWinningConditions()
        winningConditions.checkConditionsSetup(faceUp,@gridIndex_X,@gridIndex_Y)

    getPlayer: =>
        for player in Game::players
            if player.getDice() == this
                return player

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
        if @gridIndex_Y - 1 < 0
            console.log "Dice moving out of bounds"
            return
        else if Grid::isLocked(@gridIndex_X,@gridIndex_Y - 1)
            console.log "Space blocked"
            return
        else if @getAnimationLock()
            console.log "Animation lock in place"
        else
            # Unlock current and lock next block
            CurrentY = @gridIndex_Y
            CurrentX = @gridIndex_X
            NextY = @gridIndex_Y - 1
            NextX = @gridIndex_X

            Grid::setLocked(NextX, NextY)
            Grid::unsetLocked(CurrentX, CurrentY)

            # Change orientation
            oldFaceUp = @orientation.faceup
            @orientation.faceup = @orientation.down
            @orientation.bottom = 7 - @orientation.faceup
            @orientation.up = oldFaceUp
            @orientation.down = 7 - @orientation.up

            # Change grid index
            @gridIndex_Y = @gridIndex_Y - 1

            @animateDice(oldFaceUp, @orientation.faceup, "UP")

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
        if @gridIndex_Y + 1 >= Grid::getGridHeight()
            console.log "Dice moving out of bounds"
            return
        else if Grid::isLocked(@gridIndex_X,@gridIndex_Y + 1)
            console.log "Space blocked"
            return
        else if @getAnimationLock()
            console.log "Animation lock in place"
        else
            # Unlock current and lock next block
            CurrentY = @gridIndex_Y
            CurrentX = @gridIndex_X
            NextY = @gridIndex_Y + 1
            NextX = @gridIndex_X

            Grid::setLocked(NextX, NextY)
            Grid::unsetLocked(CurrentX, CurrentY)

            oldFaceUp = @orientation.faceup
            @orientation.faceup = @orientation.up
            @orientation.bottom = 7 - @orientation.faceup
            @orientation.down = oldFaceUp
            @orientation.up = 7 - @orientation.down

            # Change grid index
            @gridIndex_Y = @gridIndex_Y + 1

            @animateDice(oldFaceUp, @orientation.faceup, "DOWN")

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
        if @gridIndex_X - 1 < 0
            console.log "Dice moving out of bounds"
            return
        else if Grid::isLocked(@gridIndex_X - 1,@gridIndex_Y)
            console.log "Space blocked"
            return
        else
            # Unlock current and lock next block
            CurrentY = @gridIndex_Y
            CurrentX = @gridIndex_X
            NextY = @gridIndex_Y
            NextX = @gridIndex_X - 1

            Grid::setLocked(NextX, NextY)
            Grid::unsetLocked(CurrentX, CurrentY)

            # Change orientation
            oldFaceUp = @orientation.faceup
            @orientation.faceup = @orientation.right
            @orientation.bottom = 7 - @orientation.faceup
            @orientation.left = oldFaceUp
            @orientation.right = 7 - oldFaceUp

            # Change grid index
            @gridIndex_X = @gridIndex_X - 1

            @animateDice(oldFaceUp, @orientation.faceup, "LEFT")

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
        if @gridIndex_X + 1 >= Grid::getGridWidth()
            console.log "Dice moving out of bounds"
            return
        else if Grid::isLocked(@gridIndex_X + 1,@gridIndex_Y)
            console.log "Space blocked"
            return
        else
            # Unlock current and lock next block
            CurrentY = @gridIndex_Y
            CurrentX = @gridIndex_X
            NextY = @gridIndex_Y
            NextX = @gridIndex_X + 1

            Grid::setLocked(NextX, NextY)
            Grid::unsetLocked(CurrentX, CurrentY)

            # Change orientation
            oldFaceUp = @orientation.faceup
            @orientation.faceup = @orientation.left
            @orientation.bottom = 7 - @orientation.faceup
            @orientation.right = oldFaceUp
            @orientation.left = 7 - oldFaceUp

            # Change grid index
            @gridIndex_X = @gridIndex_X + 1 

            @animateDice(oldFaceUp, @orientation.faceup, "RIGHT")

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

    animateDice: (currentFaceup, nextFaceup, direction) =>
        animation = getToLeftAnimation(currentFaceup, nextFaceup)
        finalAnimation = rotateAnimation(animation, direction)

    rotateAnimation: (animation, direction) =>
        switch direction
            when up then console.log "Rotate 90 degrees clockwise"
            when down then  console.log "Rotate 270 degrees clockwise"
            when left then console.log "Rotate 0 degrees clockwise"
            when right then console.log "Rotate 180 degrees"

    getToLeftAnimation: (currentFaceup, nextFaceup) =>
        switch currentFaceup
            when 1
                switch nextFaceup
                    when 2 then console.log "Returning animation going to the left"
                    when 3 then console.log "Returning animation going to the left"
                    when 4 then console.log "Returning animation going to the left"
                    when 5 then console.log "Returning animation going to the left"
            when 2
                switch nextFaceup
                    when 1 then console.log "Returning animation going to the left"
                    when 3 then console.log "Returning animation going to the left"
                    when 4 then console.log "Returning animation going to the left"
                    when 6 then console.log "Returning animation going to the left"
            when 3
                switch nextFaceup
                    when 1 then console.log "Returning animation going to the left"
                    when 2 then console.log "Returning animation going to the left"
                    when 5 then console.log "Returning animation going to the left"
                    when 6 then console.log "Returning animation going to the left"
            when 4
                switch nextFaceup
                    when 1 then console.log "Returning animation going to the left"
                    when 2 then console.log "Returning animation going to the left"
                    when 5 then console.log "Returning animation going to the left"
                    when 6 then console.log "Returning animation going to the left"
            when 5
                switch nextFaceup
                    when 1 then console.log "Returning animation going to the left"
                    when 3 then console.log "Returning animation going to the left"
                    when 4 then console.log "Returning animation going to the left"
                    when 6 then console.log "Returning animation going to the left"
            when 6
                switch nextFaceup
                    when 2 then console.log "Returning animation going to the left"
                    when 3 then console.log "Returning animation going to the left"
                    when 4 then console.log "Returning animation going to the left"
                    when 5 then console.log "Returning animation going to the left"

    setAnimationLock: () =>
        @animationLock = true

    setAnimationUnlock: () => 
        @animationLock = false

    getAnimationLock: () =>
        return @animationLock


# ======================== END DICE ==================
# class Position
#     # PROPERTIES
#     @x = null
#     @y = null

#     # METHODS
#     constructor: (@x,@y) ->
#         if @x is null  or @y is null
#             console.log "MISSING X VARIABLE" unless @x?
#             console.log "MISSING Y VARIABLE" unless @y?
#             return
#         console.log "New Position created: (#{@x},#{@y})"

# ==================== START ORIENTATION ========================
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
# ================= END ORIENTATION =================

