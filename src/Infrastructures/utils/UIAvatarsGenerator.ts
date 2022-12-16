import { AvatarGenerator } from '@Domains/users/utils';

class UIAvatarsGenerator implements AvatarGenerator {
  async generate(name: string): Promise<string> {
    return `https://ui-avatars.com/api/?name=${name}&background=random`;
  }
}

export default UIAvatarsGenerator;
