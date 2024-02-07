class Point{
    constructor(x=0.0,y=0.0){
        this.x=x;
        this.y=y;
    }
}

class M3x3{
    constructor(){
        this.m=[
            1,0,0,
            0,1,0,
            0,0,1,
        ];
    }
    multiply(M){ // recebe outra matriz 'm' para multiplicar com essa
        let output =new M3x3();
        output.m = [
            // Linha 1 da resultante
            this.m[0]*M.m[0]+this.m[1]*M.m[3]+this.m[2]*M.m[6],
            this.m[0]*M.m[1]+this.m[1]*M.m[4]+this.m[2]*M.m[7],
            this.m[0]*M.m[2]+this.m[1]*M.m[5]+this.m[2]*M.m[8],
            // Linha 2 da resultante
            this.m[3]*M.m[0]+this.m[4]*M.m[3]+this.m[5]*M.m[6],
            this.m[3]*M.m[1]+this.m[4]*M.m[4]+this.m[5]*M.m[7],
            this.m[3]*M.m[2]+this.m[4]*M.m[5]+this.m[5]*M.m[8],
            // Linha 3 da resultante
            this.m[6]*M.m[0]+this.m[7]*M.m[3]+this.m[8]*M.m[6],
            this.m[6]*M.m[1]+this.m[7]*M.m[4]+this.m[8]*M.m[7],
            this.m[6]*M.m[2]+this.m[7]*M.m[5]+this.m[8]*M.m[8],
        ]
        return output;
    }
    transition(x,y){ // translação
        let output = new M3x3();
        output.m=[
            // Linha 1 resultante
            this.m[0],
            this.m[1],
            this.m[2],
            // Linha 2 resultante
            this.m[3],
            this.m[4],
            this.m[5],
            // linha 3 resultante
            this.m[0]*x+this.m[3]*y+this.m[6],
            this.m[1]*x+this.m[4]*y+this.m[7],
            this.m[2]*x+this.m[5]*y+this.m[8],
        ];
        return output;
    }
    scale(x,y){ // escala
        let output = new M3x3();
        output.m=[
            // Linha 1 resultante
            this.m[0]*x,
            this.m[1]*x,
            this.m[2]*x,
            // Linha 2 resultante
            this.m[3]*y,
            this.m[4]*y,
            this.m[5]*y,
            // linha 3 resultante
            this.m[6],
            this.m[7],
            this.m[8],
        ];
        return output;
    }
}
/** MODELO REFERENCIAL
 * 0, 1, 2    0, 1, 2
 * 3, 4, 5    3, 4, 5
 * 6, 7, 8    6, 7, 8
 * 
 * MODELO REFERENCIA DE TRANSLAÇÃO 2D x e y
 * |M00|M01|M02| -> linha 0. responsável pelas transformações da coordenada x
 * |M10|M11|M12| -> linha 1. responsável pelas transformações da coordenada y
 * |M20|M21|M22| -> linha 2. responsável pela translação
 * 
 * |                M00|                M01|                 M02|
 * |                M10|                M11|                 M12|
 * |(x*M00)+(y*M10)+M20|(x*M01)+(y*M11)+M21| (x*M02)+(y*M12)+M22| 
 * 
 * MODELO REFERENCIA DE ESCALA 2D x e y
 *                 M00|                M01|                 M02|
 *                 M10|                M11|                 M12|
 * (x*M00)+(y*M10)+M20|(x*M01)+(y*M11)+M21| (x*M02)+(y*M12)+M22|
 */
