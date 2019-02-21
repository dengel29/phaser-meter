import phaser from 'phaser'

export class Meter extends Phaser.Scene {
    constructor() {
        super({key:"Meter"}) 
    }
    preload() {
        this.load.image("meter", 'assets/hypemeter_empty.png'); //436x30
        this.fillImage = this.load.image("fill", 'assets/hypemeter_fill.png'); //490 x 70
    }

    create() {
        this.startX = 400
        this.startY = 300

        // empty meter
        this.meter = this.add.image(this.startX, this.startY,'meter')

        // meter filling
        this.fill = this.add.nineslice(
            // nineslice has some strange effects on position, so needed to adjust to get inside of empty meter.
            this.startX - 219, this.startY -15,
            436, 30,
            'fill',
            15, // the width and height to offset for a corner slice
            5// (optional) pixels to offset when computing the safe usage area

        )

        // starting size of fill - all size updates of the meter filling happens through the resize method, which takes width and height
        this.fill.resize(2,30)
         

      // take keyboard input to simulate cheering/donating
      let keyObj = this.input.keyboard.addKey('C');
      keyObj.on('up', event => { 
        // randomize amount of donation
        let min = 30;
        let max = 50;
        let increment = Math.floor(Math.random()* (max - min + 1) + min) 

        // get current width
        let currentWidth = this.fill.width
        let limit = 433 // fills up at ~433
        
        if (currentWidth >= limit) {
            console.log("previously reached the limit")
            return
        }
        else if (increment + currentWidth >= limit ) {
            let remainingInc = limit - currentWidth 
            this.fillMeter(remainingInc)
            console.log("reached the limit")
        } else {
            this.fillMeter(increment)
        }
      });

    }

    fillMeter(inc){
        this.tween = this.tweens.addCounter({
            from: this.fill.width,
            to: this.fill.width + inc,
            ease: 'Linear',  
            duration: 500,
            callbackScope: this,
            onUpdate: () => {
                console.log(this.tween.getValue())
                this.fill.resize(this.tween.getValue(), 30)

            },
            pause: false,
            repeat: 0,            // -1: infinity
            yoyo: false
        });
    }

    update(){}
}
 