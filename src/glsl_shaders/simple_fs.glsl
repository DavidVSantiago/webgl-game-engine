precision mediump float; // define a precisão de calculos de floating points
uniform vec4 uPixelColor; // cor do pixel (uniform = constante p/ todos os vertices)

void main(void){
    gl_FragColor = uPixelColor; // atribui para cada pixel da tela
}
