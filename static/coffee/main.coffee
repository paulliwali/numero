$ ->
    FastClick.attach(document.body)


$ ->

    # Global
    # ----------
    blockSize = new Size(3,3,UNIT_BLOCK)
    

    grid = new Grid(blockSize)
    grid.createGrid()
    console.log grid.blockArray

    
