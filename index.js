require('dotenv').config();

const Bot = require('./bot');

const bot = new Bot(process.env.BOT_TOKEN);

bot.launch();
