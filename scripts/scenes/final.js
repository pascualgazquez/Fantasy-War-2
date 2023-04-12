export class final extends Phaser.Scene {

    constructor() {
        super({ key: 'final' });
    }

    init(v) {
        this.victoria = v.value;
    }

    preload() {

     // img
        this.load.spritesheet('fondo', '../resources/img/fondos/fondo_inicio.png', { frameWidth: 320, frameHeight: 180 });
        this.load.image('fondo_personajes', '../resources/img/inicio/fondo_personajes.png')

        this.load.spritesheet('nube', '../resources/img/inicio/nube.png', { frameWidth: 320, frameHeight: 180 });

        this.load.spritesheet('p1win', '../resources/img/inicio/player1_wins.png', { frameWidth: 320, frameHeight: 180 });
        this.load.spritesheet('p2win', '../resources/img/inicio/player2_wins.png', { frameWidth: 320, frameHeight: 180 });

     // musica
        this.load.audio('aceptar', '../resources/music/aceptar.mp3');
        this.load.audio('finalsfx', '../resources/music/finalsfx.mp3');

    }

    create() {

        // sound
        this.aceptar = this.sound.add('aceptar');
        this.finalsfx = this.sound.add('finalsfx');
        this.finalsfx.play();

        // img
        this.fondo = this.add.sprite(320 / 2, 180 / 2, 'fondo');
        this.nube = this.add.sprite(320 / 2, 180 / 2, 'nube');
        this.fondo_personajes = this.add.image(320 / 2, 180 / 2, 'fondo_personajes');

        this.spriteVictoria;

        // animations
        this.createAnim('fondoAnim', 'fondo', 1);
        this.createAnim('nubeAnim', 'nube', 1);
   
        this.fondo.anims.play('fondoAnim');
        this.nube.anims.play('nubeAnim')
        
        // controles
        this.keySpace = this.input.keyboard.addKey('SPACE')
        this.keyEnter = this.input.keyboard.addKey('ENTER');   

    }

    update() {

        if (this.victoria == 1) {
            this.spriteVictoria = this.add.sprite(320 / 2, 180 / 2, 'p1win');
        }
        if (this.victoria == 2) {
            this.spriteVictoria = this.add.sprite(320 / 2, 180 / 2, 'p2win');
        }


        // TECLA ACEPTAR
        if (Phaser.Input.Keyboard.JustDown(this.keySpace) || Phaser.Input.Keyboard.JustDown(this.keyEnter)) {

            this.aceptar.play();
            this.scene.start('inicio')

        }

    }

    createAnim(akey, sprite, end) {

        this.anims.create({
            key: akey,
            frames: this.anims.generateFrameNumbers(sprite, { start: 0, end: end }),
            frameRate: 5,
            repeat: -1
        });

    }

}