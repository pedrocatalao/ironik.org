var dnaText = {
	Speck: function(x, y) {
		this.x = x;
		this.y = y;
		this.radius = Math.random() * 3;
		this.draw = function(ctx) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.fillStyle = getRandomColor();
			ctx.fillRect(0, 0, this.radius, this.radius);
			ctx.restore();
		};
	},
	init: function() {
		dnaText.canvas = document.querySelector('canvas');
		dnaText.ctx = dnaText.canvas.getContext('2d');
		dnaText.W = window.innerWidth - 150;
		dnaText.H = window.innerHeight - 150;
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
		}, 550);

		dnaText.makeSpecks(400);
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
			dnaText.Specks.push(new dnaText.Speck(dnaText.W / 2 +  200 - 200, dnaText.H / 2 +  200 -200));
		}
	},
	getPixels: function(canvas, ctx) {
		var keyword = dnaText.time,
			gridX = 5,
			gridY = 3;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.font = "220px courier";
		ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + 80);
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
				p.x += (pPos.x - p.x) * .6;
				p.y += (pPos.y - p.y) * .6;
				p.draw(dnaText.ctx);
			}
		}
	},
	animate: function() {
		requestAnimationFrame(dnaText.animate);
		dnaText.ctx.fillStyle = '#050505';
		dnaText.ctx.fillRect(0, 0, dnaText.W, dnaText.H);
		dnaText.animateSpecks();
	}
};

function getRandomColor() {
	var letters = '0123456789abcdef';
	var color = '#B';
	for (var i = 0; i < 5; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function setProperty(duration) {
  canvas.style.setProperty('--animation-time', duration +'s');
}

function changeAnimationTime() {
  var animationDuration = 3 + Math.random() * 6;
  setProperty(animationDuration);
}

setInterval(changeAnimationTime, 3000);

window.onload = dnaText.init;
