/**
 * Created by SE on 2017/4/17.
 */
function main(){
    var VERTEX_SOURCE   = document.getElementById('vertex_shader').innerText,
        FRAGMENT_SOURCE = document.getElementById('fragment_shader').innerText;

    var canvas = document.getElementById('webgl'),
        gl     = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if(!initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE)){
        return;
    }

    var points = [-0.5, 0, 0, -0.5, 0, 0.5, 0.5, 0];

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
        u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    if(u_FragColor !== null){
        var alpha = Math.sin(((+new Date) % 360) * Math.PI / 180);
        gl.uniform4fv(u_FragColor,Math.random(), Math.random(), Math.random(), 0.1);
    }

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0, 0, 0, 1);

    var angle = 0;
    function draw(){
        var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB'),
            u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');

        gl.uniform1f(u_SinB, Math.sin(angle * Math.PI / 180));
        gl.uniform1f(u_CosB, Math.cos(angle * Math.PI / 180));
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        angle = ++angle % 360;
        requestAnimationFrame(draw);
    }

    draw();
}