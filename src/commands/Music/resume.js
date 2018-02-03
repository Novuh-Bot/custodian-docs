const Command = require('../../base/Command.js');

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      description: 'Resumes the playback.',
      category: 'Music',
      guildOnly: 'true',
      usage: 'resume',
      permLevel: 'User'
    });
  }

  async run(message, args, level) {
    const { lang } = this.client.settings.get(message.guild.id);
    const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);
    const generalErr = require(`../../languages/${lang}/general.json`);
    
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guide.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
      message.reply(`${lang.musicNoChnl}`);
    }

    if (!this.client.playlists.get(message.guild.id).dispatcher.paused) return message.reply(`${lang.musicNoPause}`);
    message.channel.send(`${lang.musicPlybckResume}`);
    this.client.playlists.get(message.guild.id).dispatcher.resume();
  } 
}

module.exports = Resume;