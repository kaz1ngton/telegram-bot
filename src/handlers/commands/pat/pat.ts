import axios from 'axios';
import { Context, NarrowedContext } from 'telegraf';
import { MountMap } from 'telegraf/typings/telegram-types';

export const handlePat = async (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const message = ctx.update.message;
    const isGetter = message.text.split(' ').length >= 2;
    const gifURL = await fetchPetGif();

    if (gifURL) {
        if (isGetter) {
            const userName = message.from.username;
            const caption = `@${userName} погладил ${message.text.slice(message.text.indexOf(' ') + 1)}`;
            ctx.replyWithVideo(gifURL, { caption });
        } else {
            ctx.replyWithVideo(gifURL);
        }
    }
};

export const fetchPetGif = async () => {
    const CATEGORY = 'headpat';
    const GIPHY_API_KEY = <string>process.env.GIPHY_API_KEY;

    try {
        const response = await axios({
            method: 'GET',
            url: `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${CATEGORY}`,
        });

        return response.data?.data?.images?.original?.url;
    } catch (e) {
        console.error(e);
    }
};
