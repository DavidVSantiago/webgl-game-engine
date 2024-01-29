attribute vec3 aVertexPosition;
/* matrix de tranformação, usada para aplicar transformações no vértice
 é um operador de transformação para todos os vértices*/
uniform mat4 uModelXformMatrix;
void main(void){
    // aplica a tranformação a cada vértice
    gl_Position = uModelXformMatrix * vec4(aVertexPosition,1.0);
}