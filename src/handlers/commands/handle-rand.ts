import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const isRand = (ctx: NarrowedContext<Context, MountMap['text']>): boolean => {
    const [command, ...args] = ctx.update.message.text.split(' ').filter(Boolean);

    if (command === '/rand' && args.length >= 2) {
        if (args.length === 2 && args.every((arg) => !Number.isNaN(+arg))) {
            handleRandNumber(ctx);
        } else {
            handleRandProp(ctx);
        }
        return true;
    }
    return false;
};

const handleRandNumber = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    let { 1: min, 2: max } = ctx.update.message.text.split(' ');
    if (min > max) [min, max] = [max, min];
    const rand = Math.floor(Math.random() * (Math.floor(+max) - Math.floor(+min) + 1)) + Math.floor(+min);

    ctx.reply(`${rand}`);
};

const handleRandProp = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);

    const randIndex = Math.floor(Math.random() * args.length);
    console.log(randIndex);

    ctx.reply(`${args[randIndex]}`);
};
