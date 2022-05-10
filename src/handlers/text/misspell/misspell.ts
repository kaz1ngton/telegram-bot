import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const isMisspellContext = (ctx: NarrowedContext<Context, MountMap['text']>): boolean => {
    const message = ctx.update.message.text;

    if (isMisspellText(message)) {
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

export const isMisspellText = (text: string): boolean => {
    const MISSPELL_WORDS = [
        'ихний',
        'ихнее',
        'ихняя',
        'ихние',
        'ихнего',
        'ихних',
        'ихнему',
        'ихней',
        'ихним',
        'ихнюю',
        'ихнею',
        'ихними',
        'ихнем',
    ];

    const result = MISSPELL_WORDS.some((word) => text.toLocaleLowerCase().includes(word));

    return result;
};
