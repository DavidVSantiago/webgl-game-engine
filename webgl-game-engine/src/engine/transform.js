import Engine from "./engine.js";
import { glMatrix, mat2, mat2d, mat3, mat4, quat, quat2, vec2, vec3, vec4 } from './lib/gl_matrix/index.js';

"use strict";

class Transform {
    constructor() {
        this.mPosition = vec2.fromValues(0, 0); // x e y
        this.mScale = vec2.fromValues(1, 1); // width e height
        this.mRotationInRad = 0.0; // em radianos
    }

    /* Getters */
    // posição
    getXPos(){return this.mPosition[0];}
    getYPos(){return this.mPosition[1];}
    getPosition(){
        return this.mPosition;
    }
    getWidth(){
        return this.mScale[0];
    }
    getHeight(){
        return this.mScale[1];
    }
    getSize(){
        return this.mScale;
    }
    getTRSMatrix(){
        // TODO retirar a criação do runtime
        let matrix = mat4.create(); // matrix 4x4 vazia

        // computa a TRANSLATION
        mat4.translate(matrix,matrix,
            vec3.fromValues(this.getXPos(),this.getYPos(),0.0));
        // computa a ROTATION
        mat4.rotateZ(matrix,matrix,this.mRotationInRad);
        // computa a SCALE
        mat4.scale(matrix,matrix,
            vec3.fromValues(this.getWidth(),this.getHeight(),1.0));

        return matrix;
    }

    /* Setters */
    setXPos(xPos){this.mPosition[0]=xPos;}
    setYPos(yPos){this.mPosition[1]=yPos;}
    setPosition(xPos, yPos){
        this.setXPos(xPos);
        this.setYPos(yPos);
    }
    setWidth(width){
        this.mScale[0] = width;
    }
    setHeight(height){
        this.mScale[1] = height;
    }
    setSize(width,height){
        this.setWidth(width);
        this.setHeight(height);
    }
    setRotationInRad(rotationInRadians){
        this.mRotationInRad = rotationInRadians;
        // normaliza o angulo em radiano (evitar valores maiores que 360graus)
        while(this.mRotationInRad>(2*Math.PI)){
            this.mRotationInRad-=(2*Math.PI);
        }
    }
    setRotationInDegree(rotationInDegree){
        this.setRotationInRad(rotationInDegree*Math.PI/180.0);
    }
}
export default Transform;