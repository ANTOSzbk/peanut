import { Command } from 'discord-akairo';
import { Message, Permissions } from 'discord.js';
import { MESSAGES } from '../../utils/messages';
import { PermissionResolvable } from 'discord.js';

export default class CreateRoleCommand extends Command {
  public constructor() {
    super('create-role', {
      aliases: ['create-role'],
      description: {
        content: MESSAGES.COMMANDS.CONFIG.CREATE_ROLE.DESCRIPTION,
        usage: '<role>',
        examples: ['MyRole', 'Staff'],
      },
      category: 'config',
      channel: 'guild',
      clientPermissions: [Permissions.FLAGS.MANAGE_ROLES],
      userPermissions: [Permissions.FLAGS.MANAGE_GUILD],
      ratelimit: 2,
      args: [
        {
          id: 'role',
          match: 'content',
          type: 'string',
          prompt: {
            start: (message: Message) =>
              MESSAGES.COMMANDS.CONFIG.CREATE_ROLE.PROMPT.START(message.author),
          },
        },
        {
          id: 'permission',
          match: 'content',
          type: 'string',
          default: () => undefined,
        },
      ],
    });
  }

  public async exec(
    message: Message,
    { role, permission }: { role: string; permission?: PermissionResolvable }
  ) {
    if (!role) return;
    if (message.guild?.roles.cache.some((r) => r.name === role))
      return message.util?.reply(
        MESSAGES.COMMANDS.CONFIG.CREATE_ROLE.EXISTS(role)
      );
    const newRole = await message.guild?.roles.create({
      data: { name: role, permissions: permission ? permission : undefined },
    });
    message.util?.reply(MESSAGES.COMMANDS.CONFIG.CREATE_ROLE.REPLY(newRole!));
    return newRole;
  }
}
