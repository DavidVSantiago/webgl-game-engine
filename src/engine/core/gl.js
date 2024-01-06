/** Classe que carrega o canvas e o contexto webgl*/
"use strict"

class GL{
    constructor(htmlCanvasID=''){
        // carrega o objeto ref do <canvas>
        this.mCanvas = document.getElementById(htmlCanvasID);
        if(this.mCanvas === null){ // trata erro de canvas
            throw new Error("Engine init ["+
                    htmlCanvasID + "] O id html não foi encontrado!");
        }
        // carrega o objet ref do contexto webgl
        this.mGl = this.mCanvas.getContext("webgl2")||
                    this.mCanvas.getContext("experimental-webgl2");
        if(this.mGl === null){ // trata erro de webgl
            document.write("<br><b>Seu Browser não suporta HTML5 WebGL 2</b>");
            return;
        }
    }
    get(){return this.mGl;}
}

export default GL