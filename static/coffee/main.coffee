$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # ----------
    blockSize = new Size(6,6,UNIT_BLOCK)
    

    grid = new Grid(blockSize)
    grid.createGrid()
    console.log grid.blockArray

    
