import { Telegraf, Context } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';
import { Update } from 'typegram';
import { isPat } from './handlers/commands/handle-pat';
import { isRand } from './handlers/commands/handle-rand';

import { isCaps, isMisspell, isSpecWord } from './handlers/text/handle-text';

module.exports = class Bot {
    bot: Telegraf<Context<Update>>;

    constructor(BOT_TOKEN: string) {
        this.bot = new Telegraf(BOT_TOKEN);
    }

    launch() {
        this.bot.on('text', this.onText.bind(this));

        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));

        this.bot.launch();
    }

    onText(ctx: Context<MountMap['text']>) {
        if (ctx.update.message.text[0] === '/') {
            this.onCommand(ctx);
            return;
        }

        if (isCaps(ctx)) return;
        else if (isMisspell(ctx)) return;
        else if (isSpecWord(ctx)) return;
    }

    onCommand(ctx: Context<MountMap['text']>) {
        if (isRand(ctx)) return;
        else if (isPat(ctx)) return;
    }
};
