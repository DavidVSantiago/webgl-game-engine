var canvas = document.getElementById("GLCanvas");
var gl = canvas.getContext('webgl2');
if(!gl){
    alert("Sem webgl2 para você!");
}else{
    alert("Carregou webgl2!");
}

let xmlReq = new XMLHttpRequest();
xmlReq.open('GET',"vShader.glsl",false);
try{
    xmlReq.send();
}catch(error){
    throw new Error('Erro ao carregar o código-fonte do shader: '+ filePath);
}
let vShaderSource = xmlReq.responseText;
console.log(vShaderSource);
xmlReq.open('GET',"fShader.glsl",false);
try{
    xmlReq.send();
}catch(error){
    throw new Error('Erro ao carregar o código-fonte do shader: '+ filePath);
}
let fShaderSource = xmlReq.responseText;
console.log(fShaderSource);

/** Cria os shaders */
function createShader(gl, type, source){
    var shader = gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader,gl.COMPILE_STATUS);
    if(success){
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

var vertexShader = createShader(gl,gl.VERTEX_SHADER,vShaderSource);
var fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fShaderSource);

/** cria um program e linka os shaders criados */
function createProgram(gl, vertexShader, fragmentShader){
    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program,gl.LINK_STATUS);
    if(success){
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

var program = createProgram(gl, vertexShader,fragmentShader);

/** obtêm a referência do atributo de entrada do shader */
var positionAttributeLocation = gl.getAttribLocation(program,"a_position");

/** cria um buffer na GPU */
var positionBuffer = gl.createBuffer();

/** Estabelece o "ponto de ligação" para o buffer */
gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);


// três pontos 2D
var positions = [
    0,0,
    0,0.5,
    0.5,0,
];
/** copia dados para 'positionBuffer' na GPU*/
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);

// código "meio que padrão" para configuração dos vértices"
var VAO = gl.createVertexArray();
gl.bindVertexArray(VAO);
gl.enableVertexAttribArray(positionAttributeLocation);

/** Mostra ao atributo como obter dados do buffer */
var size=2;
var type=gl.FLOAT;
var normalize = false; // pois os dados já estão -1 a +1
var stride = 0;
var offset = 0;
gl.vertexAttribPointer(positionAttributeLocation,size,type,normalize,stride,offset);
//webglUtils.resizeCanvasToDisplaySize(gl.canvas);

/** Especifica a conversão do clipspace para pixels */
gl.viewport(0,0,gl.canvas.width,gl.canvas.height);

gl.clearColor(0,0,0,0);
gl.clear(gl.COLOR_BUFFER_BIT);

// define o uso dos shaders
gl.useProgram(program);

//gl.bindVertexArray(VAO);

var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 3;
gl.drawArrays(primitiveType,offset,count);