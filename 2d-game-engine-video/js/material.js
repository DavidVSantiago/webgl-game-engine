class Material{
    constructor(gl,vs,fs){
        this.gl=gl;  
        let vShader = this.getShader(vs,gl.VERTEX_SHADER);
        let fShader = this.getShader(fs,gl.FRAGMENT_SHADER);

        /** Se os shaders foram criados corretamente, cria o program */
        if(vShader && fShader){
            this.program= this.gl.createProgram();
            gl.attachShader(this.program, vShader);
            gl.attachShader(this.program, fShader);
            gl.linkProgram(this.program);
            /** verifica se a linkagem do programa foi bem sucedida */
            if(!gl.getProgramParameter(this.program,gl.LINK_STATUS)){
                console.error('Não pode carregar o shader:'+gl.getProgramInfoLog(this.program));
                return null;
            }
            gl.detachShader(this.program, vShader);
            gl.detachShader(this.program, fShader);
            gl.deleteShader(vShader);
            gl.deleteShader(fShader);
        }
    }
    getShader(source,type){
        let gl = this.gl;
        var output = gl.createShader(type);
        gl.shaderSource(output, source);
        gl.compileShader(output);

        if(!gl.getShaderParameter(output,gl.COMPILE_STATUS)){
            console.error('Shader error: '+gl.getShaderInfoLog(output));
            return null;
        }
        
        return output;
    }
}

class Sprite{
    constructor(gl,img_url,vs,fs){
        this.gl = gl;
        this.isLoaded = false;
        this.material = new Material(gl,vs,fs);

        this.image = new Image();
        this.image.src = img_url;
        // quando a imagem for carregada podemos configurá-la
        this.image.onload = ()=> this.setup(); 
    }

    static createRectArray(x=0,y=0,w=1,h=1){
        return new Float32Array([ // um quad, formado por 2 triangulos
            x,y,
            x+w,y,
            x,y+h,
            x,y+h,
            x+w,y,
            x+1,y+h
        ]);
    }

    setup(){
        let gl = this.gl;
        gl.useProgram(this.material.program);
        this.gl_tex = gl.createTexture(); // cria um buffer de textura na GPU
        gl.bindTexture(gl.TEXTURE_2D, this.gl_tex); // ativa o buffer
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.MIRRORED_REPEAT);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        gl.bindTexture(gl.TEXTURE_2D, null); // desativa o buffer

        this.tex_buff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
        gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(), gl.STATIC_DRAW);

        this.geo_buff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
        gl.bufferData(gl.ARRAY_BUFFER, Sprite.createRectArray(), gl.STATIC_DRAW);

        this.aPositionLoc = gl.getAttribLocation(this.material.program, 'a_position');
        this.aTexCoordLoc = gl.getAttribLocation(this.material.program, 'a_textCoord');
        this.uImageLoc = gl.getUniformLocation(this.material.program, 'u_image');
        gl.useProgram(null);
        this.isLoaded=true;
    }
    render(){
        if(this.isLoaded){
            let gl = this.gl;

            gl.useProgram(this.material.program);
            
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D,this.gl_tex);
            gl.uniform1i(this.uImageLoc, 0);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, this.tex_buff);
            gl.vertexAttribPointer(this.aTexCoordLoc,2, gl.FLOAT, false, 0,0);
            gl.enableVertexAttribArray(this.aTexCoordLoc);
           
            gl.bindBuffer(gl.ARRAY_BUFFER, this.geo_buff);
            gl.vertexAttribPointer(this.aPositionLoc,2, gl.FLOAT, false, 0,0);
            gl.enableVertexAttribArray(this.aPositionLoc);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);

            gl.useProgram(null);
        }
    }
}