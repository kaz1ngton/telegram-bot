import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const isSpecWordContext = (ctx: NarrowedContext<Context, MountMap['text']>): boolean => {
    const message = ctx.update.message.text;

    if (isSpecWordText(message)) {
        handleSpecWord(ctx);
        return true;
    }

    return false;
};

const handleSpecWord = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const message = 'пизда';
    const messageId = ctx.message.message_id;

    ctx.reply(message, { reply_to_message_id: messageId });
};

export const isSpecWordText = (text: string): boolean => {
    const SUCCESS_CHANCE = 0.2;
    const SPEC_WORD = 'да';

    const containsSpecWord = text.toLowerCase() === SPEC_WORD;
    const isRandom = Math.random() < SUCCESS_CHANCE;
    const result = containsSpecWord && isRandom;

    return result;
};
