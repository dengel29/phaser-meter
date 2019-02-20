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
        this.text = this.add.text(0,0,"Welcome to Example 2", { font: '40px'})
        this.meter = this.add.image(400,300,'meter')
        this.fill = this.add.image(400,300,'fill')
    }

    update(){}
}
 