function gameLoop(){
	//Bola
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
    context.fill();
    
	//Score
    context.beginPath();
    context.fillStyle = "white";
    context.font = "32pt Tahoma";
    context.fillText(pontosJogador, canvas.width - 50, 50);
    context.fill();
	
	//Barra
    context.beginPath();
    context.fillStyle = "yellow";
    context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
    context.fill();
    
    if(bolaPosY <= canvas.height){
        if(quantColisao==0){
            if(quantLoop==1){
                direcaoBolaX = geraNumRand(2,1,0);
                direcaoBolaY = 1;
            }
            if(direcaoBolaX==1){//Esquerda
                bolaPosY += velocidadeBola;
                bolaPosX -= velocidadeBola;
            }
            else{//Direita
                bolaPosY += velocidadeBola;
                bolaPosX += velocidadeBola;
            }
        }
        else{
            if(quantColisao>ultimaColisao){
                if(tipoColisao==1){//Colisao na Barra
                    direcaoBolaY = (direcaoBolaY==1) ? 2 : 1;
                }
                else if(tipoColisao==2){//Colisao parede esquerda
                    direcaoBolaX = 2;
                }
                else if(tipoColisao==3){//Colisao parede direita
                    direcaoBolaX = 1;
                }
                else{//Colisao parede direita
                    direcaoBolaY = (direcaoBolaY==1) ? 2 : 1;
                }
                ultimaColisao = quantColisao;
            }
            if(direcaoBolaY==1){
                bolaPosY += velocidadeBola;
                if(direcaoBolaX==1)
                    bolaPosX -= velocidadeBola;
                else
                    bolaPosX += velocidadeBola;
            }
            else{
                bolaPosY -= velocidadeBola;
                if(direcaoBolaX==1)
                    bolaPosX -= velocidadeBola;
                else
                    bolaPosX += velocidadeBola;
            }
        }
    }
    else{
        ultimaColisao = 0;
        quantColisao = 0;
        pontosJogador = 0;
        velocidadeBola = 1;
        bolaPosX = geraNumRand(690,10,false);
        bolaPosY = -10;
    }
    
    context.beginPath();
    context.fillStyle = "red";
    context.arc(bolaPosX, bolaPosY, bolaDiametro, 0, Math.PI * 2, true);
    context.fill();
    
    if((bolaPosX > jogadorPosicaoX && bolaPosX < (jogadorPosicaoX+barraLargura)) && (bolaPosY+10) >= canvas.height-barraAltura){
        pontosJogador++;
        quantColisao++;
        
        if(pontosJogador%2==0){
            velocidadeBola = velocidadeBola*1.1;
        }
		
		//Quina esquerda
		if(direcaoBolaX == 1 && (bolaPosX+10) > (jogadorPosicaoX + barraLargura))
		{
			direcaoBolaX = 2;
			bolaPosX = jogadorPosicaoX+barraLargura+10;
		}
		//Quina esquerda
		else if(direcaoBolaX == 2 && (bolaPosX-10) < jogadorPosicaoX)
		{
			direcaoBolaX = 1;
			bolaPosX = jogadorPosicaoX-10;
		}
		else
			bolaPosY = canvas.height-barraAltura - 10;

        tipoColisao = 1;//Colisao na barra
    }
    else if((bolaPosX-10)<=0){
        quantColisao++;
        tipoColisao = 2;//Colisao na lateral esquerda
    }
    else if((bolaPosX+10)>=canvas.width){
        quantColisao++;
        tipoColisao = 3;//Colisao na lateral direita
    }
    else if((bolaPosY)<=0 && quantColisao>0){
        quantColisao++;
        tipoColisao = 4;//Colisao no teto
    }
	
    quantLoop++;
}

var canvas;
var barraAltura, barraLargura, jogadorPosicaoX, velocidadeJogador;
var bolaDiametro, bolaPosX, bolaPosY, velocidadeBola, direcaoBolaX, direcaoBolaY;
var quantColisao, ultimaColisao, quantLoop;

var marginTela = 0;

var time = 2.5;

function inicializar(){
    ultimaColisao = 0;
    quantColisao = 0;
    quantLoop = 1;
    
    //CANVAS
    canvas = document.getElementById("canvas");
    canvas.height = 505;
    canvas.width = 700;
    
    //BOLA
    bolaDiametro = 10;
    bolaPosX = (canvas.width/2)-barraLargura/2;
    bolaPosY = -10;
    velocidadeBola = 1;
    
    //JOGADOR
    //>>Barra
    velocidadeJogador = 20;
    barraAltura = 15;
    barraLargura = 90;
    //>>Pontos
    pontosJogador = 0;

    jogadorPosicaoX = (canvas.width/2)-barraLargura/2;
    
    context = canvas.getContext("2d");
    
	marginTela = (document.body.clientWidth - canvas.height)/2;
    
    document.addEventListener('keydown', function(e) {
		if(e.keyCode == 37){
			if(jogadorPosicaoX > 0)
				jogadorPosicaoX -= velocidadeJogador;
		}
		if(e.keyCode == 39){
			if(jogadorPosicaoX < (canvas.width - barraLargura))
				jogadorPosicaoX += velocidadeJogador;
		}
	  
	});
	
    this.addEventListener('mousemove', function(e) {
		var x = e.pageX-marginTela;
		if(x>0 && x<(canvas.width-barraLargura))
			jogadorPosicaoX = x;
	});
 
    setInterval(gameLoop, time);
}

function geraNumRand(maior, menor, excecao){
    if(excecao){
       var num = excecao;
        while(num==excecao){
            num = Math.floor((Math.random()*(maior-menor))+menor);
        }
        return num;
    }
    else{
        return Math.floor((Math.random()*(maior-menor))+menor);
    }
    
}