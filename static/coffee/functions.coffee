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

showGameWin = () ->
      swal({
          title: "You've Won!"
          type: "success"
      })

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

bindPlayerControls = (playerNumber,e) ->
      if playerNumber == 1
          switch e.keyCode
              when 68 then Game::dice.moveRight()
              when 83 then Game::dice.moveDown()
              when 65 then Game::dice.moveLeft()
              when 87 then Game::dice.moveUp()
      else if playerNumber == 2
          switch e.keyCode
              when 39 then Game::dice.moveRight()
              when 40 then Game::dice.moveDown()
              when 37 then Game::dice.moveLeft()
              when 38 then Game::dice.moveUp()

