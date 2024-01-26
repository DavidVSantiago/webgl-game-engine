/** Este módulo cria e prepara um buffer na GPU para o quadrado a ser desenhado */
"use strict";
import * as core from './core.js';

// ref para o buffer de vértices na GPU
let mGlVertexBuffer = null;
function get(){return mGlVertexBuffer;}

// define os vértices do quadrado a ser desenhado na tela
let mVerticesOfSquare=[
    0.5,0.5,0.0,
    -0.5,0.5,0.0,
    0.5,-0.5,0.0,
    -0.5,-0.5,0.0
];

// aloca o buffer na GPU e envia os vértices para esse buffer
function init(){
    // obtém a referência do webgl
    let gl = core.getGl();
    
    // 01 cria um buffer na GPU
    mGlVertexBuffer = gl.createBuffer();
    
    // 02 função que vincula um buffer da GPU
    gl.bindBuffer(
        gl.ARRAY_BUFFER, // target - tipo de buffer. Neste caso, buffer de atributos
        mGlVertexBuffer // buffer a ser vinculado
    );

    // 03 função que aloca que inicializa dados para o buffer atualmente vinculado
    gl.bufferData(
        gl.ARRAY_BUFFER, // target - novamente indicando buffer de atributos
        new Float32Array(mVerticesOfSquare), // data - cria um objeto com os dados do array de vertices anteriores 
        gl.STATIC_DRAW // informa que os dados não mudarão, otimizando as operações de desenho
    );   
}
// permite que as funções possam ser acessadas externamente
export{init,get}