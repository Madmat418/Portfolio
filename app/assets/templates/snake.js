<html>
  <head>
    <title>Watch out for snakes!</title>
	
	<script type="text/javascript"
	         src="jquery-1.9.1.js"></script>
    <script type="text/javascript"
	         src="underscore.js"></script>
	<script type="text/javascript"
	         src="snake.js"></script>
	<script type="text/javascript"
	         src="snake_ui.js"></script>
	<link rel="stylesheet" href="./snake.css"></link>
  </head>
  
  <body>
    <div id="grid"></div>
	<script>
	  $(function () { new SnakeGame.View($("#grid")).start()})
	</script>
  </body>  
</html>