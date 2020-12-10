const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: 'wordlist',
    description: 'See a list of words on the words-list.',
    run: async (client, message) => {
        let guild = message.guild.iconURL();

        let wordlist = new Discord.MessageEmbed().setTitle(`${message.guild.name} AnitWords List`).setThumbnail(guild).setFooter(message.author.username, message.author.displayAvatarURL);
        let database = db.get(`anitbadwords_${message.guild.id}`);
        if (database && database.length) {
            let array = [];
            database.forEach((m) => {
                array.push(`Word: ${m.swearword} | **Word Author**: ${m.author}`);
            });

            wordlist.addField('** ${message.author.tag} **', `${array.join('\n')}`);
        }
        return message.channel.send(wordlist);
    },
};
