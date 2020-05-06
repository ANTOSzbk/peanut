import { Argument, Command, Flag } from 'discord-akairo';
import { Message, Permissions, Role } from 'discord.js';
import { SETTINGS } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/messages';
import CreateRoleCommand from '../createRole';
import { getGuildRoles } from '../../../helpers/guildData';

export default class SetConfigMuteRoleCommand extends Command {
  public constructor() {
    super('config-set-mute', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.SET.MUTE.DESCRIPTION,
        usage: '<role>',
        examples: ['@Muted', 'Muted'],
      },
      category: 'config',
      channel: 'guild',
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'role',
          match: 'content',
          type: Argument.union('number', 'role'),
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.SET.MUTE.PROMPT.START(message),
          },
        },
      ],
    });
  }

  public async exec(message: Message, { role }: { role: Role | number }) {
    if (role instanceof Role) {
      this.client.settings.set(message.guild!, SETTINGS.MUTE_ROLE, role.id);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MUTE.REPLY(role.name)
      );
    }
    if (role === 0) {
      const createRole = new CreateRoleCommand();
      const newRole = await createRole.exec(message, {
        role: 'Muted',
        permission: undefined,
      });
      if (newRole instanceof Message || !newRole)
        return Flag.fail('Incorrect role name.');
      this.client.settings.set(message.guild!, SETTINGS.MUTE_ROLE, newRole.id);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MUTE.REPLY(newRole.name)
      );
    } else {
      const roles = getGuildRoles(message.guild!);
      this.client.settings.set(
        message.guild!,
        SETTINGS.MUTE_ROLE,
        roles[role - 1].id
      );
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MUTE.REPLY(roles[role - 1].name)
      );
    }
  }
}
