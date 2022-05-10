import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const isCapsContext = (ctx: NarrowedContext<Context, MountMap['text']>): boolean => {
    const message = ctx.update.message.text;

    if (isCapsText(message)) {
        handleCaps(ctx);
        return true;
    }

    return false;
};

const handleCaps = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const firstName = ctx.update.message.from.first_name;
    const userName = ctx.update.message.from.username;
    const message = ctx.update.message.text;
    const lowerMessage = toLowerCase(message);

    const replyId = ctx.update.message?.reply_to_message?.message_id;

    ctx.deleteMessage();

    if (replyId) {
        ctx.reply(`${firstName}: "${lowerMessage}"\n\n@${userName} отшлепан за использование КАПСА`, {
            reply_to_message_id: replyId,
        });
    } else {
        ctx.reply(`${firstName}: "${lowerMessage}"\n\n@${userName} отшлепан за использование КАПСА`);
    }
};

export const isCapsText = (text: string): boolean => {
    const words: string[] = text.split(' ');
    const MIN_CAPS_WORDS = 3;
    let capsWords = 0;

    words.forEach((word) => {
        const isSymbol = word.toLowerCase() === word.toUpperCase();

        if (word.toUpperCase() === word && !isSymbol) capsWords++;
    });

    const isAntiCaps = text.includes('#caps');
    const result = words.length > MIN_CAPS_WORDS && capsWords / words.length > 0.5 && !isAntiCaps;

    return result;
};

export const toLowerCase = (text: string): string => {
    const chars: string[] = text.split('');
    let toUpper = true;

    const formattedText = chars
        .map((char) => {
            const isSymbol = char.toLowerCase() === char.toUpperCase();

            if (toUpper && !isSymbol) {
                char = char.toUpperCase();
                toUpper = false;
            } else {
                char = char.toLowerCase();
            }

            if (char === '.') toUpper = true;

            return char;
        })
        .join('');

    return formattedText;
};
