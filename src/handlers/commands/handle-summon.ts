import axios from 'axios';
import { Context, NarrowedContext } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import { MountMap } from 'telegraf/typings/telegram-types';

export const handleSummon = (ctx: NarrowedContext<Context, MountMap['text']>) => {
    const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);
    
    if (!args.length || !args.every((arg) => arg[0] === '@')) return;

    const CATEGORY = 'summon-jutsu';
    const GIPHY_API_KEY = <string>process.env.GIPHY_API_KEY;

    axios({
        method: 'GET',
        url: `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${CATEGORY}`,
    })
        .then((response) => {
            const NUMBER_PINGS = 5;

            const gifUrl = response.data.data.images.original.url;
            const [, ...args] = ctx.update.message.text.split(' ').filter(Boolean);
            const message = args.join(' ');

            const replyPromises = [];

            for (let i = 0; i < NUMBER_PINGS; i++) {
                replyPromises.push(ctx.reply(message));
            }

            Promise.all(replyPromises).then((messages) => {
                deleteSummonMessages(messages, ctx);
                ctx.replyWithVideo(gifUrl);
            });
        })
        .catch((e) => {
            console.log(e);
        });
};

const deleteSummonMessages = (messages: Message.TextMessage[], ctx: Context) => {
    const START_INDEX = 1;
    const DELETE_TIMEOUT = 3600_000;

    const chatId = <number>ctx.chat?.id;

    if (!chatId) return;

    for (let i = START_INDEX; i < messages.length; i++) {
        setTimeout(() => {
            ctx.telegram.deleteMessage(chatId, messages[i].message_id);
        }, DELETE_TIMEOUT);
    }
};
