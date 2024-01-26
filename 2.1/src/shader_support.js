"use strict";
import * as core from "./core.js"; // access as core module
import * as vertexBuffer from "./vertex_buffer.js"; //vertexBuffer module

// ref para o shader compilado
let mCompiledShader = null;
// ref para o atributo "aVertexPosition" na GPU
let mVertexPositionRef = null;

// função para carregar e compilar os shaders definidos
function loadAndCompileShader(id, shaderType){
    // ref do shader a ser criado na GPU
    let compiledShader = null;

    // obtém o texto do código-fonte do shader GLSL
    let shaderText = document.getElementById(id);
    let shaderSource = shaderText.firstChild.textContent;
    
    // obtém a referência do webgl
    let gl = core.getGl();
    
    // cria um tipo de shader na GPU, baseado no parâmetro informado
    compiledShader = gl.createShader(shaderType);

    /* transfere o código-fonte do shader para o shader na GPU */
    // 'shaderSource' é o código-fonte do shader cru
    // 'compiledShader' é shader na GPU onde o código-fonte é colocado
    gl.shaderSource(compiledShader,shaderSource);
    
    // processo de compilação do shader com base no código-fonte fornecido
    gl.compileShader(compiledShader);

    // checa o status do shader (se houve erro na compilação)
    if(!gl.getShaderParameter(compiledShader,gl.COMPILE_STATUS)){
        throw new Error('Erro de compilação do shader:'+
                        gl.getShaderInfoLog(compiledShader));
    }
    return compiledShader; // retorna o shader compilado
}

function init(vertexShaderID,fragmentShaderID){
    let gl = core.getGl(); // obtém a ref do webGl
    // obtém o vertexShader Compilado
    let vertexShader = loadAndCompileShader(vertexShaderID,
                        gl.VERTEX_SHADER);
    // obtém o fragmentShader Compilado
    let fragmentShader = loadAndCompileShader(fragmentShaderID,
                        gl.FRAGMENT_SHADER);
    
    // cria o programa (coleção de shaders)
    mCompiledShader = gl.createProgram();
    // atribui os shaders compilados ao programa
    gl.attachShader(mCompiledShader, // target - programa ao qual o shader será vinculado
                    vertexShader // shader - shader a ser vincuado
    );
    gl.attachShader(mCompiledShader,fragmentShader);
    // vincula o programa ao webgl
    gl.linkProgram(mCompiledShader);
    // checa erro na criação do programa 
    if(!gl.getProgramParameter(mCompiledShader,gl.LINK_STATUS) ){
        throw new Error('Error Linking Shader');
        return null;
    }
    // obtêm a referência para o atributo "aVertexPosition" no shader na GPU
    mVertexPositionRef = gl.getAttribLocation(mCompiledShader,
                            "aVertexPosition");
}

function activate(){
    // obtém a referência do webgl
    let gl = core.getGl();

    // carrega o shader compilado para a memoria da gpu
    gl.useProgram(mCompiledShader);

    // vincula o vertex buffer 
    gl.vertexAttribPointer(this.mVertexPositionRef,
        3, // cada elemento é um (x,y,z)
        gl.FLOAT, // tipo do dado
        false, // se o conteúdo é um vetor normalizado
        0, // numero de bytes para pular entro os elementos
        0); // offset p/ o primeiro elemento
     gl.enableVertexAttribArray(this.mVertexPositionRef);
}
export{init,activate}