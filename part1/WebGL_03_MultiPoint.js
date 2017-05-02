// MultiPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  function getWebGLPos(e){
      var clientPos = {
          x : e.clientX,
          y : e.clientY
      },
          width = e.target.width,
          height = e.target.height,
          offsetRect = e.target.getBoundingClientRect();

      return [(clientPos.x - offsetRect.left - width / 2) / width * 2, (height / 2 - (clientPos.y - offsetRect.top)) / height * 2, 0];
  }

  function initMultiPointAttrib(gl, points, index){

      var buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

      gl.vertexAttribPointer(index, 3, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(index);

      //gl.disableVertexAttribArray(index);

      return points.length / 3;
  }


  canvas.onclick = function(e){
      if(!gl.points){
          gl.points = [];
      }

      var pos = getWebGLPos(e);

      gl.points = gl.points.concat(pos);

      var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

      var n = initMultiPointAttrib(gl, gl.points, a_Position);

      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.POINTS, 0, n);
  }
}
