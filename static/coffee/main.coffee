$ ->
    FastClick.attach(document.body)


$ ->
    size = new Size(100,100)
    block = new Block(size)
    dice = new Dice(size)
    player = new Player("Tom")
    grid = new Grid(size)
    dice.getSize()