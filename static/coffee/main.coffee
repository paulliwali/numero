$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # ----------
    blockSize = new Size(4,3,UNIT_BLOCK)
    
    window.grid = new Grid(blockSize)
    grid.createGrid()
    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    diceElement = dice.createDice()

    console.log grid.getGrid()
    $("body").keyup (e) ->
        console.log e.keyCode
        switch e.keyCode
            when 68 then dice.moveRight()
            when 83 then dice.moveDown()
            when 65 then dice.moveLeft()
            when 87 then dice.moveUp()

