const { Client, RichEmbed } = require('discord.js');
const fs = require("fs");
const { premium1 } = require("./data/premium") 
const ms = require('ms');
const nekoclient = require('nekos.life')
const neko = new nekoclient()
const client = new Client({
    disableEveryone: true,
    messageCacheMaxSize: 500,
    messageCacheLifetime: 120,
    messageSweepInterval: 60
  });
const games = JSON.parse(fs.readFileSync('./data/games.json', "utf8"))
const commands = JSON.parse(fs.readFileSync("./data/commands.json", "utf8"));
const correct = "<:megCorrect:476545535348834324>"
const wrong = "<:megWrong:476545382617186337>"
const devs = ['171259176029257728'];
const errmsg = "<:eRrOr:475075170231517184> **Oops, something unexpected happened!** The error was sent to our team and we'll do our best to fix it."
const prefix = '.'
client.login(process.env.SECERT_TOKEN);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// Functions //////////////////
function errormsg(message, err, cmd) {
    message.channel.send(errmsg) 
    client.channels.get("477961290921410576").send(`**:warning: Error**`, {embed: {
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
client.user.setActivity(client.user.username)
client.channels.get('474592549064015882').send(`**[:large_blue_circle: READY]**\nUsers: **${client.users.size}** | Guilds: **${client.guilds.size}**`)
helpcmd(commands, "Hug", "all", "Action", "Hugs the specified user.", `hug <@user / @user1 @user2 ...>`)
helpcmd(commands, "Kiss", "all", "Action", "Kisses the specified user.", `kiss <@user / @user1 @user2 ...>`)
helpcmd(commands, "Slap", "all", "Action", "Slaps the specified user.", `slap <@user / @user1 @user2 ...>`)
helpcmd(commands, "Pat", "all", "Action", "Pats the specified user.", `pat <@user / @user1 @user2 ...>`)
helpcmd(commands, "Cuddle", "all", "Action", "Cuddles the specified user.", `cuddle <@user / @user1 @user2 ...>`)
helpcmd(commands, "Poke", "all", "Action", "Pokes the specified user.", `poke <@user / @user1 @user2 ...>`)
helpcmd(commands, "Tickle", "all", "Action", "Tickles the specified user.", `tickle <@user / @user1 @user2 ...>`)
helpcmd(commands, "Avatar", "all", "Info", "Shows specified user avatar or your avatar.", `avatar <@user / @user1 @user2 ...>`)
helpcmd(commands, "Server", "all", "Info", "Shows server info.", `server`)
helpcmd(commands, "Ban", "all", "Action", "Bans the specified user", `ban <@user> <reason>`)
helpcmd(commands, "Kick", "all", "Action", "Kicks the specified user", `kick <@user> <reason>`)
helpcmd(commands, "Clear", "all", "Action", "Clears the specified number of messages", `clear <amount>`)
helpcmd(commands, "Roles", "all", "Info", "Shows list of the roles in current server.", `roles`)
helpcmd(commands, "Ping", "all", "Info", "Shows the bot pings.", `ping`)
helpcmd(commands, "Quiz", "all", "Games", "Shows the bot pings.", `quiz <anime>`)
//? helpcmd(commands, "NSFW", "all", "Image", "Retrieves images from the neko.life image board.", `nsfw [yuri | boobs | pussy | neko | bj | kuni | cumslut | lesbian | small-boobs | anal | pussy | wank]`)
helpcmd(commands, "NSFW", "all", "Image", "N/A", `N/A`)
})
client.on("error", (error) => client.channels.get("474245438837620736").send(error, {code: "js"}))
.on('reconnecting', () => console.log(`reconnecting`)).on('disconnect', () => console.log('disconnecting'))
process.on("unhandledRejection", (err) => client.channels.get("474245438837620736").send(`\`\`\`js\n${err}\`\`\` `))
client.on('guildMemberAdd', member => {
    if(member.user.bot) return;
    member.guild.channels.get("496250530323234827").send(`O New Pal ${member} jumped in メ NightCorePals メ ! Welcome <:Wave:348835926291644427> have a fun time here ^^`, {files: ["https://i.imgur.com/kfQDwer.jpg"]})
    member.guild.channels.get("496221356149571585").send(`Hey ${member} welcome to **NightCorePals**! Please make sure to read <#496222081814495232> And have fun <:Wave:348835926291644427>`)
})

client.on('message', async function(message) {
if(message.channel.type !== "text") return; 
if(!message.content.startsWith(prefix)) return; 
if(message.author.bot) return;
let args = message.content.split(" ").slice(1);
let user = message.mentions.users.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.displayName === args[0]) || message.author
////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// C O M M A N D S //////////////////
if (message.content.startsWith(prefix + 'help')) {
if (message.content === `${prefix}help`) {
    const embed = new RichEmbed()
        .setColor(0x1D82B6)
    let commandsFound = 0;
    for (var cmd in commands) {
        if (commands[cmd].role.toUpperCase() === 'ALL') {
            commandsFound++
            embed.addField(`${commands[cmd].name}`, `**Description:** ${commands[cmd].desc}\n**Usage:** \`\`${prefix + commands[cmd].usage}\`\``);
        }
    }
    embed.setFooter(`Currently showing all commands. To view a specific group do ${prefix}help [group / command]`)
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
        description:`**${groups} Commands**`,
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
return message.channel.send(`:x: Something went wrong. It seems like an api error!`)
//? Deleted NSFW Commands!
// let nsfwimg;
// const randomRespondsSetUp = [":heart_eyes: Wow!", "**Here you go :point_right: :ok_hand:", "DON'T GET **HORNY**!!!"]
// const randomResponds = randomRespondsSetUp[Math.floor(Math.random * randomRespondsSetUp.length)]
// if(!message.channel.nsfw) return message.channel.send(`:x: The channel must be **NSFW**.\nMore info: **<https://goo.gl/4AViTc>**`)
// if(!args[0]) {
// nsfwimg = await neko.getNSFWRandomHentaiGif()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// return;
// } else if(args[0].toLowerCase().startsWith("pussy")) {
// nsfwimg = await neko.getNSFWPussy()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("neko")) {
// nsfwimg = await neko.getNSFWNekoGif()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("lesbian")) {
// nsfwimg = await neko.getNSFWLesbian()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("kuni")) {
// nsfwimg = await neko.getNSFWKuni()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("cumslut")) {
// nsfwimg = await neko.getNSFWCumsluts()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("boobs")) {
// nsfwimg = await neko.getNSFWBoobs()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("bj")) {
// nsfwimg = await neko.getNSFWBJ()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("anal")) {
// nsfwimg = await neko.getNSFWAnal()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("yuri")) {
// nsfwimg = await neko.getNSFWEroYuri()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("small-boobs")) {
// nsfwimg = await neko.getNSFWSmallBoobs()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("wank")) {
// nsfwimg = await neko.getNSFWPussyWankGif()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
// else if(args[0].toLowerCase().startsWith("blowjob")) {
// nsfwimg = await neko.getNSFWBlowJob()
// message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
// }
}

//////////////////////////


// Game Commands //

if(message.content.startsWith(`${prefix}quiz`)) {
if(!args[0]) return message.channel.send(new RichEmbed()
.setThumbnail("https://images-ext-2.discordapp.net/external/ixx9VwaXIvBi71wGahYe_NzG51gFQonnXVBl2eEbQmk/https/cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png")
.setDescription(`**Pick one of these games!**\n**Anime** →	\`\`${prefix}quiz anime\`\` | A quiz about an anime character`)
.setColor("BLUE")
) 
else  
   if(args[0].startsWith("anime")) {
    let i = 0;
    const animec = games.animec[Math.floor(Math.random() * games.animec.length)];
    message .channel.send(new RichEmbed() 
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`**Who is this character?**`)
    .addField('Possibilities', (animec.trick).map(a => `${++i} ${a}`).join("\n"))
    .setThumbnail(animec.url)
    .setFooter(`Timeouts in 10 seconds!`, "https://previews.123rf.com/images/siamimages/siamimages1602/siamimages160200865/51555582-time-clock-icon-illustration-sign-design.jpg")
    )
        try {
            var response = await message.channel.awaitMessages(msg2 => msg2.author.id === message.author.id, {
                maxMatches: 1,
                time: 10000,
                errors: ['time'],
            });
            } catch (error) {
            return message.channel.send(`**:x: Timeout**`) 
            }
    if(animec.answer.some(a => response.first().content === a)) return message.channel.send(`${correct} **${message.author.username}** correct answer!`)
    else return message.channel.send(`${wrong} **${message.author.username}** better luck next time!\n:arrow_right: Correct answer: **${(animec.answer).join(", ")}**`);
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

} else if(message.content.startsWith(`${prefix}shutdown`)) {
if(devs.includes(message.author.id)) {
message.channel.send(`**Shutting down....**`).then(client.destroy())
.catch(err => errormsg(message, err, "shutdown"))
}

}else if(message.content.startsWith(`${prefix}ping`)) {
    message.channel.send("**Pinging...**").then((message)=> {
    message.edit(`:ping_pong: Pong! ${Date.now() - message.createdTimestamp}ms`);
  }).catch(err => errormsg(message, err, "ping"))
}

else if(message.content.startsWith(`${prefix}mute`)){
    if(args[0] == "help"){
        message.channel.send(`Usage: ${prefix}mute <user> <mutetime> <reason>`);
        return;
      }
    user = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.displayName === args[0])
    let reason = args[2]
    if(!reason) reason = "Unspecified"
    if(!user) return message.reply("<:megWrong:476545382617186337> Couldn't find user.");
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:megWrong:476545382617186337> You Don't Have Permission");
    if(user.hasPermission("MANAGE_MESSAGES")) return message.reply("<:megWrong:476545382617186337> Can't mute them!");
    let muterole = message.guild.roles.find(`name`, "Muted")
    if(user.roles.has(muterole.id)) return message.channel.send(`<:megWrong:476545382617186337> **${user.user.username}** is already muted.`)
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
  else
  if (message.content.startsWith(`${prefix}clear`)) {
    if(args[0] == "help"){
        message.channel.send(`Usage: ${prefix}clear <amount>`);
        return;
      }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:megWrong:476545382617186337> You don't have permissions to clear messages.");
  if(!args[0]) return message.channel.send("<:megWrong:476545382617186337> Please specify the number of messages to clear!");
  message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`<:megThumbs:475427359898599441> Cleared **${args[0]}** messages.`).then(msg => msg.delete(2000));
  })
}
else
if (message.content.startsWith(`${prefix}ban`)) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("<:megWrong:476545382617186337> you don't have premission to that!")
    if(args[0] == "help"){
      message.channel.send(`Usage: ${prefix}ban <user> <reason>`);
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.reply("<:megWrong:476545382617186337> Couldn't find user.");
    if(bUser.hasPermission('BAN_MEMBERS')) return message.channel.send("<:megWrong:476545382617186337> you can't ban a moderator");
    let bReason = args.join(" ").slice(22);
    if(!bReason) bReason = "Unspecified"

    let banEmbed = new RichEmbed()
    .setDescription("~Ban~")
    .setColor("RED")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let logs = message.guild.channels.find(`name`, "logs");
    if(!logs) return message.channel.send("<:megWrong:476545382617186337> Can't find logs channel.");

    message.guild.member(bUser).ban(bReason);
    message.channel.send(`**<:Bhammer:477954190384168975> ${bUser} got banned by <@${message.author.id}> **`)
    logs.send(banEmbed);
}
else 
if(message.content.startsWith(`${prefix}kick`)) {
    if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("<:megWrong:476545382617186337> you don't have premission to that!");
    if(args[0] == "help"){
        message.channel.send(`Usage ${prefix}kick <user> <reason>`);
        return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.reply("<:megWrong:476545382617186337> Couldn't find user.");
    if(kUser.hasPermission('KICK_MEMBERS')) return message.reply("<:megWrong:476545382617186337> you can't kick moderator ")
    let kReason = args.join(" ").slice(22);
    if(!kReason) kReason = "Unspecified"
    let kickEmbed = new RichEmbed()
    .setTitle("~Kick~")
    .setColor("RED")
    .addField("Kicked User", `${kUser} With ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let logs = message.guild.channels.find(`name`, "logs");
    if(!logs) return message.channel.send("<:megWrong:476545382617186337> Can't find logs channel.");

    message.guild.member(kUser).kick(kReason);
    message.channel.send(`**:airplane:  ${kUser} got kicked by <@${message.author.id}>**
    **__Reason__** : **${kReason}**`)
    logs.send(kickEmbed);

}
    ///////////////////////////////PREMIUM////////////////////////////////////
if(client.user.id === premium1.id && message.author.id === premium1.owner) {
if(message.content.startsWith(`${prefix}premium`)) {
if(!args[0]) return message.channel.send(`:star: Megium Premium :star:\n\n**❯ Premium Username** \`\`${prefix}premium username <new username>\`\`\n**❯ Premium Avatar** \`\`${prefix}premium avatar <new avatar image>\`\`\n**❯ Premium Status** \`\`${prefix}premium status <new status>\`\`\n\nPremium Owner: **${client.users.get(premium1.owner).tag}** | Premium Key: **${premium1.key}** | Premium Period: **Lifetime**`)
if(args[0].startsWith("username")) {
if(args[1].length < 2 || args[1].length > 32) return message.channel.send(`:x: Username must be between 3 and 32 in length.`)
client.user.setUsername(args[1]).then(message.channel.send(`:ballot_box_with_check: Successfully changed the bot username to **${args[1]}**`)).catch(err => message.channel.send(`\`\`${err}\`\``))
}
if(args[0].startsWith("avatar")) {
if(!args[1].match(/\.(jpeg|jpg|gif|png)$/)) return message.channel.send(`:x: The url you entered doesn't seems to be an image.`) 
client.user.setAvatar(args[1]).then(message.channel.send(`:ballot_box_with_check: Successfully changed the bot avatar to`, {embed: {image: {url: args[1]}}})).catch(err => message.channel.send(`\`\`${err}\`\``))
}
if(args[0].startsWith("status")) {
if(!args[1]) return message.channel.send(`:x: Use ${prefix}premium status <status here> [--playing | --listening | --watching | --streaming]`)
let status;
if(args[2] === '--playing') status = {type: "PLAYING"} 
else if(args[2] === '--listening') status = {type: "LISTENING"}
else if(args[2] === '--watching') status = {type: "WATCHING"}
else if(args[2] === '--streaming' && !args[3]) return message.channel.send(`:x: Missing twitch link.\n**\`\`${prefix}premium status --streaming https://twitch.tv/example\`\`**`)
else if(args[2] === '--streaming' && !args[3].includes(`twitch.tv/`)) return message.channel.send(`:x: Must be a twitch stream link.`)
else if(args[2] === '--streaming' && args[3].includes(`twitch.tv/`)) status = {type: "STREAMING", url: args[3]}
else status = {type: "PLAYING"} 
client.user.setActivity(args[1], status).then(message.channel.send(`:ballot_box_with_check: Successfully changed the bot status to **${args[1]}** *--${status.type}*`)).catch(err => message.channel.send(`\`\`${err}\`\``))}}}
////////////////////////////////////////////////////////////////////////////////////
fs.writeFile("./commands.json", JSON.stringify(commands), (err) => {
    if (err) console.error(err)
  });
});



///Logs ,_,
client.on('messageDelete', message => {

	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
	if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;

	var logChannel = message.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	let messageDelete = new RichEmbed()
	.setTitle('**[MESSAGE DELETE]**')
	.setColor('RED')
	.setThumbnail(message.author.avatarURL)
	.setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
	.setTimestamp()
	.setFooter(message.guild.name, message.guild.iconURL)

	logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {

	if(oldMessage.author.bot) return;
	if(!oldMessage.channel.type === 'dm') return;
	if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;

	var logChannel = oldMessage.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	if(oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new RichEmbed()
	.setTitle('**[MESSAGE EDIT]**')
	.setThumbnail(oldMessage.author.avatarURL)
	.setColor('BLUE')
	.setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
	.setTimestamp()
	.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)

	logChannel.send(messageUpdate);
});


client.on('roleCreate', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = role.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleCreate = new RichEmbed()
		.setTitle('**[ROLE CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleCreate);
	})
});
client.on('roleDelete', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = role.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new RichEmbed()
		.setTitle('**[ROLE DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleDelete);
	})
});
client.on('roleUpdate', (oldRole, newRole) => {

	if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = oldRole.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldRole.name !== newRole.name) {
			let roleUpdateName = new RichEmbed()
			.setTitle('**[ROLE NAME UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateName);
		}
		if(oldRole.hexColor !== newRole.hexColor) {
			if(oldRole.hexColor === '#000000') {
				var oldColor = '`Default`';
			}else {
				var oldColor = oldRole.hexColor;
			}
			if(newRole.hexColor === '#000000') {
				var newColor = '`Default`';
			}else {
				var newColor = newRole.hexColor;
			}
			let roleUpdateColor = new RichEmbed()
			.setTitle('**[ROLE COLOR UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateColor);
		}
	})
});


client.on('channelCreate', channel => {

	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = channel.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new RichEmbed()
		.setTitle('**[CHANNEL CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelCreate);
	})
});
client.on('channelDelete', channel => {
	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = channel.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	if(channel.type === 'text') {
		var roomType = 'Text';
	}else
	if(channel.type === 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type === 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new RichEmbed()
		.setTitle('**[CHANNEL DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelDelete);
	})
});
client.on('channelUpdate', (oldChannel, newChannel) => {
	if(!oldChannel.guild) return;

	var logChannel = oldChannel.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	if(oldChannel.type === 'text') {
		var channelType = 'Text';
	}else
	if(oldChannel.type === 'voice') {
		var channelType = 'Voice';
	}else
	if(oldChannel.type === 'category') {
		var channelType = 'Category';
	}

	oldChannel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldChannel.name !== newChannel.name) {
			let newName = new RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newName);
		}
		if(oldChannel.topic !== newChannel.topic) {
			let newTopic = new RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newTopic);
		}
	})
});


client.on('guildBanAdd', (guild, user) => {

	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let banInfo = new RichEmbed()
		.setTitle('**[BANNED]**')
		.setThumbnail(userAvatar)
		.setColor('DARK_RED')
		.setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(banInfo);
	})
});
client.on('guildBanRemove', (guild, user) => {
	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let unBanInfo = new RichEmbed()
		.setTitle('**[UNBANNED]**')
		.setThumbnail(userAvatar)
		.setColor('GREEN')
		.setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(unBanInfo);
	})
});
client.on('guildUpdate', (oldGuild, newGuild) => {

	if(!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = oldGuild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	oldGuild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldGuild.name !== newGuild.name) {
			let guildName = new RichEmbed()
			.setTitle('**[CHANGE GUILD NAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(newGuild.name, oldGuild.iconURL)

			logChannel.send(guildName)
		}
		if(oldGuild.region !== newGuild.region) {
			let guildRegion = new RichEmbed()
			.setTitle('**[CHANGE GUILD REGION]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** ${oldGuild.region}\n**New Region:** ${newGuild.region}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(guildRegion);
		}
		if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
			if(oldGuild.verificationLevel === 0) {
				var oldVerLvl = 'Very Easy';
			}else
			if(oldGuild.verificationLevel === 1) {
				var oldVerLvl = 'Easy';
			}else
			if(oldGuild.verificationLevel === 2) {
				var oldVerLvl = 'Medium';
			}else
			if(oldGuild.verificationLevel === 3) {
				var oldVerLvl = 'Hard';
			}else
			if(oldGuild.verificationLevel === 4) {
				var oldVerLvl = 'Very Hard';
			}

			if(newGuild.verificationLevel === 0) {
				var newVerLvl = 'Very Easy';
			}else
			if(newGuild.verificationLevel === 1) {
				var newVerLvl = 'Easy';
			}else
			if(newGuild.verificationLevel === 2) {
				var newVerLvl = 'Medium';
			}else
			if(newGuild.verificationLevel === 3) {
				var newVerLvl = 'Hard';
			}else
			if(newGuild.verificationLevel === 4) {
				var newVerLvl = 'Very Hard';
			}

			let verLog = new RichEmbed()
			.setTitle('**[GUILD VERIFICATION LEVEL CHANGE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** ${oldVerLvl}\n**New Verification Level:** ${newVerLvl}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldGuild.name, oldGuild.iconURL)

			logChannel.send(verLog);
		}
	})
});
client.on('guildMemberUpdate', (oldMember, newMember) => {
	if(!oldMember.guild) return;

	var logChannel = oldMember.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if(oldMember.nickname !== newMember.nickname) {
			if(oldMember.nickname === null) {
				var oldNM = '`Before`';
			}else {
				var oldNM = oldMember.nickname;
			}
			if(newMember.nickname === null) {
				var newNM = '`Before`';
			}else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new RichEmbed()
			.setTitle('**[UPDATE MEMBER NICKNAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

			logChannel.send(updateNickname);
		}
		if(oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();

			let roleAdded = new RichEmbed()
			.setTitle('**[ADDED ROLE TO MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('GREEN')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleAdded);
		}
		if(oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();

			let roleRemoved = new RichEmbed()
			.setTitle('**[REMOVED ROLE FROM MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('RED')
			.setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleRemoved);
		}
	})
	if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
		let newOwner = new RichEmbed()
		.setTitle('**[UPDATE GUILD OWNER]**')
		.setThumbnail(oldMember.guild.iconURL)
		.setColor('GREEN')
		.setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
		.setTimestamp()
		.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

		logChannel.send(newOwner);
	}
});


client.on('voiceStateUpdate', (voiceOld, voiceNew) => {

	if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;

	var logChannel = voiceOld.guild.channels.find(c => c.name === 'log');
	if(!logChannel) return;

	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
			let serverMutev = new RichEmbed()
			.setTitle('**[VOICE MUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverMutev);
		}
		if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
			let serverUnmutev = new RichEmbed()
			.setTitle('**[VOICE UNMUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUnmutev);
		}
		if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
			let serverDeafv = new RichEmbed()
			.setTitle('**[VOICE DEAF]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverDeafv);
		}
		if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
			let serverUndeafv = new RichEmbed()
			.setTitle('**[VOICE UNDEAF]**')
			.setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUndeafv);
		}
	})
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceOld.voiceChannel) {
		let voiceJoin = new RichEmbed()
		.setTitle('**[JOIN VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:arrow_lower_right: Successfully \`\`JOIN\`\` To Voice Channel.\n\n**Channel:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceJoin);
	}
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && !voiceNew.voiceChannel) {
		let voiceLeave = new RichEmbed()
		.setTitle('**[LEAVE VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:arrow_upper_left: Successfully \`\`LEAVE\`\` From Voice Channel.\n\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
		let voiceLeave = new RichEmbed()
		.setTitle('**[CHANGED VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
});


client.on('message' , message => {
  var prefix = ".";
  if(message.author.bot) return;

  if(message.content.startsWith(prefix + "xo")) {
 let array_of_mentions = message.mentions.users.array();
  let symbols = [':o:', ':heavy_multiplication_x:'] 
  var grid_message;

  if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
    let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    let random2 = Math.abs(random1 - 1); 
    if (array_of_mentions.length == 1) {
      random1 = 0;
      random2 = 0;
    }
    let player1_id = array_of_mentions[random1].id;
    let player2_id = array_of_mentions[random2].id;
    var turn_id = player1_id;
    var symbol = symbols[0];
    let initial_message = `Game match between <@${player1_id}> and <@${player2_id}>!`;
    if (player1_id == player2_id) {
      initial_message += '\n_( playing this game with yourself :joy:)_'
    }
    message.channel.send(`Xo ${initial_message}`)
    .then(console.log("Successful tictactoe introduction"))
    .catch(console.error);
    message.channel.send(':one::two::three:' + '\n' +
                         ':four::five::six:' + '\n' +
                         ':seven::eight::nine:')
    .then((new_message) => {
      grid_message = new_message;
    })
    .then(console.log("Successful tictactoe game initialization"))
    .catch(console.error);
    message.channel.send('Loading... Please wait for the :ok: reaction.')
    .then(async (new_message) => {
      await new_message.react('1⃣');
      await new_message.react('2⃣');
      await new_message.react('3⃣');
      await new_message.react('4⃣');
      await new_message.react('5⃣');
      await new_message.react('6⃣');
      await new_message.react('7⃣');
      await new_message.react('8⃣');
      await new_message.react('9⃣');
      await new_message.react('🆗');
      await new_message.edit(`It\'s <@${turn_id}>\'s turn! Your symbol is ${symbol}`)
      .then((new_new_message) => {
        require('./xo.js')(client, message, new_new_message, player1_id, player2_id, turn_id, symbol, symbols, grid_message);
      })
      .then(console.log("Successful tictactoe listener initialization"))
      .catch(console.error);
    })
    .then(console.log("Successful tictactoe react initialization"))
    .catch(console.error);
  }
  else {
    message.reply(` :anger: \`Use : ${prefix}xo @player1 @player2\``)
    .then(console.log("Successful error reply"))
    .catch(console.error);
  }
}
 });


client.on('message',message =>{
 if(message.content.split(' ')[0].toLowerCase() == prefix + 'invites') {
let guild = message.guild
var codes = [""]
 var nul = 0
      
guild.fetchInvites()
.then(invites => {
invites.forEach(invite => {
if (invite.inviter === message.author) {
    nul+=invite.uses
codes.push(`discord.gg/${invite.code}`)
}
 
})
  if (nul > 0) {
      const e = new Discord.RichEmbed()
      .addField(`${message.author.username}`, `You have invited **${nul}** Member`)
      .setColor('#36393e')
      message.channel.send(e)
  }else {
                       var embed = new Discord.RichEmbed()
                        .setColor("#000000")
                        .addField(`${message.author.username}`, `You have not invite anyone to this server`)

                       message.channel.send({ embed: embed });
                        return;
                    }
}).then(m => {
if (codes.length < 0) {
    var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invites in ${message.guild.name}`, `You currently don't have any active invites! Please create an invite and start inviting, then you will be able to see your codes here!`)
message.channel.send({ embed: embed });
return;
} else {
    var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invites in ${message.guild.name}`, `Invites :\n${codes.join("\n")}`)
.setColor('#36393e')
message.channel.send({ embed: embed });
return;
}
})
}

});





client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
/*جميع الحقوق محفوظهه لريبل ولسيرفر كودز
رآح يرسل للأونر تحذير + م يتطلب ملفات سويته لكم داتا مؤقت
سو روم بأسم log
أو غيره من الكود عشان يرسل هنا التحذير
nvm i 10
nvm use 10
npm i discord.js
*/
var guilds = {};
client.on('guildBanAdd', function(guild) {
            const rebellog = client.channels.find("name", "log"),
            Onumber = 3,
  Otime = 10000
guild.fetchAuditLogs({
    type: 22
}).then(audit => {
    let banner = audit.entries.map(banner => banner.executor.id)
    let bans = guilds[guild.id + banner].bans || 0
    guilds[guild.id + banner] = {
        bans: 0
    }
      bans[guilds.id].bans += 1;
if(guilds[guild.id + banner].bans >= Onumber) {
try {
let roles = guild.members.get(banner).roles.array();
guild.members.get(banner).removeRoles(roles);
  guild.guild.member(banner).kick();

} catch (error) {
console.log(error)
try {
guild.members.get(banner).ban();
  rebellog.send(`<@!${banner.id}>
tried to fuck with the server @everyone`);
guild.owner.send(`<@!${banner.id}>
tried to fuck with the server ${guild.name}`)
    setTimeout(() => {
 guilds[guild.id].bans = 0;
  },Otime)
} catch (error) {
console.log(error)
}
}
}
})
});
 let channelc = {};
  client.on('channelCreate', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelcreate = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was Created By ${channelcreate.tag}`);
   if(!channelc[channelcreate.id]) {
    channelc[channelcreate.id] = {
    created : 0
     }
 }
 channelc[channelcreate.id].created += 1;
 if(channelc[channelcreate.id].created >= Onumber ) {
    Oguild.members.get(channelcreate.id).kick();
rebellog.send(`<@!${channelcreate.id}>
tried to fuck with the server @everyone`);
channel.guild.owner.send(`<@!${channelcreate.id}>
tried to fuck with the server ${channel.guild.name}`)
}
  setTimeout(() => {
 channelc[channelcreate.id].created = 0;
  },Otime)
  });

let channelr = {};
  client.on('channelDelete', async (channel) => {
  const rebellog = client.channels.find("name", "log"),
  Oguild = channel.guild,
  Onumber = 3,
  Otime = 10000;
  const audit = await channel.guild.fetchAuditLogs({limit: 1});
  const channelremover = audit.entries.first().executor;
  console.log(` A ${channel.type} Channel called ${channel.name} was deleted By ${channelremover.tag}`);
   if(!channelr[channelremover.id]) {
    channelr[channelremover.id] = {
    deleted : 0
     }
 }
 channelr[channelremover.id].deleted += 1;
 if(channelr[channelremover.id].deleted >= Onumber ) {
  Oguild.guild.member(channelremover).kick();
rebellog.send(`<@!${channelremover.id}>
tried to fuck with the server @everyone`);
channel.guild.owner.send(`<@!${channelremover.id}>
tried to fuck with the server ${channel.guild.name}`)
}
  setTimeout(() => {
 channelr[channelremover.id].deleted = 0;
  },Otime)
  });




client.on ("guildMemberAdd", member => {
  
   var role = member.guild.roles.find ("name", "Pals");
   member.addRole (role);
  
})

client.on ("guildMemberRemove", member => {
   
})

