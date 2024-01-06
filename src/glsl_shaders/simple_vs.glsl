attribute vec3 aVertexPosition;
void main(void){
    // variável do GLSL que representa cada vértice
    gl_Position = vec4(aVertexPosition,1.0);
}