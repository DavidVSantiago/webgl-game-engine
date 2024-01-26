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
        this. engine.clearCanvas([1, 0.8, 1, 1]);

        // Step C1: Draw Renderable objects with the white shader
        this.mWhiteSq.draw();
        // Step C2: Draw Renderable objects with the red shader
        //this.mRedSq.draw();
    }
}

window.onload = function() {
    new MyGame('GLCanvas');
}