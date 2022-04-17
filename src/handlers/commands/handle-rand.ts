import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const handleRand = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);

    if (args.length < 2) return;

    if (args.length === 2 && args.every((arg) => !Number.isNaN(+arg))) {
        handleRandNumber(ctx);
    } else {
        handleRandProp(ctx);
    }
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

    ctx.reply(`${args[randIndex]}`);
};
