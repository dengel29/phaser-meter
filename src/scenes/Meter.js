import phaser from 'phaser'

export class Meter extends Phaser.Scene {
    constructor() {
        super({key:"Meter"}) 
    }
    preload() {
        this.load.image("meter", 'assets/hypemeter_empty.png'); //436x30
        this.fillImage = this.load.image("fill", 'assets/hypemeter_fill.png');
    }

    create() {
        this.startX = 400
        this.startY = 300
        this.meter = this.add.image(this.startX, this.startY,'meter')
        this.fill = this.add.nineslice(
            this.startX - 219, this.startY -15,
            436, 30,
            'fill',
            10, // the width and height to offset for a corner slice
            0// (optional) pixels to offset when computing the safe usage area

        )
    }

    update(){}
}
 