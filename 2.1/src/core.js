"use strict";
import * as vertexBuffer from "./vertex_buffer.js"; //vertexBuffer module
import * as shaderSupport from "./shader_support.js"

let mGl = null;
// retorna o objeto weblg
function getGl(){return mGl;}
// inicializa o contexto do webgl
function initWebGl(htmlCanvasID){
    let canvas = document.getElementById(htmlCanvasID);
    mGl = canvas.getContext("webgl2")||
    canvas.getContext("experimental-webgl2");
    if(mGl === null){
        document.write("<br><b>Seu Browser não suporta HTML5 Canvas</b>");
        return;
    }
    mGl.clearColor(0.0,0.8,0.8,1.0);

    // inicializa o buffer de vértices
    vertexBuffer.init();
    // carrega e compila os shaders
    shaderSupport.init("VertexShader","FragmentShader");
}
//
function clearCanvas(){
    mGl.clear(mGl.COLOR_BUFFER_BIT);
}

function drawSquare(){
    // ativa o shader
    shaderSupport.activate();
    
    // função usada para renderizar gráficos na tela
    mGl.drawArrays(
        mGl.TRIANGLE_STRIP, // tipo de primitiva a ser desenhada
        0, // o índice do 1º vértice a ser desenhado
        4 // numero de vértices a serem desenhados
    );
}

window.onload=()=>{
    initWebGl('GLCanvas');
    clearCanvas();
    drawSquare();
}
export {getGl}