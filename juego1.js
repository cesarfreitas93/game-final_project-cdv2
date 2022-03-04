var fondo, carro, cursores, enemigos,enemigos2, timer, pause, boolPause;
var  txtScore, txtVidas, niveles = 1, txtNivel;
var velocity_pista;
var velocidadObj =0;
var GameOver;
var Juego1 = {
    preload: function() {
        juego.load.image('bg','img/bg_2.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('enemy_one', 'img/cars/car_black_5.png');
        juego.load.image('enemy_two', 'img/cars/car_yellow_1.png');
        juego.load.image('gasolina', 'img/gas.png');
        juego.load.spritesheet('perros','img/dog.png',30,58);
        juego.load.audio('boot_playgame', ['media/urbanCity.mp3', 'media/urbanCity.ogg']);
        juego.forceSingleUpdate = true;
    },
    create: function() {
        audio_game_1 = juego.add.audio('boot_playgame', 0.3, true);
        audio_game_1.play();

        velocity_pista = 5;
        fondo = juego.add.tileSprite(0,0,290,540,'bg');
        //fondo = juego.stage.backgroundColor = "109dfa";
        carro = juego.add.sprite(juego.width/2, 490, 'carro');
        carro.anchor.setTo(0.5);
        //carro.enableBody = true;

        carroP1 = juego.add.sprite(10, 20, 'carro');
        carroP2 = juego.add.sprite(40, 20, 'carro');
        carroP3 = juego.add.sprite(70, 20, 'carro');
        carroP4 = juego.add.sprite(100, 20,'carro');

        enemigos = juego.add.group();
        juego.physics.arcade.enable(enemigos, true);
        enemigos.enableBody = true;
        enemigos.createMultiple(18, 'enemy_one');
        enemigos.setAll('anchor.x', 0.5);
        enemigos.setAll('anchor.y', 0.5);
        enemigos.setAll('outOfBoundsKill', true);
        enemigos.setAll('checkWorldBounds', true);

        enemigos2 = juego.add.group();
        juego.physics.arcade.enable(enemigos2, true);
        enemigos2.enableBody = true;
        enemigos2.createMultiple(18, 'enemy_two');
        enemigos2.setAll('anchor.x', 0.5);
        enemigos2.setAll('anchor.y', 0.5);
        enemigos2.setAll('outOfBoundsKill', true);
        enemigos2.setAll('checkWorldBounds', true);

      var animacion = juego.add.tween(enemigos).to(
            {x:100}, 400, Phaser.Easing.Linear.None, true, 0, 1000, true
        );

        var animacion2 = juego.add.tween(enemigos2).to(
            {x:100}, 400, Phaser.Easing.Linear.None, true, 1000, 1000, true
        );


        gasolinas = juego.add.group();
        juego.physics.arcade.enable(gasolinas, true);
        gasolinas.enableBody = true;
        gasolinas.createMultiple(20, 'perros');
        gasolinas.setAll('anchor.x', 0.5);
        gasolinas.setAll('anchor.y', 0.5);
        gasolinas.setAll('outOfBoundsKill', true);
        gasolinas.setAll('checkWorldBounds', true);
        gasolinas.frame=1;

        gasolinas.callAll('animations.add', 'animations', 'corre', [0,1,2,3,4], 16, true);
        gasolinas.callAll('play', null, 'corre');

        timer = juego.time.events.loop(3001, this.crearCarroEnemigo, this);
        timerGas = juego.time.events.loop(4000, this.crearGasolina, this);
        timer3 =  juego.time.events.loop(5003, this.crearSegEnemigo, this);

        cursores=juego.input.keyboard.createCursorKeys();
		juego.add.text(140,20, "Score: ",{font: "bold 24px Arial",fill: "black"});
		txtScore = juego.add.text(230,20, score+"",{font: "bold 24px Arial",fill: "black"});

        pause =juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        boolPause =  false ;

		juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(carro);
        carro.body.collideWorldBounds=true;
    },
    update: function() {
        if(score%10 == 0 && score !=0)
        {
            velocity_pista += 0.011;
        }
        fondo.tilePosition.y += velocity_pista;

        // var audio = new Audio('media/choque.mp3');
		// audio.play();  

        juego.physics.arcade.overlap(carro, enemigos, this.fnCollision, null, this);
      juego.physics.arcade.overlap(carro, enemigos2, this.fnCollision, null, this);
        juego.physics.arcade.overlap(carro, gasolinas, this.fnRecogerGas, null, this);

        if(cursores.right.isDown &&
            carro.position.x <240){
            carro.position.x +=5;
        }

        if(cursores.left.isDown &&
            carro.position.x >50){
            carro.position.x -=5;
        }
      
        if (cursores.up.isDown &&
            carro.position.y > 50) {
            carro.position.y -= 5;
        }

        if (cursores.down.isDown &&
            carro.position.y < 512) {
            carro.position.y += 5;
        }

        carroP = [carroP1, carroP2, carroP3, carroP4];
        switch(vidas){
            case 0:
                carroP[0].alpha = 0.5;
                carroP[1].alpha = 0.5;
                carroP[2].alpha = 0.5;
                carroP[3].alpha = 0.5;
                audio_game_1.stop();
                juego.state.start('Terminado');
            break;
            case 1:
                carroP[0].alpha = 1;
                carroP[1].alpha = 0.5;
                carroP[2].alpha = 0.5;
                carroP[3].alpha = 0.5;
            break;
            case 2:
                carroP[0].alpha = 1;
                carroP[1].alpha = 1;
                carroP[2].alpha = 0.5;
                carroP[3].alpha = 0.5;
            break;
            case 3:
                carroP[0].alpha = 1;
                carroP[1].alpha = 1;
                carroP[2].alpha = 1;
                carroP[3].alpha = 0.5;
            break;
            case 4:
                carroP[0].alpha = 1;
                carroP[1].alpha = 1;
                carroP[2].alpha = 1;
                carroP[3].alpha = 1;
            break;
        
        }

    },

  crearSegEnemigo : function(){
        var pos = Math.floor(Math.random() * 3) + 1;
        var enemy = enemigos2.getFirstDead();
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.reset(pos * 50, 0);
        if (score % 4 == 0 && score != 0) {
            velocidadObj += 10;
        }
        enemy.body.velocity.y = 200 + velocidadObj;
        enemy.anchor.setTo(0.5);
    },
  
    crearCarroEnemigo: function(){
        var pos     = Math.floor(Math.random()*3)+1;
        var enemy   = enemigos.getFirstDead();
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        enemy.reset(pos*50,0); 
        if(score%4 == 0 && score !=0)
        {
            velocidadObj += 15;
        }
        enemy.body.velocity.y = 200 + velocidadObj;
        enemy.anchor.setTo(0.5);
    },
    crearGasolina: function(){
        var pos     = Math.floor(Math.random()*3)+1;
        var gas     = gasolinas.getFirstDead();
        gas.physicsBodyType = Phaser.Physics.ARCADE;
        gas.reset(pos*73,0); 
        if(score%10 == 0 && score !=0)
        {
            velocidadObj += 15;
        }
        gas.body.velocity.y = 200+ velocidadObj;
        gas.anchor.setTo(0.5);
    },


    fnCollision: function(b,m){
		m.kill();
        vidas--; 
		var audio = new Audio('media/choque.mp3');
		audio.play();
	},
    fnRecogerGas: function(b,m){
        m.kill();
        score++;
		txtScore.text = score;
        var audio = new Audio('media/dog_bark.mp3');
		audio.play(); 
        if(score == 20)
        {
            audio_game_1.stop();
            juego.state.start('Juego2');
            if(vidas<4){
                vidas++;
            }
        }
    }
}