export interface IdGenerator {
  generate(prefix: string): Promise<string>
}
