import {Meter} from './scenes/Meter'
import {Plugin as NineSlice} from 'phaser3-nineslice'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    plugins: { // plugin has to go before scene, ya dummy
        global: [NineSlice.DefaultCfg]
    },
    scene: [Meter],
    
}

const game = new Phaser.Game(config);