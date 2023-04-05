import { inicio } from './scenes/inicio.js';
import { lobby } from './scenes/lobby.js';
import { juego } from './scenes/juego.js';
//import { juego } from './scenes/juego.js';

var config = {
    type: Phaser.AUTO,
    pixelArt: true,

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 320,
        height: 180,
    },
    input: {},

    autoCenter: true,

    physics:
    {
        default: 'arcade',
        arcade: { debug: false }
    },

    scene: [inicio, lobby, juego]
};

var game = new Phaser.Game(config);

