/**
 * Created by SE on 2017/4/7.
 */
//获取webgl对象
var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

/**
 * @description 创建一个着色器
 * @param type int 着色器类型
 * @value type gl.VERTEX_SHADER 顶点着色器
 * @VALUE type gl.FRAGMENT_SHADER 片元着色器
 * @return {WebGLShader}
 */
gl.createShader = function(type){};

/**
 * @description  为着色器shader设置着色器代码
 * @param shader WebGlShader
 * @param source String
 * @return {null}
 */
gl.shaderSource = function(shader, source){};

/**
 * @description 编译着色器
 * @param shader
 * @returns {number}
 */
gl.compileShader = function(shader){};

/**
 * @description 获取着色器的执行结果
 * @param shader
 * @param pname
 * @return {boolean}
 */
gl.getShaderParameter = function(shader, pname){};

/**
 * @description 删除shader
 * @param shader
 */
gl.deleteShader = function(shader){};

/**
 * @description 创建一个program 对象
 * @return {WebGLProgram}
 */
gl.createProgram = function(){};

/**
 * @description attach the shader
 * @param program
 * @param shader
 */
gl.attachShader = function(program, shader){};

/**
 * 获取顶点着色器中某个属性的地址
 */
gl.getAttribLocation(program, 'a_attr');

gl.vertexAttrib1f(a_attrName, x);
gl.vertexAttrib1fv(a_attrname, new Float32Array([x]));

//uniform变量也可以用于顶点着色器中, 片元着色器中只能使用uniform变量
gl.getUniformLocation
gl.uniform4f

//创建缓冲区
gl.createBuffer()

//绑定buffer
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

//为buffer绑定数据以及作用
gl.bufferData(gl.ARRAY_BUFFER, Float32Array, gl.STATIC_DRAW);

/**
 * 缓冲区数据使用规则
 * @param a_attr 指向顶点着色器中某个参数的位置
 * @param size   每次使用size个分量，假如传入2，而一个vec4需要四个，则第三个第四个自动采用默认值
 * @param type   数据类型
 * @param normalize 是否将非浮点数统一划到 [0, 1] 或 [-1， 1]区间
 * @param stribe   顶点间的字节数
 * @param offset   缓冲区偏移量。即从缓冲区何处开始存储数据。如果从开始位置存储offset = 0
 */
gl.vertexAttribPointer = function(a_attr, size, type, normalize, stribe, offset){};


//WebGL中如果顶点着色器和片元着色器中有类型和命名都相同的varying变量，顶点着色器中赋给变量值就会被直接传入到片元着色器