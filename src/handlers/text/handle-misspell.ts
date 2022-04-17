import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

const MISSPELL_WORDS = ['ихний', 'ихнее', 'ихняя', 'ихние', 'ихнего', 'ихних', 'ихнему', 'ихней', 'ихним', 'ихнюю', 'ихнею', 'ихними', 'ихнем'];

export const isMisspell = (ctx: NarrowedContext<Context, MountMap['text']>): boolean=> {
    const message = ctx.update.message.text;
    const isMisspellMessage = MISSPELL_WORDS.some((word) => message.includes(word));

    if (isMisspellMessage) {
        handleMisspell(ctx);
        return true;
    }

    return false;
};
const handleMisspell = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const message = 'их';
    const messageId = ctx.message.message_id;

    ctx.reply(message, { reply_to_message_id: messageId });
};
