export class lobby extends Phaser.Scene {

    constructor() {
        super({ key: 'lobby' });
    }

    preload() {

        // img
        this.load.spritesheet('fondo', '../resources/img/fondos/fondo_inicio.png', { frameWidth: 320, frameHeight: 180 });
        this.load.image('fondo_personajes', '../resources/img/inicio/fondo_personajes.png')

        this.load.spritesheet('nube', '../resources/img/inicio/nube.png', { frameWidth: 320, frameHeight: 180 });

        // musica
        this.load.audio('aceptar', '../resources/music/aceptar.mp3');
        this.load.audio('rechazar', '../resources/music/rechazar.mp3');
        this.load.audio('cambiar', '../resources/music/cambiar-opcion.mp3');

    }

    create() {

        // sound
        this.aceptar = this.sound.add('aceptar');
        this.rechazar = this.sound.add('rechazar');
        this.cambiar = this.sound.add('cambiar');

        // img
        this.fondo = this.add.sprite(320 / 2, 180 / 2, 'fondo');
        this.fondo_personajes = this.add.image(320 / 2, 180 / 2, 'fondo_personajes');

        this.nube = this.add.sprite(-20, 180 / 2, 'nube').setScale(1.2,1.2);
        this.nube2 = this.add.sprite(340, 180 / 2, 'nube').setScale(1.2,1.2);

        // animations
        this.createAnim('fondoAnim', 'fondo', 1);
        this.fondo.anims.play('fondoAnim');
        this.createAnim('nubeAnim', 'nube', 1);
        this.nube.anims.play('nubeAnim');
        this.nube2.anims.play('nubeAnim');

        //controles
            //P1
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keySpace = this.input.keyboard.addKey('SPACE');

            //P2
        this.keyUp = this.input.keyboard.addKey('UP');
        this.keyDown = this.input.keyboard.addKey('DOWN');
        this.keyEnter = this.input.keyboard.addKey('ENTER');

        
       

    }

    update() {}

    createAnim(akey, sprite, end) {

        this.anims.create({
            key: akey,
            frames: this.anims.generateFrameNumbers(sprite, { start: 0, end: end }),
            frameRate: 5,
            repeat: -1
        });

    }

}