import { v4 } from 'uuid';
import { RefreshToken } from './RefreshToken';

export type CreateRefreshTokenProps = {
  userId: string;
  expiresAt: Date;
  tokenFamily?: string;
};

export interface RefreshTokenRepository {
  find: (token: string) => Promise<RefreshToken | null>;
  invalidate: (token: string) => void;
  invalidateTokenFamily: (tokenFamily: string) => void;
  createToken: (props: CreateRefreshTokenProps) => Promise<RefreshToken>;
}

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private tokens: Map<string, RefreshToken> = new Map();

  async find(token: string): Promise<RefreshToken | null> {
    return this.tokens.get(token) ?? null;
  }

  async invalidate(token: string): Promise<void> {
    this.tokens.delete(token);
  }

  async invalidateTokenFamily(tokenFamily: string): Promise<void> {
    const familyTokens = Object.values(this.tokens).filter(
      (token) => token.tokenFamily === tokenFamily
    );
    familyTokens.forEach((token) => {
      this.tokens.delete(token.token);
    });
  }

  async createToken(props: CreateRefreshTokenProps): Promise<RefreshToken> {
    const tokenValue = v4();
    const tokenFamily = props.tokenFamily ?? v4();

    const token: RefreshToken = {
      ...props,
      tokenFamily,
      active: true,
      token: tokenValue,
    };

    this.tokens.set(tokenValue, token);
    return token;
  }
}
