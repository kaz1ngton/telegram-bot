const { Telegraf } = require('telegraf');

module.exports = class Bot {
    constructor(BOT_TOKEN) {
        this.bot = new Telegraf(BOT_TOKEN);
    }

    launch() {
        this.bot.on('message', this.onMessage.bind(this));

        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));

        this.bot.launch();
    }

    onMessage(ctx) {
        const message = ctx.update.message.text;

        if (ctx.update.message.text && this.isCaps(message)) {
            const firstName = ctx.update.message.from.first_name;
            const userName = ctx.update.message.from.username;

            const lowerMessage = this.toLowerCase(message);

            ctx.deleteMessage();
            ctx.reply(`
                ${firstName}: "${lowerMessage}"\n\n@${userName} отшлепан за использование КАПСА 
            `);
        }
    }

    isCaps(message) {
        const words = message.split(' ');
        let capsWords = 0;

        words.forEach((word) => {
            if (word.toUpperCase() === word && word.match(/[a-z]/i)) capsWords++;
        });

        const isCapsMessage = capsWords / words.length > 0.5;
        return isCapsMessage;
    }

    toLowerCase(message) {
        const chars = message.split('');
        let toUpper = true;

        const formattedMessage = chars
            .map((_char) => {
                let char = '';

                if (toUpper && _char.match(/[a-z]/i)) {
                    char = _char.toUpperCase();
                    toUpper = false;
                } else {
                    char = _char.toLowerCase();
                }

                if (_char === '.') toUpper = true;

                return char;
            })
            .join('');

        return formattedMessage;
    }
};