import ClientError from '@Commons/exceptions/ClientError';

class AuthenticationError extends ClientError {
  constructor(message: string) {
    super(message, 401);
    this.message = message;
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;
