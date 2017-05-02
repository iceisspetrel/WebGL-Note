/**
 * Created by SE on 2017/4/27.
 */
/**
 * 返回基本矩阵
 * @constructor
 */
function Matrix4(){
    this.M = {}; //存储真实矩阵的各项元素
    this.elements = new Float32Array(16); //存储符合webgl规范的以列主序的矩阵

    Object.defineProperties(this, {
        ROTATE_X_AXIS : {
            value : 'ROTATE_X_AXIS',
            writable : false,
            enumerable : false,
            configurable : false
        },
        ROTATE_Y_AXIS : {
            value : 'ROTATE_Y_AXIS',
            writable : false,
            enumerable : false,
            configurable : false
        },
        ROTATE_Z_AXIS : {
            value : 'ROTATE_Z_AXIS',
            writable : false,
            enumerable : false,
            configurable : false
        }
    });

    this.init();
}

/**
 * 初始化基本矩阵元素
 */
Matrix4.prototype.init = function(){
    this.M = {
        e11 : 1, e12 : 0, e13 : 0, e14 : 0,
        e21 : 0, e22 : 1, e23 : 0, e24 : 0,
        e31 : 0, e32 : 0, e33 : 1, e34 : 0,
        e41 : 0, e42 : 0, e43 : 0, e44 : 1
    };

    this.toColumnMainSequence();
};

/**
 * 根据webgl中矩阵以列主序做变换
 */
Matrix4.prototype.toColumnMainSequence = function(){
    this.elements = new Float32Array([
        this.M.e11, this.M.e21, this.M.e31, this.M.e41,
        this.M.e12, this.M.e22, this.M.e32, this.M.e42,
        this.M.e13, this.M.e23, this.M.e33, this.M.e43,
        this.M.e14, this.M.e24, this.M.e34, this.M.e44
    ]);
    return this;
};

Matrix4.prototype.setTranslate = function(Tx, Ty, Tz){
    this.init();

    Tx = Tx || 0;
    Ty = Ty || 0;
    Tz = Tz || 0;

    this.M.e14 = Tx;
    this.M.e24 = Ty;
    this.M.e34 = Tz;

    this.toColumnMainSequence();
    return this;
};

/**
 * 4*4矩阵做平移算法
 * @param Tx
 * @param Ty
 * @param Tz
 * @return {Matrix4}
 */
Matrix4.prototype.translate = function(Tx, Ty, Tz){

    Tx = Tx || 0;
    Ty = Ty || 0;
    Tz = Tz || 0;

    this.concat((new Matrix4()).setTranslate(Tx, Ty, Tz));

    this.toColumnMainSequence();
    return this;
};

/**
 *
 * @param Sx
 * @param Sy
 * @param Sz
 * @return {Matrix4}
 */
Matrix4.prototype.setScale = function(Sx, Sy, Sz){
    this.init();

    Sx = Sx || 1;
    Sy = Sy || 1;
    Sz = Sz || 1;

    this.M.e11 = Sx;
    this.M.e22 = Sy;
    this.M.e33 = Sz;

    this.toColumnMainSequence();
    return this;
};

/**
 * 缩放矩阵相乘
 * @param Sx
 * @param Sy
 * @param Sz
 * @return {Matrix4}
 */
Matrix4.prototype.scale = function(Sx, Sy, Sz){

    Sx = Sx || 1;
    Sy = Sy || 1;
    Sz = Sz || 1;

    this.concat((new Matrix4()).setScale(Sx, Sy, Sz)).toColumnMainSequence();
    return this;
};

/**
 *
 * @param angle  旋转角度
 * @param axis   旋转轴
 * @return {Matrix4}
 */
Matrix4.prototype.setRotate = function(angle, axis){
    var s = Math.sin(angle * Math.PI / 180),
        c = Math.cos(angle * Math.PI / 180);

    this.init();

    if(axis == this.ROTATE_X_AXIS){
        /**
         *  绕x轴旋转矩阵
         *  1   0     0     0
         *  0   cosA  -sinA 0
         *  0   sinA  cosA  0
         *  0   0     0     1
         */
        this.M.e22 = c;
        this.M.e23 = -s;
        this.M.e32 = s;
        this.M.e33 = c;

    } else if(axis == this.ROTATE_Y_AXIS){
        /**
         *  绕y轴旋转矩阵
         *  cosA   0  sinA 0
         *  0      1  0    0
         *  -sinA  0  cosA 0
         *  0      0  0    1
         */
        this.M.e11 = c;
        this.M.e13 = s;
        this.M.e31 = -s;
        this.M.e33 = c;
    } else if(axis == this.ROTATE_Z_AXIS){
        /**
         *  绕z轴旋转矩阵
         *   cosA -sinA 0  0
         *   sinA cosA  0  0
         *   0    0     1  0
         *   0    0     0  1
         */
        this.M.e11 = c;
        this.M.e12 = -s;
        this.M.e21 = s;
        this.M.e22 = c;
    }

    this.toColumnMainSequence();
    return this;
};

/**
 *
 * @param angle 旋转角度
 * @param axis  旋转轴
 * @return {Matrix4}
 */
Matrix4.prototype.rotate = function(angle, axis){
    this.concat((new Matrix4()).setRotate(angle, axis)).toColumnMainSequence();
    return this;
};

/**
 * 两个矩阵对象相乘
 * @param matrix
 * @return {Matrix4}
 */
Matrix4.prototype.concat = function(matrix){
    var e = this.M,
        o = matrix.M;

    var M = {};
    for(var i=1; i<=4; i++){
        for(var j=1; j<=4; j++){
            M['e' + i + j] = e['e' + i + 1] * o['e' + 1 + j] + e['e' + i + 2] * o['e' + 2 + j] + e['e' + i + 3] * o['e' + 3 + j] + e['e' + i + 4] * o['e' + 4 + j];
        }
    }

    this.M = M;

    this.toColumnMainSequence();
    return this;
};

Object.defineProperties(Matrix4, {
    ROTATE_X_AXIS : {
        value : 'ROTATE_X_AXIS',
        writable : false,
        enumerable : false,
        configurable : false
    },
    ROTATE_Y_AXIS : {
        value : 'ROTATE_Y_AXIS',
        writable : false,
        enumerable : false,
        configurable : false
    },
    ROTATE_Z_AXIS : {
        value : 'ROTATE_Z_AXIS',
        writable : false,
        enumerable : false,
        configurable : false
    }
});
