const tmi = require('tmi.js');
const fetch = require('cross-fetch');

const option = {
	identity: {
		username: 'ffowotw',
		password: 'oauth:hza8z428d81p2n3nyb41akbw4ym1ol'
	},
	channels: [ 'ffowotw', 'mei_0w0', 'yiyala0108', 'justkatana_', 'shirakabarinyun', 'yoruko_ouo', 'togameazumi5566', 'morze_mh' ]
};

const client = new tmi.client(option);

client.connect();

client.on('message', (channel, userstate, message, self) => {
    
	if(self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    const channelId = channel.replace('#', '');

    console.log(`${userstate.username}在${channelId}的頻道輸入了${message}`);

    fetch(`http://tmi.twitch.tv/group/user/${channelId}/chatters`)
        .then(res => res.json())
        .then(data => {
            const vips = data.chatters.vips;
            const mods = data.chatters.moderators;
            const viewers = data.chatters.viewers;

            const chatters = vips.concat(mods).concat(viewers);

            if (chatters.includes('nightbot')) chatters.splice(chatters.indexOf('nightbot'), 1);
            if (chatters.includes('streamlabs')) chatters.splice(chatters.indexOf('streamlabs'), 1);
            if (chatters.includes('streamelements')) chatters.splice(chatters.indexOf('streamelements'), 1);
            if (chatters.includes(userstate.username)) chatters.splice(chatters.indexOf(userstate.username), 1);

            switch(channelId) {
                case 'ffowotw': {
                    if (command === '守靈') {
                        client.say(channel, `PepegaPhone P薩還不快點起床開台!! @${userstate.username} 正在跟${chatters.length}個人正在等你呢!!`);
                    }
                    break;
                }
                case 'mei_0w0': {
                    if (command === '躲貓貓') {
                        let nowViewers = '';

                        for (var i = 0; i < chatters.length; i++) {

                            if (i != chatters.length - 1) nowViewers += chatters[i] + ', ';
                            else nowViewers += chatters[i] + '';
                        }

                        client.say(channel, `${nowViewers} 抓到你們了!!`);
                    }
                    break;
                }
                case 'yiyala0108': {
                    if (command === '躲貓貓') {
                        let nowViewers = '';

                        for (var i = 0; i < chatters.length; i++) {

                            if (i != chatters.length - 1) nowViewers += chatters[i] + ', ';
                            else nowViewers += chatters[i] + '';
                        }

                        client.say(channel, `${nowViewers} 抓到你們了!!`);
                    }
                    break;
                }
                case 'shirakabarinyun': {
                    if (command === '躲貓貓') {
                        let nowViewers = '';

                        for (var i = 0; i < chatters.length; i++) {

                            if (i != chatters.length - 1) nowViewers += chatters[i] + ', ';
                            else nowViewers += chatters[i] + '';
                        }

                        client.say(channel, `${nowViewers} 抓到你們了!!`);
                    }
                    break;
                }
                case 'yoruko_ouo': {
                    if (command === '躲貓貓') {
                        let nowViewers = '';

                        for (var i = 0; i < chatters.length; i++) {

                            if (i != chatters.length - 1) nowViewers += chatters[i] + ', ';
                            else nowViewers += chatters[i] + '';
                        }

                        client.say(channel, `${nowViewers} 抓到你們了!!`);
                    }
                    break;
                }
                case 'justkatana_': {
                    if (command === '招魂') {
                        client.say(channel, `有 ${chatters.length}人正在等待K粉降臨，還敢不開台阿，甲K！！！`);
                    }
                    break;
                }
                case 'togameazumi5566': {
                    if (command === '掠龜') {
                        client.say(channel, `${chatters.length}個人正在海邊掠龜中`);
                    }
                    else if (command === '躲貓貓') {
                        let nowViewers = '';

                        for (var i = 0; i < chatters.length; i++) {

                            if (i != chatters.length - 1) nowViewers += chatters[i] + ', ';
                            else nowViewers += chatters[i] + '';
                        }

                        client.say(channel, `${nowViewers} 抓到你們了!!`);
                    }
                    break;
                }
                case 'morze_mh': {
                    if (command === '守靈') {
                        client.say(channel, `PepegaPhone P薩還不快點起床開台!! @${userstate.username} 正和 ${chatters.length} 個人一起守靈 主bo給我開台!`);
                    }
                    break;
                }
            }
        });
});

client.on('raided', (channel, username, viewers) => {
    const channelId = channel.replace('#', '');

    if (channelId === 'mei_0w0') {
        client.say(channel, `快來追隨${username}, https://twitch.tv/${username}`);
    }
});
