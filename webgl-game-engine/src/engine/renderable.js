import Engine from "./engine.js";
import Transform from "./transform.js";

class Renderable {
    constructor() {
        this.engine = new Engine();
        this.gl = this.engine.getGl();
        this.mShader = this.engine.getShaderResources().getConstColorShader();
        this.mColor = [1, 1, 1, 1]; // color of pixel
        this.mXform = new Transform();
    }

    draw(cameraMatrix) {
        // configura os shaders com cor e dados de transformação
        this.mShader.activate(this.mColor,this.mXform.getTRSMatrix(),cameraMatrix); // para ativar o shader
        // desenhamos as polígonos com base nas configurações setadas no comando anterior
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    setColor(color) {this.mColor = color; }
    getColor() { return this.mColor; }
    getXform() { return this.mXform;}
}
export default Renderable;