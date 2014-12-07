#================
# FUNCTIONS
#================


# GENERIC FUNCTIONS
# ==============
randomNum = (max,min=0) ->

    return Math.floor(Math.random() * (max - min) + min)
    # min is set to 0 by default but a different value can be passed to function
 
randomise = () ->
    
    randomNum = @_randomNum(10)
    # returns a random integer between 0 and 10
    
    randomNumAlt = @_randomNum(10,5)
    # returns a random integer betwen 5 and 10

sleep = (ms) ->
  start = new Date().getTime()
  continue while new Date().getTime() - start < ms

showGameWin = () ->
  swal({   
    title: "You've Won!",  
    text: "Do you want to play again?",   
    type: "success",   
    showCancelButton: true,   
    confirmButtonColor: "#5CB85C",   
    confirmButtonText: "Play Again!",   
    cancelButtonText: "No More QQ",   
    closeOnConfirm: true,   
    closeOnCancel: false 
    }, (isConfirm) ->
      if isConfirm
        Game::newGame()
        Game::addNewPlayers("PlayerA","PlayerB")
      else 
        swal({   
          title: "You mean you want to play again?!",
          text: "Let's play!",  
          timer: 2000 
          })
        Game::newGame()
        Game::addNewPlayers(window.player1.name)
    )

showMessage = (message) ->
      swal({
          title: "Yes!"
          text: message
          type: "success"
      })

showError = (error) ->
      swal({
          title: "Oops!"
          text: error
          type: "failure"
      })


$.fn.goto = ->
      $("html, body").animate
        scrollTop: $(this).offset().top + "px"
      , "slow"
      this
      return 


# Page Functions
# ===========
startGameMessage = () ->
  swal({   
    title: "Numero!",  
    text: "Do you wanna play?",   
    type: "info",   
    showCancelButton: true,   
    confirmButtonColor: "#5CB85C",   
    confirmButtonText: "Let's Play!",   
    cancelButtonText: "I don't want to play QQ",   
    closeOnConfirm: true,   
    closeOnCancel: false 
    }, (isConfirm) ->
      if isConfirm
        $("#game").goto()
        $("#gameOptions").modal("show")
    )

addConditionInViewableBox = (condition) ->
      ELEMENT_CONDITIONS_CONTAINER.append(condition)
