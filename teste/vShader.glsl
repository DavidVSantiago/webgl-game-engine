#version 300 es

//in vec4 a_position; // entrada para o programa do shader
in vec2 a_position;
uniform vec2 u_resolution;

void main(){
    //converte a posição dos pixels de 0.0 para 1.0
    vec2 zeroToOne = a_position/u_resolution;

    //converte de 0->1 para 0->2
    vec2 zeroToTwo = zeroToOne*2.0;

    //converte de 0->2 para -1->+1
    vec2 clipspace = zeroToTwo -1.0;

    gl_Position = vec4(clipspace,0,1);
    //gl_Position = a_position;
}