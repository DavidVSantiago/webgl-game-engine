// passo 01 - prepara o canvas e o contexto webgl
var canvas =  document.getElementById('GLCanvas');
var gl = canvas.getContext('experimental-webgl');

// 01 - criar o VBO
var vertex = [
    -0.2,0.2,0.0,
    -0.3,-0.2,0.0,
    0.3,0.3,0.0
];

var VBO = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertex),gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// 02 - Cria, compila e carrega os Shaders
var vShaderSource='attribute vec3 coordinates;void main(void){gl_Position = vec4(coordinates,1.0);gl_PointSize = 10.0;}';
var fShaderSource='void main(void){gl_FragColor = vec4(0.0,0.0,0.0,0.1);}';

var vShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vShader,vShaderSource);
gl.compileShader(vShader);

var fShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fShader,fShaderSource);
gl.compileShader(fShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vShader);
gl.attachShader(shaderProgram, fShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// 03 - associação do shader ao VBO
gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
var coord = gl.getAttribLocation(shaderProgram, 'coordinates');
// define como o atributo irá ler o VBO
gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0,0);
gl.enableVertexAttribArray(coord); // habilita o atributo para leitura do VBO

// 04 - desenho das primitivas
// Clear the canvas
gl.clearColor(0.5, 0.5, 0.5, 0.9);

// Enable the depth test
gl.enable(gl.DEPTH_TEST);

// Clear the color buffer bit
gl.clear(gl.COLOR_BUFFER_BIT);

// Set the view port
gl.viewport(0,0,canvas.width,canvas.height);

// Draw the triangle
gl.drawArrays(gl.POINTS, 0, 3);