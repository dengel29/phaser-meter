import phaser from 'phaser'

export class Meter extends Phaser.Scene {
    constructor() {
        super({key:"Meter"}) 
    }
    
    preload() {
        // simulate the streamer's goal
        this.goal = 100;
        this.uiBlocked = false;
        // load the assets 
        this.load.image("emptymeter", 'assets/hypemeter_empty.png'); //436x30
        this.fill = this.load.image("fill", 'assets/hypemeter_fill.png'); //490 x 70

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
            channels: [ "#shroud", "#esamarathon", ]
        };

        ///// UNCOMMENT THESE LINES TO LISTEN TO TWITCH CHANNELS
        /*
        let client = new tmi.client(options);
        // start listening
        client.connect();

        // listens above selected channels for cheers,sends bits to meter incrementing function
        client.on("cheer", (channel, userstate, message) => {
            let bits = parseInt(userstate.bits, 10) 
            console.log(`${userstate.username} just donated ${bits} bits to ${channel}!` )   

            // send bits to meter checking function
            this.meterCheck(bits)
            
        });
        */
       
        // Using spacebar to simulate cheers for debug
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('up', e => {
            if (this.uiBlocked === true) return
            this.meterCheck(10)
        })
    }

    create() {
        // set a standard starting coord for images
        this.startX = 400;
        this.startY = 300;

        // increment this each time the meter is filled
        this.timesFilled = 0;
        this.totalBits = 0;

        // empty meter image
        this.meter = this.add.image(this.startX, this.startY,'emptymeter')

        this.bitsText = this.add.text(355, 350, `Total bits`, { fontFamily: '"Impact"', fontSize: 28 });
        this.updateBitsDisplay(this.totalBits);

        // meter filling object added to scene
        this.fill = this.add.nineslice(
            // nineslice has some strange effects on position, so needed to adjust to get inside of empty meter.
            this.startX - 219, this.startY -15,
            436, 30,
            'fill',
            15, // the width and height to offset for a corner slice
            5// (optional) pixels to offset when computing the safe usage area
        )

        this.resetFillSize()
    }

    resetFillSize(){
        // starting size of fill - all size updates of the meter filling happens through the resize method, which takes width and height
        this.fill.resize(2,30)
    }

    meterCheck(bits) {
        // get current width
        let currentWidth = this.fill.width
        let goal = this.goal
        const limit = 433 
        let incrementSize = (limit/goal) * bits
        
        if (currentWidth >= limit) {
            console.log("previously reached the limit")
            // increment + display number of times filled up
            // empty meter
            this.resetFillSize();
            this.meterCheck(bits)
            return
        }
        else if (incrementSize + currentWidth >= limit ) {
            let remainingInc = limit - currentWidth 

            this.fillMeter(remainingInc)
            this.timesFilled += 1
            this.updateMultiplier(this.timesFilled)
            // store + display total number of bits
            this.totalBits += bits;
            this.updateBitsDisplay(this.totalBits);
            
            console.log("Goal Reached!!!!")
        } else {
            this.fillMeter(incrementSize)
            // store + display total number of bits
            this.totalBits += bits;
            this.updateBitsDisplay(this.totalBits);
        }
    }

    updateBitsDisplay(totalBits){
        this.bitsText.setText(`Total bits: ${totalBits}`)
    }
    updateMultiplier(timesFilled){
        let multiplierText = this.add.text(600, 330, `x${timesFilled}`, { fontFamily: '"Impact"' });
    }

    fillMeter(inc){
        this.uiBlocked = true
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
            onComplete: () =>{
                this.uiBlocked = false
            },
            pause: false,
            repeat: 0,
            yoyo: false
        });
    }

    update(){}
}
 