const Command = require('../../base/Command.js');

class Set extends Command {
  constructor(client) {
    super(client, {
      name: 'set',
      description: 'View or change settings for your server.',
      category: 'System',
      usage: 'set <view/get/edit> <key> <value>',
      guildOnly: true,
      aliases: ['setting', 'settings'],
      permLevel: 'Administrator'
    });
  }

  /**
   * 
   * @param {Action} args What to do with the key. <view/get/add/edit>
   * @param {Key} args What key to view/get/add/edit.
   * @param {Value} args What to set the value of the key to.
   */
  async run(message, [action, key, ...value], level) {

    const settings = this.client.settings.get(message.guild.id);
    const defaults = this.client.settings.get('default');
  
    if (action === 'add') {
      if (!key) return message.reply(`${lang.settingsNoKeyAdd}`);
      if (defaults[key]) return message.reply(`${lang.settingsKeyAlrdyExist}`);
      if (value.length < 1) return message.reply(`${lang.settingsNoKeyValue}`);

      settings[key] = value.join(' ');
  
      this.client.settings.set(message.guild.id, settings);
      message.reply(`${key} successfully added with the value of ${value.join(' ')}`);
    } else

    if (action === 'edit') {
      if (!key) return message.reply(`${lang.settingsNoKeyEdit}`);
      if (value.length < 1) return message.reply(`${lang.settingsNoKeyValue}`);
    
      settings[key] = value.join(' ');

      this.client.settings.set(message.guild.id, settings);
      message.reply(`${key} successfully edited to ${value.join(' ')}`);
    } else
  
    if (action === 'del' || action === 'reset') {
      if (!key) return message.reply(`${lang.settingsNoKeyDel}`);
      if (!settings[key]) return message.reply(`${lang.settingsKeyNotExist}`);  
      
      const response = await this.client.awaitReply(message, `Are you sure you want to reset \`${key}\` to the default \`${defaults[key]}\`?`);

      if (['y', 'yes'].includes(response)) {

        delete settings[key];
        this.client.settings.set(message.guild.id, settings);
        message.reply(`${key} was successfully reset to default.`);
      } else

      if (['n','no','cancel'].includes(response)) {
        message.reply(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
      }
    } else

    if (action === 'get') {
      if (!key) return message.reply(`${lang.settingsNoKeyView}`);
      if (!settings[key]) return message.reply(`${lang.settingsKeyNotExist}`);
      message.reply(`The value of ${key} is currently ${settings[key]}`);
      
    } else {
      const array = [];
      Object.entries(settings).forEach(([key, value]) => {
        array.push(`${key}${' '.repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Current Guild Settings =
${array.join('\n')}`, {code: 'asciidoc'});
    }
  }
}

module.exports = Set;