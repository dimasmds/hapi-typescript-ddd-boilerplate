export interface PasswordHash {
  hash(password: string): Promise<string>
  compare(hashed: string, plain: string): Promise<boolean>
}
