var pass;
var audio_game_1;

var Victoria = {
    preload: function() {
        juego.load.audio('intro_audio', ['media/victory_theme.mp3','media/victory_theme.ogg']);
        juego.load.image('intro_bg', 'img/victory.png');
    },
    create: function() {
        audio_game_1 = juego.add.audio('intro_audio', 0.3, true);
        audio_game_1.play();

        fondo = juego.add.tileSprite(0, 0, 290, 540, 'intro_bg');
        juego.add.text(25,270, "Press 'Spacebar' to replay ",{font: "bold 20px Arial",fill: "#fff"});
        pass =juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
    },
    update: function() {

        if(pass.isDown){
            audio_game_1.stop();
            juego.state.start('Intro');
        }

    },


}