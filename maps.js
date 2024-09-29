//DOM
const can = document.querySelector('.canvas');
const right = document.querySelector('.right');
const cx = can.getContext('2d');



class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.style = 'red';
    }
    
    render(tilemap) {
        cx.clearRect(0,0,can.width,can.height);
        cx.fillStyle = this.style;
        cx.fillRect(this.x,this.y,this.width,this.height);
        if(this.x >= can.width) {
            //console.log(1)
            if(tilemap.level === 1) {
                this.x = 10;
                tilemap.level = 2
            }
        } else if(this.x < 0) {
            if(level === 1) {
                if(tilemap.level > 1) {
                    tilemap.level = tilemap.level - 1;
                }
            }
        }
    }
}

class Map {
    constructor(width,height,tilesize) {
        this.width = width;
        this.height = height;
        this.tilesize = tilesize;
        this.tiles = [];
    }
    
    tileX;
    tileY;
    tileWidth;
    tileHeight;
    level = 1;
    
    nextMap() {
        let next = [
        [1,0,0,0,0,1,1,1,1,1,2],
        [0,0,0,0,0,0,0,0,0,1,2],
        [0,0,0,0,0,0,0,1,1,1,2],
        [1,1,1,1,1,1,1,0,0,1,2],
        [1,1,1,1,1,2,1,1,1,1,2]
        ]
        
        return next
    }
    
    generateManual() {
        let demo = [
        [1,0,1,1,1,1,1,1,1,1,2],
        [1,0,0,0,0,1,0,0,0,1,2],
        [1,0,0,1,0,1,0,0,0,1,2],
        [1,0,0,1,0,1,0,0,0,1,2],
        [1,1,1,1,1,1,1,1,1,1,2]
        ]
        
        return demo;
    }
    
    generateRandom() {
        for(let x=0;x<this.width/this.tilesize;x++) {
            for(let y=0;y<this.height/this.tilesize;y++) {
                this.tiles[x] = [];
                this.tiles.push(Math.floor(Math.random()+1));
            }
        }
    }
    
    render(camera,player) {
        switch (this.level) {
            case 1:
            this.tiles = this.generateManual();
            break;
            case 2:
            this.tiles = this.nextMap();
            break;
        }
        for(let y=0;y<this.height/this.tilesize;y++) {
            for(let x=0;x<this.width/this.tilesize;x++) {
                const tile = this.tiles[y][x];
                //console.log(tile)
                this.tileX = x * this.tilesize * camera.scale;
                this.tileY = y * this.tilesize * camera.scale;
                this.tileWidth = this.tilesize * camera.scale;
                this.tileHeight = this.tilesize * camera.scale;
                if((camera.x+camera.width)>this.tileX && (this.tileX+this.tileWidth)>camera.x && (camera.y+camera.height)>this.tileY && (this.tileY+this.tileWidth)>camera.y) {
                    if(tile === 1) {
                        cx.fillStyle = "green";
                        cx.fillRect(this.tileX,this.tileY,this.tileWidth,this.tileHeight);
                    } else if(tile === 0) {
                        cx.fillStyle = "hotpink";
                        cx.fillRect(this.tileX,this.tileY,this.tileWidth,this.tileHeight);
                    }
                }
            }
        }
    }
    
    update(camera) {
        this.tileX -= camera.x;
    }
}

class Camera {
    constructor(width,height,scale) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height
        this.scale = scale;
    }
    
    update(dir,player,tiles) {
        this.x = player.x - this.width/2/this.scale;
        this.y = player.y - this.height/2/this.scale;
        if(dir === "right") {
            player.x += 45;
            //this.x += 45;
        }
    }
}

const player = new Player(90,120);

const map = new Map(450,225,45);

const cam = new Camera(450,225,1);

right.addEventListener('click',e => {
    e.preventDefault();
    cam.update("right",player,map);
    map.update(cam);
})


//second camvas
const canvas = document.querySelector('.maps');
const r = document.querySelector('.r');
const cs = canvas.getContext('2d');

const get = new Worker("map-parser.js");

const newData = [
[2,1,2,2,2,2,2,1,2],
[2,2,2,2,2,2,2,2,2],
[2,2,2,2,2,1,2,2,2],
[2,2,2,2,2,2,2,2,2],
[2,2,2,2,2,2,2,2,2]
];

function newMapData(worker) {
    worker.postMessage({type:'get'});
}

get.onmessage = e => {
    let response = e.data;
    nextLoad = response.load;
}

let level = 1;
let nextLoad = [];

class Sec extends Map {
    constructor(width,height,tilesize) {
        super(width,height,tilesize);
        
    }
    
    newTile = this.nextMap();
    tX;
    tY;
    tW;
    tH;
    
    offsetX = 0;
    offsetY = 0;
    
    render(camera) {
        for(let y=0;y<this.height/this.tilesize;y++) {
            for(let x=0;x<this.width/this.tilesize;x++) {
                const tile = this.newTile[y][x];
                this.tX = x * this.tilesize;
                this.tY = y * this.tilesize;
                this.tW = this.tilesize;
                this.tH = this.tilesize;
                
                if((camera.x+camera.width)>this.tX && (this.tX+this.tW)>camera.x && (camera.y+camera.height)>this.tY && (this.tY+this.tW)>camera.y) {
                
                    if(tile === 0) {
                    cs.fillStyle = 'red';
                    cs.fillRect(this.tX + this.offsetX,this.tY + this.offsetY,this.tW,this.tH);
                } else if(tile === 1) {
                    cs.fillStyle = 'blue';
                    cs.fillRect(this.tX + this.offsetX,this.tY + this.offsetY,this.tW,this.tH);
                } else if(tile === 2) {
                    cs.fillStyle = 'yellow';
                    cs.fillRect(this.tX + this.offsetX,this.tY + this.offsetY,this.tW,this.tH);
                }
                    
                }
            }
        }
    }
    
    update(dir) {
        
        
        switch (dir) {
            case "left":
            this.offsetX += 45;
            break;
            case "right":
            /*if(this.offsetX + (this.tilesize * 10) <= 0) {
                this.newTile = newData
                this.offsetX = 0
            }*/
            this.offsetX -= 45;
            break;
            case "down":
            this.offsetY -= 45;
            break;
        }
        console.log(nextLoad)
        this.newTile = this.newTile.concat(nextLoad);
    }
}
const second = new Sec(450,225,45);

r.onclick = (e,map) => {
    e.preventDefault();
    newMapData(get);
    second.update("down");
    second.render(cam)
}

function gameloop() {
    cs.clearRect(0,0,canvas.width,canvas.height);
    second.render(cam);
    player.render(cam);
    map.render(cam);
    requestAnimationFrame(gameloop);
}
gameloop();