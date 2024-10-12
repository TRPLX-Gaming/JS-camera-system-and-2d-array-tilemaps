//import {room1, room2, room3} from './modules/scripts/BB-maps.js'

class Tile {
   constructor(x,y,tilesize) {
      this.x = x;
      this.y = y;
      this.tilesize = tilesize;
      this.type = 'lightgray';
   }
   
   render(ctx) {
      ctx.fillStyle = this.type;
      ctx.fillRect(this.x,this.y,this.tilesize,this.tilesize);
   }
}

class EmptyTile extends Tile {
   constructor(x,y,tilesize) {
      super(x,y,tilesize);
   }
}

class WallTile extends Tile {
   constructor(x,y,tilesize) {
      super(x,y,tilesize);
      this.type = 'darkslategray';
   }
}

class Map {
   constructor(width,height) {
      this.width = width;
      this.height = height;
      this.tilesize = 25;
      this.setMapData();
   }
   
   static level = 2;
   static start
   tilemap
   tileX
   tileY
   tileWidth
   tileHeight
   
   setMapData() {
      if(Map.level === 1) {
         this.tilemap = room1;
      } else if(Map.level === 2) {
         this.tilemap = room2;
      } else if(Map.level === 3) {
         this.tilemap = room3;
      }
   }
   
   render(ctx) {
      for(let y=0; y<this.height/this.tilesize; y++) {
         for(let x=0; x<this.width/this.tilesize; x++) {
            const tile = this.tilemap[y][x];
            this.tileX = x * this.tilesize;
            this.tileY = y * this.tilesize;
            this.tileWidth = this.tilesize;
            this.tileHeight = this.tilesize;
            let tileUnit;
            switch (tile) {
               case 0:
               tileUnit = new EmptyTile(this.tileX,this.tileY,this.tilesize);
               break;
               case 1:
               tileUnit = new WallTile(this.tileX,this.tileY,this.tilesize);
               break;
            }
            tileUnit.render(ctx);
         }
      }
   }
}

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const map = new Map(canvasWidth,canvasHeight);