import { Argument, Command, Flag } from 'discord-akairo';
import { Message, Permissions, Role } from 'discord.js';
import { SETTINGS } from '../../../utils/constants';
import { MESSAGES } from '../../../utils/messages';
import CreateRoleCommand from '../createRole';

export default class SetConfigModRoleCommand extends Command {
  public constructor() {
    super('config-set-mod', {
      description: {
        content: MESSAGES.COMMANDS.CONFIG.SET.MOD.DESCRIPTION,
        usage: '<role>',
        examples: ['@Mod', 'Mods'],
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
              MESSAGES.COMMANDS.CONFIG.SET.MOD.PROMPT.START(message),
          },
        },
      ],
    });
  }

  public async exec(message: Message, { role }: { role: Role | number }) {
    if (role instanceof Role) {
      this.client.settings.set(message.guild!, SETTINGS.MOD_ROLE, role.id);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MOD.REPLY(role.name)
      );
    }
    if (role === 0) {
      const createRole = new CreateRoleCommand();
      const newRole = await createRole.exec(message, {
        role: 'Moderator',
        permission: 'MANAGE_GUILD',
      });
      if (newRole instanceof Message || !newRole)
        return Flag.fail('Incorrect role name.');
      this.client.settings.set(message.guild!, SETTINGS.MOD_ROLE, newRole.id);
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MOD.REPLY(newRole.name)
      );
    } else {
      const roles = Array.from(message.guild!.roles.cache.values()).filter(
        (role) => !role.managed && message.guild!.roles.everyone !== role
      );
      this.client.settings.set(
        message.guild!,
        SETTINGS.MOD_ROLE,
        roles[role - 1].id
      );
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.SET.MOD.REPLY(roles[role - 1].name)
      );
    }
  }
}
