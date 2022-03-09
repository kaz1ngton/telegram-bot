const { Telegraf } = require('telegraf');
const MessageController = require('./messageController');

module.exports = class Bot extends MessageController {
    constructor(BOT_TOKEN) {
        super();

        const bot = new Telegraf(BOT_TOKEN);
        this.bot = bot
    }

    launch() {
        this.bot.on('message', this.onMessage.bind(this));

        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));

        this.bot.launch();
    }

    onMessage(ctx) {
        if (this.isCaps(ctx)) return;
        else if (this.isMisspell(ctx)) return;
        else if (this.isSpecificWord(ctx)) return;
    }
};
