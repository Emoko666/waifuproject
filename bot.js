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
const devs = ['431150885549113344','244423000802328576','343383616895713290','171259176029257728'];
const errmsg = "<:eRrOr:475075170231517184> **Oops, something unexpected happened!** The error was sent to our team and we'll do our best to fix it."
const prefix = '.'
let cooldown = new Set();
let cdseconds = 5;
client.login(process.env.SECERT_TOKEN);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////// Functions //////////////////
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
if(client.user.id === premium1.id) client.user.setActivity(client.user.username)
else
client.user.setActivity(".help | Soon..")
client.channels.get("475028391473709068").send(`Megumi's bot is ready`)
helpcmd(commands, "Hug", "all", "Action", "Hugs the specified user.", `hug <@user / @user1 @user2 ...>`)
helpcmd(commands, "Kiss", "all", "Action", "Kisses the specified user.", `kiss <@user / @user1 @user2 ...>`)
helpcmd(commands, "Slap", "all", "Action", "Slaps the specified user.", `slap <@user / @user1 @user2 ...>`)
helpcmd(commands, "Pat", "all", "Action", "Pats the specified user.", `pat <@user / @user1 @user2 ...>`)
helpcmd(commands, "Cuddle", "all", "Action", "Cuddles the specified user.", `cuddle <@user / @user1 @user2 ...>`)
helpcmd(commands, "Poke", "all", "Action", "Pokes the specified user.", `poke <@user / @user1 @user2 ...>`)
helpcmd(commands, "Tickle", "all", "Action", "Tickles the specified user.", `tickle <@user / @user1 @user2 ...>`)
helpcmd(commands, "Avatar", "all", "Info", "Shows specified user avatar or your avatar.", `avatar <@user / @user1 @user2 ...>`)
helpcmd(commands, "Server", "all", "Info", "Shows server info.", `server`)
helpcmd(commands, "Roles", "all", "Info", "Shows list of the roles in current server.", `roles`)
helpcmd(commands, "Ping", "all", "Info", "Shows the bot pings.", `ping`)
helpcmd(commands, "Quiz", "all", "Games", "Shows the bot pings.", `quiz <anime>`)
helpcmd(commands, "NSFW", "all", "Image", "Retrieves images from the neko.life image board.", `nsfw [yuri | boobs | pussy | neko | bj | kuni | cumslut | lesbian | small-boobs | anal | pussy | wank]`)
})
client.on("error", (error) => client.channels.get("474245438837620736").send(error))
.on('reconnecting', () => console.log(`reconnecting`)).on('disconnect', () => console.log('disconnecting'))
process.on("unhandledRejection", (err) => client.channels.get("474245438837620736").send(`\`\`\`js\n${err}\`\`\` `))
/////////////// Other Client Events //////////////////

client  .on('message', async function(message) {
if(message.channel.type !== "text") return; 
if(!message.content.startsWith(prefix)) return; 
if(message.author.bot) return;
if(client.user.id === premium1.id && message.guild.id !== premium1.guild) return;
    cooldown.add(message.author.id);
  
if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.");
    
    
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
let nsfwimg;
const randomRespondsSetUp = [":heart_eyes: Wow!", "**Here you go :point_right: :ok_hand:", "DON'T GET **HORNY**!!!"]
const randomResponds = randomRespondsSetUp[Math.floor(Math.random * randomRespondsSetUp.length)]
if(!message.channel.nsfw) return message.channel.send(`:x: The channel must be **NSFW**.\nMore info: **<https://goo.gl/4AViTc>**`)
if(!args[0]) {
nsfwimg = await neko.getNSFWRandomHentaiGif()
message.channel.send(randomResponds, {files: [nsfwimg.url]}).catch(err => errormsg(message, err, "nsfw"))
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


// Game Commands //

if(message.content.startsWith(`${prefix}quiz`)) {
if(!args[0]) return message.channel.send(new RichEmbed()
.setThumbnail("https://images-ext-2.discordapp.net/external/ixx9VwaXIvBi71wGahYe_NzG51gFQonnXVBl2eEbQmk/https/cdn.pixabay.com/photo/2012/04/14/16/26/question-34499_960_720.png")
.setDescription("**Pick one of these games!**\n**Anime** →	*!quiz anime* | A quiz about an anime character")
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
    if(games.animec[0].answer.some(a => response.first().content === a)) return message.channel.send(`${correct} **${message.author.username}** correct answer!`)
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
///////////////////////////////PREMIUM////////////////////////////////////
if(client.user.id === premium1.id && message.author.id === premium1.id) {
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
///////////////////////////////////////////////////////////////////
setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)
}
//////////////COOLDWN CODE IF YOU HAVE A CODE PUT IT UP//////////////////////////////////////
fs.writeFile("./commands.json", JSON.stringify(commands), (err) => {
    if (err) console.error(err)
  });
});

