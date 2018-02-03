const Social = require('../../base/Social.js');
const { SlotMachine, SlotSymbol } = require('slot-machine');
const { RichEmbed } = require('discord.js');

const lemon = new SlotSymbol('lemon', { display: '🍋', points: 1, weight: 50 });
const watermelon = new SlotSymbol('watermelon', { display: '🍉', points: 5, weight: 10 });
const apple = new SlotSymbol('apple', { display: '🍎', points: 5, weight: 10 });
const grape = new SlotSymbol('grape', { display: '🍇', points: 5, weight: 10 });
const orange = new SlotSymbol('orange', { display: '🍊', points: 5, weight: 10 });
const cherry = new SlotSymbol('cherry', { display: '🍒', points: 5, weight: 10 });
const wild = new SlotSymbol('wild', { display: '❔', points: 2, weight: 10, wildcard: true });
const bell = new SlotSymbol('bell', { display: '🔔', points: 15, weight: 10 });
const clover = new SlotSymbol('clover', { display: '🍀', points: 100, weight: 7 });
const heart = new SlotSymbol('heart', { display: '❤', points: 300, weight: 6 });
const money = new SlotSymbol('money', { display: '💰', points: 400, weight: 5 });
const diamond = new SlotSymbol('diamond', { display: '💎', points: 500, weight: 4 });
const jackpot = new SlotSymbol('jackpot', {display: '🔅', points: 1000, weight: 1});
const major = new SlotSymbol('major', {display: '🎆', points: 5000, weight: 0.5});
const machine = new SlotMachine(3, [cherry, lemon, watermelon, apple, grape, orange, wild, bell, clover, heart, money, diamond, jackpot, major]);

class Slots extends Social {
  constructor(client) {
    super(client, {
      name: 'slots',
      description: 'Try your luck with the slots.',
      category: 'Fun',
      usage: 'slots',
      cost: 5,
      cooldown: 5,
      aliases: [],
      botPerms:['EMBED_LINKS']
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (!(await this.cmdPay(message, message.author.id, this.help.cost, this.conf.botPerms))) return;
    try {
      const score = this.client.points.get(`${message.guild.id}-${message.author.id}`);
      const results = machine.play();
      const winnings = results.totalPoints + this.help.cost;
      const embed = new RichEmbed()
        .setAuthor('Slots')
        .setColor(0x00F000)
        .setDescription(`${results.visualize(false)}\n\n${results.winCount === 0 ? `Oh rip, ${message.member.displayName} lost!` : `Whoa... ${message.member.displayName} won!`}\n\n${results.winCount === 0 ? '' : `${message.member.displayName} won $${winnings.toLocaleString()}`}`)
        .setTimestamp();
      message.channel.send({ embed });
      if (results.winCount > 0) {
        score.points += winnings;
        this.client.points.set(`${message.guild.id}-${message.author.id}`, score);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Slots;