//start of timer
var start=new Date().getTime();

//initialising canvas elements
var canvas=document.querySelector('canvas');
canvas.width = window.innerWidth-4;
canvas.height = window.innerHeight-130;
var c=canvas.getContext('2d');

//xhead, yhead are coordinates of head of snake ;speed is speed of snake
var snakesize=40,ballsize=1,score=0,xhead,yhead,speed=2;

//setting timer of 10 seconds for each ball
var time=setInterval(function(){
    var now=new Date().getTime();
    var d=Math.floor((now-start)/1000);
    if(d%10==0 && d!==0)
    {
        ballArray[0].x=(Math.random()*(canvas.width-2*ballArray[0].radius))+ballArray[0].radius;
        ballArray[0].y=(Math.random()*(canvas.height-2*ballArray[0].radius))+ballArray[0].radius;
    }
},1000);

//setting keyboard keys for direction
window.addEventListener('keydown',function(event){
    
    if(event.keyCode==38)//up
    {
        snakeArray[0].dx=0;
        snakeArray[0].dy=-1*speed; 
    }
    else if(event.keyCode==37)//left
    {
        snakeArray[0].dx=-1*speed;
        snakeArray[0].dy=0; 
    }
    else if(event.keyCode==39)//right
    {
        snakeArray[0].dx=speed;
        snakeArray[0].dy=0; 
    }
    else if(event.keyCode==40)//down
    {
        snakeArray[0].dx=0;
        snakeArray[0].dy=speed; 
    }
})

//setting plus mark if score>=100
function Plus(x1,y1,x2,y2,co,status){
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
    this.color=co;
    this.status=status;
    this.draw=function(){
        c.beginPath();
        c.moveTo(this.x1,this.y1);
        c.lineTo(this.x2,this.y2);
        c.lineWidth = 5;
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }
    this.update=function(){
        this.draw();
    }
}

//setting twinkling ball
function Balls(x,y,radius,color,distance){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;
    this.distance=distance;
    this.draw=function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        c.strokeStyle ='black';
        c.stroke();  
        c.fillStyle=this.color;
        c.fill();
        c.closePath();
    }
    this.update=function(){
        this.distance=Math.sqrt( Math.pow((this.x -xhead-5),2)+Math.pow((this.y-yhead-5),2) )-this.radius-5;//distance b/w ball and snake head
        this.radius=Math.random()*2+5;//to twinkle the ball

        if(this.distance<=0)//condition when snake eats the ball
        {
            start=new Date().getTime();//starting time again
            score+=10;
            snakesize+=10;
            this.x=(Math.random()*(canvas.width-2*this.radius))+this.radius;
            this.y=(Math.random()*(canvas.height-2*this.radius))+this.radius;
            var l=snakeArray.length;
            for(var j=0;j<10;j++)//adding 10 blocks to snake
            {
                var x=undefined;
                var y=undefined;
                var hei=10;
                var wid=10;
                var color='#ff3300';
                var dx=undefined;
                var dy=undefined;
                snakeArray.push(new Snakeblock(l+j,x,y,hei,wid,color,dx,dy));
            }
            if(score>=100)//conditions when score>=100
            {
                if(score%100==0)
                 speed++;
                plusArray[0].status=1;
                plusArray[1].status=1;
            }
        }
        document.getElementById("score").innerHTML="<b> &nbsp&nbsp YOUR SCORE:&nbsp&nbsp&nbsp"+score+"</b>";//scoreboard
        this.draw();
    }
}

//setting square blocks of snake
function Snakeblock(i,x,y,hei,wid,color,dx,dy){
    this.i=i;
    this.x=x;
    this.y=y;
    this.height=hei;
    this.width=wid;
    this.color=color;
    this.dx=dx;
    this.dy=dy;
    this.i=i;
    this.draw=function(){
        c.beginPath();
        c.fillRect(this.x,this.y,this.width,this.height);
        c.strokeStyle='black';
        c.stroke();
        c.fillStyle=this.color;
        c.fill();
        c.closePath();
    }
    this.update=function(){
    
        if(this.i!==0)//if not head copy coordinates of previous block
        {
            this.x=snakeArray[this.i -1].x;
            this.y=snakeArray[this.i -1].y;
        }
        else
        {
            this.x+=this.dx;
            this.y+=this.dy;
            if(this.x<=0 || this.x+10>=canvas.width || this.y<=0 || this.y+10>=canvas.height)//when snake hits canvas walls
                window.open("end.html","_self");

            //when snake hits plus     
            if(score>=100 && this.x+5>=canvas.width/4 && this.x+5<=3*canvas.width/4 && this.y+5>=canvas.height/2-5 && this.y+5<=canvas.height/2+5)    
                window.open("end.html","_self");            
            if(score>=100 && this.x+5>=canvas.width/2-5 && this.x+5<=canvas.width/2+5 && this.y+5>=canvas.height/4 && this.y+5<=3*canvas.height/4)    
                window.open("end.html","_self");    

            xhead=this.x;
            yhead=this.y;
        }
        if((this.i)%10==0)//setting scales on the body of snake
            this.color="#ffff4d";

        this.draw();
    }
}

//setting buttons on screen for movements
function moveUp()
{
    snakeArray[0].dx=0;
    snakeArray[0].dy=-1*speed; 
}
function moveLeft()
{
    snakeArray[0].dx=-1*speed;
    snakeArray[0].dy=0; 
}
function moveRight()
{
    snakeArray[0].dx=speed;
    snakeArray[0].dy=0; 
}
function moveDown()
{
    snakeArray[0].dx=0;
    snakeArray[0].dy=speed; 
}

//creating snake object as collection of square blocks
var snakeArray=[];
for(var i=0;i<snakesize;i++)
{
    if(i==0)
    {
        var x=canvas.width/2;
        var y=canvas.height/2;
    }
    else
    {
        var x=snakeArray[i-1].x-10;
        var y=snakeArray[i-1].y;
    }
    var hei=10;
    var wid=10;
    var dx=speed;
    var dy=0;
    var color='#ff3300'; 
    snakeArray.push(new Snakeblock(i,x,y,hei,wid,color,dx,dy));
}

//creating ball object
var ballArray=[];
for(var j=0;j<ballsize;j++)
{
    var radius=5;
    var x=(Math.random()*(canvas.width-2*radius))+radius;
    var y=(Math.random()*(canvas.height-2*radius))+radius;
    var color='#ffff00';
    var distance=undefined;
    ballArray.push(new Balls(x,y,radius,color,distance));
}

//creating plus object
var plusArray=[];
var co='green';
var status=0;
plusArray.push(new Plus(canvas.width/4, canvas.height/2, 3*canvas.width/4, canvas.height/2, co, status));
plusArray.push(new Plus(canvas.width/2, canvas.height/4, canvas.width/2, 3*canvas.height/4, co, status));

//creating animate function which runs recursively many times a second, 
//erases previous canvas contents, and calls objects recursively for updates
function animate(){

    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    //setting condition when snake bites itself
    for(var q=1;q<snakeArray.length;q++)
    {
        if( snakeArray[0].x ==snakeArray[q].x && snakeArray[0].y==snakeArray[q].y )
        {
            window.open("end.html","_self");
        }
    }

    //call for update of snake blocks
    for(var i=snakeArray.length-1;i>=0;i--){
        snakeArray[i].update();
    }  

    //call for update of ball
    for(var j=0;j<ballsize;j++){
        ballArray[j].update();
    }

    //call for update of plus(not required)
    for(var k=0;k<2;k++){
        if(plusArray[k].status==1)
         plusArray[k].update();
    }
}
animate();//whole code begins with this call!!!