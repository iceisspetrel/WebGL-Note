// MultiPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' +
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
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

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  function getWebGLPosition(e){
      var client = [e.clientX, e.clientY],
          rect   = e.target.getBoundingClientRect(),
          width  = e.target.width,
          height = e.target.height;

      return [
          (client[0] - rect.left - width / 2) / (width / 2),
          (height / 2 - (client[1] - rect.top)) / (height / 2),
          0,
          1
      ];
  }

  canvas.addEventListener('click', function(e){

      if(!gl.points){
          gl.points = [];
      }

      gl.points = gl.points.concat(getWebGLPosition(e));

      var buffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gl.points), gl.STATIC_DRAW);

      var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

      gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);

      gl.enableVertexAttribArray(a_Position);

      var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
      gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), 1);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, gl.points.length / 4);
  });
}
