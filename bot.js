const { Client, RichEmbed } = require('discord.js');
const fs = require("fs");
const moment = require("moment");
const devs = ['431150885549113344','244423000802328576','343383616895713290','171259176029257728'];
const errmsg = "<:eRrOr:475075170231517184> **Oops, something unexpected happened!** The error was sent to our team and we'll do our best to fix it."
const client = new Client({
    disableEveryone: true,
    messageCacheMaxSize: 500,
    messageCacheLifetime: 120,
    messageSweepInterval: 60
  });
const ms = require('ms');
const prefix = '.'
const nekoclient = require('nekos.life')
const neko = new nekoclient()
const commands = JSON.parse(fs.readFileSync("./data/commands.json", "utf8"));
client.login(process.env.SECERT_TOKEN);

//By Abady Refactoring
// client.on('message', message => {
//   var argresult = message.content.split(` `).slice(1).join(' ');
//     if (!devs.includes(message.author.id)) return;
    
// if (message.content.startsWith(adminprefix + 'setgame')) {
//   client.user.setGame(argresult);
//     message.channel.sendMessage(`**${argresult} تم تغيير بلاينق البوت إلى **`)
// } else 
//   if (message.content.startsWith(adminprefix + 'setname')) {
// client.user.setUsername(argresult).then
//     message.channel.sendMessage(`**${argresult}** : تم تغيير أسم البوت إلى`)
// return message.reply("**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين . **");
// } else
//   if (message.content.startsWith(adminprefix + 'setavatar')) {
// client.user.setAvatar(argresult);
//   message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
//       } else     
// if (message.content.startsWith(adminprefix + 'setT')) {
//   client.user.setGame(argresult, "https://www.twitch.tv/idk");
//     message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
// }

// });

//Refactoring..
// ///مانع القحفله
// var guilds = {};
// client.on('guildBanAdd', function(guild) {
//             const rebellog = client.channels.find("name", "log"),
//             Onumber = 3,
//   Otime = 10000
// guild.fetchAuditLogs({
//     type: 22
// }).then(audit => {
//     let banner = audit.entries.map(banner => banner.executor.id)
//     let bans = guilds[guild.id + banner].bans || 0 
//     guilds[guild.id + banner] = {
//         bans: 0
//     }
//       bans[guilds.id].bans += 1; 
// if(guilds[guild.id + banner].bans >= Onumber) {
// try {
// let roles = guild.members.get(banner).roles.array();
// guild.members.get(banner).removeRoles(roles);
//   guild.guild.member(banner).kick();

// } catch (error) {
// console.log(error)
// try {
// guild.members.get(banner).ban();
//   rebellog.send(`<@!${banner.id}>
// حآول العبث بالسيرفر @here`);
// guild.owner.send(`<@!${banner.id}>
// حآول العبث بالسيرفر ${guild.name}`)
//     setTimeout(() => {
//  guilds[guild.id].bans = 0;
//   },Otime)
// } catch (error) {
// console.log(error)
// }
// }
// }
// })
// });
//  let channelc = {};
//   client.on('channelCreate', async (channel) => {
//   const rebellog = client.channels.find("name", "log"),
//   Oguild = channel.guild,
//   Onumber = 3,
//   Otime = 10000;
//   const audit = await channel.guild.fetchAuditLogs({limit: 1});
//   const channelcreate = audit.entries.first().executor;
//   console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
//    if(!channelc[channelcreate.id]) {
//     channelc[channelcreate.id] = {
//     created : 0
//      }
//  }
//  channelc[channelcreate.id].created += 1;
//  if(channelc[channelcreate.id].created >= Onumber ) {
//     Oguild.members.get(channelcreate.id).kick();
// rebellog.send(`<@!${channelcreate.id}>
// حآول العبث بالسيرفر @here`);
// channel.guild.owner.send(`<@!${channelcreate.id}>
// حآول العبث بالسيرفر ${channel.guild.name}`)
// }
//   setTimeout(() => {
//  channelc[channelcreate.id].created = 0;
//   },Otime)
//   });

// let channelr = {};
//   client.on('channelDelete', async (channel) => {
//   const rebellog = client.channels.find("name", "log"),
//   Oguild = channel.guild,
//   Onumber = 3,
//   Otime = 10000;
//   const audit = await channel.guild.fetchAuditLogs({limit: 1});
//   const channelremover = audit.entries.first().executor;
//   console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
//    if(!channelr[channelremover.id]) {
//     channelr[channelremover.id] = {
//     deleted : 0
//      }
//  }
//  channelr[channelremover.id].deleted += 1;
//  if(channelr[channelremover.id].deleted >= Onumber ) {
//   Oguild.guild.member(channelremover).kick();
// rebellog.send(`<@!${channelremover.id}>
// حآول العبث بالسيرفر @here`);
// channel.guild.owner.send(`<@!${channelremover.id}>
// حآول العبث بالسيرفر ${channel.guild.name}`)
// }
//   setTimeout(() => {
//  channelr[channelremover.id].deleted = 0;
//   },Otime)
//   });
// ///End
// ///id
/////////////// Functions //////////////////
function random(xlenght) {
    return Math.floor((Math.random() * xlenght));
}
function errormsg(message, err, cmd) {
    message.channel.send(errmsg) 
    client.channels.get("474245438837620736").send(`**:warning: Error**`, {embed: {
    description: `\`\`\`${err}\`\`\` `,
    fields: [
        {
        name: "**server**",
        value: message.guild.name,
        inline: true
        }, 
        {
        name: "**user**",
        value: message.author.username,
        inline: true
        }, 
        {
        name: "**command**",
        value: cmd,
        inline: true
        }
    ]}})
    return; 
}
function helpcmd(commands, cmd, role, group, desc, usage) {
commands[cmd] = {
name: cmd,
role: role,
group: group,
desc: desc,
usage: usage
}
}
/////////////// Other Client Events //////////////////
client.on("ready", () => {
client.user.setActivity(".help | Soon..")
client.channels.get("475028391473709068").send(`Megumi's bot is ready`)
helpcmd(commands, "Hug", "user", "Action Commands", "Hugs the specified user.", `hug <@user | user username | user ID>`)
helpcmd(commands, "Kiss", "user", "Action Commands", "Kisses the specified user.", `kiss <@user | user username | user ID>`)
helpcmd(commands, "Slap", "user", "Action Commands", "Slaps the specified user.", `slap <@user | user username | user ID>`)
helpcmd(commands, "Pat", "user", "Action Commands", "Pats the specified user.", `pat <@user | user username | user ID>`)
helpcmd(commands, "Cuddle", "user", "Action Commands", "Cuddles the specified user.", `cuddle <@user | user username | user ID>`)
helpcmd(commands, "Poke", "user", "Action Commands", "Pokes the specified user.", `poke <@user | user username | user ID>`)
helpcmd(commands, "Tickle", "user", "Action Commands", "Tickles the specified user.", `tickle <@user | user username | user ID>`)
helpcmd(commands, "Avatar", "user", "Info Commands", "Shows specified user avatar or your avatar.", `avatar [@user | user username | user ID]`)
helpcmd(commands, "Server", "user", "Info Commands", "Shows server info.", `server`)
helpcmd(commands, "Roles", "user", "Info Commands", "Shows list of the roles in current server.", `roles`)
helpcmd(commands, "Ping", "user", "Info Commands", "Shows the bot pings.", `ping`)
})
client.on("error", (error) => client.channels.get("474245438837620736").send(error))
.on('reconnecting', () => console.log(`reconnecting`)).on('disconnect', () => console.log('disconnecting'))
process.on("unhandledRejection", (err) => client.channels.get("474245438837620736").send(`\`\`\`js\n${err}\`\`\` `))
/////////////// Other Client Events //////////////////

client.on('message', async function(message) {
if(message.channel.type !== "text") return; 
let args = message.content.split(" ").slice(1);
let user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.displayName === args[0]) || message.author
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// C O M M A N D S //////////////////
if (message.content.startsWith(prefix + 'help')) {

if (message.content === `${prefix}help`) {

    const embed = new RichEmbed()
        .setColor(0x1D82B6)
    let commandsFound = 0;
    for (var cmd in commands) {
        if (commands[cmd].role.toUpperCase() === 'USER') {
            commandsFound++
            embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`);
        }
    }
    embed.setFooter(`Currently showing user commands. To view another group do ${prefix}help [group / command]`)
    embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

    message.author.send({embed})
    message.channel.send({embed: {
        color: 0x1D82B6,
        description: `**Check your DMs ${message.author}!**`
    }})

} else if (args.join(" ").toUpperCase() === 'GROUPS') {

    let groups = '';
    for (var cmd in commands) {
        if (!groups.includes(commands[cmd].group)) {
            groups += `${commands[cmd].group}\n`
        }
    }
    message.channel.send({embed: {
        description:`**${groups}**`,
        title:"Groups",
        color: 0x1D82B6
    }})
    return;
} else {
    let groupFound = '';
    for (var cmd in commands) {
        if (args.join(" ").trim().toUpperCase() === commands[cmd].group.toUpperCase()) {
            groupFound = commands[cmd].group.toUpperCase();
            break;
        }
    }
    if (groupFound != '') {
        const embed = new RichEmbed()
            .setColor(0x1D82B6)

        let commandsFound = 0; 
        for (var cmd in commands) { 
            if (commands[cmd].group.toUpperCase() === groupFound) {
                commandsFound++
                embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix + commands[cmd].usage}`); // This will output something like <commandname>[title] [newline] desc: <description> [newline] usage: <usage
            }

        }

        embed.setFooter(`Currently showing ${groupFound} commands. To view another group do ${prefix}help [group / command]`)
        embed.setDescription(`**${commandsFound} commands found** - <> means required, [] means optional`)

        message.author.send({embed})
        message.channel.send({embed: {
            color: 0x1D82B6,
            description: `**Check your DMs ${message.author}!**`
        }})
        return; 
    }
    let commandFound = '';
    let commandDesc = '';
    let commandUsage = '';
    let commandGroup = '';

    for (var cmd in commands) { 

        if (args.join(" ").trim().toUpperCase() === commands[cmd].name.toUpperCase()) {
            commandFound = commands[cmd].name; 
            commandDesc = commands[cmd].desc;
            commandUsage = commands[cmd].usage;
            commandGroup = commands[cmd].group;
            break;
        }

    }

    if (commandFound === '') {
        message.channel.send({embed: {
            description:`**No group or command found titled \`${args.join(" ")}\`**`,
            color: 0x1D82B6,
        }})

    }

    message.channel.send({embed: {
        title:'<> means required, [] means optional',
        color: 0x1D82B6,
        fields: [{
            name:commandFound,
            value:`**Description:** ${commandDesc}\n**Usage:** ${commandUsage}\n**Group:** ${commandGroup}`
        }]
    }})
    return;
}

}

 if(message.content.startsWith(`${prefix}hug`)) {
    if(user.bot) return message.channel.send(`:x: You can't do that to bots.`)
    if(message.mentions.users.size < 1) return message.channel.send(":x: You need to mention a user/users.")
    user = message.mentions.members.map(m => m.user.username)
    if(message.mentions.members.size > 1) user = message.mentions.members.map(m => m.user.username).join(",")
    const img = await neko.getSFWHug()
    message.channel.send(`<:waifuHug:475072567137533953> **${user}** you have been hugged by **${message.author.username}**`, {files: [img.url]
    /////////////////////////////////////////////////////////////
    }).catch(err => errormsg(message, err, "hug"))
}

if(message.content.startsWith(`${prefix}kiss`)) {
    if(user.bot) return message.channel.send(`:x: You can't do that to bots.`)
    if(message.mentions.users.size < 1) return message.channel.send(":x: You need to mention a user/users.")
    user = message.mentions.members.map(m => m.user.username)
    if(message.mentions.members.size > 1) user = message.mentions.members.map(m => m.user.username).join(",")
    const img = await neko.getSFWKiss()
    message.channel.send(`<:waifuHug:475072567137533953> **${user}** you have been kissed by **${message.author.username}**`, {files: [img.url]
    /////////////////////////////////////////////////////////////
    }).catch(err => errormsg(message, err, "kiss"))
}

if(message.content.startsWith(`${prefix}slap`)) {
    if(user.bot) return message.channel.send(`:x: You can't do that to bots.`)
    if(message.mentions.users.size < 1) return message.channel.send(":x: You need to mention a user/users.")
    user = message.mentions.members.map(m => m.user.username)
    if(message.mentions.members.size > 1) user = message.mentions.members.map(m => m.user.username).join(",")
    const img = await neko.getSFWSlap()
    message.channel.send(`<:waifuHug:475072567137533953> **${user}** you have been slapped by **${message.author.username}**`, {files: [img.url]
    /////////////////////////////////////////////////////////////
    }).catch(err => errormsg(message, err, "slap"))
}

if(message.content.startsWith(`${prefix}pat`)) {
    if(user.bot) return message.channel.send(`:x: You can't do that to bots.`)
    if(message.mentions.users.size < 1) return message.channel.send(":x: You need to mention a user/users.")
    user = message.mentions.members.map(m => m.user.username)
    if(message.mentions.members.size > 1) user = message.mentions.members.map(m => m.user.username).join(",")
    const img = await neko.getSFWPat()
    message.channel.send(`<:waifuHug:475072567137533953> **${user}** you have been patted by **${message.author.username}**`, {files: [img.url]
    /////////////////////////////////////////////////////////////
    }).catch(err => errormsg(message, err, "pat"))
}

if(message.content.startsWith(`${prefix}cuddle`)) {
    if(user.bot) return message.channel.send(`:x: You can't do that to bots.`)
    if(message.mentions.users.size < 1) return message.channel.send(":x: You need to mention a user/users.")
    user = message.mentions.members.map(m => m.user.username)
    if(message.mentions.members.size > 1) user = message.mentions.members.map(m => m.user.username).join(",")
    const img = await neko.getSFWCuddle()
    message.channel.send(`<:waifuHug:475072567137533953> **${user}** you have been cuddled by **${message.author.username}**`, {files: [img.url]
    /////////////////////////////////////////////////////////////
    }).catch(err => errormsg(message, err, "cuddle"))
}

if(message.content.startsWith(`${prefix}poke`)) {
    if(user.bot) return message.channel.send(`:x: You can't do that to bots.`)
    if(message.mentions.users.size < 1) return message.channel.send(":x: You need to mention a user/users.")
    user = message.mentions.members.map(m => m.user.username)
    if(message.mentions.members.size > 1) user = message.mentions.members.map(m => m.user.username).join(",")
    const img = await neko.getSFWPoke()
    message.channel.send(`<:waifuHug:475072567137533953> **${user}** you have been poked by **${message.author.username}**`, {files: [img.url]
    /////////////////////////////////////////////////////////////
    }).catch(err => errormsg(message, err, "poke"))
}

if(message.content.startsWith(`${prefix}tickle`)) {
    if(user.bot) return message.channel.send(`:x: You can't do that to bots.`)
    if(message.mentions.users.size < 1) return message.channel.send(":x: You need to mention a user/users.")
    user = message.mentions.members.map(m => m.user.username)
    if(message.mentions.members.size > 1) user = message.mentions.members.map(m => m.user.username).join(",")
    const img = await neko.getSFWTickle()
    message.channel.send(`<:waifuHug:475072567137533953> **${user}** you have been tickled by **${message.author.username}**`, {files: [img.url]
    /////////////////////////////////////////////////////////////
    }).catch(err => errormsg(message, err, "tickle"))
}


// NSFW Commands //
if(message.content.startsWith(`${prefix}nsfw`)) {
let nsfwimg;
const randomRespondsSetUp = [":heart_eyes: Wow!", "**Here you go :point_right: :ok_hand:", "DON'T GET **HORNY**!!!"]
const randomResponds = randomRespondsSetUp[Math.floor(Math.random * randomRespondsSetUp.length)]
console.log(randomResponds)
if(!message.channel.nsfw) return message.channel.send(`:x: The channel must be **NSFW**.\nMore info: **<https://goo.gl/4AViTc>**`)
if(!args[0]) {
nsfwimg = await neko.getNSFWRandomHentaiGif()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
console.log(nsfwimg.url)
return;
} else if(args[0].toLowerCase().startsWith("pussy")) {
nsfwimg = await neko.getNSFWPussy()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("neko")) {
nsfwimg = await neko.getNSFWNekoGif()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("lesbian")) {
nsfwimg = await neko.getNSFWLesbian()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("kuni")) {
nsfwimg = await neko.getNSFWKuni()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("cumslut")) {
nsfwimg = await neko.getNSFWCumsluts()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("boobs")) {
nsfwimg = await neko.getNSFWBoobs()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("bj")) {
nsfwimg = await neko.getNSFWBJ()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("anal")) {
nsfwimg = await neko.getNSFWAnal()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("yuri")) {
nsfwimg = await neko.getNSFWEroYuri()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("small-boobs")) {
nsfwimg = await neko.getNSFWSmallBoobs()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("wank")) {
nsfwimg = await neko.getNSFWPussyWankGif()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
else if(args[0].toLowerCase().startsWith("blowjob")) {
nsfwimg = await neko.getNSFWBlowJob()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
}
}

//////////////////////////






else if(message.content.startsWith(`${prefix}avatar`)) {
user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.displayName === args[0])
if(!message.mentions.users.first() || !args[0]) user = message.member
if(!user) return message.channel.send(`:x: Couldn't find a user with **${args}**.`)
message.channel.send(new RichEmbed()
.setTitle(`${user.username}'s Avatar URL`)
.setURL(user.user.avatarURL)
.setImage(user.user.avatarURL)
.setFooter(`Requsted by ${message.author.username}`, message.author.avatarURL)
).catch(err => errormsg(message, err, "avatar"))
}
else if (message.content.startsWith(`${prefix}server`)) {
const vlevel = ['None', 'Low', 'Medium', 'High', 'Ultra-High']
message.channel.send(new RichEmbed()
.setAuthor(`${message.guild.name} (${message.guild.id})`, message.guild.iconURL)
.addField('🛡 Security', vlevel[message.guild.verificationLevel], true)
.addField('🌐 Region', message.guild.region, true)
.addField("👑 Owner", `<@${message.guild.owner.id}>`, true)
.addField("👥 Members", `${message.guild.members.size} total (**${message.guild.members.filter(user => user.presence.status === "online").size + message.guild.members.filter(user => user.presence.status === "dnd").size + message.guild.members.filter(user => user.presence.status === "idle").size}** online)`, true)
.addField("🗨 Channels", `**${message.guild.channels.filter(c => c.type === 'category').size}** Categories | **${message.guild.channels.filter(c => c.type === 'text').size}** Text | **${message.guild.channels.filter(c => c.type === 'voice').size}** Voice`, true)
.addField("🔐 Roles", `**${message.guild.roles.size}** role. use **${prefix}roles** to view a list of roles`, true)
.setFooter(`Requsted by ${message.author.username}`, message.author.avatarURL)
.setColor("GREEN")
).catch(err => errormsg(message, err, "server"))
}
else if(message.content.startsWith(`${prefix}roles`)) {
const roles = message.guild.roles.sort(function(b,a) {return a.position - b.position}).map(m => m.name).join(" ");
message.channel.send(new RichEmbed()
.setColor('GREEN')
.setDescription(roles)
.setAuthor(`${message.guild.name}'s Roles`,message.guild.iconURL)
).catch(err => errormsg(message, err, "roles"))

} else if(message.content.startsWith(`${prefix}reboot`)) {
if(devs.includes(message.author.id)) {
message.channel.send(`**Rebooting....**`).then(client.destroy())
.catch(err => errormsg(message, err, "reboot"))
}

}else if(message.content.startsWith(`${prefix}ping`)) {
    message.channel.send("**Pinging...**").then((message)=> {
    message.edit(`**Time Taken :ping_pong: ** \`${Date.now() - message.createdTimestamp} ms\`` + `\n **Discord API <:disc:475249489607917580> ** \`${client.ping} ms\``);
  }).catch(err => errormsg(message, err, "ping"))
}

else if(message.content.startsWith(`${prefix}mute`)){
    user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.displayName === args[0])
    let reason = args[2]
    if(!reason) reason = "Unspecified"
    if(!user) return message.reply(":x: Couldn't find user.");
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":x: You Don't Have Permission");
    if(user.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "Muted")
    if(user.roles.has(muterole.id)) return message.channel.send(`:x: **${user.user.username}** is already muted.`)
    if(!muterole) message.guild.createRole({
        name: "Muted", 
        color: 'BLACK', 
        permissions: [""],
        mentionable: false
    })
    let mutetime = args[1];
    if(!mutetime){
        user.addRole(muterole.id)
        message.channel.send(`:zipper_mouth: **${user.user.username}** has been muted. because '**${reason}**'.`)
        user.send(`You've been muted in **${message.guild.name}** for: **${reason}**`)
    } 
    else
    (user.addRole(muterole.id));
    message.channel.send(`:zipper_mouth: **${user.user.username}** has been muted for **${ms(ms(mutetime))}**. because '**${reason}**'`);
    user.send(`You've been muted in **${message.guild.name}** for: **${reason}**`, {embed:{
        fields: [
            {
                name: "Duration",
                value: `**${ms(ms(mutetime))}**`,
                inline: true
            },{
                name: "Muter",
                value: `**${message.author.username}**`,
                inline: true
            }
        ]
    }})
    setTimeout(function(){
      user.removeRole(muterole.id);
      message.channel.send(`<:waifuThumbs:475427359898599441> **${user.user.username}** is no longer muted.`);
      user.send(`<:waifuThumbs:475427359898599441> You are no longer muted in **${message.guild.name}**.`)
    }, ms(mutetime));
  }
////////////////////////////////////////////////////////////////////////
fs.writeFile("./commands.json", JSON.stringify(commands), (err) => {
    if (err) console.error(err)
  });
});



// //Server icon
// client.on("message", message => {
//     const prefix = "."
              
//           if(!message.channel.guild) return;
//    if(message.author.bot) return;
//       if(message.content === prefix + "icon"){ 
//           const embed = new Discord.RichEmbed()
  
//       .setTitle(`This is  ** ${message.guild.name} **  icon !`)
//   .setAuthor(message.author.username, message.guild.iconrURL)
//     .setColor(0x164fe3)
//     .setImage(message.guild.iconURL)
//     .setURL(message.guild.iconrURL)
//                     .setTimestamp()

//    message.channel.send({embed});
//       }
//   });
// ///end

// ///avatar
// client.on('message', message => {
//     if (message.content.startsWith(".avatar")) {
//         const user = message.mentions.users.first() || message.author
//         const embed = new Discord.RichEmbed()
//         .setColor("RANDOM")
//         .setImage(`${user.avatarURL}`)
//         .setTitle("Avatar URL")
//         .setURL(user.avatarURL)
//       message.channel.send(embed);
//     }
// });
// ///end

// ///MEMBER
// client.on('message', message => {
//     if(message.content == '.members') {
//     const embed = new Discord.RichEmbed()
//     .setColor('RANDOM')
//     .setImage(message.guild.iconURL)
//     .addField(`Status of Members🔋`,'-',   true)
// .addField(`💚 Online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}`,'-',   true)
// .addField(`❤ Do Not Disturb:     ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`,'-',   true)
// .addField(`💛 Idle:      ${message.guild.members.filter(m=>m.presence.status == 'idle').size}`,'-',   true)   
// .addField(`🖤 Offline:   ${message.guild.members.filter(m=>m.presence.status == 'offline').size}`,'-',  true) 
// .addField(`💙  All:  ${message.guild.memberCount}`,'-',   true)         
//          message.channel.send({embed});

//     }
//   });
// ///end

