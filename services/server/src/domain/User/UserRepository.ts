import { User } from './User';

const EXAMPLE_USERS: [string, User][] = [
  [
    'Anto',
    {
      id: 'Anto',
      username: 'Anto',
      email: 'anto@gmail.com',
      createdAt: new Date(),
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$qxthdNA66eVV6SuDve8SdA$5gRhN+fglZcFg7gTlWeFHJxXzVu8ChhK/b20vgiyHns',
    },
  ],
];

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map(EXAMPLE_USERS);

  async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    return user ?? null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const usersArray = Array.from(this.users.values());
    const user = usersArray.find((user) => user.username === username);
    return user ?? null;
  }
}
