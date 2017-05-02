/**
 * Created by SE on 2017/4/27.
 */
function main(){
    var VERTEX_SOURCE   = document.getElementById('vertex_shader').innerText,
        FRAGMENT_SOURCE = document.getElementById('fragment_shader').innerText,
        canvas          = document.getElementById('webgl');

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if(!initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE)){
        console.error('初始化着色器程序失败');
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
        u_Mat      = gl.getUniformLocation(gl.program, 'u_Mat'),
        u_Color    = gl.getUniformLocation(gl.program, 'u_Color');

    if(a_Position >= 0){
        var points = [-0.5, 0, 0.5, 0, 0, 0.5];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
    }

    if(u_Color !== null){

    }

    gl.clearColor(0, 0, 0, 1);

    var matrix = new Matrix4();

    function animate(){
        matrix.rotate(-45, matrix.ROTATE_X_AXIS);

        gl.uniformMatrix4fv(u_Mat, false, matrix.elements);
        gl.uniform4f(u_Color, Math.random(), Math.random(), Math.random(), 1.0);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);
    }

    animate();
}