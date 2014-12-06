randomNum = (max,min=0) ->

	return Math.floor(Math.random() * (max - min) + min)
	# min is set to 0 by default but a different value can be passed to function
 
randomise = () ->
	
	randomNum = @_randomNum(10)
	# returns a random integer between 0 and 10
	
	randomNumAlt = @_randomNum(10,5)
	# returns a random integer betwen 5 and 10