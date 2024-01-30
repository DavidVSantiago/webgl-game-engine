attribute vec3 aVertexPosition;
/* matriz de tranformação, usada para aplicar transformações no vértice
 é um operador de transformação para todos os vértices*/
uniform mat4 uModelXformMatrix;
/* matriz de tranformação para as câmeras*/
uniform mat4 uCameraXformMatrix;
void main(void){
    // aplica a tranformação a cada vértice
    gl_Position = uCameraXformMatrix * uModelXformMatrix * vec4(aVertexPosition,1.0);
}