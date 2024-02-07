function loop(){
    window.game.update();
    requestAnimationFrame(loop);
}
class Game{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.width=800;
        this.canvas.height=600;

        this.worldSpaceMatrix=new M3x3();

        this.gl = this.canvas.getContext('webgl2');
        this.gl.clearColor(0.4,0.6,1.0,1.0);
        document.body.appendChild(this.canvas);
        let vs = document.getElementById('vs_01').innerHTML;
        let fs = document.getElementById('fs_01').innerHTML;
        this.sprite1 =new Sprite(this.gl,'imgs/nolt.png',vs,fs);
        this.sprite2 =new Sprite(this.gl,'imgs/npc_smith.png',vs,fs);

        let M1 = new M3x3();
        let M2 = new M3x3();
        M1.m[0]=2.0;
        M1.m[4]=3.0;
        M2.m[0]=2.0;
        M2.m[1]=1.0;
        M2.m[2]=2.0;
        M2.m[3]=1.0;
        M2.m[4]=3.0;
        M2.m[5]=1.0;
        M2.m[6]=2.0;
        M2.m[7]=1.0;
        M2.m[8]=4.0;
        let result = M1.multiply(M2);
        console.log(result);
    }
    
    resize(x,y){
        this.canvas.width=x;
        this.canvas.height=y;
        // leva a origem do centro para o canto superior esquerdo
        let wratio = 
        this.worldSpaceMatrix=new M3x3().transition(-1,1).scale(wRatio,2/240);
    }

    update(){
        this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA);
        this.sprite1.render();
        this.sprite2.render();
        this.gl.flush();
    }

}