/**
 * Created by SE on 2017/5/2.
 */
function main(){
    var VERTEX_SOURCE   = document.getElementById('vertex_shader').innerText,
        FRAGMENT_SOURCE = document.getElementById('fragment_shader').innerText,
        canvas          = document.getElementById('webgl');

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if(!initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE)){
        console.error(new SyntaxError('初始化着色器失败'));
        return;
    }

    var points = new Float32Array([
        0.3, 0.1, 5,
        -0.7, -0.2, 10,
        0.6, - 0.8, 20
    ]);

    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    var a_Position  = gl.getAttribLocation(gl.program, 'a_Position'),
        a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize'),
        u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    var ELEMENT_SIZE = points.BYTES_PER_ELEMENT;

    if(a_Position >= 0){
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, ELEMENT_SIZE * 3, 0);
        gl.enableVertexAttribArray(a_Position);
    }

    if(a_PointSize >= 0){
        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, ELEMENT_SIZE * 3, ELEMENT_SIZE * 2);
        gl.enableVertexAttribArray(a_PointSize);
    }

    if(u_FragColor){
        gl.uniform4fv(u_FragColor, new Float32Array([Math.random(), Math.random(), Math.random(), 1]));
    }

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 3);
}