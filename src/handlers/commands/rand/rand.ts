import axios from 'axios';

import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const handleRand = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);

    if (args.length < 2) {
        handleRandPhrase(ctx);
    } else if (args.length === 2 && args.every((arg) => !Number.isNaN(+arg))) {
        handleRandNumber(ctx);
    } else {
        handleRandProp(ctx);
    }
};

const handleRandNumber = async (ctx: NarrowedContext<Context, MountMap['text']>) => {
    let { 1: min, 2: max } = ctx.update.message.text.split(' ');
    if (min > max) [min, max] = [max, min];

    const num = await fetchRandomNumber(+min, +max);

    if (typeof num === 'number') {
        ctx.reply(num.toString());
    } else {
        handleRandPhrase(ctx);
    }
};

const handleRandProp = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);

    const MIN = 0;
    const MAX = args.length - 1;

    const num = fetchRandomNumber(MIN, MAX);

    if (typeof num === 'number') {
        ctx.reply(`${args[num]}`);
    } else {
        handleRandPhrase(ctx);
    }
};

const handleRandPhrase = async (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const text = await fetchRandomPhrase();

    if (text) {
        ctx.reply(text);
    }
};

export const fetchRandomNumber = async (min: number, max: number) => {
    const REQUEST_URL = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&base=10&col=1&format=plain`;

    try {
        const response = await axios(REQUEST_URL);
        const { data } = response;

        if (typeof data === 'number') {
            return data;
        }
    } catch (e) {
        console.error(e);
    }
};

export const fetchRandomPhrase = async () => {
    const METHOD = 'title';
    const NUMBER = 1;
    const REQUEST_URL = `https://fish-text.ru/get?number=${NUMBER}&type=${METHOD}`;

    try {
        const response = await axios(REQUEST_URL);
        const { text, status, errorCode } = response.data;

        if (status === 'success') {
            return text;
        } else {
            console.error(errorCode);
        }
    } catch (e) {
        console.error(e);
    }
};
