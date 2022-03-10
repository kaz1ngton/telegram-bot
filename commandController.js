const GIFs =[
    'https://tenor.com/bKowT.gif',
    'https://tenor.com/3TW9.gif',
    'https://tenor.com/PM1V.gif',
    'https://tenor.com/bwIo1.gif',
    'https://tenor.com/6w8H.gif',
    'https://tenor.com/bywOU.gif',
    'https://tenor.com/KuTJ.gif',
    'https://tenor.com/baiQM.gif',
    'https://tenor.com/beNTO.gif',
    'https://tenor.com/bADJl.gif'
]

const handlePat = (ctx) => {
    const message = ctx.message.text
    const user = message.split(' ')[1]

    if (!user) return;

    try{
    const image = GIFs[Math.floor(Math.random() * GIFs.length)];
    ctx.replyWithPhoto({ url: image }, { caption: `${ctx.message.from.first_name} погладил ${user}` });
    ctx.deleteMessage();
    } catch (e) {}
}

module.export = {handlePat}