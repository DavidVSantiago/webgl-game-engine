// passo 01 - prepara o canvas e o contexto webgl - dsdsdd
var canvas =  document.getElementById('GLCanvas');
var gl = canvas.getContext('experimental-webgl');
var running = true;

// ***********************************************************************
// 01 - Dados vetoriais ******************************************************
// ***********************************************************************
var vertex_data = [ // dados so buffer de vértices
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

var indexes = [ // dados dos indices de desenho dos vértices dos triângulos
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
'uniform mat4 mvp;'+ // matriz de projeção para a rotação
'void main(void){'+
    'gl_Position = vec4(coordinates,1.0)*mvp;'+
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
    'gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);'+
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
// aponta o atributo de coordenada para a leitura do buffer de vértices
gl.vertexAttribPointer(
    coordinates, // atributo no GLSL que receberá os dados lidos
    3, // vai obter 3 coordenadas por leitura
    gl.FLOAT, // tipo dos dados das coordenadas
    false, // sem normalização
    0, // sem saltos de memória
    0 // a partir do início da memória
    );
    // habilita o atributo para leitura
    gl.enableVertexAttribArray(coordinates);

// ***********************************************************************
// 04 - obtendo o ponteiro para a matriz de projeção no shader ***********
// ***********************************************************************
var amvp = gl.getUniformLocation(shaderProgram, 'mvp');  

// ***********************************************************************
// 05 - Desenho **********************************************************
// ***********************************************************************

function draw(){
    // obtem os valores dos ângulos via DOM
    var ax = parseInt(document.getElementById('ax').innerHTML, 10);
    var ay = parseInt(document.getElementById('ay').innerHTML, 10);
    var az = parseInt(document.getElementById('az').innerHTML, 10);

    // Use increments via DOM to update angles (still in degrees)
    ax = (ax + parseInt(document.getElementById('dx').value, 10)) % 360;
    ay = (ay + parseInt(document.getElementById('dy').value, 10)) % 360;
    az = (az + parseInt(document.getElementById('dz').value, 10)) % 360;

    // Atualiza os valores dos angulos
    document.getElementById('ax').innerHTML = ax.toString();
    document.getElementById('ay').innerHTML = ay.toString();
    document.getElementById('az').innerHTML = az.toString();

    // Convert values to radians
    ax *= 2*Math.PI/360; ay *= 2*Math.PI/360; az *= 2*Math.PI/360;

    // Cria a matriz de projeção
    var mat = getTransformationMatrix(ax, ay, az);
    
    // atribui a matriz de projeção ao shader
    gl.uniformMatrix4fv(amvp, false, mat);
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
}

// função que gera a matriz de projeção
function getTransformationMatrix(rx, ry, rz)
{
  // Pre-computes trigonometric values (mainly for better readability)
  var cx = Math.cos(rx), sx = Math.sin(rx);
  var cy = Math.cos(ry), sy = Math.sin(ry);
  var cz = Math.cos(rz), sz = Math.sin(rz);
 
  // Returns matrix
  return new Float32Array([cy*cz, (sx*sy*cz-cx*sz), (sx*sz+cx*sy*cz), 0,
                           cy*sz, (sx*sy*sz+cx*cz), (cx*sy*sz-sx*cz), 0,
                           -sy,   sx*cy,            cx*cy,            0,
                           0,     0,                0,                1]);
}

setInterval(draw,40);