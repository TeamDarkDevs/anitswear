// Made By DarkBoy [You Can use it and post it] but dont change credits, i have spent time on working on this source! 
// Fully Custom Discord Bot Made By DarkBoy For Free haha
console.log("\nLoading...")
console.log("If This Take Too long make sure u have add right token!")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix , token } = yaml.load(fs.readFileSync("./config.yml"));
const Discord = require('discord.js')
const client = new Discord.Client();
const db = require('quick.db')
const { join } = require('path');
const { readdirSync } = require('fs');
client.commands= new Discord.Collection();
client.login(token)

  
client.on('ready', () => {
    client.user.setActivity(status, { type: 'PLAYING' });
    console.clear();
   console.log('\n\x1b[32m%s\x1b[0m', `          $[INFO]: Logged on ${client.user.tag}`);  
  console.log('\x1b[32m%s\x1b[0m', `           $[INFO]: PREFIX ${mainprefix}`);  
 
 });

 const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

 for (const file of commandFiles) {
     const command = require(join(__dirname, "commands", `${file}`));
     client.commands.set(command.name , command);
 }
 
 client.on("message", async message => {
    let prefix = await db.get(`prefix_${message.guild.id}`);
   if(prefix === null) prefix = mainprefix;
       if(message.author.bot) return;
       if(message.channel.type === 'dm') return;
   
       if(message.content.startsWith(prefix)) {
           
      let premiumcheck = db.get(`blacklisted`)

      if(premiumcheck && premiumcheck.find(find => find.kid == message.author.id)) return message.channel.send(`you cant use the bot your blacklisted!!`);
 
           const args = message.content.slice(prefix.length).trim().split(/ +/);
   
           const command = args.shift().toLowerCase();
   
           if(!client.commands.has(command)) return;
   
   
           try {
               client.commands.get(command).run(client, message, args);
   
           } catch (error){
               console.error(error);
           }
        }
   })
 

 client.on('message', message => {
     if(message.guild) {
let words = db.get(`anitbadwords_${message.guild.id}`)
if(words === null) {
    return console.log(`trash`)
}
if(words && words.find(find => find.swearword == message.content.toLowerCase())) {
    console.log(words)
message.delete()
message.reply(`The word you said is blocked from ${message.guild.name}/this server`).then(msg => {
    msg.delete({ 
        timeout: 5000 
    });
})
}
     }
 })
