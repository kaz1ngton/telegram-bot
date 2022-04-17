import { Telegraf, Context } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';
import { Update } from 'typegram';

import { handlePat, handleRand, handleSummon } from './handlers/commands/handle-commands';
import { isCaps, isMisspell, isSpecWord } from './handlers/text/handle-text';

module.exports = class Bot {
    bot: Telegraf<Context<Update>>;

    constructor(BOT_TOKEN: string) {
        this.bot = new Telegraf(BOT_TOKEN);
    }

    launch() {
        this.setUpCommands();
        this.bot.on('text', this.onText.bind(this));

        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));

        this.bot.launch();
    }

    onText(ctx: Context<MountMap['text']>) {
        if (ctx.update.message.text[0] === '/') {
            return;
        }

        if (isCaps(ctx)) return;
        else if (isMisspell(ctx)) return;
        else if (isSpecWord(ctx)) return;
    }

    setUpCommands() {
        this.bot.command('pat', handlePat);
        this.bot.command('rand', handleRand);
        this.bot.command('summon', handleSummon);
    }
};
