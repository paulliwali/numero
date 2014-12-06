$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # ----------
    blockSize = new Size(5,7,UNIT_BLOCK)
    
    window.grid = new Grid(blockSize)
    grid.createGrid()
    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    diceElement = dice.createDice()
    dice.moveLeft()
    # blockElement = grid.getBlockElement(0,0)
    # blockElement.htmlElement.append(diceElement)

