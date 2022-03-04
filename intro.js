var pass;
var audio_game_1;
var fondo;
var Intro = {
    preload: function() {
        juego.load.audio('intro_audio', ['media/sound_intro.mp3', 'media/sound_intro.ogg']);
        juego.load.audio('boot_audio_1', ['media/ignition.mp3','media/ignition.ogg']);
        juego.load.image('intro_bg', 'img/intro.png');
    },
    create: function() {
        audio_game_1 = juego.add.audio('intro_audio', 0.3, true);
        audio_game_1.play();

        fondo = juego.add.tileSprite(0, 0, 290, 540, 'intro_bg');

        juego.add.text(30,490, "Press 'Spacebar' to play ",{font: "bold 20px Arial",fill: "#000"});
        pass =juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
    },
    update: function() {

        if(pass.isDown){
            audio_game_1.stop();
            boot_sound_1 = juego.add.audio('boot_audio_1');
            boot_sound_1.play();
            juego.state.start('Juego');
        }

    },


}