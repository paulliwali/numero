$ ->
    FastClick.attach(document.body)

$ ->

    # Global
    # < ========== >
    game = new Game()
    winningConditions = new WinningConditions()
    winningConditions.addCondition(5,0,2)

    game.setWinningConditions(winningConditions)

    blockSize = new Size(2,2,UNIT_BLOCK)
    

    grid = new Grid(blockSize)
    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    
    # dice.isGameWon()
    $("body").keyup (e) ->
        switch e.keyCode
            when 68 then dice.moveRight()
            when 83 then dice.moveDown()
            when 65 then dice.moveLeft()
            when 87 then dice.moveUp()


