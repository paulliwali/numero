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

bindPlayerControls = (player,e) ->
      if player.getID() == 1
          switch e.keyCode
              when 68 then player.getDice().moveRight()
              when 83 then player.getDice().moveDown()
              when 65 then player.getDice().moveLeft()
              when 87 then player.getDice().moveUp()
      else if player.getID()== 2
          switch e.keyCode
              when 39 then player.getDice().moveRight()
              when 40 then player.getDice().moveDown()
              when 37 then player.getDice().moveLeft()
              when 38 then player.getDice().moveUp()

