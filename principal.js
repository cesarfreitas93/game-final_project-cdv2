var juego = new Phaser.Game(290, 540, Phaser.AUTO, 'bloque_juego');
var score = 0;
var vidas = 4;

juego.state.add('Intro',Intro);
juego.state.add('Juego',Juego);
juego.state.add('Juego1',Juego1);
juego.state.add('Juego2',Juego2);
juego.state.add('Juego3',Juego3);
juego.state.add('Juego4',Juego4);
juego.state.add('Victoria',Victoria);
juego.state.add('Terminado', Terminado);
juego.state.start('Intro');
