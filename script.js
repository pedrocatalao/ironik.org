var dnaText = {
  Speck: function(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 3;
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
    console.log(dnaText.H);
    dnaText.SpeckPositions = [];
    dnaText.Specks = [];
    dnaText.tmpCanvas = document.createElement('canvas');
    dnaText.tmpCtx = dnaText.tmpCanvas.getContext('2d');

    dnaText.canvas.width = dnaText.W;
    dnaText.canvas.height = dnaText.H;


    var cont = atob('aXJvbmlr');
    setInterval(function(){
      dnaText.changeLetter(cont);
      dnaText.getPixels(dnaText.tmpCanvas, dnaText.tmpCtx);
    }, 700); // TRANSITION

    dnaText.makeSpecks(3000); // PARTICLES
    dnaText.animate();
  }, 
  currentPos: 0,
  changeLetter: function(cont) {
    dnaText.time = cont[dnaText.currentPos];
    dnaText.currentPos++;
    if (dnaText.currentPos >= cont.length) {
      dnaText.currentPos = 0;
    }
  },
  makeSpecks: function(num) {
    for (var i = 0; i <= num; i++) {
      dnaText.Specks.push(new dnaText.Speck(dnaText.W / 2 + Math.random() * 400 - 200, dnaText.H / 2 + Math.random() * 400 - 200));
    }
  },
  getPixels: function(canvas, ctx) {
    var keyword = dnaText.time,
      gridX = 8,
      gridY = 8;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var fontSize = dnaText.H * 0.75
    ctx.font = fontSize + "px Ubuntu, bold"
    ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + fontSize * 0.32);
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
        p.x += (pPos.x - p.x) * .55;
        p.y += (pPos.y - p.y) * .55;
        p.draw(dnaText.ctx);
      }
    }
  },
  animate: function() {
    requestAnimationFrame(dnaText.animate);
    dnaText.ctx.fillStyle = '#101010';
    dnaText.ctx.fillRect(0, 0, dnaText.W, dnaText.H);
    dnaText.animateSpecks();
  },
  rndmColor: function(ctx) {
    var letters = '0123456789abcdef';
    var color = '#B';
    for (var i = 0; i < 5; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    ctx.fillStyle = color
  }
};

function changeAnimationTime() {
  var dur = 4 + Math.random() * 6;
  canvas.style.setProperty('--animation-time', dur +'s');
}

setInterval(changeAnimationTime, 3000);

window.onload = dnaText.init;
