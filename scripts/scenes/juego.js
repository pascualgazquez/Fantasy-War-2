import { Tropas } from '../tropas/tropa.js';

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

        this.load.spritesheet('goblin1', '../resources/img/tropas/goblin_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('goblin2', '../resources/img/tropas/goblin_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('goblinA1', '../resources/img/tropas/goblinRAt.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('goblinA2', '../resources/img/tropas/goblinBAt.png', { frameWidth: 35, frameHeight: 35 });

        this.load.spritesheet('mago1', '../resources/img/tropas/mago_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('mago2', '../resources/img/tropas/mago_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoA1', '../resources/img/tropas/magoRAt.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('magoA2', '../resources/img/tropas/magoBAt.png', { frameWidth: 35, frameHeight: 35 });

        this.load.spritesheet('golem1', '../resources/img/tropas/golem_r.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('golem2', '../resources/img/tropas/golem_b.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('golemA1', '../resources/img/tropas/golemRAt.png', { frameWidth: 45, frameHeight: 45 });
        this.load.spritesheet('golemA2', '../resources/img/tropas/golemBAt.png', { frameWidth: 45, frameHeight: 45 });

        this.load.spritesheet('expl1', '../resources/img/tropas/explosion_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('expl2', '../resources/img/tropas/explosion_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('tajo1', '../resources/img/tropas/tajo_r.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('tajo2', '../resources/img/tropas/tajo_b.png', { frameWidth: 35, frameHeight: 35 });
        this.load.spritesheet('puff', '../resources/img/tropas/death_puff.png', { frameWidth: 35, frameHeight: 35 });

        // musica
        this.load.audio('aceptar', '../resources/music/aceptar.mp3');
        this.load.audio('rechazar', '../resources/music/rechazar.mp3');
        this.load.audio('cambiar', '../resources/music/cambiar-opcion.mp3');
        this.load.audio('ponersfx', '../resources/music/poner-tropa.mp3');
        this.load.audio('muertesfx', '../resources/music/tropa-muere.mp3');
     
        this.load.audio('goblinsfx', '../resources/music/goblin-slash.mp3');
        this.load.audio('golemsfx', '../resources/music/golem-golpe.mp3');
        this.load.audio('magosfx', '../resources/music/mago-explosion.mp3');

        this.load.audio('musica1', '../resources/music/nivel_1.mp3');

    }

    create() {

        this.arrowX = 8;

        let tropas = new Tropas(this);
        this.tropas = tropas;
        this.health = [100, 100];

        this.caminoP1 = 2;
        this.caminoP2 = 2;

        this.tropaP1 = 2;
        this.tropaP2 = 2;

        // sound
        this.aceptar = this.sound.add('aceptar');
        this.rechazar = this.sound.add('rechazar');
        this.cambiar = this.sound.add('cambiar');
        this.ponersfx = this.sound.add('ponersfx');
        this.muertesfx = this.sound.add('muertesfx');

        this.goblinsfx = this.sound.add('goblinsfx');
        this.magosfx = this.sound.add('magosfx');
        this.golemsfx = this.sound.add('golemsfx');

        this.musica1 = this.sound.add('musica1');
        this.musica1.loop = true;
        this.musica1.play();

        // img
        this.fondo = this.add.sprite(320 / 2, 180 / 2, 'fondoJ');

        this.arrowP1 = this.add.sprite(this.arrowX, 100, 'arrow');
        this.arrowP2 = this.add.sprite(320 - this.arrowX, 100, 'arrow2');

        this.coinP1 = this.add.sprite(12, 25, 'coin').setScale(0.8,0.8);
        this.coinP2 = this.add.sprite(320 - 12, 25, 'coin').setScale(0.8, 0.8);

        this.cartaGoblin1 = this.add.sprite(60, 165, 'cartaGoblin1').setScale(.6, .6);
        this.cartaMago1 = this.add.sprite(84, 165, 'cartaMago1').setScale(1,1);
        this.cartaGolem1 = this.add.sprite(108, 165, 'cartaGolem1').setScale(.6, .6);

        this.cartaGolem2 = this.add.sprite(320 - 60, 165, 'cartaGolem2').setScale(.6, .6);
        this.cartaMago2 = this.add.sprite(320 - 84, 165, 'cartaMago2').setScale(1, 1);
        this.cartaGoblin2 = this.add.sprite(320 - 108, 165, 'cartaGoblin2').setScale(.6, .6);

        this.healthBar1bg = this.createBarra(4, 4, 0xe74c3c);
        this.healthBar2bg = this.createBarra(160 + 4, 4, 0xe74c3c);
        this.healthBar1 = this.createBarra(4, 4, 0x2ecc71);
        this.healthBar2 = this.createBarra(160 + 4, 4, 0x2ecc71);

        // animations
        this.createAnim('coinAnim', 'coin', 3);
        this.coinP1.anims.play('coinAnim');
        this.coinP2.anims.play('coinAnim');

        this.createAnim('goblin1Anim', 'goblin1', 3);
        this.createAnim('goblin2Anim', 'goblin2', 3);
        this.createAnim('goblinA1Anim', 'goblinA1', 2);
        this.createAnim('goblinA2Anim', 'goblinA2', 2);

        this.createAnim('mago1Anim', 'mago1', 3);
        this.createAnim('mago2Anim', 'mago2', 3);
        this.createAnim('magoA1Anim', 'magoA1', 2);
        this.createAnim('magoA2Anim', 'magoA2', 2);

        this.createAnim('golem1Anim', 'golem1', 3);
        this.createAnim('golem2Anim', 'golem2', 3);
        this.createAnim('golemA1Anim', 'golemA1', 2);
        this.createAnim('golemA2Anim', 'golemA2', 2);

        this.createAnimOnce('expl1Anim', 'expl1', 7);
        this.createAnimOnce('expl2Anim', 'expl2', 7);
        this.createAnimOnce('tajo1Anim', 'tajo1', 5);
        this.createAnimOnce('tajo2Anim', 'tajo2', 5);
        this.createAnimOnce('puffAnim', 'puff', 4);

        // texto
        this.textGold1 = this.add.text(18, 20, '10', { font: "10px 'PS2P'", color: '#fff200' });
        this.textGold2 = this.add.text(320 - 38, 20, '10', { font: "10px 'PS2P'", color: '#fff200' });
        this.textPrecio1 = this.add.text(18, 180 - 10, '10', { font: "10px 'PS2P'", color: '#B75D41' });
        this.textPrecio2 = this.add.text(320 - 38, 180 - 10, '10', { font: "10px 'PS2P'", color: '#B75D41' });
        this.goldP1 = 10;
        this.goldP2 = 10;
        this.precioP1, this.precioP2, this.timer = 0
        this.textGold1.setText(this.goldP1);
        this.textGold2.setText(this.goldP2);

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

    }

    update() {

        this.tropas.update();
        this.controles();

        this.health = this.tropas.getHealth();
        this.setBarra(this.healthBar1, this.health[0]);
        this.setBarra(this.healthBar2, this.health[1]);

        if ((this.health[0] <= 0) || (this.health[1] <= 0)) {

            var victoria;
            if (this.health[0] <= 0) { victoria = 1; }
            else if (this.health[1] <= 0) { victoria = 2; }
            else if ((this.health[0] <= 0) && (this.health[1] <= 0)) { victoria = 3; }

            this.tropas.clear();
            this.musica1.stop();
            this.scene.start('final', victoria)
        }

        // ORO
        this.timer++;
        if (this.timer >= 20) {
            this.timer = 0;
            if (this.goldP1 < 99) { this.goldP1 += 1; }
            if (this.goldP2 < 99) { this.goldP2 += 1; }
            this.textGold1.setText(this.goldP1);
            this.textGold2.setText(this.goldP2);
        }
        switch (this.tropaP1) {
            case 1:
                this.precioP1 = 10;
                break;
            case 2:
                this.precioP1 = 25;
                break;
            case 3:
                this.precioP1 = 40;
                break;
        }
        switch (this.tropaP2) {
            case 1:
                this.precioP2 = 10;
                break;
            case 2:
                this.precioP2 = 25;
                break;
            case 3:
                this.precioP2 = 40;
                break;
        }
        this.textPrecio1.setText(this.precioP1);
        this.textPrecio2.setText(this.precioP2);

    }

    controles() {

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

            if (this.goldP1 >= this.precioP1) {
                this.ponersfx.play();
                this.goldP1 -= this.precioP1;
                this.tropas.newTropa(this.tropaP1, this.caminoP1, 1);
            } else {
                this.rechazar.play();
            }
            
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

        // TECLA ACEPTAR P2
        if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {

            if (this.goldP2 >= this.precioP2) {
                this.ponersfx.play();
                this.goldP2 -= this.precioP2;
                this.tropas.newTropa(this.tropaP2, this.caminoP2, 2);
            } else {
                this.rechazar.play();
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

    createAnimOnce(akey, sprite, end) {

        this.anims.create({
            key: akey,
            frames: this.anims.generateFrameNumbers(sprite, { start: 0, end: end }),
            frameRate: 20,
            repeat: 0
        });

    }

    createBarra(x, y, color) {

        // https://phasergames.com/how-to-make-a-health-bar-in-phaser-3/

        let b = this.add.graphics();
        b.fillStyle(color, 1);
        b.fillRect(0, 0, 152, 12);
        b.x = x;
        b.y = y;
        return b;
    }

    setBarra (b, p) {
        b.scaleX = p / 100;
    }

}