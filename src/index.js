const tmi = require('tmi.js');
const fetch = require('cross-fetch');

const option = {
	identity: {
		username: 'ffowotw',
		password: 'oauth:hza8z428d81p2n3nyb41akbw4ym1ol'
	},
	channels: [ 'ffowotw', 'ilzemkion_tw', 'mei_0w0', 'yiyala0108' ]
};

const client = new tmi.client(option);

client.connect();

client.on('message', (channel, userstate, message, self) => {
    
	if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    if (command === '守靈') {

        channelId = channel.replace('#', '');

        fetch(`http://tmi.twitch.tv/group/user/${channelId}/chatters`)
        .then(res => res.json())
        .then(data => {
            switch(channelId)
            {
                case 'ffowotw':
                    client.say(channel, `PepegaPhone P薩還不快點起床開台!! @${userstate.username} 正在跟${data.chatter_count - 1}個人正在等你呢!!`);
                    break;
                    
                case 'ilzemkion_tw':
                    client.say(channel, `給哀給我開台!!`);
                    break;

                case 'mei_0w0':
                    client.say(channel, `@${userstate.username} 正在跟${data.chatter_count - 1}個人守靈中..`);
                    break;
            }
        });
    }
    else if (command === '躲貓貓') {
        channelId = channel.replace('#', '');

        fetch(`http://tmi.twitch.tv/group/user/${channelId}/chatters`)
        .then(res => res.json())
        .then(data => {

            switch(channelId)
            {
                case 'yiyala0108':
                    
                    const vips = data.chatters.vips;
                    const mods = data.chatters.moderators;
                    const viewers = data.chatters.viewers;

                    const chatters = vips.concat(mods).concat(viewers);

                    let nowViewers = '';

                    for (var i = 0; i < chatters.length; i++) {
                        
                        console.log(i);

                        if (chatters[i].toLowerCase() === 'nightbot') continue;
                        if (chatters[i].toLowerCase() === 'streamlabs') continue;
                        
                        if (i != chatters.length - 1) nowViewers += chatters[i] + ', ';
                        else nowViewers += chatters[i] + '';

                        console.log(chatters[i]);
                    }

                    client.say(channel, `${nowViewers} 抓到你們了!!`);
                    break;
            }
        });
    }
});

client.on('raided', (channel, username, viewers) => {
    if (channel.replace('#', '') === 'mei_0w0') {
        client.say(channel, `快來追隨${username}, https://.twitch.tv/${username}`);
    }
});
