import axios from 'axios';
import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const handlePat = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const CATEGORY = 'headpat';
    const GIPHY_API_KEY = <string>process.env.GIPHY_API_KEY;

    const message = ctx.update.message;
    const isGetter = message.text.split(' ').length >= 2;

    axios({
        method: 'GET',
        url: `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${CATEGORY}`,
    })
        .then((response) => {
            const gifUrl = response.data.data.images.original.url;

            if (isGetter) {
                const userName = message.from.username;
                const caption = `@${userName} погладил ${message.text.slice(message.text.indexOf(' ') + 1)}`;
                ctx.replyWithVideo(gifUrl, { caption });
            } else {
                ctx.replyWithVideo(gifUrl);
            }
        })
        .catch((e) => {
            console.error(e);
        });
};
