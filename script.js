window.onload = function()/*onload to do function in appear to the window.*/
{ 
	
	var canvasWidth=900;
	var canvasHeight=600;
	var blocksize=30;
    var ctx;
    var delay=100;// 1 seconde
	var xCoord=0;
	var yCoord=0;
	
	init();
	
	function init(){
	var canvas=document.createElement("canvas");
	canvas.width=canvasWidth;
		canvas.height=canvasHeight;
    canvas.style.border="1px solid";
    document.body.appendChild(canvas);
	ctx =canvas.getContext("2d");
	refresh_canvas();}
	
 function refresh_canvas(){ //to move the snake
	 xCoord+=5;	
	 yCoord+=5;
	ctx.clearRect(0,0,canvasWidth,canvasHeight);//to clear our canvas
	ctx.fillStyle="#F72C00";  //color
	ctx.fillRect(xCoord,yCoord,100,50); //creeate a rectangle in 2 dimension (x,y,with,height) for position
	 setTimeout(refresh_canvas,delay);}
	
	function snake(body){
		
		this.body=body;
		this.draw=function()
		{
			ctx.save();//to save the precedly body;
				ctx.fillStyle="#F72C00";  //color

		}
	}
}
