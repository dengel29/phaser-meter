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
        
        // let growMeter = function(){
        //         this.tweens.add({
        //         targets: this.fill,
        //         duration: 600,
        //         onStart:
        //         pause: false,
        //         callbackScope: this,
        //         onComplete: function(tween, sprites) {
        //         console.log("we have been called")
        //         }
        //     })
        // }
          
        

      // take input
      var keyObj = this.input.keyboard.addKey('C');
      keyObj.on('up', event => { 
        // set increment to 1/10 of meter
        let increment = this.fill.width + 43 //maxes at 430
        
        console.log('pressed c')
        console.log("context")
        console.log(this)
        if (increment > 430) {
            console.log("reached the limit")
            return
        } else {
            this.fillMeter()
            
            
        }
      });

    }

    fillMeter(){
        this.tween = this.tweens.addCounter({
            from: this.fill.width,
            to: this.fill.width+43,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            callbackScope: this,
            onUpdate: () => {
                console.log(this.tween.getValue())
                this.fill.resize(this.tween.getValue(), 30)

            },
            pause: false,
            repeat: 0,            // -1: infinity
            yoyo: false,
        });
    }

    update(){}
}
 