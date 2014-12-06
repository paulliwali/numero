$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # ----------
<<<<<<< HEAD
    blockSize = new Size(2,2,UNIT_BLOCK)
    

=======
    blockSize = new Size(3,3,UNIT_BLOCK)
>>>>>>> 6811d3a367c73440fb4bae57966eaff19a6d7f1f
    grid = new Grid(blockSize)
    grid.createGrid()

    diceSize = new Size("25","25",UNIT_PIXEL)
    dice = new Dice(diceSize)
    diceElement = dice.createDice()
    blockElement = grid.getBlockElement(0,0)
    blockElement.htmlElement.append(diceElement)
    dice.assignHtmlElement(diceElement)
