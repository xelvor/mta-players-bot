const Discord = require('discord.js')
const bot = new Discord.Client({intents: 3244029})
const config = require('./config.json')
const Gamedig = require('gamedig')

function refreshPlayers() {
    Gamedig.query({ socketTimeout: 2000, attemptTimeout: 10000, type: "mtasa", host: config.mta_ip, port: config.mta_port }).then((state) => {
    bot.user.setActivity(`${config.status_message} ${state.raw.numplayers} players`, { type: "PLAYING" })
    });
}

bot.once('ready', async() => {
    console.log('Logged to discord')
    refreshPlayers()
    setInterval(refreshPlayers,10000)
})

bot.login(config.token)