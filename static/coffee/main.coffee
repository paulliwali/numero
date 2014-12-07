$ ->
    FastClick.attach(document.body)

$ ->

    $(".go-to-game").click (e)->
        e.preventDefault()
        startGameMessage()
        


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

        # Reset the game if it's an active game
        if Game::isActiveGame is true
            $("body").unbind("keyup")
            Game::resetGame()


        # TODO: Move to Grid class
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

        window.player1 = new Player("Pua")
        dice = new Dice()
        player1.setDice(dice)

        Game::dice = dice

        console.log Game::
        console.log Grid::
        console.log player1

        $("body").keyup (e) ->
            switch e.keyCode
                when 68 then Game::dice.moveRight()
                when 83 then Game::dice.moveDown()
                when 65 then Game::dice.moveLeft()
                when 87 then Game::dice.moveUp()
