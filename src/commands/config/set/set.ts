import { Command, Flag, PrefixSupplier } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../../utils/messages';

export default class SetConfigCommand extends Command {
  public constructor() {
    super('config-set', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.SET.DESCRIPTION,
        usage: '<key> <...arguments>',
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
    });
  }

  public *args(): object {
    const key = yield {
      type: [
        ['config-set-guildlog', 'guildlog', 'guild-log', 'log', 'logs'],
        ['config-set-memberlog', 'memberlog', 'member-log', 'member'],
        ['config-set-mod', 'modRole', 'mod', 'mod-role'],
        [
          'config-set-modlog',
          'modLogChannel',
          'modLog',
          'modlog',
          'modChan',
          'modchan',
          'mod-channel',
        ],
        ['config-set-mute', 'muteRole', 'mute', 'mute-role'],
        ['config-set-entry', 'entryRole', 'entry', 'entry-role'],
      ],
      otherwise: (msg: Message) => {
        const prefix = (this.handler.prefix as PrefixSupplier)(msg);
        return MESSAGES.COMMANDS.CONFIG.SET.REPLY(prefix);
      },
    };
    //console.log(key);
    return Flag.continue(key);
  }
}
