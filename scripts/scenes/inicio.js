export class inicio extends Phaser.Scene {

    constructor() {
        super({ key: 'inicio' });
    }

    preload() {

     // img
        this.load.spritesheet('fondo', '../resources/img/fondos/fondo_inicio.png', { frameWidth: 320, frameHeight: 180 });
        this.load.image('fondo_personajes', '../resources/img/inicio/fondo_personajes.png')
        this.load.image('title', '../resources/img/inicio/fantasy_war_logo.png')

        this.load.image('boton_play', '../resources/img/botones/boton_play.png')
        this.load.image('boton_controls', '../resources/img/botones/boton_controls.png')
        this.load.image('boton_credits', '../resources/img/botones/boton_credits.png')
        this.load.image('boton_play_i', '../resources/img/botones/boton_play_i.png')
        this.load.image('boton_controls_i', '../resources/img/botones/boton_controls_i.png')
        this.load.image('boton_credits_i', '../resources/img/botones/boton_credits_i.png')

        this.load.spritesheet('nube', '../resources/img/inicio/nube.png', { frameWidth: 320, frameHeight: 180 });
        this.load.image('controls', '../resources/img/inicio/controles.png')
        this.load.image('credits', '../resources/img/inicio/credits.png')

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
        this.title = this.add.image(320/2, 180 * 0.25, 'title').setScale(3, 3);

        this.botonPlay = this.add.image(160, 180 * 0.55, 'boton_play_i');
        this.botonCont = this.add.image(160, 180 * 0.70, 'boton_controls_i');
        this.botonCred = this.add.image(160, 180 * 0.85, 'boton_credits_i');
        this.botonEleg = this.add.image(160, 180 * 0.55, 'boton_play');

        this.botonE = 1;

        this.nube = this.add.sprite();
        this.controles = this.add.image();
        this.controlActivado = 0;
        this.creditsActivado = 0;

        // animations
        this.createAnim('fondoAnim', 'fondo', 1);
        this.fondo.anims.play('fondoAnim');
        this.createAnim('nubeAnim', 'nube', 1);
        
        //controles
        this.keySpace = this.input.keyboard.addKey('SPACE')
        this.keyEnter = this.input.keyboard.addKey('ENTER');

        this.keyW = this.input.keyboard.addKey('W');
        this.keyUp = this.input.keyboard.addKey('UP')

        this.keyS = this.input.keyboard.addKey('S');
        this.keyDown = this.input.keyboard.addKey('DOWN')

    }

    update() {

        // TECLA ARRIBA
        if ((Phaser.Input.Keyboard.JustDown(this.keyW) || Phaser.Input.Keyboard.JustDown(this.keyUp)) && (this.controlActivado == 0 && this.creditsActivado == 0)) {

            // CONTROLS
            if (this.botonE == 2) {
                this.cambiar.play();
                this.botonE = 1;

                this.botonEleg.destroy()
                this.botonEleg = this.add.image(160, 180 * 0.55, 'boton_play');
            }

            // CREDITS
            else if (this.botonE == 3) {
                this.cambiar.play();
                this.botonE = 2;

                this.botonEleg.destroy()
                this.botonEleg = this.add.image(160, 180 * 0.70, 'boton_controls');
            }

        }

        // TECLA ABAJO
        if ((Phaser.Input.Keyboard.JustDown(this.keyS) || Phaser.Input.Keyboard.JustDown(this.keyDown)) && (this.controlActivado == 0 && this.creditsActivado == 0)) {

            // CONTROLS
            if (this.botonE == 1) {
                this.cambiar.play();
                this.botonE = 2;

                this.botonEleg.destroy()
                this.botonEleg = this.add.image(160, 180 * 0.70, 'boton_controls');
            }

            // CREDITS
            else if (this.botonE == 2) {
                this.cambiar.play();
                this.botonE = 3;

                this.botonEleg.destroy()
                this.botonEleg = this.add.image(160, 180 * 0.85, 'boton_credits');
            }

        }

        // TECLA ACEPTAR
        if (Phaser.Input.Keyboard.JustDown(this.keySpace) || Phaser.Input.Keyboard.JustDown(this.keyEnter)) {

            // PLAY
            if (this.botonE == 1) {

                // sonido
                this.aceptar.play();
                // funcionalidad
                this.scene.start('lobby')
            }

            // CONTROLS
            if (this.botonE == 2) {

                if (this.controlActivado == 0) {

                    // sonido
                    this.aceptar.play();
                    // funcionalidad
                    this.nube = this.add.sprite(320 / 2, 180 / 2, 'nube');
                    this.nube.anims.play('nubeAnim');
                    this.controles = this.add.image(320 / 2, 180 / 2, 'controls');
                    this.controlActivado = 1;

                } else if (this.controlActivado == 1) {

                    // sonido
                    this.rechazar.play()
                    // funcionalidad
                    this.nube.destroy();
                    this.controles.destroy();
                    this.controles, this.nube = null;
                    this.controlActivado = 0;
                }

            }

            // CREDITS
            if (this.botonE == 3) {

                if (this.creditsActivado == 0) {

                    // sonido
                    this.aceptar.play();
                    // funcionalidad
                    this.nube = this.add.sprite(320 / 2, 180 / 2, 'nube');
                    this.nube.anims.play('nubeAnim');
                    this.credits = this.add.image(320 / 2, 180 / 2, 'credits');
                    this.creditsActivado = 1;

                } else if (this.creditsActivado == 1) {

                    // sonido
                    this.rechazar.play();
                    // funcionalidad
                    this.nube.destroy();
                    this.credits.destroy();
                    this.credits, this.nube = null;
                    this.creditsActivado = 0;

                }

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