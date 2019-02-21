import phaser from 'phaser'

export class Meter extends Phaser.Scene {
    constructor() {
        super({key:"Meter"}) 
    }
    
    preload() {
        this.load.image("emptymeter", 'assets/hypemeter_empty.png'); //436x30
        this.fillImage = this.load.image("fill", 'assets/hypemeter_fill.png'); //490 x 70

        // create tmi client to listen to selected channels
        const tmi = require("tmi.js");
        let options = {
            options: {
                debug: true,
                clientId: ""
            },
            connection: {
                reconnect: true,
                secure: true
            },
            channels: [ "" ]
        };
        let client = new tmi.client(options);
        // start listening
        client.connect();

        // listens above selected channels for cheers,sends bits to meter incrementing function
        client.on("cheer", (channel, userstate, message) => {
            let bits = parseInt(userstate.bits, 10)    
            this.meterCheck(bits)
        });
    }

    create() {
        this.startX = 400
        this.startY = 300

        // empty meter image
        this.meter = this.add.image(this.startX, this.startY,'emptymeter')

        // meter filling object added to scene
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
    }

    meterCheck(bits) {
        // get current width
        let currentWidth = this.fill.width
        let limit = 433 // fills up at ~433
        
        if (currentWidth >= limit) {
            console.log("previously reached the limit")
            return
        }
        else if (bits + currentWidth >= limit ) {
            let remainingInc = limit - currentWidth 
            this.fillMeter(remainingInc)
            console.log("reached the limit")
        } else {
            this.fillMeter(bits)
        }
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
 