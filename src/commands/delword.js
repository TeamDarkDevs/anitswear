const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'delword',
    description: 'Remove a word from the word-list.',
    run: async (client, message, args) => {
        const guildicon = message.guild.iconURL();

        let word = args.slice(0).join(' ');
        if (!word) {
            let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`**Invalid Usage\ndelword(word)\nExample:\ndelword fuck`)
                .setFooter(message.guild.name, guildicon);
            return message.channel.send(embed);
        }
        let database = db.get(`anitbadwords_${message.guild.id}`);

        if (database) {
            let data = database.find((x) => x.swearword === word.toLowerCase());
            let unabletofind = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`**I could not find that word in the database.*`)
                .setFooter(message.guild.name, guildicon);

            if (!data) return message.channel.send(unabletofind);

            let value = database.indexOf(data);
            delete database[value];

            var filter = database.filter((x) => {
                return x != null && x != '';
            });

            db.set(`anitbadwords_${message.guild.id}`, filter);
            let deleted = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`**Deleted ${word} from Anit-WordList!** `)
                .setFooter(message.guild.name, guildicon);

            return message.channel.send(deleted);
        } else {
            let okelse = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(`**Sorry, I am unable to find that word.**`)
                .setFooter(message.guild.name, guildicon);

            return message.channel.send(okelse);
        }
    },
};
