var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function buildCanvas () {
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 500;
	canvas.height = 500;
	document.body.appendChild(canvas);
}
