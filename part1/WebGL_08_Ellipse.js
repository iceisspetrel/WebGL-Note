/**
 * Created by SE on 2017/4/11.
 */
function main(){

    var vsource = document.getElementById('vertexShader').innerText,
        fsource = document.getElementById('fragmentShader').innerText,
        canvas = document.getElementById('webgl');

    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if(!gl){
        throw new Error('浏览器不支持webgl');
    }

    if(!initShaders(gl, vsource, fsource)){
        console.error('初始化着色器失败');
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position >= 0){

        var points = [];

        var per = 360 / 1000, a = 0.6, b = 0.3;
        for(var i=0; i<=1000; i++){
            var x = a * Math.cos(per * i * Math.PI / 180),
                sign = x < 0 ? -1 : 1;
            points.push(x);
            points.push(Math.sqrt((1 - x * x / a * a) * b * b) * sign);
            points.push(0);
            points.push(1);
        }

        var buffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        gl.vertexAttribPointer(a_Position, 4, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(a_Position);
    }

    var u_PointSize = gl.getUniformLocation(gl.program, 'u_PointSize');
    if(u_PointSize !== null){
        gl.uniform1fv(u_PointSize, new Float32Array([10.0]));
    }

    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if(u_FragColor !== null){
        gl.uniform4fv(u_FragColor, new Float32Array([Math.random(), Math.random(), Math.random(), 1.0]));
    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.LINE_STRIP, 0, points.length / 4);
}