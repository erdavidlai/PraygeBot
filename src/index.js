const tmi = require('tmi.js');
const fetch = require('cross-fetch');

const option = {
	identity: {
		username: 'ffowotw',
		password: 'oauth:hza8z428d81p2n3nyb41akbw4ym1ol'
	},
	channels: [ 'ffowotw', 'ilzemkion_tw', 'mei_0w0', 'yiyala0108', 'justkatana_', 'shirakabarinyun', 'yoruko_ouo', 'togameazumi5566' ]
};

const client = new tmi.client(option);

client.connect();

client.on('message', (channel, userstate, message, self) => {
    
	if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    const channelId = channel.replace('#', '');

    if (command === '守靈') {

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
            }
        });
    }
    else if (command === '躲貓貓') {

        fetch(`http://tmi.twitch.tv/group/user/${channelId}/chatters`)
        .then(res => res.json())
        .then(data => {

            if (channelId === 'mei_0w0' || channelId === 'yiyala0108' || channelId === 'shirakabarinyun' || channelId === 'yoruko_ouo' || channelId === 'togameazumi5566') {
                const vips = data.chatters.vips;
                const mods = data.chatters.moderators;
                const viewers = data.chatters.viewers;

                const chatters = vips.concat(mods).concat(viewers);

                let nowViewers = '';

                for (var i = 0; i < chatters.length; i++) {

                    if (chatters[i].toLowerCase() === 'nightbot') continue;
                    if (chatters[i].toLowerCase() === 'streamlabs') continue;
                    if (chatters[i].toLowerCase() === 'streamelements') continue;
                        
                    if (i != chatters.length - 1) nowViewers += chatters[i] + ', ';
                    else nowViewers += chatters[i] + '';
                }

                client.say(channel, `${nowViewers} 抓到你們了!!`);
            }
        });
    }
    else if (command === '招魂') {

        fetch(`http://tmi.twitch.tv/group/user/${channelId}/chatters`)
        .then(res => res.json())
        .then(data => {
            if (channelId === 'justkatana_') {
                client.say(channel, `有 ${data.chatter_count - 1}人正在等待K粉降臨，還敢不開台阿，甲K！！！`);
            }
        });
    }
    else if (command === '掠龜') {

        fetch(`http://tmi.twitch.tv/group/user/${channelId}/chatters`)
        .then(res => res.json())
        .then(data => {
            if (channelId === 'togameazumi5566') {
                client.say(channel, `${data.chatter_count - 1}個人正在海邊掠龜中`);
            }
        });
    }
});

client.on('raided', (channel, username, viewers) => {
    if (channel.replace('#', '') === 'mei_0w0') {
        client.say(channel, `快來追隨${username}, https://twitch.tv/${username}`);
    }
});
