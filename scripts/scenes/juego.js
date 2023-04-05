export class juego extends Phaser.Scene {

    constructor() {
        super({ key: 'juego' });
    }

    preload() {

        // img
        this.load.image('fondoJ', '../resources/img/fondos/fondo_juego.png');
      
        this.load.image('arrow', '../resources/img/lobby/lobby_arrow.png');
        this.load.image('arrow2', '../resources/img/lobby/lobby_arrow_r.png');

        this.load.image('cartaMago1', '../resources/img/juego/cartaMago1.png');
        this.load.image('cartaMago2', '../resources/img/juego/cartaMago2.png');
        this.load.image('cartaGoblin1', '../resources/img/juego/cartaGoblin1.png');
        this.load.image('cartaGoblin2', '../resources/img/juego/cartaGoblin2.png');
        this.load.image('cartaGolem1', '../resources/img/juego/cartaGolem1.png');
        this.load.image('cartaGolem2', '../resources/img/juego/cartaGolem2.png');

        this.load.spritesheet('coin', '../resources/img/juego/coin.png', { frameWidth: 20, frameHeight: 20 });


        // musica
        this.load.audio('aceptar', '../resources/music/aceptar.mp3');
        this.load.audio('rechazar', '../resources/music/rechazar.mp3');
        this.load.audio('cambiar', '../resources/music/cambiar-opcion.mp3');

    }

    create() {

        this.arrowX = 8;

        // sound
        this.aceptar = this.sound.add('aceptar');
        this.rechazar = this.sound.add('rechazar');
        this.cambiar = this.sound.add('cambiar');

        // img
        this.fondo = this.add.sprite(320 / 2, 180 / 2, 'fondoJ');

        this.arrowP1 = this.add.sprite(this.arrowX, 100, 'arrow');
        this.arrowP2 = this.add.sprite(320 - this.arrowX, 100, 'arrow2');

        this.coinP1 = this.add.sprite(8, 10, 'coin');
        this.coinP2 = this.add.sprite(320 - 8, 10, 'coin');

        this.cartaGoblin1 = this.add.sprite(60, 165, 'cartaGoblin1').setScale(.6, .6);
        this.cartaMago1 = this.add.sprite(84, 165, 'cartaMago1').setScale(1,1);
        this.cartaGolem1 = this.add.sprite(108, 165, 'cartaGolem1').setScale(.6, .6);

        this.cartaGolem2 = this.add.sprite(320 - 60, 165, 'cartaGolem2').setScale(.6, .6);
        this.cartaMago2 = this.add.sprite(320 - 84, 165, 'cartaMago2').setScale(1, 1);
        this.cartaGoblin2 = this.add.sprite(320 - 108, 165, 'cartaGoblin2').setScale(.6, .6);

        // animations
        this.createAnim('coinAnim', 'coin', 3);
        this.coinP1.anims.play('coinAnim');
        this.coinP2.anims.play('coinAnim');

        // texto
        this.textGold1 = this.add.text(16, 4, '10', { font: "12px 'PS2P'", color: '#fff200' });
        this.textGold2 = this.add.text(320 - 40, 4, '10', { font: "12px 'PS2P'", color: '#fff200' });
        this.goldP1 = 10;
        this.goldP2 = 10;

        //controles

        //P1
        this.keyW = this.input.keyboard.addKey('W');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyD = this.input.keyboard.addKey('D');
        this.keySpace = this.input.keyboard.addKey('SPACE');

        //P2
        this.keyUp = this.input.keyboard.addKey('UP');
        this.keyDown = this.input.keyboard.addKey('DOWN');
        this.keyLeft = this.input.keyboard.addKey('LEFT');
        this.keyRight = this.input.keyboard.addKey('RIGHT');
        this.keyEnter = this.input.keyboard.addKey('ENTER');

        this.caminoP1 = 2;
        this.caminoP2 = 2;

        this.tropaP1 = 2;
        this.tropaP2 = 2;

    }

    update() {

        // GOLD
        if (this.goldP1 < 99) { this.goldP1 += 1;}
        if (this.goldP2 < 99) { this.goldP2 += 1; }

        this.textGold1.setText(this.goldP1);
        this.textGold2.setText(this.goldP2);

        // P1 ///////////////////////////////////

        if (Phaser.Input.Keyboard.JustDown(this.keyW)) {

            // camino 3
            if (this.caminoP1 == 3) {
                this.cambiar.play();
                this.caminoP1 = 2;

                this.arrowP1.destroy()
                this.arrowP1 = this.add.image(this.arrowX, 100, 'arrow');
            }

            // camino 2
            else if (this.caminoP1 == 2) {
                this.cambiar.play();
                this.caminoP1 = 1;

                this.arrowP1.destroy()
                this.arrowP1 = this.add.image(this.arrowX, 45, 'arrow');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.keyS)) {

            // camino 3
            if (this.caminoP1 == 1) {
                this.cambiar.play();
                this.caminoP1 = 2;

                this.arrowP1.destroy()
                this.arrowP1 = this.add.image(this.arrowX, 100, 'arrow');
            }

            // camino 2
            else if (this.caminoP1 == 2) {
                this.cambiar.play();
                this.caminoP1 = 3;

                this.arrowP1.destroy()
                this.arrowP1 = this.add.image(this.arrowX, 155, 'arrow');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.keyD)) {

            // goblin
            if (this.tropaP1 == 1) {
                this.cambiar.play();
                this.tropaP1 = 2;

                this.cartaGoblin1.setScale(.6, .6);
                this.cartaMago1.setScale(1, 1);
            }

            // tropa 2
            else if (this.tropaP1 == 2) {
                this.cambiar.play();
                this.tropaP1 = 3;

                this.cartaMago1.setScale(.6, .6);
                this.cartaGolem1.setScale(1, 1); 
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.keyA)) {

            // golem
            if (this.tropaP1 == 3) {
                this.cambiar.play();
                this.tropaP1 = 2;

                this.cartaGolem1.setScale(.6, .6);
                this.cartaMago1.setScale(1, 1);
            }

            // tropa 2
            else if (this.tropaP1 == 2) {
                this.cambiar.play();
                this.tropaP1 = 1;

                this.cartaMago1.setScale(.6, .6);
                this.cartaGoblin1.setScale(1, 1);
            }

        }

        // TECLA ACEPTAR P1
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {


        }

        // P2 ///////////////////////////////////

        if (Phaser.Input.Keyboard.JustDown(this.keyUp)) {

            // camino 3
            if (this.caminoP2 == 3) {
                this.cambiar.play();
                this.caminoP2 = 2;

                this.arrowP2.destroy()
                this.arrowP2 = this.add.image(320 - this.arrowX, 100, 'arrow2');
            }

            // camino 2
            else if (this.caminoP2 == 2) {
                this.cambiar.play();
                this.caminoP2 = 1;

                this.arrowP2.destroy()
                this.arrowP2 = this.add.image(320 - this.arrowX, 45, 'arrow2');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.keyDown)) {

            // camino 3
            if (this.caminoP2 == 1) {
                this.cambiar.play();
                this.caminoP2 = 2;

                this.arrowP2.destroy()
                this.arrowP2 = this.add.image(320 - this.arrowX, 100, 'arrow2');
            }

            // camino 2
            else if (this.caminoP2 == 2) {
                this.cambiar.play();
                this.caminoP2 = 3;

                this.arrowP2.destroy()
                this.arrowP2 = this.add.image(320 - this.arrowX, 155, 'arrow2');
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.keyRight)) {

            // goblin
            if (this.tropaP2 == 1) {
                this.cambiar.play();
                this.tropaP2 = 2;

                this.cartaGoblin2.setScale(.6, .6);
                this.cartaMago2.setScale(1, 1);
            }

            // mago
            else if (this.tropaP2 == 2) {
                this.cambiar.play();
                this.tropaP2 = 3;

                this.cartaMago2.setScale(.6, .6);
                this.cartaGolem2.setScale(1, 1);
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.keyLeft)) {

            // golem
            if (this.tropaP2 == 3) {
                this.cambiar.play();
                this.tropaP2 = 2;

                this.cartaGolem2.setScale(.6, .6);
                this.cartaMago2.setScale(1, 1);
            }

            // tropa 2
            else if (this.tropaP2 == 2) {
                this.cambiar.play();
                this.tropaP2 = 1;

                this.cartaMago2.setScale(.6, .6);
                this.cartaGoblin2.setScale(1, 1);
            }

        }


        // TECLA ACEPTAR P1
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {


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