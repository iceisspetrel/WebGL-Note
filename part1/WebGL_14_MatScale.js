/**
 * Created by SE on 2017/4/17.
 */
function main(){
    var VERTEX_SOURCE = document.getElementById('vertex_shader').innerText,
        FRAGMENT_SOURCE = document.getElementById('fragment_shader').innerText;

    var canvas = document.getElementById('webgl'),
        gl     = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position'),
        u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    gl.uniform4f(u_FragColor, Math.random(), Math.random(), Math.random(), 1);

    var points = [0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5];
    var buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.clearColor(0, 0, 0, 1);

    var trans = 0.001+1;
    function draw(){

        var u_Matrix = gl.getUniformLocation(gl.program, 'u_Matrix');
       // var sinA = Math.sin(angle * Math.PI / 180), cosA = Math.cos(angle * Math.PI / 180);
        //WebGl中矩阵的存储方式为列主序
        //矩阵的主序
        gl.uniformMatrix4fv(u_Matrix, false, new Float32Array([
            trans,  0,   0,   0,
            0,   trans * 0.3,  0,   0,
            0,   0,   1,  0,
            0,   0,   0,   1
        ]));

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        //angle++;
        trans += 0.001;
        if(trans > 1.5){
            trans = 1.001;
        }
        requestAnimationFrame(draw);
    }

    draw();
}