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


startGameMessage = () ->
  swal({   
    title: "Numero!",  
    text: "Do you wanna play?",   
    type: "info",   
    showCancelButton: true,   
    confirmButtonColor: "#5CB85C",   
    confirmButtonText: "Let's Play!",   
    cancelButtonText: "I don't want to play ):",   
    closeOnConfirm: true,   
    closeOnCancel: false 
    }, (isConfirm) ->
      if isConfirm
        console.log 'test'
    )

addConditionInViewableBox = (condition) ->
      ELEMENT_CONDITIONS_CONTAINER.append(condition)