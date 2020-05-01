import { Listener } from 'discord-akairo';
import { MESSAGES } from '../../utils/messages';

export default class ReadyListener extends Listener {
  public constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
      category: 'client',
    });
  }

  public async exec() {
    console.log(
      MESSAGES.EVENTS.READY.LOG(
        this.client.user?.tag ?? '',
        this.client.user?.id ?? ''
      )
    );
    this.client.user?.setActivity(
      MESSAGES.EVENTS.READY.ACTIVITY(this.client.user?.username)
    );
  }
}
