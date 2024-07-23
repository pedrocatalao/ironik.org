var dnaText = {
  Speck: function(x, y) {
    this.x = x;
    this.y = y;
    var radz = Math.floor(window.innerHeight/250);
    this.radius = Math.random() * (radz < 3 ? 3 : radz);
    this.draw = function(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      dnaText.rndmColor(ctx);
      ctx.fillRect(0, 0, this.radius, this.radius);
      ctx.restore();
    };
  },
  init: function() {
    dnaText.canvas = document.querySelector('canvas');
    dnaText.ctx = dnaText.canvas.getContext('2d');
    dnaText.W = window.innerWidth - window.innerWidth * 0.07;
    dnaText.H = window.innerHeight - window.innerHeight * 0.07;
    dnaText.SpeckPositions = [];
    dnaText.Specks = [];
    dnaText.tmpCanvas = document.createElement('canvas');
    dnaText.tmpCtx = dnaText.tmpCanvas.getContext('2d');

    dnaText.canvas.width = dnaText.W;
    dnaText.canvas.height = dnaText.H;


    var cont = "ironik";
    setInterval(function(){
      dnaText.changeLetter(cont);
      dnaText.getPixels(dnaText.tmpCanvas, dnaText.tmpCtx);
    }, 666); // CHAR TRANSITION TIME

      dnaText.makeSpecks(450); // PARTICLES
      dnaText.animate();
  }, 
  currentPos: 0,
  changeLetter: function(cont) {
    dnaText.time = cont[dnaText.currentPos];
    dnaText.currentPos++;
    if (dnaText.currentPos >= cont.length) {
      dnaText.currentPos = 1;
    }
  },
  makeSpecks: function(num) {
    for (var i = 0; i <= num; i++) {
      dnaText.Specks.push(new dnaText.Speck(dnaText.W / 2 + Math.random() * 400 - 200, dnaText.H / 2 + Math.random() * 400 - 200));
    }
  },
  getPixels: function(canvas, ctx) {
    var gridSize = Math.floor(dnaText.H/115);
    var keyword = dnaText.time,
      gridX = (gridSize < 6 ? 6 : gridSize),
      gridY = (gridSize < 6 ? 6 : gridSize);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var fontSize = dnaText.H * 0.5
    ctx.font = fontSize + "px Courier Prime";
    ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + fontSize * 0.4);
    var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var buffer32 = new Uint32Array(idata.data.buffer);
    if (dnaText.SpeckPositions.length > 0) dnaText.SpeckPositions = [];
    for (var y = 0; y < canvas.height; y += gridY) {
      for (var x = 0; x < canvas.width; x += gridX) {
        if (buffer32[y * canvas.width + x]) {
          dnaText.SpeckPositions.push({x: x, y: y});
        }
      }
    }
  },
  animateSpecks: function() {
    var p, pPos;
    for (var i = 0, num = dnaText.Specks.length; i < num; i++) {
      p = dnaText.Specks[i];
      pPos = dnaText.SpeckPositions[i];
      if (dnaText.Specks.indexOf(p) === dnaText.SpeckPositions.indexOf(pPos)) {
        p.x += (pPos.x - p.x) * 1.86; // HORIZONTAL PARTICLE MOVEMENT SPEED FACTOR (MORE IS SLOWER)
        p.y += (pPos.y - p.y) * 1.81; // VERTICAL
        p.draw(dnaText.ctx);
      }
    }
  },
  animate: function() {
    requestAnimationFrame(dnaText.animate);
    dnaText.ctx.fillStyle = '#000000';
    dnaText.ctx.fillRect(0, 0, dnaText.W, dnaText.H);
    dnaText.animateSpecks();
  },
  rndmColor: function(ctx) {
    var letters = '0123456789abcdef';
    var color = '#B';
    for (var i = 0; i < 5; i++) {
      color += letters[Math.floor(Math.random() * 16)]; // COLOR FACTOR (LESS IS MORE MONOTONE)
    }
    ctx.fillStyle = color
  }
};

var titles = [
'isn\'t it?',
'yeah baby!',
'gtfo!',
'l33t',
'enough!',
'really',
'stop it'
];

function randText() {
  overlay.style.opacity = 0.6;
  setTimeout(setText, 150);
}

function setText() {
  var i = (Math.random() * titles.length) | 0;
  overlay.innerText = titles[i];
  overlay.style.opacity = 0.6;
}

function changeAnimationTime() {
  var dur = 5 + Math.random() * 6;
  canvas.style.setProperty('--animation-time', dur +'s');
}

setInterval(changeAnimationTime, 3000);

window.onload = dnaText.init;
