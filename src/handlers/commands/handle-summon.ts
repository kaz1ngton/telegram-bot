import axios from 'axios';
import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const handleSummon = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);
    if (args.length && args.every((arg) => arg[0] === '@')) {
    }

    const CATEGORY = 'summon-jutsu';
    const GIPHY_API_KEY = <string>process.env.GIPHY_API_KEY;

    axios({
        method: 'GET',
        url: `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${CATEGORY}`,
    })
        .then((response) => {
            const gifUrl = response.data.data.images.original.url;
            const NUMBER_PINGS = 15;
            const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);
            const message = args.join(' ');

            const replyPromises = [];

            for (let i = 0; i < NUMBER_PINGS; i++) {
                replyPromises.push(ctx.reply(message));
            }

            Promise.all(replyPromises).then(() => {
                ctx.replyWithVideo(gifUrl);
            });
        })
        .catch((e) => {
            console.log(e);
        });
};
