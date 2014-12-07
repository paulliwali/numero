$ ->
    FastClick.attach(document.body)

$ ->
    setTimeout ( ->
        startGameMessage()

    ),200
    # Global
    # < ========== >

    



    $("body").keyup (e) ->
        switch e.keyCode
            when 68 then dice.moveRight()
            when 83 then dice.moveDown()
            when 65 then dice.moveLeft()
            when 87 then dice.moveUp()

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
        game = new Game()
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
        grid = new Grid(blockSize)

        # Set the victory conditions
        winningConditions = new WinningConditions()
        winningConditions.addCondition()

        game.setWinningConditions(winningConditions)

        console.log game

        diceSize = new Size("25","25",UNIT_PIXEL)
        dice = new Dice(diceSize)

        Game::dice = dice
