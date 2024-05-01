import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'can 1',
      username: 'can-1',
      email: 'can-1@gmail.com',
      password: '123',
    },
    {
      id: 2,
      name: 'can 2',
      username: 'can-2',
      email: 'can-2@gmail.com',
      password: '123',
    },
    {
      id: 3,
      name: 'can 3',
      username: 'can-3',
      email: 'can-3@gmail.com',
      password: '123',
    },
  ];

  async findUserByUserName(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
