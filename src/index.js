const tmi = require('tmi.js');
const fetch = require('cross-fetch');

let roomID = '';

const option = {
	identity: {
		username: 'ffowotw',
		password: 'oauth:hza8z428d81p2n3nyb41akbw4ym1ol'
	},
	channels: [ 'ffowotw' ]
};

const client = new tmi.client(option);

client.connect();

client.on('connected', (address, port) =>
{
    console.log(`Server connected`);
});

client.on('disconnected', (reason) =>
{
    console.log(`Server disconnected, reason: ${reason}`);
});

client.on('message', (channel, userstate, message, self) =>
{
    
	if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    command = args[0].toLowerCase() + '';

    const channelId = channel.replace('#', '');
    const username = userstate.username;

    console.log(`${username}輸入了!${command}`);

    if (command === 'discord' || command === 'dc')
    {
        client.say(channel, `https://discord.gg/7fYbbDVycg`);
        return;
    }
    else if (command === 'setid')
    {
        if (username === 'ffowotw' || mods.includes(username)) {
            roomID = args[1] + '';
        }
        return;
    }
    else if (command === 'id')
    {
        if (roomID === '') {
            client.say(channel, '自己猜 ffowotPepeLaugh');
        }
        else {
            client.say(channel, roomID);
        }
        return;
    }
    else
    {
        fetch(`http://tmi.twitch.tv/group/user/${channelId}/chatters`)
        .then(res => res.json())
        .then(data =>
        {
            const vips = data.chatters.vips;
            const mods = data.chatters.moderators;
            const viewers = data.chatters.viewers;

            const chatters = vips.concat(mods).concat(viewers);

            if (chatters.includes('nightbot')) chatters.splice(chatters.indexOf('nightbot'), 1);
            if (chatters.includes('streamlabs')) chatters.splice(chatters.indexOf('streamlabs'), 1);
            if (chatters.includes('streamelements')) chatters.splice(chatters.indexOf('streamelements'), 1);
            if (chatters.includes(username)) chatters.splice(chatters.indexOf(username), 1);

            if (command === '守靈')
            {
                client.action()

                client.say(channel, `PepegaPhone 還不快點起床開台!! @${userstate['display-name']} 正在跟${chatters.length}個人正在等你呢!!`);
            }
        });
    }
});

client.on('raided', (channel, username, viewers) => {
    client.say(channel, `!so ${username}`);
});
