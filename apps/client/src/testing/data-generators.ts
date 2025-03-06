import { randPassword, randUserName, randUuid } from '@ngneat/falso';

const generateUser = () => ({
  id: randUuid(),
  username: randUserName({ withAccents: false }),
  password: randPassword(),
  createdAt: Date.now(),
});

export const createUser = <T extends Partial<ReturnType<typeof generateUser>>>(
  overrides?: T
) => {
  return { ...generateUser(), ...overrides };
};
