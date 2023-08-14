window.onload = function()/*onload to do function in appear to the window.*/
{ 
	
	var canvasWidth=900;
	var canvasHeight=600;
	var blocksize=20;//size in pixel on 1 block
    var ctx;
    var delay=150;// 1 seconde
	var snakee;//name of our snake
	var applee;
	var widthInBlock=canvasWidth/blocksize;//numberof block per line
	var heighthInBlock=canvasHeight/blocksize;//number of block per colone
	var timeout;//stock the setTimeout
	var score;
	var best_score;

	
	init();
	
	function init(){ //creation canvas
		
	var canvas=document.createElement("canvas");//canvas is a graphic zone 
	canvas.width=canvasWidth;
	canvas.height=canvasHeight;
    canvas.style.border="30px solid gray";
	canvas.style.margin="50px auto";
	canvas.style.display="block";
	canvas.style.backgroundColor="#ddd";//background color
    document.body.appendChild(canvas);
	ctx =canvas.getContext("2d");
	snakee=new snake([[6,4],[5,4],[4,4]],"right");//default size our snake,index 0 is the head of snake and default direction to right.
	applee=new Apple([10,10]);//Apple with position
	score=0;
	refresh_canvas();
		
	}
	
 function refresh_canvas() //to refresh the snake positoin and advance
{
	snakee.advance();// make a new position
	if(snakee.checkcollision()==true)//game over
		{  gameOver(); }
	else{
		if(snakee.isEatApple(applee))//if snake eat the apple
			{ score++;
			 
				do{
				applee.setNewPosition();
				applee.isOnSnake(snakee);
				}while(applee.isOnSnake(snakee)==true);
			 
				snakee.ateApple=true;
			}
		
	ctx.clearRect(0,0,canvasWidth,canvasHeight);//to clear our canvas
	drawScore();//its important to put this function before snakee.draw and applee.draw because we want the snake and the apple draw front the score.
    snakee.draw();//draw our snake
    applee.draw();//draw the applee
   timeout = setTimeout(refresh_canvas,delay);
	}
 }
	function gameOver()
	{
		ctx.save();
			ctx.font="bold 55px sans-serif";//police and size
		ctx.fillStyle="black";//color
		ctx.textAlign="center";
		ctx.textBaseline="middle";//middle to canvas
		ctx.strokeStyle="white";//contour
		ctx.lineWidth=5;//epaisseur
		var centerX=canvasWidth/2;
		var centerY=canvasHeight/2;
		ctx.strokeText("Game over",centerX,centerY-150);//to print in the canvas stroke  
		ctx.fillText("Game over",centerX,centerY-150);
		
		ctx.font="bold 45px sans-serif";//police and size
		ctx.strokeText("press space to restart.",centerX,centerY+180);
		ctx.fillText("press space to restart.",centerX,centerY+180);
		
			if(score>best_score)
			{
				best_score=score;
			}
		
				ctx.font="bold 45px sans-serif";//police and size
		ctx.strokeText("Best score"+best_score.toString(),centerX,centerY+150);//to print in the canvas stroke  
		ctx.fillText("Best score"+best_score.toString(),centerX,centerY+150);
		ctx.restore();
	}
	function drawScore()
	{
		ctx.save();
	
		ctx.font="bold 200px sans-serif";//police and size
		ctx.fillStyle="gray";//color
		ctx.textAlign="center";
		ctx.textBaseline="middle";//middle to canvas
		var centerX=canvasWidth/2;
		var centerY=canvasHeight/2;
		ctx.fillText(score.toString(),centerX,centerY);
	

		ctx.restore();
	}
	
	function restart()
	{	score=0;
		snakee=new snake([[6,4],[5,4],[4,4]],"right");//default size our snake,index 0 is the head of snake and default direction to right.
	applee=new Apple([10,10]);//Apple with position
	 clearTimeout(timeout); 
	refresh_canvas();
		
	}
	
	function drawBlock(ctx,position)
	{
		var x=position[0]*blocksize;//position  x * the pixels we choose.
		var y=position[1]*blocksize;//position  y * the pixels we choose.
		ctx.fillRect(x,y,blocksize,blocksize);
	}

	function snake(body,direction)//constructor snake
	{
		this.direction=direction;
		this.body=body;
		this.ateApple==false;
		
		this.draw=function() // to draw our snake on the screen
		{
			ctx.save();//to save the precedly body;
			ctx.fillStyle="#F72C00";  //color
			for (var i=0;i<this.body.length;i++)//size of snakee
				{
					drawBlock(ctx,this.body[i])//;draw the snake in context, and need position  
				}
			ctx.restore();// draw on the context and restore the new context
		};
		
		this.advance=function() //to moove our snake
		{
			var nextposition=this.body[0].slice();//copy the body[0]
			switch(this.direction)
				{
					case "left":
					nextposition[0]--;// change the coordonate x;
						break;
					case "right":
					nextposition[0]++;//change the coordonate x;
						break;
					case "down":
					nextposition[1]++;//change the coordonate y;
						break;
					case "up":
					nextposition[1]--;//change the coordonate y;
						break;
					default:
						throw("invalid direction");
						
				}
		
			this.body.unshift(nextposition);//add next position to body;
			if(!this.ateApple)//if snake dont eat the apple
			this.body.pop();//delete the last element of our array;
			else //if snake eat the apple dont do pop to grow up the snake
				{
					this.ateApple=false;
				}
		};
		
		this.setDirection=function(newDirection)
		{
			var allowedDirections;//not all direction is allowed.
			
			if(this.direction===newDirection)
					  {  
					  delay=45;
					  }
					   
			switch(this.direction)
				{
					case "left":
					case "right":
					allowedDirections=["up","down"];
						break;
					case "down":
					case "up":
					allowedDirections=["left","right"];
						break;	
					default:
						throw("invalid direction");
				}
			
			if(allowedDirections.indexOf(newDirection)>-1)//return -1 if newDirection is not in allowedDirection.
				{
					
			this.direction=newDirection;
					delay=150;
				}
		};
		
		this.checkcollision=function()
		{
			var wallcollision=false;
			var snakecollision=false;
			var rest=this.body.slice(1);
			var head=this.body[0];
			var snakeX=head[0];
			var snakeY=head[1];
			var minX=0;
			var minY=0;
			var maxX=widthInBlock-1;
			var maxY=heighthInBlock-1;
			
			if(snakeX<minX || snakeY<minY || snakeX>maxX || snakeY>maxY)//if snake goes out if frame.
			{wallcollision=true;}
			
			for(var i=0;i<rest.length;i++)
				{
					if(snakeX===rest[i][0] && snakeY===rest[i][1])
					{snakecollision=true;}
				}
				
			return wallcollision||snakecollision;//retur if he have a collision with himsel or with the border of the land.
		
		};
		this.isEatApple=function(apple_to_eat)
		{
			var head=this.body[0];
			if(head[0]===apple_to_eat.position[0] && head[1]===apple_to_eat.position[1])
				return true;
			else
				return false;
			
			
		}
			
	}
	
	function Apple(position)//constructor apple
	{
		this.position=position;
		this.draw=function()
		{
			ctx.save();
			ctx.fillStyle="#33cc33";
			ctx.beginPath();
			var radius=blocksize/2; //radius of circle in one block
			var x=this.position[0]*blocksize+radius; //middle x of the block.
			var y=this.position[1]*blocksize+radius;//middle y of the block  
			ctx.arc(x,y,radius,0,Math.PI*2,true);//to create a circle in block,center * blocksize*radius
			ctx.fill();//remplir le cercle
			ctx.restore();
		}
		this.setNewPosition=function()//random position apple
		{
			var newX=Math.round(Math.random()*(widthInBlock-1));//random position
			var newY=Math.round(Math.random()*(heighthInBlock-1));//random position
			this.position=[newX,newY];//return the position
		};
		this.isOnSnake=function(snakeToCheck)//check if the random apple appear on the position to our snake
		{
			var isOnSnake=false;
			for(var i=0;i<snakeToCheck.body.length;i++)
				{
					if(this.position[0]===snakeToCheck.body[i][0] && this.position[0]===snakeToCheck.body[i][1])
						{
							isOnSnake=true;
						}
				}
			return isOnSnake;
			
		};
	}
	

document.onkeydown=function handleKeyDown(e)//to control the snake when player press on touch. 
{
	var key=e.keyCode;//code when the touch is press;
	var newDirection;//to know the direction
	switch(key)// we just want the directionaly touch
		{
			case 37:
				newDirection="left";
				break;
			case 38:
				newDirection="up";
				break;
			case 39:								         			newDirection="right";
				break;
			case 40:
				newDirection="down";
				break;
			case 32://code to press space to restart the game
				restart();
				return;
			default:
				return;
		}
	snakee.setDirection(newDirection);//send the direction that the player press.
}
	
}