
// https://stackoverflow.com/questions/52377344/javascript-array-of-instances-of-a-class
// clase contenedor para las tropas
export class Tropas {

    constructor(e) {
        this.tropas = [];
        this.escena = e;

        let base1 = new Base(1, this.escena)
        let base2 = new Base(2, this.escena)
        this.tropas.push(base1);
        this.tropas.push(base2);
    }
    
    newTropa(tipo, camino, equipo) {
        let t;
        switch (tipo) {
            case 1:
                t = new Goblin(camino, equipo, this.escena);
                break;
            case 2:
                t = new Mago(camino, equipo, this.escena);
                break;
            case 3:
                t = new Golem(camino, equipo, this.escena);
                break;
        }
        t.create();
        this.tropas.push(t);
        return t;
    }
   
    update() {

        for (var i = 0; i < this.tropas.length; i++) {

            this.tropas[i].update(this.escena);

            // check si deben entrar en combate
            if (this.tropas[i].atacando == 0) {
                this.tropas[i].checkCombate(this.tropas);
            }

            // check si alguna tropa ha muerto
            if ((this.tropas[i].health <= 0) && (this.tropas[i].camino != 4)) {
                for (var j = 0; j < this.tropas.length; j++) {
                    if (this.tropas[j].target == this.tropas[i]) {
                        this.tropas[j].target = null;
                        this.tropas[j].atacando = 0;
                        this.tropas[j].timer = 0;
                        this.tropas[j].setSprite();
                    }
                }
                var efecto = this.escena.add.sprite(this.tropas[i].x, this.tropas[i].y, 'puff')
                efecto.anims.play('puffAnim')
                this.tropas[i].muerte();
                this.tropas.splice(i, 1);
                this.escena.muertesfx.play();
            }

        }
    }

    getHealth() {
            return [(this.tropas[0].health), (this.tropas[1].health)];
    }

    clear() {
        for (var i = 0; i < this.tropas.length; i++) {
            this.tropas[i].muerte();
            this.tropas.splice(i, 1);
        }
        this.tropas = []
    }

}

class Tropa {

    constructor() {

        this.x;
        this.y;
        this.escena;
        this.sprite;

        this.camino;
        this.equipo;

        this.rango;
        this.mSpeed; 
        this.aSpeed;
        this.health;
        this.dmg;

        this.atacando = 0;
        this.timer = 0;
        this.target;
        
    }

    create() {

        switch (this.equipo) {
            case 1:
                this.x = 30;
                switch (this.camino) {
                    case 1:
                        this.y = 25;
                        break;
                    case 2:
                        this.y = 80;
                        break;
                    case 3:
                        this.y = 135;
                        break;
                }
                break;
            case 2:
                this.x = 290;
                switch (this.camino) {
                    case 1:
                        this.y = 25;
                        break;
                    case 2:
                        this.y = 80;
                        break;
                    case 3:
                        this.y = 135;
                        break;
                }
                break;
        }
        this.setSprite(this.x, this.y);

    }

    update(e) {

        // MOVIMIENTO
        if (this.atacando == 0) {
            switch (this.equipo) {
                case 1:
                    this.x += 1 * this.mSpeed;
                    break;
                case 2:
                    this.x -= 1 * this.mSpeed;
                    break;
            }
        }

        // COMBATE
        if (this.atacando == 1) {

            this.timer++;
            if (this.timer >= 200 / this.aSpeed) {
                this.timer = 0;
                this.target.health -= this.dmg;
                this.damage(e);
            }
            
        }

        this.sprite.x = this.x;
        this.sprite.y = this.y;

    }

    checkCombate(tropas) {

        var tropas = tropas;
        for (var i = 0; i < tropas.length; i++) {
            if (((tropas[i].camino == this.camino) || tropas[i].camino == 4) && (tropas[i].equipo != this.equipo)) {
                var distancia = Math.abs(this.x - tropas[i].x)
                if (distancia <= this.rango) {
                    this.atacando = 1;
                    this.target = tropas[i];
                    this.setSprite();
                }
                
            }
        }

    }

    muerte() {
        if (this.sprite != null) {
            this.sprite.destroy();
        }
    }

    damage() {}

    setSprite() {

        if (this.sprite == null) {
            this.sprite = this.escena.add.sprite(this.x, this.y, this.getSprite());
        } else {
            this.sprite.setTexture(this.getSprite());
        }
        this.sprite.anims.play(this.getAnim());
    }

    getSprite() { }

    getAnim() { }

}

class Goblin extends Tropa {

    constructor(c, e, s) {
        super();

        this.camino = c;
        this.equipo = e;
        this.escena = s

        this.rango = 25;
        this.mSpeed = 0.5;
        this.aSpeed = 3;
        this.health = 10;
        this.dmg = 2;

    }

    getSprite() {

        var s;
        switch (this.equipo) {
            case 1:
                switch (this.atacando) {
                    case 0:
                        s = 'goblin1';
                        break;
                    case 1:
                        s = 'goblinA1';
                        break;
                }
                break;
            case 2:
                switch (this.atacando) {
                    case 0:
                        s = 'goblin2';
                        break;
                    case 1:
                        s = 'goblinA2';
                        break;
                }
                break;
        }
        return s;

    }

    getAnim() {

        var a;
        switch (this.equipo) {
            case 1:
                switch (this.atacando) {
                    case 0:
                        a = 'goblin1Anim';
                        break;
                    case 1:
                        a = 'goblinA1Anim';
                        break;
                }
                break;
            case 2:
                switch (this.atacando) {
                    case 0:
                        a = 'goblin2Anim';
                        break;
                    case 1:
                        a = 'goblinA2Anim';
                        break;
                }
                break;
        }
        return a;

    }

    damage(e) {
        var efecto;
        if (this.equipo == 1) {
            efecto = e.add.sprite(this.x + 15, this.y, 'tajo1')
            efecto.anims.play('tajo1Anim')
        } else if (this.equipo == 2) {
            efecto = e.add.sprite(this.x - 15, this.y, 'tajo2')
            efecto.anims.play('tajo2Anim')
        }
        e.goblinsfx.play();
    }

}

class Mago extends Tropa {

    constructor(c, e, s) {
        super();

        this.camino = c;
        this.equipo = e;
        this.escena = s

        this.rango = 100;
        this.mSpeed = 0.3;
        this.aSpeed = 1;
        this.health = 10;
        this.dmg = 5;
    }

    getSprite() {

        var s;
        switch (this.equipo) {
            case 1:
                switch (this.atacando) {
                    case 0:
                        s = 'mago1';
                        break;
                    case 1:
                        s = 'magoA1';
                        break;
                }
                break;
            case 2:
                switch (this.atacando) {
                    case 0:
                        s = 'mago2';
                        break;
                    case 1:
                        s = 'magoA2';
                        break;
                }
                break;
        }
        return s;

    }

    getAnim() {

        var a;
        switch (this.equipo) {
            case 1:
                switch (this.atacando) {
                    case 0:
                        a = 'mago1Anim';
                        break;
                    case 1:
                        a = 'magoA1Anim';
                        break;
                }
                break;
            case 2:
                switch (this.atacando) {
                    case 0:
                        a = 'mago2Anim';
                        break;
                    case 1:
                        a = 'magoA2Anim';
                        break;
                }
                break;
        }
        return a;

    }

    damage(e) {
        var efecto;
        if (this.equipo == 1) {
            efecto = e.add.sprite(this.target.x, this.target.y, 'expl1')
            efecto.anims.play('expl1Anim')
        } else if (this.equipo == 2) {
            efecto = e.add.sprite(this.target.x, this.target.y, 'expl2')
            efecto.anims.play('expl2Anim')
        }
        e.magosfx.play();
    }

}

class Golem extends Tropa {

    constructor(c, e, s) {
        super();

        this.camino = c;
        this.equipo = e;
        this.escena = s

        this.rango = 30;
        this.mSpeed = 0.1;
        this.aSpeed = 1;
        this.health = 25;
        this.dmg = 10;
    }

    getSprite() {

        var s;
        switch (this.equipo) {
            case 1:
                switch (this.atacando) {
                    case 0:
                        s = 'golem1';
                        break;
                    case 1:
                        s = 'golemA1';
                        break;
                }
                break;
            case 2:
                switch (this.atacando) {
                    case 0:
                        s = 'golem2';
                        break;
                    case 1:
                        s = 'golemA2';
                        break;
                }
                break;
        }
        return s;

    }

    getAnim() {

        var a;
        switch (this.equipo) {
            case 1:
                switch (this.atacando) {
                    case 0:
                        a = 'golem1Anim';
                        break;
                    case 1:
                        a = 'golemA1Anim';
                        break;
                }
                break;
            case 2:
                switch (this.atacando) {
                    case 0:
                        a = 'golem2Anim';
                        break;
                    case 1:
                        a = 'golemA2Anim';
                        break;
                }
                break;
        }
        return a;

    }

    damage(e) {
        e.golemsfx.play();
    }

}

class Base extends Tropa {

    constructor(e, s) {
        super();

        this.x = 0;
        this.y = 190/2;
        this.camino = 4;
        this.equipo = e;
        this.escena = s

        this.rango = 1;
        this.mSpeed = 0;
        this.aSpeed = 100;
        this.health = 100;
        this.dmg = 0;

        switch (e) {
            case 1:
                this.x = 20;
                break;
            case 2:
                this.x = 300;
                break;
        }
    }

    update(e) { }

    getSprite() { }

    getAnim() { }

    damage(e) { }

}






