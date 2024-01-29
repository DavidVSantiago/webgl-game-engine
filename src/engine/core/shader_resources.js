/** Classe que carrega e armazena os shaders*/
"use strict"

import SimpleShader from "./simple_shader.js";

class ShaderResources{
    constructor(glContext){        
        // caminho dos arquivos dos shaders
        this.kSimpleVS = "src/engine/core/glsl_shaders/simple_vs.glsl"; // to VertexShader
        this.kSimpleFS = "src/engine/core/glsl_shaders/simple_fs.glsl"; // to FragmentShader
        
        // cria os shaders
        this.mConstColorShader = new SimpleShader(this.kSimpleVS,
                                                    this.kSimpleFS,
                                                    glContext);
    }
    getConstColorShader() { return this.mConstColorShader; }
}

export default ShaderResources