import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsuarioService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'admin',
        password: 'a5CM6@1*rs65',
      },
      {
        userId: 2,
        username: 'usuarioLectorTodos',
        password: '&@#M9279BwGp',
      },
      {
        userId: 3,
        username: 'usuarioLectorCultura',
        password: '!7gr6XPdU4gD',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
