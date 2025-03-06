import { clerkClient, User as ClerkUser, getAuth } from '@clerk/fastify';
import type {
  LoginPayload,
  RegisterPayload,
  User,
} from '@tsrest-react-boilerplate/api';
import { FastifyRequest } from 'fastify';
import { BadRequestError, UnauthorizedError } from '../../presentation/errors';

export class AuthController {
  private formatClerkUser(clerkUser: ClerkUser): User {
    return {
      username: clerkUser.username,
      createdAt: new Date(clerkUser.createdAt),
    };
  }

  async login({ username, password }: LoginPayload): Promise<User> {
    const {
      data: [user],
    } = await clerkClient.users.getUserList({ username: [username] });

    if (!user) {
      throw UnauthorizedError();
    }

    const { verified } = await clerkClient.users.verifyPassword({
      userId: user.id,
      password,
    });

    if (!verified) {
      throw UnauthorizedError();
    }

    return this.formatClerkUser(user);
  }

  async logout(request: FastifyRequest): Promise<void> {
    const { sessionId } = getAuth(request);
    await clerkClient.sessions.revokeSession(sessionId);
  }

  async me(request: FastifyRequest): Promise<User> {
    const { userId } = getAuth(request);
    const user = await clerkClient.users.getUser(userId);
    return this.formatClerkUser(user);
  }

  async register(body: RegisterPayload): Promise<User> {
    const users = await clerkClient.users.getUserList({
      username: [body.username],
    });

    if (users.data.length > 0) {
      throw BadRequestError();
    }

    const user = await clerkClient.users.createUser({
      username: body.username,
      password: body.password,
    });

    return this.formatClerkUser(user);
  }
}
