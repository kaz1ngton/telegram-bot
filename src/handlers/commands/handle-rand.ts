import axios, { AxiosResponse } from 'axios';

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

const handleRandNumber = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    let { 1: min, 2: max } = ctx.update.message.text.split(' ');
    if (min > max) [min, max] = [max, min];

    const REQUEST_URL = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&base=10&col=1&format=plain`;

    axios(REQUEST_URL)
        .then((res) => {
            const { data } = res;

            if (typeof data === 'number') {
                ctx.reply(data.toString());
            } else {
                handleRandPhrase(ctx);
            }
        })
        .catch((e) => {
            handleRandPhrase(ctx);

            console.error(e);
        });
};

const handleRandProp = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);

    const MIN = 0;
    const MAX = args.length - 1;

    const REQUEST_URL = `https://www.random.org/integers/?num=1&min=${MIN}&max=${MAX}&base=10&col=1&format`;

    axios(REQUEST_URL)
        .then((res) => {
            const { data } = res;

            if (typeof data === 'number') {
                ctx.reply(`${args[data]}`);
            } else {
                handleRandPhrase(ctx);
            }
        })
        .catch((e) => {
            handleRandPhrase(ctx);

            console.error(e);
        });
};

const handleRandPhrase = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const METHOD = 'title';
    const NUMBER = 1;
    const REQUEST_URL = `https://fish-text.ru/get?number=${NUMBER}&type=${METHOD}`;

    axios(REQUEST_URL)
        .then((res) => {
            const { text, status, errorCode } = res.data;

            if (status === 'success') {
                ctx.reply(text);
            } else {
                console.error(errorCode);
            }
        })
        .catch((e) => {
            console.error(e);
        });
};
