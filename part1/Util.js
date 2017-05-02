function Util(){};
Util.createCanvas = function(parent, width, height, id){
    var canvas = document.createElement('canvas');
    canvas.innerText = 'Your browser dose not support canvas';
    canvas.width     = 600;
    canvas.height    = 600;
    canvas.id        = id;

    parent.appendChild(canvas);

    return canvas;
}

window.Util = Util;