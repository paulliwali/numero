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
        player1 = if window.player1? then window.player1.name else null
        player2 = if window.player2? then window.player2.name else null
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
        dice.orientation.assignHTMLElement($(".player-one .layout-container"))
        player1.setDice(dice)
        if player1 not in Game::players
            Game::addPlayer(player1)


        if Game::numberOfPlayers == 2
            if not window.player2?
                window.player2 = new Player(name2)
            dice2 = new Dice()
            player2.setDice(dice2)
            dice2.getHTMLElement().css("background",URL_FOR_DICE + "-2" + "/Dice-#{dice2.getFaceUp()}.png)")
            dice2.orientation.assignHTMLElement($(".player-two .layout-container"))
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
        number = $("<div class='col-xs-12 winning-number-condition'>").text("Land with this Number Facing up on the circle to win: " + @number)
        div.append(number)

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
                    @dice.moveRight()
                when 83
                    @dice.moveDown()
                when 65
                    @dice.moveLeft()
                when 87
                    @dice.moveUp()
        else if @id == 2
            switch e.keyCode
                when 39
                    @dice.moveRight()
                when 40
                    @dice.moveDown()
                when 37
                    @dice.moveLeft()
                when 38
                    @dice.moveUp()
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
    @animation = null
    @direction = null
    # METHODS
    constructor: () ->
        @size = new Size("25","25",UNIT_PIXEL)
        @animationLock = false
        @gridIndex_X = randomNum(Grid::getGridWidth(),0)
        @gridIndex_Y = randomNum(Grid::getGridHeight(),0)  
        @orientation = new Orientation
        @createDice()
        
    createDice: () =>
        alreadyWon = true if @isGameWonSetup()

        @assignHTMLElement(@createBlock())
        @htmlElement.addClass("block-dice")
        if alreadyWon
            @reset()
            @constructor()

        Grid::setLocked(@gridIndex_X, @gridIndex_Y)

        @moveToGrid()

        @bindAnimation(this)
        @orientation.updateDiceLayout()
        return @htmlElement

    bindAnimation:(Dice) =>
        @getHTMLElement().on "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", (e) ->
            Dice.getHTMLElement().removeClass().addClass("block-dice block")
            Dice.moveToGrid()
            Dice.setAnimationUnlock()

    moveToGrid: () =>
        faceUp = @getFaceUp()
        if @getPlayer()?
            @htmlElement.css("background",URL_FOR_DICE + "-#{@getPlayer().getID()}" + "/Dice-#{faceUp}.png)")
        else 
            @htmlElement.css("background",URL_FOR_DICE + "-1" + "/Dice-#{faceUp}.png)")

        @orientation.updateDiceLayout()
        Grid::getBlockElement(
            @gridIndex_X, @gridIndex_Y
            ).getHTMLElement().append(@htmlElement)
        @isGameWon()

    reset: =>
        if @htmlElement isnt null
            @htmlElement.unbind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd")
            @htmlElement.remove()
        @bottomPosition = null
        @gridIndex_X = null
        @gridIndex_Y = null
        @orientation = null
        @htmlElement = null
        @animation = null

    isGameWon: =>
        faceUp = @getFaceUp()
        winningConditions = Game::getWinningConditions()
        if winningConditions.checkConditions(faceUp,@gridIndex_X,@gridIndex_Y)
            @getPlayer().addPoint()

    isGameWonSetup: =>
        faceUp = @getFaceUp()
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
        if @getAnimationLock()
            console.log "Animation lock already held"
            return

        @setAnimationLock()

        # Error checking

        if @gridIndex_Y - 1 < 0
            console.log "Dice moving out of bounds"
            @setAnimationUnlock()
            return
        else if Grid::isLocked(@gridIndex_X,@gridIndex_Y - 1)
            console.log "Space blocked"
            @setAnimationUnlock()
            return
        else
            @direction  = "up"

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

            @animateDice(oldFaceUp, @orientation.faceup, "up")



    moveDown: () => 

        if @getAnimationLock()
            console.log "Animation lock already held"
            return

        @setAnimationLock()

        # Error checking
        if @gridIndex_Y + 1 >= Grid::getGridHeight()
            console.log "Dice moving out of bounds"
            return
        else if Grid::isLocked(@gridIndex_X,@gridIndex_Y + 1)
            console.log "Space blocked"
            @setAnimationUnlock()
            return
        else if not @getAnimationLock()
            console.log "Not holding animation lock"
            @setAnimationUnlock()
            return
        else
            @direction  = "down"

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

            @animateDice(oldFaceUp, @orientation.faceup, "down")


    moveLeft: () =>

        if @getAnimationLock()
            console.log "Animation lock already held"
            return

        @setAnimationLock()

        # Error checking
        if @gridIndex_X - 1 < 0
            console.log "Dice moving out of bounds"
            @setAnimationUnlock()
            return
        else if Grid::isLocked(@gridIndex_X - 1,@gridIndex_Y)
            console.log "Space blocked"
            @setAnimationUnlock()
            return
        else
            @direction = "left"
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

            @animateDice(oldFaceUp, @orientation.faceup, "left")


    moveRight: () =>

        if @getAnimationLock()
            console.log "Animation lock already held"
            return

        @setAnimationLock()

        # Error checking
        if @gridIndex_X + 1 >= Grid::getGridWidth()
            console.log "Dice moving out of bounds"
            @setAnimationUnlock()
            return
        else if Grid::isLocked(@gridIndex_X + 1,@gridIndex_Y)
            console.log "Space blocked"
            @setAnimationUnlock()
            return
        else
            @direction  = "right"
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

            @animateDice(oldFaceUp, @orientation.faceup, "right")


    animateDice: (currentFaceup, nextFaceup, direction) =>
        finalAnimation = @rotateAnimation(currentFaceup, nextFaceup, direction)
    rotateAnimation: (currentFaceup, nextFaceup, direction) =>
        switch direction
            when "up" then @htmlElement.addClass("rotate90")
            when "down" then  @htmlElement.addClass("rotate270")
            when "left" then @htmlElement.addClass("rotate0")
            when "right" then @htmlElement.addClass("rotate180")
        @htmlElement.addClass("rollDice#{currentFaceup}To#{nextFaceup}-v#{@getPlayer().id} #{direction}")
    setAnimationLock: () =>
        @animationLock = true

    setAnimationUnlock: () => 
        @animationLock = false

    getAnimationLock: () =>
        return @animationLock


# ======================== END DICE ==================

# ==================== START ORIENTATION ========================
class Orientation
    # PROPERTIES
    @faceup = null
    @bottom = null
    @down = null
    @up = null
    @left = null
    @right = null
    @htmlElement = null
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

    assignHTMLElement: (element) =>
        @htmlElement = element

    getHTMLElement: =>
        return @htmlElement

    updateDiceLayout: () =>
        if @htmlElement?
            @htmlElement.find(".dice-face").removeClass(DICE_FACE_ALL)
            @htmlElement.find(".front-face").addClass("face-#{@down}")
            @htmlElement.find(".left-face").addClass("face-#{@right}")
            @htmlElement.find(".current-face").addClass("face-#{@faceup}").addClass("active-face")
            @htmlElement.find(".right-face").addClass("face-#{@left}")
            @htmlElement.find(".back-face").addClass("face-#{@up}")

    reset: =>
        @htmlElement = null
        @faceup = null
        @bottom = null
        @down = null
        @up = null
        @left = null
        @right = null
# ================= END ORIENTATION =================

