//DOM
const canvas = document.querySelector('.canvas');


//canvas shi
const bb = canvas.getContext('2d');

//WAs


//game object class
class GameObject {
   constructor(x,y,width,height,style) {
      this.x = x;
      this.y = y;
      this.dx = 0;
      this.dy = 0;
      this.vx = 0.1;
      this.vy = 0.1;
      this.width = width;
      this.height = height;
      this.style = style;
      this.direction = null;
   }
   
   static gameObjects = []
   static enemies = []
   static projectiles = []
   isMoving = false
   
   render(ctx) {
      ctx.fillStyle = this.style;
      ctx.fillRect(this.x,this.y,this.width,this.height);
   }
   
   moving() {
      if(this.isMoving) {
         this.x += this.dx;
         this.y +=this.dy;
         this.dx +=this.vx;
         this.dy += this.vy;
      }
   }
   
   getCoords() {
      return({
         x:this.x,
         y:this.y,
         width:this.width,
         height:this.height
      })
   }
   
}

//player class
class Player extends GameObject {
   constructor() {
      super();
      this.x = 225;
      this.y = 130;
      this.dx = 0;
      this.dy = 0;
      this.vx = 0;
      this.vy = 0;
      this.width = 20;
      this.height = 20;
      this.style = 'red';
      this.direction = 'left';
   }
   
   
}

const player = new Player();

//input handling
//keyboard btns
const handleKeyDown = key => {
   player.isMoving = true;
   switch (key) {
        case 'ArrowUp':
        player.dy = -1;
        player.vy = (player.dy/4);
        player.direction = 'up';
        break;
        case 'ArrowDown':
        player.dy = 1;
        player.vy = (player.dy/4);
        player.direction = 'down';
        break;
        case 'ArrowLeft':
        player.dx = -1;
        player.vx = (player.dx/4);
        player.direction = 'left';
        break;
        case 'ArrowRight':
        player.dx = 1;
        player.vx = (player.dx/4);
        player.direction = 'right';
        break;
        case 'w':
        player.dy = -1;
        player.vy = (player.dy/4);
        player.direction = 'up';
        break;
        case 's':
        player.dy = 1;
        player.vy = (player.dy/4);
        player.direction = 'down';
        break;
        case 'a':
        player.dx = -1;
        player.vx = (player.dx/4);
        player.direction = 'left';
        break;
        case 'd':
        player.dx = 1;
        player.vx = (player.dx/4);
        player.direction = 'right';
        break;
        case 'Enter':
        player.shoot();
        break;
        case 'f':
        player.shoot();
        break;
        case 'Shift':
        player.reload();
        break;
        case 'Backspace':
        player.resupply();
        break;
        case 'e':
        player.resupply();
        break;
        case 'r':
        player.reload();
        break;
    }
}

const handleKeyUp = () => {
   player.isMoving = false;
    player.dx = 0;
    player.dy = 0;
    player.vx = 0;
    player.vy = 0;
}

window.addEventListener('keydown',e => {
   e.preventDefault();
   let key = e.key
   handleKeyDown(key);
})

window.addEventListener('keyup',e => {
   e.preventDefault();
   handleKeyUp();
})

//game loop
const FPS = 30;
const frameTime = 1000/FPS;
let previousTime = 0;
function gameLoop(timestamp) {
   const deltaTime = timestamp - previousTime;
   if(deltaTime >= frameTime) {
      bb.clearRect(0,0,canvasWidth,canvasHeight);
      previousTime = timestamp - (deltaTime % frameTime);
      //your methods
      map.setMapData();
      map.render(bb);
      player.render(bb);
      player.moving();
   }
   Map.start = requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)