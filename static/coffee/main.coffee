$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # < ========== >
    game = new Game()
    winningConditions = new WinningConditions()
    condition = winningConditions.addCondition(5,0,2)

    game.setWinningConditions(condition)
    console.log game




    blockSize = new Size(4,3,UNIT_BLOCK)
    
    grid = new Grid(blockSize)
    grid.createGrid()
    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    diceElement = dice.createDice()
    # dice.isGameWon()
    $("body").keyup (e) ->
        switch e.keyCode
            when 68 then dice.moveRight()
            when 83 then dice.moveDown()
            when 65 then dice.moveLeft()
            when 87 then dice.moveUp()


