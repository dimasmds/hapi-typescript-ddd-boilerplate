export interface AvatarGenerator {
  generate(name: string): Promise<string>
}
