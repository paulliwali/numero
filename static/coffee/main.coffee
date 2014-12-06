$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # ----------
    blockSize = new Size(2,2,UNIT_BLOCK)
    
    window.grid = new Grid(blockSize)
    grid.createGrid()
    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    diceElement = dice.createDice()
    dice.moveDown()
    # blockElement = grid.getBlockElement(0,0)
    # blockElement.htmlElement.append(diceElement)

