/**
 * Created by SE on 2017/4/11.
 */
function main(){
    var VERTEX_SOURCE = document.getElementById('vertex-shader').innerText,
        FRAGMENT_SOURCE = document.getElementById('fragment-shader').innerText;

    var canvas = document.getElementById('webgl');

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    var flag = initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);
    if(!flag){
        throw  new Error();
    }

    var a_Position = gl.getAttribLocation(gl.p)

    var points = [-0.5, 0, 0, 0.5, 0.5, 0];
    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);



    gl.vertexAttribPointer()


    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}