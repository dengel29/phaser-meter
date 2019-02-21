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
        this.meter = this.add.image(this.startX, this.startY,'meter')
        this.fill = this.add.nineslice(
            this.startX - 219, this.startY -15,
            436, 30,
            'fill',
            15, // the width and height to offset for a corner slice
            5// (optional) pixels to offset when computing the safe usage area

        )
        this.fill.resize(43,30)
        

    //     this.fill.events.on(NineSlice.EVENTS.UPDATE_SAFE_BOUNDS, (_, bb) => {
    //         console.log(bb)
    //   })

      // take input
      var keyObj = this.input.keyboard.addKey('C');
      keyObj.on('up', event => { 
        console.log(this.fill.width)
        let increment = this.fill.width + 43 //maxes at 430
        if (increment > 430) {
            console.log("reached the limit")
            return
        } else {
            this.fill.resize(increment, 30)
        }
      });

    }

    update(){}
}
 