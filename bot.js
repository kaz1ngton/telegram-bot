const { Telegraf } = require('telegraf');
const MessageController = require('./messageController');
const { handlePat } = require('./commandController')

module.exports = class Bot {
    constructor(BOT_TOKEN) {
        this.bot = new Telegraf(BOT_TOKEN);
        this.messageController = new MessageController()
    }

    launch() {
        this.bot.on('message', this.onMessage.bind(this));
        this.bot.command('pat', (ctx) => handlePat(ctx));

        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));

        this.bot.launch();
    }

    onMessage(ctx) {
        if (this.messageController.isCaps(ctx)) return;
        else if (this.messageController.isMisspell(ctx)) return;
        else if (this.messageController.isSpecificWord(ctx)) return;
    }
};
