window.odometerOptions =
      auto: false # Don't automatically initialize everything with class 'odometer'
      selector: ".score" # Change the selector used to automatically find things to be animated
      format: "(,ddd)" # Change how digit groups are formatted, and how many digits are shown after the decimal point
      duration: 2000 # Change how long the javascript expects the CSS animation to take
      theme: "default" # Specify the theme (if you have more than one theme css file on the page)
      animation: "count" # Count is a simpler animation method which just increments the value,
    # use it when you're looking for something more subtle.
