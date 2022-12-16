export type NewUser = {
  name: string,
  email: string,
  password: string
}

export type CreatedUser = {
  id: string,
  name: string,
  email: string,
  password: string,
  avatar: string
}

export type User = {
  id: string,
  name: string,
  email: string,
  avatar: string
}

export type UserLogin = {
  email: string,
  password: string
}
