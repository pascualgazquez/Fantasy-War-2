
// https://stackoverflow.com/questions/52377344/javascript-array-of-instances-of-a-class
// clase contenedor para las tropas
export class Tropas {
    constructor() {
        this.tropas = [];
    }
    
    newTropa(tipo, camino, equipo) {
        let t = new Tropa();
        t.newTropa(tipo, camino, equipo);
        this.tropas.push(t);
    }
   
    get numeroTropas() {
        return this.tropas.length;
    }

    update() {
        for (var i = 0; i < this.tropas.length; i++) { this.tropas[i].update(); }
    }

}

class Tropa {
    constructor() {
        this.equipo;
        this.mSpeed;
        this.aSpeed;
        this.health;
    }

    newTropa(tipo, c, e) {

        this.tropa;
        console.log(tipo, c, e);

        switch (tipo) {
            case 1:
                this.tropa = new Goblin(c, e);
                break;
            case 2:
                this.tropa = new Mago(c, e);
                break;
            case 3:
                this.tropa = new Golem(c, e);
                break;
        }

        this.tropa.create();
        return this.tropa;
        
    }

    update() { }
    create() { }

}

class Goblin extends Tropa {
    constructor(c, e) {
        console.log('goblin layer')
        super();
        this.camino = c;
        this.equipo = e;
        this.mSpeed = 10;
        this.aSpeed = 10;
        this.health = 10;
    }

    create() {
        console.log('goblin creado')
    }
    update() { }

}

class Mago extends Tropa {
    constructor(c, e) {
        console.log('mago layer')
        super();
        this.camino = c;
        this.equipo = e;
        this.mSpeed = 10;
        this.aSpeed = 10;
        this.health = 10;
    }

    create() {
        console.log('mag creado');
    }

    update() {
        console.log('mag update');
    }

}

class Golem extends Tropa {
    constructor(c, e) {
        console.log('golem layer')
        super();
        this.camino = c;
        this.equipo = e;
        this.mSpeed = 10;
        this.aSpeed = 10;
        this.health = 10;
    }

    create() {
        console.log('golem creado')
    }

    update() { }

}



