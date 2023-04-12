export class lobby extends Phaser.Scene {

    constructor() {
        super({ key: 'lobby' });
    }

    preload() {

        // img
        this.load.spritesheet('fondo', '../resources/img/fondos/fondo_inicio.png', { frameWidth: 320, frameHeight: 180 });
        this.load.spritesheet('nube', '../resources/img/inicio/nube.png', { frameWidth: 320, frameHeight: 180 });
        this.load.image('player1t', '../resources/img/lobby/lobby_player1.png');
        this.load.image('player2t', '../resources/img/lobby/lobby_player2.png');
        this.load.image('readyYes', '../resources/img/lobby/lobby_ready_yes.png');
        this.load.image('readyNo', '../resources/img/lobby/lobby_ready_no.png');
        this.load.image('start', '../resources/img/lobby/lobby_start.png');
        this.load.image('arrow', '../resources/img/lobby/lobby_arrow.png');
        this.load.image('arrow2', '../resources/img/lobby/lobby_arrow_r.png');

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
        this.nube = this.add.sprite(-20, 180 / 2, 'nube').setScale(1.2,1.2);
        this.nube2 = this.add.sprite(340, 180 / 2, 'nube').setScale(1.2, 1.2);

        this.player1text = this.add.sprite(40, 30, 'player1t');
        this.player2text = this.add.sprite(320 - 40, 30, 'player2t');

        this.readyP1text = this.add.sprite(50, 120, 'readyNo');
        this.readyP2text = this.add.sprite(320 - 50, 120, 'readyNo');

        this.startP1text = this.add.sprite(52, 140, 'start');
        this.startP1text = this.add.sprite(320 - 54, 140, 'start');

        this.arrowP1 = this.add.sprite(18, 120, 'arrow');
        this.arrowP2 = this.add.sprite(320 - 18, 120, 'arrow2');

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

        this.botonP1 = 1;
        this.botonP2 = 1;
        this.readyP1 = 0;
        this.readyP2 = 0;

    }

    update() {

        // P1 ///////////////////////////////////

        // TECLA ARRIBA P1
        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {
 
            // READY
            if (this.botonP1 == 2) {
                this.cambiar.play();
                this.botonP1 = 1;

                this.arrowP1.destroy()
                this.arrowP1 = this.add.image(18, 120, 'arrow');
            }

        }

        // TECLA ABAJO P1
        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {
            
            // START
            if ((this.botonP1) == 1) {
                this.cambiar.play();
                this.botonP1 = 2;

                this.arrowP1.destroy()
                this.arrowP1 = this.add.image(18, 140, 'arrow');
            }

        }

        // TECLA ACEPTAR P1
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {

            // READY
            if (this.botonP1 == 1) {

                // sonido
                this.aceptar.play();

                // funcionalidad
                if (this.readyP1 == 0) {

                    this.readyP1text.destroy();
                    this.readyP1text = this.add.sprite(50, 120, 'readyYes');
                    this.readyP1 = 1;

                }
                else if (this.readyP1 == 1) {

                    this.readyP1text.destroy(); 
                    this.readyP1text = this.add.sprite(50, 120, 'readyNo');
                    this.readyP1 = 0;
                }

            }

            // START!
            if (this.botonP1 == 2) {

                // Preparados
                if ((this.readyP1 == 1) && (this.readyP2 == 1)) {

                    // sonido
                    this.aceptar.play();
                    // funcionalidad
                    this.scene.start('juego')

                }
                else { this.rechazar.play(); }

            }

        }

        // P2 ///////////////////////////////////

        // TECLA ARRIBA P2
        if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {

            // READY
            if (this.botonP2 == 2) {
                this.cambiar.play();
                this.botonP2 = 1;

                this.arrowP2.destroy()
                this.arrowP2 = this.add.image(320 - 18, 120, 'arrow2');
            }

        }

        // TECLA ABAJO P2
        if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {

            // START
            if ((this.botonP2) == 1) {
                this.cambiar.play();
                this.botonP2 = 2;

                this.arrowP2.destroy()
                this.arrowP2 = this.add.image(320 - 18, 140, 'arrow2');
            }

        }

        // TECLA ACEPTAR P2
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {

            // READY
            if (this.botonP2 == 1) {

                // sonido
                this.aceptar.play();

                // funcionalidad
                if (this.readyP2 == 0) {

                    this.readyP2text.destroy();
                    this.readyP2text = this.add.sprite(320 - 50, 120, 'readyYes');
                    this.readyP2 = 1;

                }
                else if (this.readyP2 == 1) {

                    this.readyP2text.destroy();
                    this.readyP2text = this.add.sprite(320 - 50, 120, 'readyNo');
                    this.readyP2 = 0;
                }

            }

            // START!
            if (this.botonP2 == 2) {

                // Preparados
                if ((this.readyP1 == 1) && (this.readyP2 == 1)) {

                    // sonido
                    this.aceptar.play();
                    // funcionalidad
                    this.scene.start('juego')

                }
                else { this.rechazar.play(); }

            }

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