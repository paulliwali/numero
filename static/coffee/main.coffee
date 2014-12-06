$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # ----------
    blockSize = new Size(2,2,UNIT_BLOCK)
    

    grid = new Grid(blockSize)
    grid.createGrid()

    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    diceElement = dice.createDice()
    grid.getBlockElement(0,0).htmlBlock.append(diceElement)
