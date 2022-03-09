const MISSPELL_WORDS = ['ихний', 'ихнее', 'ихняя', 'ихние', 'ихнего', 'ихних', 'ихнему', 'ихней', 'ихним', 'ихнюю', 'ихнею', 'ихними', 'ихнем'];

module.exports = class MessageController {
    isCaps(ctx) {
        if (!isTextMessage()) return false;

        const message = ctx.update.message.text;
        const words = message.split(' ');
        const MIN_CAPS_WORDS = 3;
        let capsWords = 0;

        words.forEach((word) => {
            const isSymbol = word.toLowerCase() === word.toUpperCase();

            if (word.toUpperCase() === word && !isSymbol) capsWords++;
        });

        const isAntiCaps = message.includes('#caps');
        const isCapsMessage = words.length > MIN_CAPS_WORDS && capsWords / words.length > 0.5 && !isAntiCaps;

        if (isCapsMessage) {
            this.handleCaps(ctx);
            return true;
        }

        return false;
    }

    isMisspell(ctx) {
        if (!isTextMessage()) return false;

        const message = ctx.update.message.text;
        const isMisspellMessage = MISSPELL_WORDS.some((word) => message.includes(word));

        if (isMisspellMessage) {
            this.handleMisspell(ctx);
            return true;
        }

        return false;
    }

    isSpecificWord(ctx) {
        if (!isTextMessage()) return false;

        const message = ctx.update.message.text;
        const RAND_CHANCE = 0.2;
        const SPEC_WORD = 'да';

        const containsSpecWord = message.toLowerCase().includes(SPEC_WORD);
        const isRandom = Math.random() < RAND_CHANCE;

        if (containsSpecWord && isRandom) {
            this.handleSpecWord(ctx);
            return true;
        }

        return false;
    }

    isTextMessage(ctx) {
        return !!ctx.update.message.text;
    }

    handleCaps(ctx) {
        const firstName = ctx.update.message.from.first_name;
        const userName = ctx.update.message.from.username;
        const message = ctx.update.message.text;
        const lowerMessage = this.toLowerCase(message);
        const isReply = ctx.reply_to_message_id;

        ctx.deleteMessage();

        if (isReply) {
            ctx.reply(`${firstName}: "${lowerMessage}"\n\n@${userName} отшлепан за использование КАПСА`, {
                reply_to_message_id: isReply,
            });
        } else {
            ctx.reply(`${firstName}: "${lowerMessage}"\n\n@${userName} отшлепан за использование КАПСА`);
        }
    }

    handleMisspell(ctx) {
        const message = 'их';
        const messageId = ctx.message.message_id;
        ctx.reply(message, { reply_to_message_id: messageId });
    }

    handleSpecWord(ctx) {
        const message = 'их';
        const messageId = ctx.message.message_id;
        ctx.reply(message, { reply_to_message_id: messageId });
    }

    toLowerCase(message) {
        const chars = message.split('');
        let toUpper = true;

        const formattedMessage = chars
            .map((_char) => {
                let char = '';
                const isSymbol = _char.toLowerCase() === _char.toUpperCase();

                if (toUpper && !isSymbol) {
                    char = _char.toUpperCase();
                    toUpper = false;
                } else {
                    char = _char.toLowerCase();
                }

                if (_char === '.') toUpper = true;

                return char;
            })
            .join('');

        return formattedMessage;
    }
};
