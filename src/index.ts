require('dotenv').config({
    path: `.${(<string>process.env.NODE_ENV).trim()}.env`,
});

const Bot = require('./bot');

const bot = new Bot(process.env.BOT_TOKEN);

bot.launch();
