$ ->
    FastClick.attach(document.body)

$ ->
    setTimeout ( ->
        startGameMessage()

    ),200
    # Global
    # < ========== >

    blockSize = new Size(4,4,UNIT_BLOCK)
   
    grid = new Grid(blockSize)

    $("body").keyup (e) ->
        switch e.keyCode
            when 68 then Game::dice.moveRight()
            when 83 then Game::dice.moveDown()
            when 65 then Game::dice.moveLeft()
            when 87 then Game::dice.moveUp()

    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)

    $("#gameOptions .number-players button").click ->
        ELEMENT_GAME_OPTIONS_NUM_PLAYERS.find("."+CLASS_ACTIVE)
                                                                             .removeClass(CLASS_ACTIVE)
        $(this).addClass(CLASS_ACTIVE)
    $("#gameOptions .board-size button").click ->
        ELEMENT_GAME_OPTIONS_BOARD_SIZE.find("."+CLASS_ACTIVE)
                                                                             .removeClass(CLASS_ACTIVE)
        $(this).addClass(CLASS_ACTIVE)

    $(".start-game").click ->
        boardSize = $(".board-size .active").val()
        numberPlayers = $(".number-players .active").val()
        $("#gameOptions").modal("hide")

        if Game::isActiveGame is true
            Game::resetGame()

        # Create the new Game board
        Game::isActiveGame = true
        Game::boardSize = boardSize
        if boardSize is BOARD_SIZE_MEDIUM
            blockSize = new Size(4,4,UNIT_BLOCK)
        else if boardSize is BOARD_SIZE_SMALL
            blockSize = new Size(3,3,UNIT_BLOCK)
        else if boardSize is BOARD_SIZE_LARGE
            blockSize = new Size(5,5,UNIT_BLOCK)
        else
            sizeX = randomNum(6,3)
            sizeY = randomNum(6,3)
            blockSize = new Size(sizeX,sizeY,UNIT_BLOCK)

        Game::boardSize = blockSize

        # Draw the Grid for the board
        Grid::createGridStarter(blockSize)

        # Set the victory conditions
        winningConditions = new WinningConditions()
        winningConditions.addCondition()

        Game::setWinningConditions(winningConditions)


        diceSize = new Size("25","25",UNIT_PIXEL)
        dice = new Dice(diceSize)
        Game::dice = dice

        console.log Game::
        console.log Grid::
