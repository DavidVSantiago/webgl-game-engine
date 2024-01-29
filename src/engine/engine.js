/** Singleton que possui as funções básicas do game engine*/
"use strict";
import GL from "./core/gl.js"; // SINGLETON USE
import ShaderResources from "./core/shader_resources.js";

class Engine{
    constructor(htmlCanvasID=''){
        if(Engine.instance){ // retorna o singleton, caso já exista
            return Engine.instance;
        }
        this.gl=new GL(htmlCanvasID).get();// inicializa o singleton do canvas e do contexto webgl
        // inicializa e prepara os shaders para serem usados
        this.shaderResources = new ShaderResources(this.gl);

        // define o singleton e o retorna
        Engine.instance = this;
        return this;
    }
    clearCanvas(color) {
        this.gl.clearColor(color[0], color[1], color[2], color[3]);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT); // clear to the color set
    }
    /* Getters */
    getGl(){return this.gl;}
    getShaderResources(){return this.shaderResources;}
}

export default Engine