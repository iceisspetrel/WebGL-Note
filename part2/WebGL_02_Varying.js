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
        //x, y, size, r, g, b
        0.3, 0.1, 5, 0.3, 0.4, 0.5,
        -0.7, -0.2, 10, 0.7, 0.6, 0.7,
        0.6, - 0.8, 20, 0.9, 0.1, 0.2
    ]);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
        a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize'),
        a_Color     = gl.getAttribLocation(gl.program, 'a_Color');

    var ELEMENTSIZE = points.BYTES_PER_ELEMENT;

    if(a_Position >= 0){
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, ELEMENTSIZE * 6, 0);
        gl.enableVertexAttribArray(a_Position);
    }

    if(a_PointSize >= 0){
        gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, ELEMENTSIZE * 6, ELEMENTSIZE * 2);
        gl.enableVertexAttribArray(a_PointSize);
    }

    if(a_Color >= 0){
        gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, ELEMENTSIZE * 6, ELEMENTSIZE * 3);
        gl.enableVertexAttribArray(a_Color);
    }

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}