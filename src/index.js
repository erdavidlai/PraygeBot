const tmi = require('tmi.js');
const fetch = require('cross-fetch');

const option = {
	identity: {
		username: 'ffowotw',
		password: 'oauth:hza8z428d81p2n3nyb41akbw4ym1ol'
	},
	channels: [ 'ffowotw', 'ilzemkion_tw' ]
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
                    client.say(channel, `PepegaPhone P薩還不快點起床開台!! @${userstate.username} 正在跟${data.chatter_count}個人正在等你呢!!`);
                    break;
                    
                case 'ilzemkion_tw':
                    client.say(channel, `給哀給我開台!!`);
                    break;
            }
        });
    }
});