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
        boardSize = if $(".board-size .active").val() is "" then "small" else $(".board-size .active").val()
        numberPlayers = if $(".number-players .active").val() is "" then "1" else $(".number-players .active").val()


        $("#gameOptions").modal("hide")
        
        Game::boardSize = boardSize
        Game::numberOfPlayers = parseInt(numberPlayers)

        Game::newGame()

        Game::addNewPlayers("Player 1","Player 2")

        $(".scores").show()
        $(".dice-layout").show()

