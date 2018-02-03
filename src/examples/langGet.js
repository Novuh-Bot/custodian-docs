/**
 * Require the server language.
 */

const { lang } = this.client.settings.get(message.guild.id);

/**
 * Require the language file.
 */
const cmdLang = require(`../../languages/${lang}/${this.help.category}/${this.help.category}.json`);

/**
 * Require the general error file for basic errors.
 */
const generalErr = require(`../../languages/${lang}/general.json`);