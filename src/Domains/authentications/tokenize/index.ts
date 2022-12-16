import { TokenPayload } from '@Domains/authentications/entities';

export interface Tokenize {
  createAccessToken(tokenPayload: TokenPayload): Promise<string>
}
