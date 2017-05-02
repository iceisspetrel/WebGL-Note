function main(){

    var VERTEX_SOURCE   = document.getElementById('vertex_shader').innerText,
        FRAGMENT_SOURCE = document.getElementById('fragment_shader').innerText;

    var canvas = document.getElementById('webgl');

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
        u_Mat      = gl.getUniformLocation(gl.program, 'u_Mat'),
        u_Color    = gl.getUniformLocation(gl.program, 'u_Color');

    if(a_Position >= 0){
        var points = [-0.5, 0, 0.5, 0, -0.5, 0.5];

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
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);

    var angle = 45;
    function drawTri(){
        var cosA  = Math.cos(angle * Math.PI / 180),
            sinA  = Math.sin(angle * Math.PI / 180);
        var change = [
            cosA,   sinA, 0, 0,
            -sinA,  cosA, 0, 0,
            0,      0,    1, 0,
            0,      0,    0, 1
        ];
        gl.uniformMatrix4fv(u_Mat, false, new Float32Array(change));

        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 3);

        ++angle;

        //requestAnimationFrame(drawTri);
    }

    drawTri();
}