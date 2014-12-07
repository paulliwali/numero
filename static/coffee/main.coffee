$ ->
    FastClick.attach(document.body)

$ ->

    # Global
    # < ========== >
    game = new Game()


    blockSize = new Size(4,4,UNIT_BLOCK)
    

    grid = new Grid(blockSize)

    winningConditions = new WinningConditions()
    winningConditions.addCondition()

    game.setWinningConditions(winningConditions)
    
    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    



    $("body").keyup (e) ->
        switch e.keyCode
            when 68 then dice.moveRight()
            when 83 then dice.moveDown()
            when 65 then dice.moveLeft()
            when 87 then dice.moveUp()


