/**
 * Created by SE on 2017/4/27.
 */
function main(){
    var VERTEX_SOURCE   = document.getElementById('vertex_shader').innerText,
        FRAGMENT_SOURCE = document.getElementById('fragment_shader').innerText,
        canvas          = document.getElementById('webgl');

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
        u_Mat      = gl.getUniformLocation(gl.program, 'u_Mat'),
        u_Color    = gl.getUniformLocation(gl.program, 'u_Color');

    if(a_Position >= 0){
        var points = [0, 0.5, Math.sin(60 * Math.PI / 180) * 0.5, -0.25, Math.sin(-60 * Math.PI / 180) * 0.5, -0.25];

        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
    }

    if(u_Color !== null){
        gl.uniform4fv(u_Color, new Float32Array([Math.random(), Math.random(), Math.random(), 1]));
    }

    gl.clearColor(0, 0, 0, 1);

    var angle = 0,
        step  = 45,
        now   = +new Date;
    function rotate(){
        if(u_Mat !== null){
            var date = +new Date;
            angle = (angle -  step * (date - now) / 1000) % 360;
            now = date;
            var matrix = (new Matrix4()).rotate(angle, Matrix4.ROTATE_Z_AXIS).translate(0.35, 0.35, 0.35);

            gl.uniformMatrix4fv(u_Mat, false, matrix.elements);

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            requestAnimationFrame(rotate);
        }
    }

    rotate();
}