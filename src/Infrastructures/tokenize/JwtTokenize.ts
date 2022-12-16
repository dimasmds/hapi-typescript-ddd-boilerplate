import Jwt from '@hapi/jwt';
import { Tokenize } from '@Domains/authentications/tokenize';
import { TokenPayload } from '@Domains/authentications/entities';
import config from '@Commons/config';

class JwtTokenize implements Tokenize {
  async createAccessToken(tokenPayload: TokenPayload): Promise<string> {
    return Jwt.token.generate(tokenPayload, config.tokenize.secret);
  }
}

export default JwtTokenize;
