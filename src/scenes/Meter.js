import phaser from 'phaser'

export class Meter extends Phaser.Scene {
    constructor() {
        super({key:"Meter"}) 
    }
    preload() {
        this.load.image("meter", 'assets/hypemeter_empty.png');
        this.load.image("fill", 'assets/hypemeter_fill.png');
    }

    create() {
        
        this.meter = this.add.image(400,300,'meter')
        this.fill = this.add.nineslice(
            400, 300,
            30, 30,
            'fill',
      [35, 15, 15])


    }

    update(){}
}
 