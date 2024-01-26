/** Classe que cria e prepara o buffer de vértices para desenho webgl*/
"use strict";

class VertexBuffer{
    constructor(glContext=''){
        this.glContext = glContext;
        this.mVerticesOfSquare=[// define os vértices do quadrado a ser desenhado na tela
            0.5,0.5,0.0,
            -0.5,0.5,0.0,
            0.5,-0.5,0.0,
            -0.5,-0.5,0.0
        ];
        // 01 cria um buffer na GPU
        this.mGlVertexBuffer = this.glContext.createBuffer();
        
        // 02 função que vincula um buffer da GPU
        this.glContext.bindBuffer(
            this.glContext.ARRAY_BUFFER, // target - tipo de buffer. Neste caso, buffer de atributos
            this.mGlVertexBuffer // buffer a ser vinculado
        );

        // 03 função que aloca que inicializa dados para o buffer atualmente vinculado
        this.glContext.bufferData(
            this.glContext.ARRAY_BUFFER, // target - novamente indicando buffer de atributos
            new Float32Array(this.mVerticesOfSquare), // data - cria um objeto com os dados do array de vertices anteriores 
            this.glContext.STATIC_DRAW // informa que os dados não mudarão, otimizando as operações de desenho
        );   
    }
    get(){return this.mGlVertexBuffer;} // retorna o buffer de vértices
}

export default VertexBuffer