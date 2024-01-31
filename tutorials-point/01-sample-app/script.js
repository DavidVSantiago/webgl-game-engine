// passo 01 - prepara o canvas e o contexto webgl
var canvas =  document.getElementById('GLCanvas');
var gl = canvas.getContext('experimental-webgl');

// passo 02 - define as geometrias nos buffers
var vertex = [-0.5,0.5,-0.5,-0.5,0.0,-0.5];

// cria um objeto buffer na GPU
var vertexBuffer = gl.createBuffer();

// vincula o buffer criado ao buffer de vértices
gl.bindBuffer(
    gl.ARRAY_BUFFER // buffer alvo da vinculação (buffer de vértices)
    ,vertexBuffer// nosso buffer a ser vinculado
);

// passa os dados do vértice para o buffer
gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertex),
    gl.STATIC_DRAW // para eficiencia
);

// desvincula o buffer. Boa prática necessária
gl.bindBuffer(
    gl.ARRAY_BUFFER // buffer alvo da vinculação (buffer de vértices)
    ,null// nosso buffer a ser vinculado
);

// passo 03 - Cria e compila os shaders

// Código fonte do vertex shader
var vShaderSource =
'attribute vec2 coordinates;' + 
'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';

// cria o objeto do vertex shader
var vertexShader = gl.createShader(gl.VERTEX_SHADER);

// insere o código fonte do vertex shader
gl.shaderSource(vertexShader, vShaderSource);

// compila o vertex shader
gl.compileShader(vertexShader);

// Código fonte do fragment shader
var fShaderSource =
'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}'; + '}';

// cria o objeto do fragment shader
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

// insere o código fonte do fragment shader
gl.shaderSource(fragmentShader, fShaderSource);

// compila o fragment shader
gl.compileShader(fragmentShader);

// cria o shader program
var shaderProgram = gl.createProgram();

// vincula os shaders ao shader program
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);

// vincula o shader program ao pipeline
gl.linkProgram(shaderProgram);

// seta o shader program como ativo para uso
gl.useProgram(shaderProgram);

// passo 04 - vincula o shader program ao buffer de vértices criado

// vincula para informar o buffer de onde os dados serão lidos
gl.bindBuffer(
    gl.ARRAY_BUFFER // buffer alvo da vinculação (buffer de vértices)
    ,vertexBuffer // nosso buffer a ser vinculado
);

// obtém a ref para o atributo no vertex shader (GLSL)
var coord = gl.getAttribLocation(shaderProgram, 'coordinates');

// informa como o vertex shader vai ler os dados do buffer atualmente ativo (o VBO)
gl.vertexAttribPointer(
    coord,// para onde a leitura dos dados do VBO serão enviados (a entrada no vertex shader)
    2,// quantidade de componentes por vértice a serem lidos do VBO (x e y)
    gl.FLOAT, // tipo de dados no VBO
    false, // não normalizar
    0, // stride (sem pulos)
    0 // offset (do início)
);

// habilita a leitura do VBO pelo atributo do vertex shader
gl.enableVertexAttribArray(coord);

// passo 05 - Desenho

// limpa a tela
gl.clearColor(0.5, 0.5, 0.7, 1.0);

// ??
gl.enable(gl.DEPTH_TEST);

// ??
gl.clear(gl.COLOR_BUFFER_BIT);

// Set the view port
gl.viewport(0,0,canvas.width,canvas.height);

// Draw the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);