// passo 01 - prepara o canvas e o contexto webgl - dsdsdd
var canvas =  document.getElementById('GLCanvas');
var gl = canvas.getContext('experimental-webgl');

// ***********************************************************************
// 01 - criar o VBO ******************************************************
// ***********************************************************************
var vertex_data = [
    -0.4,0.2,0.0, // 0
    -0.4,-0.2,0.0, // 1
    -0.3,0.2,0.0, // 2
    -0.3,-0.1,0.0, // 3
    -0.2,-0.1,0.0, // 4
    -0.2,-0.2,0.0, // 5
    0.2,0.2,0.0, // 6
    0.2,-0.2,0.0, // 7
    0.3,0.1,0.0, // 8
    0.3,-0.1,0.0, // 9
    0.4,0.2,0.0, // 10
    0.4,0.1,0.0, // 11
    0.4,-0.1,0.0, // 12
    0.4,-0.2,0.0, // 13
];

var indexes = [
    0,2,3,3,0,1,1,5,3,3,4,5, // letra L
    10,11,8,8,10,6,6,8,9,9,6,7,7,13,9,9,12,13 // letra C
];

/* Buffer para os vértices */
// cria um buffer na memória da GPU
var vertex_buffer = gl.createBuffer(); 
// vincula o buffer vértices da GPU (para torná-lo ativo)
gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer); 
// transfere os dados do vértice para o buffer da GPU
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex_data),gl.STATIC_DRAW);
// desvincula o buffer vértices da GPU
gl.bindBuffer(gl.ARRAY_BUFFER,null);

/* Buffer para os índices dos vértices */
// cria um buffer na memória da GPU
var index_buffer = gl.createBuffer();
// vincula o buffer de índices da GPU (para torná-lo ativo)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
// transfere os dados dos índices dos vértices para o buffer da GPU
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indexes),gl.STATIC_DRAW);
// desvincula o buffer indices da GPU
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);

// ***********************************************************************
// 02 - Cria e compila os shaders ****************************************
// ***********************************************************************

/* Configurando o vertex shader */
var vShaderSource =
'attribute vec3 coordinates;'+
'void main(void){'+
    'gl_Position = vec4(coordinates,1.0);'+
'}'; 
// cria o objeto vertex shader
var vShader = gl.createShader(gl.VERTEX_SHADER);
// anexa o código fonte so vertex shader
gl.shaderSource(vShader, vShaderSource);
// compila o vertex shader
gl.compileShader(vShader);

/* Configurando o fragment shader */
var fShaderSource =
'void main(void){'+
    'gl_FragColor = vec4(0.0,0.0,0.0,1.0);'+
'}'; 
// cria o objeto fragment shader
var fShader = gl.createShader(gl.FRAGMENT_SHADER);
// anexa o código fonte ao fragment shader
gl.shaderSource(fShader, fShaderSource);
// compila o fragment shader
gl.compileShader(fShader);

/* Configurando o shader program */
// cria o shader program
var shaderProgram = gl.createProgram();
// anexa os shaders ao shader program
gl.attachShader(shaderProgram, vShader);
gl.attachShader(shaderProgram, fShader);
// conecta o shader program
gl.linkProgram(shaderProgram);
// configura para uso
gl.useProgram(shaderProgram);

// ***********************************************************************
// 03 - Associando os shaders ao buffer de objetos ***********************
// ***********************************************************************

// vincula o buffer de vértices
gl.bindBuffer(gl.ARRAY_BUFFER,vertex_buffer);
// vincula o buffer de índices
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,index_buffer);
// obtém o atributo de coordenada do vertex shader
var coordinates = gl.getAttribLocation(shaderProgram, 'coordinates');
// aponto o atributo de coordenada para a leitura do buffer de vértices
gl.vertexAttribPointer(coordinates,
    3, // vai obter 3 coordenadas por leitura
    gl.FLOAT, // tipo dos dados das coordenadas
    false, // sem normalização
    0, // sem saltos de memória
    0 // a partir do início da memória
);
// habilita o atributo para leitura
gl.enableVertexAttribArray(coordinates);

// ***********************************************************************
// 04 - Desenho **********************************************************
// ***********************************************************************

// limpa a tela
gl.clearColor(0.5, 0.5, 0.5, 1.0);
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.viewport(0, 0, canvas.width, canvas.height);
gl.drawElements(
    gl.TRIANGLES, // modo de desenho
    indexes.length, // quantidade de vértices
    gl.UNSIGNED_SHORT, // tipo dos dados dos índices
    0 // offset
);
