const Social = require('../../base/Social.js');

class Pay extends Social {
  constructor(client) {
    super(client, {
      name: 'pay',
      description: 'Pay another user your activity points.',
      usage: 'pay',
      category: 'Social',
      cost: 0,
      aliases: ['loan', 'donate'],
      botPerms: ['SEND_MESSAGES']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    try {
      const { lang } = this.client.settings.get(message.guild.id);
      const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);
      const generalErr = require(`../../languages/${lang}/general.json`);
      
      const user = await this.verifySocialUser(args[0]);
      if (isNaN(args[1])) throw `${generalErr.NaN}`;
      if (args[1] < 0) throw `${lang.incorrectSocialAmnt}`;
      else if (args[1] < 1) throw `${lang.incorrectPayBal}`;
      if (message.author.id === user) throw `${lang.socialPayYrslf}`;

      await this.usrPay(message, message.author.id, user, parseInt(args[1]));
      // message.channel.send(points);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Pay;