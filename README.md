## Update 2/22

Now that meter filling is triggered by Twitch bit donations, the meter won't grow unless listening in to a Twitch channel, and it will only fill on donations. Some notes:

* All logic still in the `Meter.js` scene.
* Channels are submitted as an array to the options for the tmi client, located in the `preload()` function. Formatting for each individual channel is as such: "#username"
* You will also have to provide a Twitch clientId, to the same options object located in the `preload()` function.  

## To Get it Running:
* `git clone` this repo
* `cd` into project folder
* `npm install` for dependencies
*  `npm run dev` then visit your localhost
* can open dev tools console to see what's happening

