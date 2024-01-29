"use strict";
import Engine from '../engine/engine.js';
import Renderable from '../engine/renderable.js';

class MyGame{
    /** Construtor ---------------------------------------------- */
    constructor(htmlCanvasID) {
        // Step A: Initialize the game engine
        this.engine = new Engine(htmlCanvasID);

        // Step B: Create the Renderable objects:
        this.mWhiteSq = new Renderable();
        this.mWhiteSq.setColor([1, 1, 1, 1]);
        this.mRedSq = new Renderable();
        this.mRedSq.setColor([1, 0, 0, 1]);

        // Step B: Clear the canvas
        this.engine.clearCanvas([1, 0.8, 1, 1]);
        
        // Step D: Draw Renderable objects with the white shader
        this.mWhiteSq.getXform().setPosition(-0.25,0.25);
        this.mWhiteSq.getXform().setRotationInRad(0.2);
        this.mWhiteSq.getXform().setSize(1.2,1.2);
        this.mWhiteSq.draw();
        // Step E: Draw Renderable

        // Step F: Draw Renderable objects with the red shader
        this.mRedSq.getXform().setXPos(0.25);
        this.mRedSq.getXform().setYPos(-0.25);
        this.mRedSq.getXform().setRotationInDegree(45);
        this.mRedSq.getXform().setWidth(0.4);
        this.mRedSq.getXform().setHeight(0.4)
        this.mRedSq.draw();
        // Step E: Draw Renderable

    }
}

window.onload = function() {
    new MyGame('GLCanvas');
}