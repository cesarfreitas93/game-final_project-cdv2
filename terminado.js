var btnRestar;
var imgGameOver;
var boot_sound_3;
var Terminado = {

    preload: function () {
        juego.load.image('bntRestart', 'img/startBtn.png');
        juego.load.image('gameOver', 'img/gameover.png');
        juego.load.audio('boot_audio_3', ['media/game_over.mp3','media/game_over.ogg']);
    },

    create: function () {

        boot_sound_3 = juego.add.audio('boot_audio_3', 1, true);
        boot_sound_3.play();

        var mxp = localStorage.getItem("maxScore");
        if (score > mxp) {
            localStorage.setItem("maxScore", score);
        }
        juego.stage.backgroundColor = '#182d3b';
        imgGameOver = juego.add.sprite(30, 90, 'gameOver');
        imgGameOver.enableBody = true;
        imgGameOver.scale.setTo(0.4);

        juego.add.text(30, 260, "Puntaje Máximo: ", { font: "bold 20px Cascadia Code", fill: "#fff" });
        juego.add.text(240, 260, mxp, { font: "bold 20px Cascadia Code", fill: "#fff" });

        juego.add.text(30, 300, "Su Puntaje: ", { font: "bold 20px Cascadia Code", fill: "#fff" });
        juego.add.text(240, 300, score, { font: "bold 20px Cascadia Code", fill: "#fff" });

        if (score > mxp) {
            GameOver = juego.add.text(40, 350, "NUEVO RECORD", { font: "bold 24px Cascadia Code", fill: "#fff" });
        }

        btnRestar =  juego.add.button(juego.world.centerX -(190/2), 400, 'bntRestart', this.restarGame, this, 2, 1, 0);

    },

    restarGame: function () {

        boot_sound_3.stop();

        juego.state.start('Intro');
    
    }


};