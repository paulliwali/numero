$ ->
    FastClick.attach(document.body)

    # stop page scrolling for now with arrow keys
    $(document).keydown (e) ->
      ar = new Array(33, 34, 35, 36, 37, 38, 39, 40)
      key = e.which
      
      if $.inArray(key, ar) > -1
        e.preventDefault()
        return false
      true


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
        Game::players = []
        # Draw the Grid for the board
        Grid::createGridStarter(blockSize)

        # Set the victory conditions
        winningConditions = new WinningConditions()
        winningConditions.addCondition()

        Game::setWinningConditions(winningConditions)
        window.player1 = new Player("Pua")
        window.player2 = new Player("Brian")

        dice = new Dice()
        dice2 = new Dice()
        player1.setDice(dice)
        player2.setDice(dice2)
        Game::addPlayer(player1)
        Game::addPlayer(player2)

        console.log Game::
        console.log Grid::
        console.log player1

        $("body").on "keyup", (e) ->
            player1.bindControls(e)
            player2.bindControls(e)


