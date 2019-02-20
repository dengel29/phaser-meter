import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import {Meter} from './scenes/Meter'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Meter],
    plugins: {
        global: [NineSlicePlugin.DefaultConfig]
    }
}

const game = new Phaser.Game(config);