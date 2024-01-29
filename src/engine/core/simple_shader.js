/** Classe que cria e prepar um shader simples para desenho*/
"use strict";
import VertexBuffer from './vertex_buffer.js';

class SimpleShader{
    
    /** Construtor ---------------------------------------------- */
    constructor(vertexShaderID, fragmentShaderID, glContext){
        this.glContext = glContext;
        this.mProgram = null; // conjunto de shaders compilados
        
        this.vertexBuffer = new VertexBuffer(this.glContext);

        // obtém o vertexShader Compilado
        this.mVertexShader = this.loadAndCompileShader(vertexShaderID,this.glContext.VERTEX_SHADER);
        // obtém o fragmentShader Compilado
        this.mFragmentShader = this.loadAndCompileShader(fragmentShaderID,this.glContext.FRAGMENT_SHADER);

        // cria o programa (coleção de shaders)
        this.mProgram = this.glContext.createProgram();
        // atribui os shaders compilados ao programa
        this.glContext.attachShader(
            this.mProgram, // target - programa ao qual o shader será vinculado
            this.mVertexShader); // shader - shader a ser vincuado
            this.glContext.attachShader(this.mProgram, // target - programa ao qual o shader será vinculado
            this.mFragmentShader); // shader - shader a ser vincuado
        
        // vincula o programa com os shaders ao webgl
        this.glContext.linkProgram(this.mProgram);
        
        // checa erro na criação do programa 
        if(!this.glContext.getProgramParameter(this.mProgram,this.glContext.LINK_STATUS) ){
            throw new Error('Error Linking Shader');
            return null;
        }

        // obtêm a referência para o atributo "aVertexPosition" do vShader
        this.mVertexPositionRef = this.glContext.getAttribLocation(
            this.mProgram, // 
            "aVertexPosition" // 
        );
        // obtêm a referência para o uniform "uPixelColor" do fShader
        this.mPixelColorRef = this.glContext.getUniformLocation(
            this.mProgram, // 
            "uPixelColor" // 
        );
        
        // obtêm a referência para o uniform "uModelXformMatrix" do vShader
        // este uniform é a matriz de transformação dos vértices
        this.mModelMatrixRef = this.glContext.getUniformLocation(
            this.mProgram, // 
            "uModelXformMatrix" // 
        );
    }

    /** Métodos ---------------------------------------------- */
    // na ativação são definidos os valores dos 'atributos' e 'uniforms' para os shaders
    activate(
        pixelColor, // cor do pixel no fShader
        trsMatrix // matriz de transformação para os vértices
    ){
        // carrega o shader compilado para a memória da gpu
        this.glContext.useProgram(this.mProgram);

        // 02 vincula o buffer de vértices
        this.glContext.bindBuffer(
            this.glContext.ARRAY_BUFFER, // target - tipo de buffer. Neste caso, buffer de atributos
            this.vertexBuffer.get() // buffer a ser vinculado
        );
        // Especifica como os dados do vértice estão organizados na matriz
        this.glContext.vertexAttribPointer(this.mVertexPositionRef,
            3, // cada elemento é um (x,y,z)
            this.glContext.FLOAT, // tipo do dado
            false, // se o conteúdo é um vetor normalizado
            0, // numero de bytes para pular entro os elementos (como são dados consecutivos na matriz, não precisa)
            0); // offset p/ o primeiro elemento (não precisa, pois começa do início da matriz)
        
        // ??
        this.glContext.enableVertexAttribArray(this.mVertexPositionRef);
        // atribui a cor do pixel no fShader
        this.glContext.uniform4fv(this.mPixelColorRef, pixelColor);
        // atribui a matriz de transformação 'trsMatrix' ao vShader
        this.glContext.uniformMatrix4fv(this.mModelMatrixRef,false,trsMatrix);
    }

    loadAndCompileShader(filePath, shaderType){
        // ref do shader a ser criado na GPU
        let compiledShader = null;
    
        // obtém o texto do código-fonte do shader GLSL
        let xmlReq = new XMLHttpRequest();
        xmlReq.open('GET',filePath,false);
        try{
            xmlReq.send();
        }catch(error){
            throw new Error('Erro ao carregar o código-fonte do shader: '+ filePath);
        }
        let shaderSource = xmlReq.responseText;
        
        // checa se houve falha no carregamento do shader
        if(shaderSource==null){
            throw new Error('Cuidado! Carregamento de '+filePath+' falhou!');
        }
        
        // cria um tipo de shader na GPU, baseado no parâmetro informado
        compiledShader = this.glContext.createShader(shaderType);
    
        /* transfere o código-fonte do shader para o shader na GPU */
        // 'shaderSource' é o código-fonte do shader cru
        // 'compiledShader' é shader na GPU onde o código-fonte é colocado
        this.glContext.shaderSource(compiledShader,shaderSource);
        
        // processo de compilação do shader com base no código-fonte fornecido
        this.glContext.compileShader(compiledShader);
    
        // checa o status do shader (se houve erro na compilação)
        if(!this.glContext.getShaderParameter(compiledShader,this.glContext.COMPILE_STATUS)){
            throw new Error('Erro de compilação do shader:'+
                        this.glContext.getShaderInfoLog(compiledShader));
        }
        return compiledShader; // retorna o shader compilado
    }
}

export default SimpleShader;