const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "delword",
    description: "remove word from wordlist",
    run: async (client, message, args) => {
        const guildicon = message.guild.iconURL();

        let word = args.slice(0).join(" ");
if(!word) {
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL())
    .setDescription(`
    ** INVAILD USAGE** 
    delword (word)
    Example:
    delword fuck
    `)
    .setFooter(message.guild.name, guildicon)
    return message.channel.send(embed)
}
let database = db.get(`anitbadwords_${message.guild.id}`)

if(database) {
  let data = database.find(x => x.swearword === word.toLowerCase())
let unabletofind = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`
** unable to find that word on database!** 
`)
.setFooter(message.guild.name, guildicon)

  if(!data) return message.channel.send(unabletofind)

  let value = database.indexOf(data)
  delete database[value]

  var filter = database.filter(x => {
    return x != null && x != ''
  })

  db.set(`anitbadwords_${message.guild.id}`, filter)
let deleted = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`
**Deleted ${word} Word From Anit-WordList!** 
`)
.setFooter(message.guild.name, guildicon)

  return message.channel.send(deleted)


} else {
    let okelse = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL())
.setDescription(`
** Sorry but i am unable to find that word!** 
`)
.setFooter(message.guild.name, guildicon)

  return message.channel.send(okelse)



}

  }}
