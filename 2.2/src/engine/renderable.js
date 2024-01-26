import Engine from "./engine.js";

class Renderable {
    constructor() {
        this.engine = new Engine();
        this.gl = this.engine.getGl();
        this.mShader = this.engine.getShaderResources().getConstColorShader();
        this.mColor = [1, 1, 1, 1]; // color of pixel
    }

    draw() {
        this.mShader.activate(this.mColor); // para ativar o shader
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    setColor(color) {this.mColor = color; }
    getColor() { return this.mColor; }
}
export default Renderable;